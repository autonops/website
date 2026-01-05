"""
Auth Service

Handles authentication via API Key (production) or test tokens (development).
"""

from fastapi import HTTPException, Header, Depends
from fastapi.security import APIKeyHeader
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
import logging

from config import settings
from database import get_db

logger = logging.getLogger(__name__)

# API Key header
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def get_current_user_id(
    authorization: Optional[str] = Header(None),
    x_api_key: Optional[str] = Depends(api_key_header),
    db: AsyncSession = Depends(get_db),
) -> str:
    """
    Get the current user's ID from API key or Bearer token.
    
    Supports:
    - X-API-Key header with user's personal API key (iq_xxx)
    - X-API-Key header with internal API key (for dashboard)
    - Bearer token (for future Clerk integration)
    """
    from models import User  # Import here to avoid circular imports
    
    # Option 1: API Key authentication
    if x_api_key:
        # Check if it's the internal API key (used by dashboard)
        if x_api_key == settings.internal_api_key:
            # Internal API key - return a default user for dashboard requests
            return "internal_dashboard"
        
        # Check if it's a user's personal API key
        if x_api_key.startswith("iq_"):
            query = select(User).where(User.api_key == x_api_key)
            result = await db.execute(query)
            user = result.scalar_one_or_none()
            
            if user:
                logger.debug(f"Authenticated user {user.clerk_id} via API key")
                return user.clerk_id
            else:
                raise HTTPException(
                    status_code=401,
                    detail="Invalid API key",
                )
        
        # Unknown API key format
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
