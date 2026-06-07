# Liora Studio — luxury jewelry storefront + admin CMS

A full-stack e-commerce storefront for a (fictional) luxury jewelry brand: a polished shopping
front end, a product catalog with reviews and offers, conversion features, and a **secured admin
CMS protected by TOTP two-factor authentication**.

**Stack:** Next.js (App Router) · Prisma ORM over libSQL/Turso · TypeScript · Tailwind CSS · Vercel.

📐 **[Requirements](docs/requirements.md)** · **[Design](docs/design.md)**

## Features
- **Storefront** — category browsing (rings, earrings, brooches, necklaces, bracelets), product
  detail pages with image galleries, customer reviews, and promotional offers.
- **Conversion-focused UX** — stock-availability badges, "Buy Now" flow, care-guide content, and a
  "mystery box" purchase flow.
- **Admin CMS** — manage products, categories, images, and offers behind an authenticated admin area.
- **TOTP 2-factor auth** — admin login is protected by time-based one-time passwords, not just a password.
- **Product-view analytics** — a `ProductView` model records interest for merchandising decisions.

## Data model (Prisma)
`Category` · `Product` · `ProductImage` · `Review` · `Offer` · `ProductView` — a clean relational
catalog. The repo ships a **synthetic seed** (fictional brand, no real data).

## Getting started
```bash
npm install
cp .env.example .env          # fill in DATABASE_URL, TOTP_SECRET, TURSO_AUTH_TOKEN
npx prisma migrate dev        # set up the schema
npm run seed                  # load the synthetic catalog
npm run dev                   # http://localhost:3000
```

## Environment
| Var | Purpose |
|---|---|
| `DATABASE_URL` | libSQL / Turso database URL |
| `TURSO_AUTH_TOKEN` | Turso auth token (omit for a local SQLite file) |
| `TOTP_SECRET` | server-side secret for admin TOTP 2FA |
| `NODE_ENV` | `development` / `production` |

All secrets are git-ignored (`.env*`); only `.env.example` is committed.

## Notes
This is a portfolio build — the brand and all catalog data are fictional, the seed is synthetic,
and no real customer or payment data exists in the project.
