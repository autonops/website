"""
Application Configuration

Uses Pydantic Settings for environment variable management.
"""

from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Environment
    environment: str = "development"
    
    # Database
    database_url: str = "postgresql://postgres:postgres@localhost:5432/infraiq"
    
    # Clerk Authentication
    clerk_secret_key: str = ""
    
    # License Server
    license_server_url: str = "https://license.autonops.io"
    
    # Stripe
    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""
    
    # CORS
    cors_origins: List[str] = [
        "http://localhost:3000",
        "https://app.autonops.io",
        "https://autonops.io",
    ]
    
    # API Keys for internal communication
    internal_api_key: str = ""
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


# Global settings instance
settings = get_settings()
