# Dashboard TODOs

## Auth (DISABLED - January 3, 2026)

Authentication is currently disabled. Clerk was configured but had issues with:
- MFA/factor-two redirect loop
- DNS records are set up (5/5 verified in Clerk)
- Production keys are in Vercel env vars

### To re-enable auth later:

1. Debug the Clerk issue OR switch to simpler auth (NextAuth, Supabase Auth, or basic JWT)

2. If using Clerk, check:
   - User doesn't have MFA enabled in Clerk dashboard
   - Try creating brand new user after clearing all cookies
   - Check Clerk support for "factor-two loop" issue

3. Files to update:
   - `middleware.ts` - restore authMiddleware
   - `app/dashboard/layout.tsx` - restore auth() check
   - `app/page.tsx` - restore sign-in redirect logic

### Simpler alternatives to Clerk:
- NextAuth.js (next-auth) - works well with Next.js
- Supabase Auth - if you add Supabase later
- Simple JWT + API route - roll your own

## Other TODOs

- [ ] Connect database (Cloud SQL) to API
- [ ] Add `infraiq --sync` to push scan data to dashboard
- [ ] Stripe integration for billing
- [ ] Real data instead of mock data in dashboard

## Auth Flow (Future)

When ready to launch:

1. **Sign up flow**
   - "Join Beta" → Create account (email/password or OAuth)
   - "Buy" on pricing → Create account + Stripe checkout

2. **Protected routes**
   - app.autonops.io/* requires authenticated user
   - Redirect to sign-in if not logged in

3. **Integration points**
   - Stripe for payments
   - License server (license.autonops.io) for key validation
   - Dashboard shows user's license status

4. **Options to consider**
   - Clerk (already configured, needs debugging)
   - NextAuth.js (simpler)
   - Supabase Auth (if adding database)
   - Custom JWT (full control)
