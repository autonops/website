"""
Stripe Checkout Router for InfraIQ Dashboard API

Creates checkout sessions for Pro and Team subscriptions.
"""

import os
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import Optional
import stripe

router = APIRouter(prefix="/api/checkout", tags=["checkout"])

# Initialize Stripe with your secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Price IDs (production)
PRICE_IDS = {
    "pro_monthly": "price_1SmLfAQlSOp89SMnO8UavVuJ",
    "team_monthly": "price_1SmLfAQlSOp89SMnWUUAqmrA",
}

# URLs
DASHBOARD_URL = os.getenv("DASHBOARD_URL", "https://app.autonops.io")


class CheckoutRequest(BaseModel):
    """Request body for creating a checkout session."""
    price_key: str  # "pro_monthly" or "team_monthly"
    customer_email: str
    clerk_id: str
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None


class CheckoutResponse(BaseModel):
    """Response containing the checkout session URL."""
    checkout_url: str
    session_id: str


@router.post("/create-session", response_model=CheckoutResponse)
async def create_checkout_session(request: CheckoutRequest):
    """
    Create a Stripe Checkout session for subscription purchase.
    
    The user must be logged in (clerk_id required).
    After successful payment, Stripe webhook will:
    1. Create license in License Server
    2. Update user tier in Dashboard API
    """
    
    # Validate price key
    if request.price_key not in PRICE_IDS:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid price_key. Must be one of: {list(PRICE_IDS.keys())}"
        )
    
    price_id = PRICE_IDS[request.price_key]
    
    # Set URLs
    success_url = request.success_url or f"{DASHBOARD_URL}/dashboard?checkout=success"
    cancel_url = request.cancel_url or f"{DASHBOARD_URL}/dashboard/pricing?checkout=cancelled"
    
    try:
        # Create Stripe Checkout Session
        checkout_session = stripe.checkout.Session.create(
            mode="subscription",
            payment_method_types=["card"],
            line_items=[
                {
                    "price": price_id,
                    "quantity": 1,
                }
            ],
            customer_email=request.customer_email,
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "clerk_id": request.clerk_id,
                "price_key": request.price_key,
            },
            subscription_data={
                "metadata": {
                    "clerk_id": request.clerk_id,
                }
            },
            allow_promotion_codes=True,  # Allow discount codes
        )
        
        return CheckoutResponse(
            checkout_url=checkout_session.url,
            session_id=checkout_session.id
        )
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/create-portal-session")
async def create_portal_session(customer_email: str):
    """
    Create a Stripe Customer Portal session for managing subscriptions.
    
    Allows customers to:
    - Update payment method
    - View invoices
    - Cancel subscription
    """
    
    try:
        # Find customer by email
        customers = stripe.Customer.list(email=customer_email, limit=1)
        
        if not customers.data:
            raise HTTPException(
                status_code=404, 
                detail="No Stripe customer found with this email"
            )
        
        customer = customers.data[0]
        
        # Create portal session
        portal_session = stripe.billing_portal.Session.create(
            customer=customer.id,
            return_url=f"{DASHBOARD_URL}/dashboard/settings",
        )
        
        return {"portal_url": portal_session.url}
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/prices")
async def get_prices():
    """
    Return available pricing information.
    
    Useful for dynamically populating pricing pages.
    """
    return {
        "prices": [
            {
                "key": "pro_monthly",
                "name": "Pro",
                "price": 499,
                "currency": "usd",
                "interval": "month",
                "features": [
                    "All 7 InfraIQ tools",
                    "Unlimited scans",
                    "Dashboard access",
                    "Email support",
                    "2 seat license",
                ],
            },
            {
                "key": "team_monthly",
                "name": "Team",
                "price": 2499,
                "currency": "usd",
                "interval": "month",
                "features": [
                    "Everything in Pro",
                    "10 seat license",
                    "Priority support",
                    "Team management",
                    "Audit logs",
                    "SSO integration",
                ],
            },
            {
                "key": "enterprise",
                "name": "Enterprise",
                "price": None,  # Contact us
                "currency": "usd",
                "interval": None,
                "features": [
                    "Everything in Team",
                    "Unlimited seats",
                    "Dedicated support",
                    "Custom integrations",
                    "SLA guarantee",
                    "On-premise option",
                ],
            },
        ]
    }
