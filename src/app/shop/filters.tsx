"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  categories: { name: string; slug: string }[];
  activeCategory?: string;
  activeSort?: string;
};

export function ShopFilters({ categories, activeCategory, activeSort }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="surface-panel flex flex-wrap items-center gap-3 rounded-[28px] px-4 py-4 sm:px-5">
      <button
        onClick={() => updateParam("category", null)}
        className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] ${
          !activeCategory
            ? "border-foreground bg-foreground text-background"
            : "border-border text-muted hover:border-accent/60 hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => updateParam("category", cat.slug)}
          className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] ${
            activeCategory === cat.slug
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted hover:border-accent/60 hover:text-foreground"
          }`}
        >
          {cat.name}
        </button>
      ))}

      <div className="ml-auto">
        <select
          value={activeSort ?? "newest"}
          onChange={(e) => updateParam("sort", e.target.value === "newest" ? null : e.target.value)}
          className="rounded-full border border-border bg-background/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-muted focus:border-foreground focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
}
