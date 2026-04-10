export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductGallery } from "./gallery";
import { AddToCartButton } from "./add-to-cart";
import { MakeOfferForm } from "./make-offer-form";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      category: true,
    },
  });

  if (!product) notFound();

  const sizes = product.sizes ? product.sizes.split(",").map((s) => s.trim()) : [];
  const colors = product.colors ? product.colors.split(",").map((c) => c.trim()) : [];

  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
    take: 4,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted">
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

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="surface-panel rounded-[32px] px-6 py-7 lg:px-8 lg:py-8">
          <p className="text-xs uppercase tracking-[0.26em] text-muted">{product.category.name}</p>
          <h1 className="mt-3 text-3xl font-light lg:text-4xl">{product.name}</h1>

          <div className="mt-5 flex items-center gap-3">
            <p className="text-xl">${product.price.toLocaleString()}</p>
            {product.comparePrice && product.comparePrice > product.price && (
              <p className="text-lg text-muted line-through">
                ${product.comparePrice.toLocaleString()}
              </p>
            )}
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm leading-relaxed text-muted">{product.description}</p>
          </div>

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

          <MakeOfferForm productId={product.id} listPrice={product.price} />

          <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <div className="rounded-[24px] border border-border/70 bg-background/25 p-5 text-sm">
              <p className="mb-1 font-medium">Shipping</p>
              <p className="text-muted">
                Free shipping on orders over $500. Standard delivery 3-5 business days.
              </p>
            </div>
            <div className="rounded-[24px] border border-border/70 bg-background/25 p-5 text-sm">
              <p className="mb-1 font-medium">Returns</p>
              <p className="text-muted">
                Free returns within 14 days of delivery. Items must be unworn with tags attached.
              </p>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-xs uppercase tracking-[0.3em] text-muted">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:gap-x-6">
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
        </section>
      )}
    </div>
  );
}
