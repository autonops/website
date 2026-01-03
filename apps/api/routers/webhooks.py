"""
Webhooks Router

Handles webhooks from Clerk (auth) and Stripe (payments).
"""

from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
import hmac
import hashlib
import json
import logging

from config import settings
from database import get_db
from models import User

router = APIRouter()
logger = logging.getLogger(__name__)


# =============================================================================
# Clerk Webhooks
# =============================================================================

@router.post("/clerk")
async def clerk_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """
    Handle Clerk webhook events.
    
    Events handled:
    - user.created: Create user record
    - user.updated: Update user record
    - user.deleted: Delete user record
    """
    # Get the raw body for signature verification
    body = await request.body()
    
    # Verify webhook signature (in production)
    # For now, we'll skip verification in development
    if settings.environment != "development":
        svix_id = request.headers.get("svix-id")
        svix_timestamp = request.headers.get("svix-timestamp")
        svix_signature = request.headers.get("svix-signature")
        
        if not all([svix_id, svix_timestamp, svix_signature]):
            raise HTTPException(status_code=400, detail="Missing webhook headers")
        
        # TODO: Verify signature using Clerk's svix library
    
    # Parse the event
    try:
        event = json.loads(body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    
    event_type = event.get("type")
    data = event.get("data", {})
    
    logger.info(f"Received Clerk webhook: {event_type}")
    
    if event_type == "user.created":
        # Create user record
        user = User(
            id=data.get("id"),
            email=data.get("email_addresses", [{}])[0].get("email_address", ""),
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
        )
        db.add(user)
        await db.commit()
        logger.info(f"Created user: {user.id}")
    
    elif event_type == "user.updated":
        # Update user record
        from sqlalchemy import select
        query = select(User).where(User.id == data.get("id"))
        result = await db.execute(query)
        user = result.scalar_one_or_none()
        
        if user:
            user.email = data.get("email_addresses", [{}])[0].get("email_address", user.email)
            user.first_name = data.get("first_name", user.first_name)
            user.last_name = data.get("last_name", user.last_name)
            await db.commit()
            logger.info(f"Updated user: {user.id}")
    
    elif event_type == "user.deleted":
        # Delete user record
        from sqlalchemy import select
        query = select(User).where(User.id == data.get("id"))
        result = await db.execute(query)
        user = result.scalar_one_or_none()
        
        if user:
            await db.delete(user)
            await db.commit()
            logger.info(f"Deleted user: {data.get('id')}")
    
    return {"received": True}


# =============================================================================
# Stripe Webhooks
# =============================================================================

@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """
    Handle Stripe webhook events.
    
    Events handled:
    - checkout.session.completed: Generate license key
    - customer.subscription.updated: Update tier
    - customer.subscription.deleted: Revoke access
    - invoice.payment_failed: Notify user
    """
    # Get the raw body for signature verification
    body = await request.body()
    sig_header = request.headers.get("stripe-signature")
    
    # Verify webhook signature
    if settings.environment != "development" and settings.stripe_webhook_secret:
        import stripe
        try:
            event = stripe.Webhook.construct_event(
                body, sig_header, settings.stripe_webhook_secret
            )
        except stripe.error.SignatureVerificationError:
            raise HTTPException(status_code=400, detail="Invalid signature")
    else:
        # In development, just parse the JSON
        try:
            event = json.loads(body)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid JSON")
    
    event_type = event.get("type")
    data = event.get("data", {}).get("object", {})
    
    logger.info(f"Received Stripe webhook: {event_type}")
    
    if event_type == "checkout.session.completed":
        # Payment successful, generate license key
        customer_email = data.get("customer_email")
        metadata = data.get("metadata", {})
        tier = metadata.get("tier", "pro")
        
        logger.info(f"Checkout completed for {customer_email}, tier: {tier}")
        
        # TODO: Generate license key and send to user
        # This would call your license server to create a key
        # Then update the user record with the key
    
    elif event_type == "customer.subscription.updated":
        # Subscription changed (upgrade/downgrade)
        subscription_id = data.get("id")
        status = data.get("status")
        
        logger.info(f"Subscription {subscription_id} updated: {status}")
        
        # TODO: Update user's license tier
    
    elif event_type == "customer.subscription.deleted":
        # Subscription cancelled
        subscription_id = data.get("id")
        
        logger.info(f"Subscription {subscription_id} cancelled")
        
        # TODO: Revoke license or downgrade to free tier
    
    elif event_type == "invoice.payment_failed":
        # Payment failed
        customer_email = data.get("customer_email")
        
        logger.info(f"Payment failed for {customer_email}")
        
        # TODO: Send notification to user
    
    return {"received": True}
