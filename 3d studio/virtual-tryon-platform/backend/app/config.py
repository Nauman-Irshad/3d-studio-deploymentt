from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    cors_origins: str = (
        "http://localhost:5173,http://127.0.0.1:5173,"
        "http://localhost:5174,http://127.0.0.1:5174"
    )
    tryon_mode: str = "placeholder"
    """placeholder | remote | huggingface"""

    remote_tryon_url: str = ""
    """Full URL for POST multipart: person + garment (+ optional mask). Must return raw PNG/JPEG bytes."""

def get_settings() -> Settings:
    return Settings()
