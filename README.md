# TulSip Media - Next.js + Supabase

Production-ready digital marketing agency website and client portal built with:
- Next.js App Router + Tailwind CSS
- Supabase Auth + Database + API routes
- Spline 3D embed (dynamic config, lazy loaded)

## Quick Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env.local
```
Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

3. Apply Supabase schema:
- Open Supabase SQL Editor
- Run: `supabase/schema.sql`

4. Run development server:
```bash
npm run dev
```

## Route Map

- `/`
- `/services`
- `/packages`
- `/portfolio`
- `/team`
- `/clients`
- `/testimonials`
- `/contact`
- `/login`
- `/register`
- `/admin/login`
- `/dashboard` (protected)
- `/admin/dashboard` (protected, admin/manager)
- `/api/dashboard` (authenticated API endpoint)
- `/api/health` (load balancer health check)
- `/api/payments/create-order`
- `/api/payments/verify`
- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`

## Key Config

Edit [`lib/config.ts`](./lib/config.ts):
- `logoPath`: defaults to `/logo.png` (replace file in `public/`)
- `splineSceneUrl`: your Spline scene URL
- `cameraFallbackImage`: image shown while 3D loads
- `splineEnabled`: set `true` only after confirming the URL loads correctly
- `socialLinks`, `officeAddress`, `googleMapsEmbedUrl`, and WhatsApp details

Replace images from centralized files:
- Team photos: [`lib/data/team.ts`](./lib/data/team.ts)
- Portfolio photos: [`lib/data/portfolio.ts`](./lib/data/portfolio.ts)
- Brand logo + camera fallback: [`lib/config.ts`](./lib/config.ts) + `public/`

Edit [`lib/data/packages.ts`](./lib/data/packages.ts):
- Pricing, strikethrough/original price, and `isMostPopular`

Edit [`lib/data/services.ts`](./lib/data/services.ts):
- Services section cards

## Performance Notes

- Spline component is lazy-loaded with `next/dynamic` and `ssr: false`
- Fallback image is shown while Spline loads
- `next/image` used for optimized image delivery
- Minimal client JS by keeping most pages/components server-rendered
- Subtle transitions only (fade-in + hover), no heavy GPU animation chains

## Supabase Tables

- `users`
- `clients`
- `posts`
- `approvals`
- `deliverables`
- `reports`

## Portal Features

- Client login: content calendar, post counts/tracking, approvals, deliverables, Meta + Google insights.
- Admin login: add clients, create posts, send image/video approvals, publish weekly/monthly reports.
- Role-aware middleware:
  - client portal: `/dashboard`
  - admin portal: `/admin/dashboard`

## Seed Admin + Client Login

After setting environment variables and running schema SQL:
```bash
npm run seed:users
```

Default seeded credentials (override via env):
- Admin: `admin@tulsipmedia.com` / `TulSipAdmin@123`
- Client: `client@tulsipmedia.com` / `TulSipClient@123`

Change these passwords immediately in production.

If you want custom credentials, set these in `.env.local` before seeding:
- `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`
- `SEED_CLIENT_EMAIL`, `SEED_CLIENT_PASSWORD`

## Load Balancer Setup

Added deployment-ready files:
- `Dockerfile`
- `infra/nginx/nginx.conf`
- `docker-compose.lb.yml`

Run with:
```bash
docker compose -f docker-compose.lb.yml up --build
```

Nginx load balancer endpoint:
- `http://localhost:8080`

## SEO + SEM Plugins

Built-in SEO:
- metadata (OpenGraph, Twitter, canonical)
- `sitemap.xml`
- `robots.txt`
- Organization JSON-LD schema

SEM / tracking hooks (env-driven, optional):
- Google Analytics 4
- Google Tag Manager
- Google Ads tag
- Meta Pixel
- LinkedIn Insight tag

Configure IDs in `.env.local` (see `.env.example`).

## Gmail Notifications

New client registrations from `/register` trigger email notifications to `ADMIN_NOTIFY_EMAIL`
using Gmail SMTP config from `.env.local`.

## Forgot Password (OTP)

- `/forgot-password` sends OTP to client email
- OTP verification lets user set a new password
- OTP records are stored securely in `password_reset_otps`

## Payments

The `Choose Plan` button opens Razorpay Checkout directly.
Successful payments are verified and persisted in `payments` table.

UPI option is also available on each package card:
- configure `UPI_ID` and `UPI_PAYEE_NAME`

## Dynamic 3D Swap

In [`lib/config.ts`](./lib/config.ts):
```ts
export const CONFIG = {
  splineEnabled: true,
  splineSceneUrl: "https://prod.spline.design/your-scene/scene.splinecode"
};
```

The Hero section consumes this value and passes it to:
```tsx
<Spline scene={sceneUrl} />
```

---

## Owner Manual (Detailed Update Guide)

This section is your day-to-day instruction block. Follow this sequence whenever you update the website, portal, APIs, or keys.

### 1) Master Update Sequence (Always Follow This Order)

1. Pull/open latest project code.
2. Update content/config files first (`lib/config.ts`, `lib/data/*`).
3. Update UI components/pages only if layout change is needed.
4. If data model changes, run SQL in Supabase SQL Editor.
5. Set/verify `.env.local` keys.
6. Run:
```bash
npm run lint
npm run dev
```
7. Test critical flows:
- Home + Contact + Portfolio
- Login (client/admin)
- Dashboard + Admin Dashboard
- Contact form email
- Payment confirmation flow

### 2) File-by-File Update Map

Use this as the quickest "what file controls what" reference.

#### Core brand + global settings

- `lib/config.ts`
  - Brand/contact info, UPI details, maps links, social URLs, logo path, camera fallback.
  - If you want to change links/phone/email/location globally, start here.

- `lib/data/site-content.ts`
  - Editable website copy for hero/footer/popup text and link labels.
  - Safest place to update homepage wording without breaking design layout.

- `lib/nav-links.ts`
  - Navbar route list (currently mapped from `site-content.ts`).

#### Homepage + marketing sections

- `app/page.tsx`
  - Home page section order and composition.

- `components/sections/HeroSection.tsx`
  - Hero text placement, CTA text, camera block, stats.

- `components/sections/BrandStorySection.tsx`
  - Brand story content and cards.

- `components/sections/ServicesSection.tsx`
  - Service cards UI rendering.

- `lib/data/services.ts`
  - Services data content.

- `components/sections/PackagesSection.tsx`
  - Public package cards + UPI modal flow.

- `lib/data/packages.ts`
  - Package data source.
  - Add new plans in `CUSTOM_PACKAGE_PLANS` for flexible scaling.

- `components/sections/FAQSection.tsx`
  - FAQ section UI.

- `lib/data/faqs.ts`
  - FAQ question/answer data.

#### Team/founders/testimonials/clients/brands

- `lib/data/team.ts`
  - Team member names, roles, and image paths.

- `lib/data/founders.ts`
  - Founder cards and main brand story text.

- `lib/data/testimonials.ts`
  - Testimonials cards and social labels.

- `lib/data/clients.ts`, `lib/data/brands.ts`
  - Client/brand lists used in display components.

#### Portfolio (public + admin CMS)

- `app/portfolio/page.tsx`
  - Public portfolio render logic.
  - Uses DB table `portfolio_items` (published rows) and falls back to local data.

- `lib/data/portfolio.ts`
  - Fallback portfolio items if DB list is empty.

- `app/admin/dashboard/page.tsx` (tab: `Website CMS`)
  - Admin UI to add/delete portfolio image/video cards.

- `app/admin/dashboard/actions.ts`
  - Server actions that insert/delete portfolio rows.

#### Contact + email notifications

- `app/contact/page.tsx`
  - Contact page layout, map iframe, social links.

- `components/common/ContactInquiryForm.tsx`
  - Functional contact form submission UI.

- `app/api/contact/route.ts`
  - Backend endpoint for contact form submission.

- `lib/notifications/email.ts`
  - All outgoing email templates and sender logic:
  - Contact inquiry emails
  - Registration notifications
  - OTP mails
  - Feedback receipt
  - Purchase/renewal/daily motivation

#### Auth + portal roles + security

- `app/login/page.tsx`
  - Unified user/admin login switch UI.

- `components/auth/LoginForm.tsx`
  - Login logic, role checks, social auth entry points.

- `app/admin/login/page.tsx`
  - Admin login page.

- `components/auth/InactivityLogout.tsx`
  - Auto logout timer logic (default 60 min).

- `lib/supabase/roles.ts`
  - Current user profile/role resolver.

- `lib/supabase/middleware.ts`
  - Route protection logic.

#### Client dashboard

- `app/dashboard/page.tsx`
  - Full client dashboard tabs and widgets.

- `app/dashboard/actions.ts`
  - Client-side server actions (approvals/messages/settings/requests).

- `components/dashboard/PortalPlanPurchase.tsx`
  - UPI-only plan activation in client portal.

#### Admin dashboard

- `app/admin/dashboard/page.tsx`
  - Full admin tab UI (clients, calendar, approvals, reports, messages, website CMS).

- `app/admin/dashboard/actions.ts`
  - Admin mutations: add client/post/report/deliverable, tickets, role updates, portfolio CMS.

#### Uploads/media

- `components/common/StorageUploadField.tsx`
  - Reusable upload-from-device component for images/videos (Supabase storage).

- `public/images/*`
  - Static files served directly from site root (`/images/...`).

#### Visual system

- `app/globals.css`
  - Theme colors, spacing utilities, animation styles, input/dropdown theme.

### 3) API Keys & Env Setup (Copy into `.env.local`)

Use `.env.example` as base, then set real values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
ADMIN_NOTIFY_EMAIL=

UPI_ID=
UPI_PAYEE_NAME=

OTP_SECRET=
CRON_SECRET=

OWNER_EMAILS=
OWNER_EMAIL=
ADMIN_EMAILS=

NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=
```

Optional legacy/payment keys (only if Razorpay flow is re-enabled):
```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### 4) How to Receive Emails for Everything

#### A) Contact form notifications

Flow:
`Contact form -> /api/contact -> sendContactInquiryEmail() -> ADMIN_NOTIFY_EMAIL`

Required env:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `ADMIN_NOTIFY_EMAIL`

#### B) New client registration email

Flow:
`/register -> app/register/actions.ts -> sendNewClientRegistrationEmail()`

Required env:
- Same SMTP vars
- `ADMIN_NOTIFY_EMAIL`

#### C) OTP reset emails

Flow:
`/forgot-password -> API routes -> sendPasswordResetOtpEmail()`

Required env:
- SMTP vars
- `OTP_SECRET`

#### D) Purchase confirmation + renewal + daily quote

Flow:
- Purchase confirmation: `UPI confirm API -> sendPurchaseConfirmationEmail()`
- Daily/renewal: `POST /api/notifications/daily` (cron)

Required env:
- SMTP vars
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRON_SECRET` (recommended)

### 5) Supabase SQL Sequence (Important)

1. Run `supabase/schema.sql` in SQL Editor.
2. Confirm tables exist:
- `users`, `clients`, `posts`, `approvals`, `deliverables`, `reports`, `messages`, `client_requests`, `payments`, `password_reset_otps`, `portfolio_items`, `feedback_submissions`
3. If table errors happen, run migration blocks in same order as schema sections.
4. Re-test login and dashboard after SQL update.

### 6) Common Content Update Sequences

#### Update text/links only (safest)

1. Edit `lib/data/site-content.ts`
2. Edit `lib/config.ts` for URLs/social/location
3. Save and check pages

#### Update photos/videos

1. Put static files in `public/images/...` and set path in corresponding data file, or
2. Use admin upload (`Website CMS` tab or upload fields in dashboard/admin forms)

#### Add a new package

1. Open `lib/data/packages.ts`
2. Add item in `CUSTOM_PACKAGE_PLANS`
3. Save and verify `/packages` + client portal upgrade tab

#### Add new FAQ

1. Open `lib/data/faqs.ts`
2. Add a `{ question, answer }` object
3. Save and verify Home + Help Center page

### 7) Image Path Rules (Avoid 404 Errors)

Always keep public assets inside `public/`.

Example:
- File path in disk: `public/images/team/sahil.png`
- URL in code: `/images/team/sahil.png`

Do not use `lib/public/...` paths in UI image URLs.

### 8) Final Pre-Deploy Checklist

1. `npm run lint`
2. `npm run dev` and test key routes
3. Verify contact form sends mail
4. Verify login for client/admin
5. Verify map iframe loads (embed URL) and open-location link works
6. Verify portfolio media cards load (image/video)
7. Verify dashboard uploads and settings save

### 9) Security Notes

- Never commit real keys into git.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
- Rotate SMTP/App passwords periodically.
- Keep `OTP_SECRET` and `CRON_SECRET` long and private.

---

## API / Secret Key User Manual (With Official Links)

Use this section when setting up new integrations or replacing keys.

### A) Supabase (Auth + DB + Storage)

Official site:
- [https://supabase.com](https://supabase.com)

Where to get keys:
1. Open your Supabase project.
2. Go to `Project Settings -> API`.
3. Copy:
- `Project URL` -> `NEXT_PUBLIC_SUPABASE_URL`
- `anon public key` -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role key` -> `SUPABASE_SERVICE_ROLE_KEY`

### B) Gmail SMTP (Email Notifications)

Google account:
- [https://myaccount.google.com](https://myaccount.google.com)

App Passwords page:
- [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

Steps:
1. Enable 2-Step Verification on your Google account.
2. Create an App Password (Mail).
3. Set in `.env.local`:
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=your_gmail@gmail.com`
- `SMTP_PASS=your_app_password`
- `SMTP_FROM=your_gmail@gmail.com`
- `ADMIN_NOTIFY_EMAIL=your_admin_email@gmail.com`

### C) Google Analytics 4

GA setup:
- [https://analytics.google.com](https://analytics.google.com)

Get key:
1. Create GA4 property.
2. Data Streams -> Web.
3. Copy Measurement ID (`G-XXXXXXX`).
4. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

### D) Google Tag Manager

GTM setup:
- [https://tagmanager.google.com](https://tagmanager.google.com)

Get key:
1. Create container.
2. Copy Container ID (`GTM-XXXXXXX`).
3. Set `NEXT_PUBLIC_GTM_ID`.

### E) Google Ads Conversion Tag

Google Ads:
- [https://ads.google.com](https://ads.google.com)

Get key:
1. Tools -> Conversions.
2. Create conversion action.
3. Copy tag/account ID.
4. Set `NEXT_PUBLIC_GOOGLE_ADS_ID`.

### F) Meta Pixel (Facebook/Instagram)

Meta Events Manager:
- [https://business.facebook.com/events_manager2](https://business.facebook.com/events_manager2)

Get key:
1. Create/select Pixel.
2. Copy Pixel ID.
3. Set `NEXT_PUBLIC_META_PIXEL_ID`.

### G) LinkedIn Insight Tag

LinkedIn Campaign Manager:
- [https://www.linkedin.com/campaignmanager](https://www.linkedin.com/campaignmanager)

Get key:
1. Account Assets -> Insight Tag.
2. Copy Partner ID.
3. Set `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`.

### H) UPI Payment Config

No portal key needed for basic UPI deep-link flow.

Set:
- `UPI_ID=yourupi@bank`
- `UPI_PAYEE_NAME=Your Business Name`

### I) Razorpay (Optional / Legacy Flow)

Razorpay Dashboard:
- [https://dashboard.razorpay.com](https://dashboard.razorpay.com)

Get keys:
1. Settings -> API Keys.
2. Generate Key ID + Key Secret.
3. Set:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

### J) Google Maps Location / Embed

Google Maps:
- [https://www.google.com/maps](https://www.google.com/maps)

For this project:
- `googleMapsEmbedUrl` should be embeddable URL (iframe).
- `googleMapsLocationUrl` should be open-in-maps link for button click.

Edit in:
- `lib/config.ts`

### K) Spline 3D Scene URL (Optional)

Spline:
- [https://app.spline.design](https://app.spline.design)

Get URL:
1. Open scene.
2. Export/Share web scene URL (`.splinecode`).
3. Set in `lib/config.ts`:
- `splineEnabled=true`
- `splineSceneUrl=...`

### L) Owner/Admin Bootstrap Emails

Set allowlists in `.env.local`:
- `OWNER_EMAILS=owner1@example.com,owner2@example.com`
- `OWNER_EMAIL=owner@example.com` (optional fallback)
- `ADMIN_EMAILS=admin1@example.com,admin2@example.com`

### M) Required Internal Secrets (Generate Yourself)

Set strong random values:
- `OTP_SECRET`
- `CRON_SECRET`

Generate (PowerShell):
```powershell
[guid]::NewGuid().ToString("N")
```

### N) Final `.env.local` Quick Checklist

Must have:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `ADMIN_NOTIFY_EMAIL`
- `UPI_ID`
- `UPI_PAYEE_NAME`
- `OTP_SECRET`
- `CRON_SECRET`

Optional marketing keys:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_ADS_ID`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`

---

## Production Hardening (Final Touch)

Applied hardening in codebase:

1. Contact API rate limit
- File: `app/api/contact/route.ts`
- Rule: max 5 requests per 10 minutes per IP+email.

2. Test email endpoint secured
- File: `app/api/notifications/test-email/route.ts`
- Requires token in production:
  - Header `Authorization: Bearer <TEST_EMAIL_TOKEN>` or
  - Header `x-test-email-token: <TEST_EMAIL_TOKEN>`
- If `TEST_EMAIL_TOKEN` is not set, endpoint stays open only in non-production.

3. Third-party logo dependency removed
- External `logo.clearbit.com` removed.
- Client logos now local static assets:
  - `public/images/clients/*`
- Data source:
  - `lib/data/clients.ts`

4. Next image host restrictions tightened
- File: `next.config.ts`
- Removed unused `logo.clearbit.com` host.

### Launch Checklist (Use Before Going Live)

1. Rotate all exposed secrets now:
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `SMTP_PASS`

2. Set production env values:
- `MAIL_PROVIDER=resend`
- `RESEND_API_KEY=...`
- `RESEND_FROM=...` (verified sender/domain)
- `ADMIN_NOTIFY_EMAIL=...`
- `TEST_EMAIL_TOKEN=...` (required for production test route)

3. Build and run production mode:
```bash
npm run build
npm run start
```

4. Verify critical routes:
- `/`
- `/contact`
- `/portfolio`
- `/login`
- `/dashboard`
- `/admin/dashboard`

5. Verify emails:
- Submit contact form once
- Call test endpoint with token (production only)

6. Optional cleanup:
- Disable or remove `/api/notifications/test-email` after launch.
