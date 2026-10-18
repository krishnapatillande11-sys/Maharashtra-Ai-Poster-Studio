# Maharashtra AI Poster Studio

A Next.js starter website for an AI poster/banner maker with:
- Marathi/Hindi/English-ready UI
- Prompt-based AI poster-background generation endpoint
- Template-based editor preview
- Upload image/logo
- Starter and ₹199/month Premium pricing section
- Razorpay subscription-creation API route

## Important: this is a starter build, not yet production-ready

The public UI and server routes are implemented, but **do not accept real customer payments or promise paid membership access until you finish the checklist below**. Real accounts, subscription verification, payment webhooks, user entitlements, abuse protection, and reliable PNG/JPG export still need to be added and tested. The current preview download is an SVG prototype, not a print-ready export pipeline.

## Run locally

1. Install Node.js 20 or newer.
2. Extract this folder.
3. Open a terminal in this folder and run:

   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

4. Open `http://localhost:3000`.

The template editor works without API keys. AI generation shows a configuration message until you add a valid API key.

## Configure AI image generation

1. Create an account with an image-generation API provider and obtain an API key.
2. Put it in `.env.local` as `OPENAI_API_KEY=...`.
3. Keep this key on the server only. Never put it in client-side JavaScript or commit it to GitHub.
4. Check current model availability, price, terms, and usage limits with the provider before launch.

## Configure ₹199/month payments

1. Create/verify your Razorpay merchant account.
2. In the Razorpay dashboard, create a recurring monthly plan for ₹199 and copy its plan ID.
3. Add `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_PLAN_ID`, and `NEXT_PUBLIC_RAZORPAY_KEY_ID` to `.env.local`.
4. Build the customer checkout flow with Razorpay Checkout and verify the returned signature on the server.
5. Configure and verify Razorpay subscription webhooks. Do not trust a browser redirect alone.
6. Store subscription status securely in a database and grant/revoke Premium features based on verified webhook events.
7. Add authentication and rate limiting before allowing public usage. Do not expose AI generation without abuse controls or cost limits.

The current pricing button intentionally explains that checkout is not active until these steps are complete.

## Deploy

You can deploy this Next.js project on a supported host such as Vercel or another Node.js hosting provider. Add environment variables in the host dashboard, deploy, then configure your custom domain through that host's domain settings. Hosting and domain registration may cost money.

## Before public launch

- [ ] Add user sign-up/login and secure database storage
- [ ] Add verified Razorpay Checkout and webhook processing
- [ ] Add Premium entitlement checks on server routes
- [ ] Add rate limits and usage quotas to prevent surprise AI bills
- [ ] Add production-quality PNG/JPG/PDF export
- [ ] Add privacy policy, terms, refund/cancellation policy, and contact details
- [ ] Test mobile layouts and Marathi fonts on real devices
- [ ] Test payment success, failure, cancellation, and subscription expiry
- [ ] Check AI provider rules for political content, likenesses, logos, and commercial use
