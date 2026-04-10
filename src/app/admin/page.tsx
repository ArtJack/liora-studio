import { prisma } from "@/lib/db";
import Link from "next/link";
import {
  Package,
  Layers,
  Star,
  TriangleAlert,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default async function AdminDashboard() {
  const [products, categories, pendingOffers] = await Promise.all([
    prisma.product.findMany({
      include: { category: true, images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.offer.count({ where: { status: "pending" } }),
  ]);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const featuredCount = products.filter((product) => product.featured).length;
  const outOfStock = products.filter((product) => !product.inStock).length;
  const inventoryValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = totalProducts ? inventoryValue / totalProducts : 0;

  const categoryBreakdown = categories.map((category) => {
    const count = products.filter((product) => product.categoryId === category.id).length;
    return {
      name: category.name,
      count,
      share: totalProducts ? (count / totalProducts) * 100 : 0,
    };
  });

  const recentProducts = products.slice(0, 5);

  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toLocaleString(),
      detail: "live in the catalog",
      icon: Package,
      accent: "text-sky-600",
    },
    {
      label: "Categories",
      value: totalCategories.toLocaleString(),
      detail: "active collection groups",
      icon: Layers,
      accent: "text-violet-600",
    },
    {
      label: "Featured",
      value: featuredCount.toLocaleString(),
      detail: "currently elevated on storefront",
      icon: Star,
      accent: "text-amber-600",
    },
    {
      label: "Out of Stock",
      value: outOfStock.toLocaleString(),
      detail: "need attention soon",
      icon: TriangleAlert,
      accent: "text-rose-600",
    },
    {
      label: "Pending Offers",
      value: pendingOffers.toLocaleString(),
      detail: "awaiting your response",
      icon: MessageSquare,
      accent: "text-cyan-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Admin Overview</p>
          <h1 className="mt-3 font-display text-5xl leading-none text-foreground">Dashboard</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Track collection health, merchandising balance, and the products most likely to
            need action without digging through tables first.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm uppercase tracking-[0.16em] text-background hover:-translate-y-0.5 hover:bg-foreground/92"
        >
          Add Product
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="surface-panel rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</span>
              <stat.icon size={18} className={stat.accent} />
            </div>
            <p className="mt-5 font-display text-5xl leading-none text-foreground">{stat.value}</p>
            <p className="mt-3 text-sm text-muted">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="surface-panel rounded-[32px] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Category Balance</p>
              <h2 className="font-display mt-3 text-3xl text-foreground">Assortment spread</h2>
            </div>
            <div className="rounded-full border border-border/70 bg-background/35 px-4 py-2 text-xs uppercase tracking-[0.16em] text-muted">
              {totalProducts} products tracked
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {categoryBreakdown.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{category.name}</span>
                  <span className="text-muted">
                    {category.count} product{category.count === 1 ? "" : "s"}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-background/60">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-light))]"
                    style={{ width: `${Math.max(category.share, category.count ? 10 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="surface-panel rounded-[32px] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Merchandising Pulse</p>
            <div className="mt-7 grid grid-cols-2 gap-4">
              <div className="rounded-[24px] border border-border/70 bg-background/35 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Inventory Value</p>
                <p className="mt-3 font-display text-4xl text-foreground">
                  ${inventoryValue.toLocaleString()}
                </p>
              </div>
              <div className="rounded-[24px] border border-border/70 bg-background/35 p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Average Price</p>
                <p className="mt-3 font-display text-4xl text-foreground">
                  ${Math.round(averagePrice).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-[24px] border border-border/70 bg-background/25 p-5">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles size={16} />
                <p className="text-xs uppercase tracking-[0.2em]">Recommendation</p>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">
                {outOfStock > 0
                  ? "A few products are out of stock. Refresh those listings or remove them from featured placements to keep the storefront tight."
                  : "Inventory coverage looks healthy. This is a good moment to refresh featured picks or add a new editorial drop."}
              </p>
            </div>
          </div>

          <div className="surface-panel rounded-[32px] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Recent Products</p>
            <div className="mt-6 space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-[24px] border border-border/70 bg-background/25 px-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                      {product.category.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">${product.price.toLocaleString()}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                      {product.inStock ? "In stock" : "Out of stock"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
