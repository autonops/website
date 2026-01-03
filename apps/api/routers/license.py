"""
License Router

License validation and status endpoints.
Proxies to the license server.
"""

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import httpx

from config import settings
from services.auth import get_current_user_id

router = APIRouter()


# =============================================================================
# Schemas
# =============================================================================

class LicenseStatus(BaseModel):
    """License status response."""
    tier: str  # trial, pro, team, enterprise
    status: str  # active, expired, cancelled
    tools_enabled: List[str]
    trial_days_remaining: Optional[int] = None
    runs_today: Optional[int] = None
    runs_limit: Optional[int] = None
    valid_until: Optional[str] = None


class ValidateLicenseRequest(BaseModel):
    """Validate license request."""
    key: str


class ValidateLicenseResponse(BaseModel):
    """Validate license response."""
    valid: bool
    tier: Optional[str] = None
    message: Optional[str] = None


# =============================================================================
# Endpoints
# =============================================================================

@router.get("/status", response_model=LicenseStatus)
async def get_license_status(
    user_id: str = Depends(get_current_user_id),
):
    """
    Get the current user's license status.
    
    Proxies to the license server.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{settings.license_server_url}/api/status",
                params={"user_id": user_id},
                timeout=10.0,
            )
            response.raise_for_status()
            data = response.json()
            
            return LicenseStatus(**data)
    
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            # No license found, return trial status
            return LicenseStatus(
                tier="trial",
                status="active",
                tools_enabled=["verify", "codify", "migrate"],
                trial_days_remaining=30,
                runs_today=30,
                runs_limit=30,
            )
        raise HTTPException(status_code=502, detail="License server error")
    
    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="Could not reach license server")


@router.post("/validate", response_model=ValidateLicenseResponse)
async def validate_license(
    request: ValidateLicenseRequest,
    user_id: str = Depends(get_current_user_id),
):
    """
    Validate a license key.
    
    Used when a user enters a license key in settings.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.license_server_url}/api/validate",
                json={
                    "key": request.key,
                    "user_id": user_id,
                },
                timeout=10.0,
            )
            response.raise_for_status()
            data = response.json()
            
            return ValidateLicenseResponse(**data)
    
    except httpx.HTTPStatusError as e:
        error_data = e.response.json() if e.response.content else {}
        return ValidateLicenseResponse(
            valid=False,
            message=error_data.get("message", "Invalid license key"),
        )
    
    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="Could not reach license server")
