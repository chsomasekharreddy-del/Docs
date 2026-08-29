from typing import Literal

from fastapi import APIRouter, Depends, Request
from pydantic import BaseModel, Field

from ..services.medical_chat import medical_chat_service
from .. import models
from ..utils import oauth2
from ..utils.rate_limit import check_rate_limit

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
def chat(
    request: ChatRequest,
    http_request: Request,
    current_user: models.User = Depends(oauth2.get_current_user),
):
    client_host = http_request.client.host if http_request.client else "unknown"
    check_rate_limit(f"{current_user.id}:{client_host}")
    return {"reply": medical_chat_service.chat(request.message, [message.model_dump() for message in request.history])}


@router.post("/report")
def report(
    request: ReportRequest,
    http_request: Request,
    current_user: models.User = Depends(oauth2.get_current_user),
):
    client_host = http_request.client.host if http_request.client else "unknown"
    check_rate_limit(f"{current_user.id}:{client_host}")
    return {"report": medical_chat_service.report([message.model_dump() for message in request.history])}
