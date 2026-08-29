from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel, Field

from ..services.medical_chat import medical_chat_service

router = APIRouter(prefix="/chat", tags=["Medical Chat"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=8000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    history: list[ChatMessage] = Field(default_factory=list, max_length=20)


class ReportRequest(BaseModel):
    history: list[ChatMessage] = Field(default_factory=list, min_length=1, max_length=20)


@router.post("")
def chat(request: ChatRequest):
    return {"reply": medical_chat_service.chat(request.message, [message.model_dump() for message in request.history])}


@router.post("/report")
def report(request: ReportRequest):
    return {"report": medical_chat_service.report([message.model_dump() for message in request.history])}
