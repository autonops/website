"""
Auth Service

Handles authentication via API Key (production) or test tokens (development).
"""

from fastapi import HTTPException, Header, Depends
from fastapi.security import APIKeyHeader
from typing import Optional
import logging

from config import settings

logger = logging.getLogger(__name__)

# API Key header
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def get_current_user_id(
    authorization: Optional[str] = Header(None),
    x_api_key: Optional[str] = Depends(api_key_header),
) -> str:
    """
    Get the current user's ID from API key or Bearer token.
    
    Supports:
    - X-API-Key header (for CLI and API access)
    - Bearer token (for future Clerk integration)
    """
    
    # Option 1: API Key authentication
    if x_api_key:
        if x_api_key == settings.internal_api_key:
            # Internal API key - return a default user for now
            # TODO: Look up user by API key in database
            return "api_user"
        else:
            raise HTTPException(
                status_code=401,
                detail="Invalid API key",
            )
    
    # Option 2: Bearer token (development mode only for now)
    if authorization:
        if not authorization.startswith("Bearer "):
            raise HTTPException(
                status_code=401,
                detail="Invalid authorization format. Use 'Bearer <token>'",
            )
        
        token = authorization[7:]
        
        # In development, allow test tokens
        if settings.environment == "development" and token.startswith("test_"):
            return token
        
        # TODO: Add Clerk JWT verification here when auth is fixed
        raise HTTPException(
            status_code=401,
            detail="Bearer token auth not yet enabled in production",
        )
    
    raise HTTPException(
        status_code=401,
        detail="Authentication required. Use X-API-Key header.",
    )
