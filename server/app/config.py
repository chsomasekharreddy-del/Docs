from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

ENV_PATH = Path(__file__).resolve().parent.parent / ".env"

class Settings(BaseSettings):
    database_hostname: str
    database_port: int
    database_password: str
    database_name: str
    database_username: str

    jwt_secret_key: str
    jwt_algorithm: str
    jwt_access_token_expire_minutes: int
    groq_api_key: str | None = None
    groq_model: str = "openai/gpt-oss-20b"
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000"

    model_config = SettingsConfigDict(
        env_file=(".env", str(ENV_PATH)),
        extra="ignore"
    )

settings = Settings()
