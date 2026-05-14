export const revalidate = 60;

import { notFound } from "next/navigation";
import { ProductGallery } from "./gallery";
import { AddToCartButton } from "./add-to-cart";
import { MysteryBoxPurchase } from "./mystery-box-purchase";
// import { MakeOfferForm } from "./make-offer-form";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { ViewTracker } from "./view-tracker";
import { getProductPageData, getRelatedProducts } from "@/lib/storefront-data";
import { prisma } from "@/lib/db";
import { ReviewSection } from "./reviews";
import { ArrowRight, Check, Gift, ShieldCheck, Sparkles, Star } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await getProductPageData(slug);

  if (!product) notFound();

  const sizes = product.sizes ? product.sizes.split(",").map((s) => s.trim()) : [];
  const colors = product.colors ? product.colors.split(",").map((c) => c.trim()) : [];
  const isMysteryBox = product.slug === "jewelry-mystery-bag";
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      : 0;

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <ViewTracker productId={product.id} />
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted sm:text-xs">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category.slug}`} className="hover:text-foreground">
          {product.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="surface-panel rounded-[32px] px-6 py-7 lg:px-8 lg:py-8">
          <p className="text-xs uppercase tracking-[0.26em] text-muted">{product.category.name}</p>
          <h1 className="mt-3 text-[2rem] leading-tight font-light lg:text-4xl">{product.name}</h1>

          <div className="mt-5 flex items-center gap-3">
            <p className="text-xl">${product.price.toLocaleString()}</p>
            {product.comparePrice && product.comparePrice > product.price && (
              <p className="text-lg text-muted line-through">
                ${product.comparePrice.toLocaleString()}
              </p>
            )}
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-green-800 dark:bg-green-900 dark:text-green-300">
                Save {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}%
              </span>
            )}
          </div>

          {product.inStock && (
            <div className="mt-3 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs text-green-700 dark:text-green-400">In stock — ready to ship</span>
            </div>
          )}

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted">{product.description}</p>
            {isMysteryBox && (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Designed as a curated surprise purchase: you choose the finish direction, we assemble a studio-selected mix with a higher retail value than the selling price.
              </p>
            )}
          </div>

          {(product.material || product.gemstone || product.weight) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {product.material && (
                <span className="rounded-full border border-border/70 bg-background/25 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-muted">
                  {product.material}
                </span>
              )}
              {product.gemstone && (
                <span className="rounded-full border border-border/70 bg-background/25 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-muted">
                  {product.gemstone}
                </span>
              )}
              {product.weight && (
                <span className="rounded-full border border-border/70 bg-background/25 px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-muted">
                  {product.weight}g
                </span>
              )}
            </div>
          )}

          {isMysteryBox ? (
            <MysteryBoxPurchase
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0]?.url ?? "",
              }}
              inStock={product.inStock}
            />
          ) : (
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0]?.url ?? "",
              }}
              sizes={sizes}
              colors={colors}
              inStock={product.inStock}
            />
          )}

          {/* <MakeOfferForm productId={product.id} listPrice={product.price} /> */}

          <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <div className="rounded-[24px] border border-border/70 bg-background/25 p-5 text-sm">
              <p className="mb-1 font-medium">Shipping</p>
              <p className="text-muted">
                Free shipping on orders over $500. Standard delivery 3-5 business days.
              </p>
            </div>
            <div className="rounded-[24px] border border-border/70 bg-background/25 p-5 text-sm">
              <p className="mb-1 font-medium">{isMysteryBox ? "Mystery Box Terms" : "Returns"}</p>
              <p className="text-muted">
                {isMysteryBox
                  ? "Each edit is selected as a surprise assortment. Preference notes are considered, but exact-piece outcomes are not guaranteed."
                  : "Free returns within 14 days of delivery. Items must be unworn with tags attached."}
              </p>
            </div>
          </div>

          <div className="mt-5 text-sm">
            <Link href="/care" className="text-accent transition-colors hover:text-foreground">
              Read the jewelry care guide
            </Link>
          </div>

          <ReviewSection
            productId={product.id}
            productSlug={product.slug}
            reviews={product.reviews.map((review) => ({
              ...review,
              createdAt: review.createdAt.toISOString(),
            }))}
            averageRating={averageRating}
          />
        </div>
      </div>

      {isMysteryBox && (
        <>
          <section className="mt-18">
            <div className="content-band overflow-hidden px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">How It Works</p>
                  <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
                    A mystery format, but still clearly guided.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                    This should feel surprising, not risky. You choose a finish direction and leave an optional note, then LIORA assembles a polished mix designed to feel giftable, wearable, and worth more than the ticket price.
                  </p>
                  <div className="mt-6 grid gap-4">
                    {[
                      {
                        title: "Choose your finish",
                        copy: "Gold-tone, silver-tone, or a mixed edit depending on how open you want the surprise to feel.",
                        icon: Sparkles,
                      },
                      {
                        title: "Leave a style note",
                        copy: "Helpful guidance like no earrings, delicate styling, or gift recipient preferences can be used while packing.",
                        icon: Gift,
                      },
                      {
                        title: "Receive a curated reveal",
                        copy: "Every bag is intentionally assembled rather than auto-packed, so it still feels chosen.",
                        icon: ShieldCheck,
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-[24px] border border-border/70 bg-background/25 p-5">
                        <div className="flex items-start gap-3">
                          <item.icon size={18} className="mt-1 text-accent" />
                          <div>
                            <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                            <p className="mt-1 text-sm leading-6 text-muted">{item.copy}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-2">
                  {[
                    {
                      src: "/images/products/gold-hoop-earrings.jpg",
                      title: "Everyday shine",
                      copy: "Pieces that feel easy to wear and easy to gift.",
                    },
                    {
                      src: "/images/products/diamond-pendant-necklace.jpg",
                      title: "Layerable accents",
                      copy: "Looks that add polish without needing a full set.",
                    },
                    {
                      src: "/images/products/crystal-flower-brooch.jpg",
                      title: "Statement moments",
                      copy: "A chance to receive something bolder in the mix.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="surface-panel overflow-hidden rounded-[26px] p-2">
                      <div className="relative aspect-[0.86] overflow-hidden rounded-[22px]">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 50vw, 18vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="mt-1 text-xs leading-5 text-white/75">{item.copy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-[26px] border border-border/70 bg-background/25 p-5 sm:col-span-3 lg:col-span-2">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted">Worth Noting</p>
                    <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
                      {[
                        "This is a surprise-format product, so exact pieces are not previewed or guaranteed.",
                        "Preference notes are used as guidance wherever possible, but the mix remains curated rather than custom-built.",
                        "Mystery purchases are best for customers open to discovery and styling variety.",
                      ].map((rule) => (
                        <li key={rule} className="flex gap-3">
                          <Check size={15} className="mt-1 shrink-0 text-accent" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="content-band px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted">Why It Works</p>
                  <h2 className="font-display mt-3 text-3xl leading-tight sm:text-4xl">
                    Clear value, but still a reveal.
                  </h2>
                </div>
                <Link
                  href="/care"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-accent hover:text-foreground"
                >
                  Care Guide <ArrowRight size={13} />
                </Link>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Value Promise",
                    copy: "Every mystery bag is assembled to exceed the selling price in total retail value.",
                    icon: Star,
                  },
                  {
                    title: "Plated Materials",
                    copy: "Pieces are drawn from LIORA’s plated jewelry assortment with decorative stones and mixed finish options.",
                    icon: Sparkles,
                  },
                  {
                    title: "Gift-Friendly",
                    copy: "A strong fit for birthdays, self-gifting, and customers who want discovery without browsing the whole catalog.",
                    icon: Gift,
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[26px] border border-border/70 bg-background/20 p-5">
                    <item.icon size={18} className="text-accent" />
                    <h3 className="mt-4 text-lg font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="content-band px-6 py-8 sm:px-8 sm:py-10">
            <h2 className="mb-8 text-xs uppercase tracking-[0.3em] text-muted">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  price={p.price}
                  comparePrice={p.comparePrice}
                  image={p.images[0]?.url}
                  category={p.category.name}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
