export const revalidate = 120;

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Sparkles, Star, ShieldCheck, Package, Truck, RotateCcw, Lock } from "lucide-react";
import { getHomePageData } from "@/lib/storefront-data";


const categories = [
  { name: "Rings", slug: "rings", description: "Elegant statements", image: "/images/products/rings.png" },
  { name: "Earrings", slug: "earrings", description: "Everyday sparkle", image: "/images/products/earrings.png" },
  { name: "Necklaces", slug: "necklaces", description: "Layered beauty", image: "/images/products/necklace.png" },
  { name: "Bracelets", slug: "bracelets", description: "Wrist adornments", image: "/images/products/bracelet.png" },
  { name: "Brooches", slug: "brooches", description: "Timeless accents", image: "/images/products/brooche.png" },
  { name: "Mystery Box", slug: "gift-sets", description: "Surprise picks", image: "/images/products/mystery.png" },
];

const servicePillars = [
  {
    title: "Curated Edit",
    copy: "Every listing earns its place through proportion, finish, and long-term wearability.",
    icon: Sparkles,
  },
  {
    title: "Material Confidence",
    copy: "Every piece is inspected before shipping, with materials and details described clearly.",
    icon: ShieldCheck,
  },
  {
    title: "Measured Pricing",
    copy: "Direct sourcing keeps the collection elevated without inflated retail markups.",
    icon: Star,
  },
];

const trustBadges = [
  { icon: Truck, title: "Free Shipping", sub: "orders over $500" },
  { icon: RotateCcw, title: "Easy Returns", sub: "14-day policy" },
  { icon: Package, title: "Inspected", sub: "before shipping" },
  { icon: Lock, title: "Secure", sub: "encrypted checkout" },
];

export default async function HomePage() {
  const { featuredProducts, totalProducts } = await getHomePageData();

  return (
    <>
      {/* ─── 1. Hero ─── */}
      <section className="relative overflow-hidden px-3 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <div className="grain-overlay section-shell surface-panel mx-auto max-w-7xl overflow-hidden rounded-[36px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-accent-light)_42%,transparent),transparent_32%),linear-gradient(135deg,color-mix(in_srgb,var(--color-foreground)_96%,transparent),color-mix(in_srgb,var(--color-foreground)_88%,var(--color-accent-dark)))]" />
          <div className="relative grid gap-6 px-5 py-8 sm:gap-10 sm:px-10 sm:py-18 lg:grid-cols-[minmax(0,1.1fr)_400px] lg:px-16 lg:py-20">
            <div className="max-w-2xl animate-fade-up">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-background/55 sm:text-xs sm:tracking-[0.4em]">
                <span className="sm:hidden">New Collection</span>
                <span className="hidden sm:inline">Jewelry Collection</span>
              </p>
              <h2 className="font-display text-[2.65rem] leading-[0.94] tracking-tight text-background sm:text-6xl lg:text-8xl">
                Jewelry with presence, polish, and lasting style.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed text-background/70 sm:mt-5 sm:text-lg">
                Rings, earrings, necklaces, bracelets, and brooches — selected for finish, styling value, and quiet impact.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-7 py-3 text-sm uppercase tracking-[0.18em] text-foreground shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-background/92 sm:px-8 sm:py-3.5"
                >
                  Shop Now
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/shop?category=gift-sets"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm uppercase tracking-[0.18em] text-background/80 backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/14 sm:px-7 sm:py-3.5"
                >
                  <Package size={15} />
                  Mystery Box
                </Link>
              </div>
            </div>

            <div className="grid content-end gap-3 self-stretch lg:pl-4">
              {/* Hero product preview (desktop) */}
              <div className="animate-slide-right hidden gap-3 lg:grid lg:grid-cols-2">
                {featuredProducts.slice(0, 2).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-white/6 backdrop-blur-md"
                  >
                    <div className="relative aspect-square">
                      {product.images[0]?.url && (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="190px"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="text-[10px] uppercase tracking-wider text-white/60">{product.category.name}</p>
                        <p className="mt-0.5 text-sm font-light leading-tight text-white line-clamp-1">{product.name}</p>
                        <p className="mt-1 text-sm text-white/80">${product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="animate-scale-in delay-100 rounded-[20px] border border-white/10 bg-white/6 p-4 backdrop-blur-md sm:rounded-[24px] sm:p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-background/45">Pieces</p>
                  <p className="mt-2 text-[1.8rem] font-light leading-none text-background sm:mt-3 sm:text-3xl">{totalProducts}</p>
                  <p className="mt-1 text-xs leading-snug text-background/60 sm:text-sm">in the collection</p>
                </div>
                <div className="animate-scale-in delay-200 rounded-[20px] border border-white/10 bg-white/6 p-4 backdrop-blur-md sm:rounded-[24px] sm:p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-background/45">Shipping</p>
                  <p className="mt-2 text-[1.8rem] font-light leading-none text-background sm:mt-3 sm:text-3xl">Free</p>
                  <p className="mt-1 text-xs leading-snug text-background/60 sm:text-sm">on orders over $500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. Trust badges (mobile) ─── */}
      <section className="mx-auto max-w-7xl px-3 pt-4 sm:px-6 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {trustBadges.map((badge) => (
            <div key={badge.title} className="surface-panel flex min-w-[8.5rem] flex-1 items-center gap-2.5 rounded-[18px] px-3.5 py-3">
              <badge.icon size={16} className="shrink-0 text-accent" />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-foreground">{badge.title}</p>
                <p className="text-[10px] text-muted">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. Shop by Category ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
        <h2 className="mb-7 text-center text-xs uppercase tracking-[0.3em] text-muted sm:mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className={`group surface-panel relative overflow-hidden rounded-[26px] animate-fade-up delay-${(index + 1) * 100} transition-all hover:-translate-y-1 sm:rounded-[30px]`}
            >
              <div className="relative aspect-[0.92]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,6,0.08)_0%,rgba(9,7,6,0.22)_30%,rgba(9,7,6,0.72)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/72 sm:text-xs sm:tracking-[0.3em]">{cat.description}</p>
                  <h3 className="font-display mt-2 text-[1.9rem] leading-none text-white transition-colors group-hover:text-white/88 sm:text-4xl">
                    {cat.name}
                  </h3>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/70 sm:mt-4 sm:text-xs">
                    Shop now &rarr;
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── 4. Featured Products ─── */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="content-band px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted">Featured Pieces</h2>
              <Link
                href="/shop"
                className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  name={product.name}
                  price={product.price}
                  comparePrice={product.comparePrice}
                  image={product.images[0]?.url}
                  category={product.category.name}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 5. Mystery Box Promo ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <Link
          href="/shop?category=gift-sets"
          className="grain-overlay group relative block overflow-hidden rounded-[30px] border border-border/70 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-accent-light)_16%,var(--color-surface)),color-mix(in_srgb,var(--color-background)_88%,black))] transition-all hover:-translate-y-1 sm:rounded-[34px]"
        >
          <div className="grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14 lg:py-12">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Best Seller</p>
              <h2 className="font-display mt-3 text-[2rem] leading-[1.06] text-foreground sm:text-[2.8rem]">
                Mystery Box
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted sm:text-base sm:leading-7">
                A surprise selection of curated LIORA STUDIO pieces. Packed for gifting or self-treating — always worth more than the price.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent group-hover:text-foreground sm:text-sm">
                Shop Mystery Boxes <ArrowRight size={14} />
              </div>
            </div>
            <div className="hidden lg:flex lg:gap-3">
              <div className="h-32 w-32 rounded-[20px] border border-border/50 bg-background/20 p-2">
                <div className="relative h-full w-full overflow-hidden rounded-[14px]">
                  <Image
                    src="/images/products/jewelry-mystery-bag.jpg"
                    alt="Mystery Box"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* ─── 6. Why LIORA + Trust (desktop) ─── */}
      <section className="mx-auto hidden max-w-7xl px-4 pb-20 sm:px-6 lg:block lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="section-shell surface-panel rounded-[34px] p-8 sm:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">Why LIORA</p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight text-foreground sm:text-5xl">
              A tighter, clearer way to shop statement jewelry.
            </h2>
            <div className="mt-10 space-y-5">
              {servicePillars.map((pillar) => (
                <div key={pillar.title} className="rounded-[24px] border border-border/70 bg-background/25 p-5">
                  <div className="flex items-center gap-3">
                    <pillar.icon size={18} className="text-accent" />
                    <h3 className="font-display text-2xl leading-none">{pillar.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">{pillar.copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-shell surface-panel rounded-[34px] px-6 py-10 text-center sm:px-10">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted">The LIORA Promise</p>
            <h2 className="font-display mx-auto max-w-md text-4xl leading-tight">
              Every piece is inspected, clearly described, and chosen to last.
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.title} className="rounded-[20px] border border-border/70 bg-background/25 px-4 py-5 text-center">
                  <badge.icon size={20} className="mx-auto text-accent" />
                  <p className="mt-2 text-sm font-medium text-foreground">{badge.title}</p>
                  <p className="mt-1 text-xs text-muted">{badge.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6b. Why LIORA (mobile) ─── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:hidden">
        <div className="section-shell surface-panel rounded-[30px] px-5 py-7">
          <p className="text-xs uppercase tracking-[0.34em] text-muted">Why LIORA</p>
          <h2 className="font-display mt-4 text-[2rem] leading-[1.06] text-foreground">
            A tighter, clearer way to shop jewelry.
          </h2>
          <div className="mt-5 space-y-3">
            {servicePillars.map((pillar) => (
              <div key={pillar.title} className="flex items-start gap-3 rounded-[16px] border border-border/70 bg-background/30 p-4">
                <pillar.icon size={16} className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">{pillar.title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted">{pillar.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
