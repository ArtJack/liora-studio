export const revalidate = 120;

import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "./filters";
import { getShopCategories, getShopProducts } from "@/lib/storefront-data";

type Props = {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;
  const { category, sort, q } = params;

  const [products, categories] = await Promise.all([getShopProducts(category, sort, q), getShopCategories()]);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="content-band px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
          {category
            ? categories.find((c) => c.slug === category)?.name ?? "Shop"
            : "All Products"}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
          Rings, earrings, necklaces, bracelets, brooches, and mystery boxes — carefully selected, clearly priced.
        </p>

        <div className="mt-8">
          <ShopFilters
            categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
            activeCategory={category}
            activeSort={sort}
          />
        </div>

        {products.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-6">
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
    </div>
  );
}
