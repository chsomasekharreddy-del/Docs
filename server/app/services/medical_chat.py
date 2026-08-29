"""Small, dependency-light RAG service for the medical chat endpoints."""

from __future__ import annotations

from pathlib import Path
import re
import logging

from fastapi import HTTPException, status

from ..config import settings

logger = logging.getLogger(__name__)

MEDICAL_DATA_DIR = (
    Path(__file__).resolve().parents[3]
    / "model"
    / "medical_data"
)


class MedicalChatService:
    def __init__(self) -> None:
        self.documents = self._load_documents()

    @staticmethod
    def _load_documents() -> list[dict[str, str]]:
        if not MEDICAL_DATA_DIR.exists():
            return []

        return [
            {"source": path.stem, "content": path.read_text(encoding="utf-8")}
            for path in MEDICAL_DATA_DIR.glob("*.txt")
        ]

    def retrieve(self, message: str, limit: int = 3) -> str:
        query_words = set(re.findall(r"[a-zA-Z]{3,}", message.lower()))
        ranked = sorted(
            self.documents,
            key=lambda document: len(query_words & set(re.findall(r"[a-zA-Z]{3,}", document["content"].lower()))),
            reverse=True,
        )
        return "\n\n".join(document["content"] for document in ranked[:limit])

    def chat(self, message: str, history: list[dict[str, str]]) -> str:
        if not settings.groq_api_key:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Medical chat is not configured. Set GROQ_API_KEY in server/.env and restart the API.",
            )

        try:
            from groq import Groq
        except ImportError as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Medical chat dependencies are missing. Install server/requirements.txt.",
            ) from exc

        context = self.retrieve(message)
        system_prompt = f"""You are HealthSage, a cautious medical information assistant. You provide health information, not a diagnosis.
Use the following local medical reference material when relevant:\n{context}

Give a focused, plain-language answer in Markdown. Put each section heading on its own line in the form **Heading**. Put every bullet and numbered step on its own line.
For symptom questions, use these headings when appropriate: Possible explanations, What you can do now, When to seek urgent help, and Follow-up questions.
Do not present a diagnosis as certain. Ask at most two clarifying questions when needed.
For a headache, immediately recommend emergency care for a sudden worst-ever headache, new weakness or numbness, confusion, fainting, seizure, stiff neck with fever, vision or speech changes, head injury, pregnancy-related severe headache, or chest pain.
If symptoms suggest an emergency, tell the user to seek emergency care now.
Always encourage professional medical advice for concerning, persistent, or worsening symptoms."""
        safe_history = [
            {"role": item["role"], "content": item["content"]}
            for item in history[-12:]
            if item.get("role") in {"user", "assistant"} and isinstance(item.get("content"), str)
        ]
        try:
            response = Groq(api_key=settings.groq_api_key).chat.completions.create(
                model=settings.groq_model,
                messages=[{"role": "system", "content": system_prompt}, *safe_history, {"role": "user", "content": message}],
                temperature=0.2,
                max_completion_tokens=500,
            )
            return (response.choices[0].message.content or "I could not generate a response.").strip()
        except Exception as exc:
            logger.exception("Groq chat completion failed")
            raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="The medical AI provider could not complete the request.") from exc

    def report(self, history: list[dict[str, str]]) -> str:
        conversation = "\n".join(
            f"{item.get('role', 'user').title()}: {item.get('content', '')}" for item in history[-20:]
        )
        return self.chat(
            "Create a concise informational summary of the conversation. Include possible conditions, precautions, and when to seek urgent care. Conversation:\n" + conversation,
            [],
        )


medical_chat_service = MedicalChatService()
