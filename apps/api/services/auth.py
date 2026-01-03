"""
Auth Service

Handles authentication via Clerk.
"""

from fastapi import HTTPException, Header
from typing import Optional
import httpx
import logging

from config import settings

logger = logging.getLogger(__name__)


async def get_current_user_id(
    authorization: Optional[str] = Header(None),
) -> str:
    """
    Get the current user's ID from the Clerk session.
    
    In production, this verifies the JWT token from Clerk.
    In development, it can accept a test user ID.
    
    Usage:
        @app.get("/items")
        async def get_items(user_id: str = Depends(get_current_user_id)):
            ...
    """
    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header required",
        )
    
    # Extract token from "Bearer <token>" format
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authorization format. Use 'Bearer <token>'",
        )
    
    token = authorization[7:]  # Remove "Bearer " prefix
    
    # In development, allow test tokens
    if settings.environment == "development" and token.startswith("test_"):
        return token  # Use token as user ID for testing
    
    # Verify token with Clerk
    try:
        # Clerk's session verification endpoint
        # In production, you might want to verify the JWT locally
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.clerk.com/v1/sessions/verify",
                headers={
                    "Authorization": f"Bearer {settings.clerk_secret_key}",
                    "Content-Type": "application/json",
                },
                params={"token": token},
                timeout=10.0,
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get("user_id")
            else:
                logger.warning(f"Clerk verification failed: {response.status_code}")
                raise HTTPException(
                    status_code=401,
                    detail="Invalid or expired session",
                )
    
    except httpx.RequestError as e:
        logger.error(f"Error verifying session with Clerk: {e}")
        raise HTTPException(
            status_code=503,
            detail="Authentication service unavailable",
        )


async def verify_clerk_session(session_token: str) -> Optional[dict]:
    """
    Verify a Clerk session token and return the session data.
    
    Returns None if the token is invalid.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://api.clerk.com/v1/sessions/verify",
                headers={
                    "Authorization": f"Bearer {settings.clerk_secret_key}",
                },
                params={"token": session_token},
                timeout=10.0,
            )
            
            if response.status_code == 200:
                return response.json()
            return None
    
    except httpx.RequestError:
        return None
