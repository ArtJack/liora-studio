import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "./filters";

type Props = {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const { category, sort, q } = params;

  const where: Record<string, unknown> = {};
  if (category) {
    where.category = { slug: category };
  }
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
    ];
  }

  type OrderBy = Record<string, "asc" | "desc">;
  let orderBy: OrderBy = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  else if (sort === "price-desc") orderBy = { price: "desc" };
  else if (sort === "name") orderBy = { name: "asc" };

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="surface-panel mb-8 rounded-[34px] px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Collection</p>
            <h1 className="mt-3 text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
          {category
            ? categories.find((c) => c.slug === category)?.name ?? "Shop"
            : "All Products"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Editorial essentials, sculptural accessories, and finishing pieces chosen to
              feel elevated even when imagery is minimal.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:max-w-sm">
            <div className="rounded-[24px] border border-border/70 bg-background/35 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Visible</p>
              <p className="mt-2 text-2xl font-light">{products.length}</p>
            </div>
            <div className="rounded-[24px] border border-border/70 bg-background/35 px-4 py-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Categories</p>
              <p className="mt-2 text-2xl font-light">{categories.length}</p>
            </div>
          </div>
        </div>
      </div>

      <ShopFilters
        categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
        activeCategory={category}
        activeSort={sort}
      />

      {products.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-x-6">
          {products.map((product) => (
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
      ) : (
        <div className="surface-panel rounded-[30px] py-20 text-center text-muted">
          <p className="text-lg font-light">No products found</p>
          <p className="mt-2 text-sm">Check back soon for new arrivals.</p>
        </div>
      )}
    </div>
  );
}
