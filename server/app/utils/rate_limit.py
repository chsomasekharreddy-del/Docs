"""Small in-memory rate limiter for public API protection."""

from collections import defaultdict, deque
from threading import Lock
from time import monotonic

from fastapi import HTTPException, status

WINDOW_SECONDS = 60
MAX_REQUESTS = 20
_requests: dict[str, deque[float]] = defaultdict(deque)
_lock = Lock()


def check_rate_limit(key: str) -> None:
    now = monotonic()
    with _lock:
        requests = _requests[key]
        while requests and now - requests[0] >= WINDOW_SECONDS:
            requests.popleft()
        if len(requests) >= MAX_REQUESTS:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many requests. Please wait a minute and try again.",
            )
        requests.append(now)
