export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Sparkles, Star, ShieldCheck } from "lucide-react";


const categories = [
  { name: "Rings", slug: "rings", description: "Elegant statements" },
  { name: "Earrings", slug: "earrings", description: "Everyday sparkle" },
  { name: "Necklaces", slug: "necklaces", description: "Layered beauty" },
  { name: "Bracelets", slug: "bracelets", description: "Wrist adornments" },
  { name: "Brooches", slug: "brooches", description: "Timeless accents" },
  { name: "Anklets", slug: "anklets", description: "Subtle charm" },
];

const editorialMoments = [
  {
    eyebrow: "Collector's Eye",
    title: "The strongest jewelry leaves an impression before it asks for attention.",
    body:
      "We favor pieces with clean proportion, tactile finish, and real wear value, so the collection feels composed whether you choose one accent or build a full stack.",
    note: "Rings, chains, earrings, pearls",
  },
  {
    eyebrow: "Material Standard",
    title: "Gold-tone, silver-tone, pearls, and stones selected for clarity, tone, and presence.",
    body:
      "Our edit is built around plated finishes and decorative stones that feel polished in the hand and refined on the body: balanced settings, clean color, and finish-led design.",
    note: "Plated finish, balanced setting, lasting style",
  },
];

const servicePillars = [
  {
    title: "Curated Edit",
    copy: "Every listing earns its place through proportion, finish, and long-term wearability rather than trend volume.",
    icon: Sparkles,
  },
  {
    title: "Material Confidence",
    copy: "Every piece is inspected before shipping, with plated-finish materials and decorative details described clearly from the start.",
    icon: ShieldCheck,
  },
  {
    title: "Measured Pricing",
    copy: "Direct sourcing keeps the collection elevated without relying on inflated retail markups or unnecessary middle layers.",
    icon: Star,
  },
];

export default async function HomePage() {
  const [featuredProducts, recentProducts] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
      take: 8,
    }),
    prisma.product.findMany({
      include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
      orderBy: { updatedAt: "desc" },
      take: 4,
    }),
  ]);

  return (
    <>
      <section className="relative overflow-hidden px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="grain-overlay section-shell surface-panel mx-auto max-w-7xl overflow-hidden rounded-[36px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-accent-light)_42%,transparent),transparent_32%),linear-gradient(135deg,color-mix(in_srgb,var(--color-foreground)_96%,transparent),color-mix(in_srgb,var(--color-foreground)_88%,var(--color-accent-dark)))]" />
          <div className="relative grid gap-10 px-5 py-12 sm:px-10 sm:py-18 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:px-16 lg:py-24">
            <div className="max-w-2xl animate-fade-up">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-background/55">
                Jewelry Collection
              </p>
              <h2 className="font-display text-4xl leading-[0.94] tracking-tight text-background sm:text-6xl lg:text-8xl">
                Jewelry with presence, polish, and lasting style.
              </h2>
              <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-background/70 sm:text-lg">
                A focused collection of rings, earrings, necklaces, bracelets, brooches, and anklets selected for finish, styling value, and quiet impact.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-foreground shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-background/92"
                >
                  Explore Jewelry
                  <ArrowRight size={16} />
                </Link>
                <p className="text-sm uppercase tracking-[0.18em] text-background/55">
                  Curated, clearly described, ready to wear
                </p>
              </div>
            </div>

            <div className="grid content-end gap-4 self-stretch lg:pl-8">
              <div className="animate-slide-right rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.3em] text-background/45">Studio Note</p>
                <p className="font-display mt-4 text-[1.9rem] leading-tight text-background sm:text-3xl">
                  Chosen for how it catches light, sits on the body, and keeps its character over time.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-scale-in delay-100 rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.28em] text-background/45">Drops</p>
                  <p className="mt-3 text-3xl font-light text-background">12</p>
                  <p className="mt-1 text-sm text-background/60">new pieces this month</p>
                </div>
                <div className="animate-scale-in delay-200 rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.28em] text-background/45">Finishes</p>
                  <p className="mt-3 text-3xl font-light text-background">Plated</p>
                  <p className="mt-1 text-sm text-background/60">clearly described selection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-xs uppercase tracking-[0.3em] text-muted">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className={`group surface-panel rounded-[30px] p-6 sm:p-8 animate-fade-up delay-${(index + 1) * 100} transition-all hover:-translate-y-1`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted">{cat.description}</p>
              <h3 className="font-display mt-3 text-3xl leading-none text-foreground transition-colors group-hover:text-accent sm:text-4xl">
                {cat.name}
              </h3>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted/60 transition-colors group-hover:text-accent/60">
                Shop now &rarr;
              </p>
            </Link>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="content-band px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-muted">Featured</h2>
                <p className="font-display mt-3 max-w-xl text-4xl leading-tight text-foreground sm:text-[2.7rem]">
                  Signature pieces chosen for line, finish, and collector appeal.
                </p>
              </div>
              <Link
                href="/shop"
                className="hidden items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground sm:flex"
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
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground sm:hidden"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      )}

      {recentProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="content-band px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="mb-10 flex items-end justify-between gap-6">
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-muted">Recent Arrivals</h2>
                <p className="font-display mt-3 max-w-xl text-4xl leading-tight text-foreground sm:text-[2.7rem]">
                  Newly added pieces from the latest studio selection.
                </p>
              </div>
              <Link
                href="/shop"
                className="hidden items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground sm:flex"
              >
                Browse Shop <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
              {recentProducts.map((product) => (
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
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground sm:hidden"
            >
              Browse Shop <ArrowRight size={12} />
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="section-shell surface-panel rounded-[34px] p-8 sm:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">Editorial Notes</p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight text-foreground sm:text-5xl">
              Styling that feels resolved before it feels excessive.
            </h2>
            <div className="mt-10 grid gap-6">
              {editorialMoments.map((moment) => (
                <div
                  key={moment.title}
                  className="rounded-[26px] border border-border/70 bg-background/30 p-6"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-muted">{moment.eyebrow}</p>
                  <h3 className="font-display mt-3 text-3xl leading-tight text-foreground">
                    {moment.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{moment.body}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent">{moment.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="surface-panel rounded-[34px] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Service Pillars</p>
              <div className="mt-8 space-y-5">
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

            <div className="grain-overlay overflow-hidden rounded-[34px] border border-border/70 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-accent-light)_16%,var(--color-surface)),color-mix(in_srgb,var(--color-background)_88%,black))] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Collector Journal</p>
              <h3 className="font-display mt-4 text-4xl leading-tight text-foreground">
                New arrivals, sourcing notes, and jewelry guidance worth opening.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                Short, visual updates with new pieces, finishing notes, and first access to limited drops before they circulate widely.
              </p>
              <form className="mt-8 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-13 flex-1 rounded-full border border-border/70 bg-background/55 px-5 text-sm outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="inline-flex h-13 items-center justify-center rounded-full bg-foreground px-7 text-sm uppercase tracking-[0.18em] text-background shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-foreground/92"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs leading-6 text-muted">
                No noise. Just considered updates from LIORA STUDIO.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="section-shell surface-panel mx-auto max-w-7xl rounded-[34px] px-6 py-20 text-center sm:px-10">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted">The LIORA Promise</p>
          <h2 className="font-display mx-auto max-w-xl text-4xl leading-tight lg:text-5xl">
            Every piece is inspected, clearly described, and chosen to feel elevated rather than disposable.
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-12 text-sm text-muted">
            <div className="text-center">
              <p className="font-medium text-foreground">Authenticated</p>
              <p className="mt-1 text-xs">100% verified</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Free Shipping</p>
              <p className="mt-1 text-xs">On orders over $500</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Easy Returns</p>
              <p className="mt-1 text-xs">14-day policy</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground">Secure</p>
              <p className="mt-1 text-xs">Encrypted checkout</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
