# Liora Studio — Requirements (SDD)

> Spec-driven development artifact: *what* and *why*. See [design.md](design.md).

## 1. Purpose
A production-quality e-commerce storefront + admin CMS for a luxury jewelry brand, demonstrating
full-stack product development with a secured admin area.

## 2. Users
- **Shoppers** — browse the catalog, read reviews, view offers, start a purchase.
- **Admin** — manage products, categories, images, and offers behind 2FA-protected auth.

## 3. Functional requirements
- **FR-1** Browse products by category, with image galleries and detail pages.
- **FR-2** Show customer reviews and promotional offers per product.
- **FR-3** Conversion features: stock-availability badges, Buy Now, care guide, mystery-box flow.
- **FR-4** Admin CMS to create/update products, categories, images, and offers.
- **FR-5** Track product views for merchandising insight.
- **FR-6** Authenticated admin area protected by **TOTP two-factor authentication**.

## 4. Non-functional requirements
- **NFR-1 Security.** Admin protected by TOTP 2FA, not just a password; all secrets in env, never committed.
- **NFR-2 Performance/UX.** Fast App-Router rendering, responsive, polished visual design.
- **NFR-3 Portability.** Runs on libSQL/Turso in prod or a local SQLite file in dev.
- **NFR-4 No real data.** Brand + catalog fictional; seed is synthetic; no customer/payment data.

## 5. Out of scope
- Real payment processing / live checkout. Multi-vendor marketplace.

## 6. Acceptance criteria
- Storefront browses a seeded synthetic catalog end-to-end. ✓
- Admin actions require a valid TOTP code. ✓
- No secrets or real data committed. ✓
