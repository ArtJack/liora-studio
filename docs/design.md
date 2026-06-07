# Liora Studio — Design (SDD)

> How the system meets [requirements.md](requirements.md).

## 1. Architecture
```
 Shopper ─▶ Next.js App Router (RSC + client islands)
                    │  Prisma ORM
                    ▼
            libSQL / Turso  (Category, Product, ProductImage, Review, Offer, ProductView)
                    ▲
 Admin ──▶ /admin (TOTP 2FA gate) ─▶ CMS mutations
```
Deployed on Vercel; database on Turso (or a local SQLite file in dev).

## 2. Key design decisions
1. **TOTP 2FA on admin, not just a password.** A real second factor on the only privileged surface —
   the difference between a portfolio toy and something that respects production security.
2. **Prisma as the single schema source of truth.** Six clean relational models; migrations are
   versioned, the seed is synthetic and reproducible.
3. **libSQL/Turso for portability.** Same code runs on a managed edge DB in prod and a local file in dev.
4. **App Router + server components.** Catalog rendering is server-side for speed/SEO; interactive
   bits (cart, Buy Now) are client islands.
5. **Conversion features as first-class.** Stock badges, Buy Now, care guide, and mystery-box flow
   are built in — the storefront is designed to *sell*, not just display.

## 3. Components
- **Storefront** — category + product pages, galleries, reviews, offers.
- **Admin CMS** — product/category/image/offer management behind the TOTP gate.
- **Data layer** — Prisma models + synthetic seed (`prisma/seed.ts`).
- **Analytics** — `ProductView` records for merchandising.

## 4. Testing / quality
- Synthetic seed makes the app runnable and reviewable without any real data.
- Schema-level integrity via Prisma relations + migrations.
