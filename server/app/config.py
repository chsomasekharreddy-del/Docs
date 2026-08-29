from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_hostname: str
    database_port: int
    database_password: str
    database_name: str
    database_username: str

    jwt_secret_key: str
    jwt_algorithm: str
    jwt_access_token_expire_minutes: int

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()