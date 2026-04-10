export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Sparkles, Star, ShieldCheck } from "lucide-react";


import Image from "next/image";

const categories = [
  { name: "Clothing", slug: "clothing", description: "Timeless silhouettes", image: "/images/products/cashmere-oversized-sweater.png" },
  { name: "Bags", slug: "bags", description: "Iconic accessories", image: "/images/products/classic-leather-tote.png" },
  { name: "Shoes", slug: "shoes", description: "Artisan craftsmanship", image: "/images/products/suede-ankle-boots.jpg" },
  { name: "Jewelry", slug: "jewelry", description: "Refined elegance", image: "/images/products/diamond-stud-earrings.jpg" },
];
const categoryVisualClasses: Record<string, string> = {
  clothing: "text-stone-700 dark:text-stone-200",
  bags: "text-amber-900 dark:text-amber-200",
  shoes: "text-zinc-700 dark:text-zinc-200",
  jewelry: "text-stone-600 dark:text-stone-200",
};

const editorialMoments = [
  {
    eyebrow: "Wardrobe Direction",
    title: "Build a quieter wardrobe with fewer, sharper decisions.",
    body:
      "We focus on pieces with strong line, tactile finish, and repeat wear value, so the collection feels styled before you even reach for accessories.",
    note: "Tailoring, soft structure, neutral depth",
  },
  {
    eyebrow: "Accessory Focus",
    title: "Let one sculptural piece carry the room.",
    body:
      "Whether it is a polished tote, a sharp pump, or a clean gold layer, the right object should anchor the look rather than compete with it.",
    note: "Bags, heels, jewelry with presence",
  },
];

const servicePillars = [
  {
    title: "Editorial Curation",
    copy: "Every product is selected to feel cohesive across the full collection rather than dropped in at random.",
    icon: Sparkles,
  },
  {
    title: "Authenticity First",
    copy: "Verification sits at the center of the buying experience, so confidence is built into every order.",
    icon: ShieldCheck,
  },
  {
    title: "Lasting Appeal",
    copy: "We favor finish, proportion, and material quality over trend-chasing pieces that expire after one season.",
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
      <section className="relative overflow-hidden px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grain-overlay section-shell surface-panel mx-auto max-w-7xl overflow-hidden rounded-[36px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_srgb,var(--color-accent-light)_42%,transparent),transparent_32%),linear-gradient(135deg,color-mix(in_srgb,var(--color-foreground)_96%,transparent),color-mix(in_srgb,var(--color-foreground)_88%,var(--color-accent-dark)))]" />
          <div className="relative grid gap-14 px-6 py-18 sm:px-10 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:px-16 lg:py-24">
            <div className="max-w-2xl animate-fade-up">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-background/55">
                New Collection 2026
              </p>
              <h2 className="font-display text-5xl leading-[0.92] tracking-tight text-background sm:text-6xl lg:text-8xl">
                Refined luxury for the quietly unforgettable.
              </h2>
              <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-background/70">
                Discover a tighter, more editorial take on luxury fashion with sculptural bags,
                tailored silhouettes, and jewelry chosen for presence rather than noise.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-3.5 text-sm uppercase tracking-[0.18em] text-foreground shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-background/92"
                >
                  Explore Collection
                  <ArrowRight size={16} />
                </Link>
                <p className="text-sm uppercase tracking-[0.18em] text-background/55">
                  Curation, authentication, delivery
                </p>
              </div>
            </div>

            <div className="grid content-end gap-4 self-stretch lg:pl-8">
              <div className="animate-slide-right rounded-[28px] border border-white/10 bg-white/8 p-6 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.3em] text-background/45">Studio Note</p>
                <p className="font-display mt-4 text-3xl leading-tight text-background">
                  Pieces selected for texture, restraint, and lasting wear.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="animate-scale-in delay-100 rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.28em] text-background/45">Drops</p>
                  <p className="mt-3 text-3xl font-light text-background">12</p>
                  <p className="mt-1 text-sm text-background/60">new arrivals this month</p>
                </div>
                <div className="animate-scale-in delay-200 rounded-[24px] border border-white/10 bg-white/6 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.28em] text-background/45">Finish</p>
                  <p className="mt-3 text-3xl font-light text-background">A+</p>
                  <p className="mt-1 text-sm text-background/60">authenticated selection</p>
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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className={`group surface-panel relative aspect-[4/5] overflow-hidden rounded-[30px] p-3 animate-fade-up delay-${(index + 1) * 100}`}
            >
              <div
                className={`absolute inset-3 overflow-hidden rounded-[24px] ${
                  categoryVisualClasses[cat.slug] ?? "text-stone-700 dark:text-stone-200"
                }`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={index < 2}
                  className="object-cover opacity-100 saturate-[1.05] transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_42%,rgba(17,14,12,0.18)_65%,rgba(17,14,12,0.72)_100%)]" />
                <div className="absolute inset-x-4 top-4 h-px bg-white/30" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{cat.description}</p>
                  <h3 className="font-display mt-2 text-2xl font-normal transition-transform group-hover:translate-x-1">{cat.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted">Featured</h2>
              <p className="font-display mt-3 max-w-xl text-4xl leading-tight text-foreground">
                Standout pieces chosen for silhouette, finish, and permanence.
              </p>
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
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
        </section>
      )}

      {recentProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-[0.3em] text-muted">Recent Arrivals</h2>
              <p className="font-display mt-3 max-w-xl text-4xl leading-tight text-foreground">
                Newly added pieces, straight from the latest studio update.
              </p>
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground"
            >
              Browse Shop <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:gap-x-6">
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
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="section-shell surface-panel rounded-[34px] p-8 sm:p-10 lg:p-12">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">Editorial Notes</p>
            <h2 className="font-display mt-4 max-w-2xl text-4xl leading-tight text-foreground sm:text-5xl">
              Styling that feels deliberate before it feels loud.
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
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Client Journal</p>
              <h3 className="font-display mt-4 text-4xl leading-tight text-foreground">
                Receive edits, arrivals, and styling notes worth opening.
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted">
                Our letters are brief, visual, and selective. Expect curated product drops,
                wardrobe direction, and first look access to limited arrivals.
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
            Every piece is carefully authenticated and curated for exceptional quality.
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
