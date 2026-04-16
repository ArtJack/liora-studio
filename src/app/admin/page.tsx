import { getAdminDashboard } from "@/lib/admin-data";
import Link from "next/link";
import {
  Package,
  Star,
  TriangleAlert,
  ArrowUpRight,
  Eye,
} from "lucide-react";

export default async function AdminDashboard() {
  const { products, viewsRaw, todayViews } = await getAdminDashboard();

  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.featured).length;
  const outOfStock = products.filter((p) => !p.inStock).length;
  const inventoryValue = products.reduce((sum, p) => sum + p.price, 0);

  // --- 7-day chart data ---
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dayLabels: string[] = [];
  const dayCounts: number[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayStart);
    d.setDate(d.getDate() - i);
    const nextD = new Date(d);
    nextD.setDate(nextD.getDate() + 1);
    const count = viewsRaw.filter((v) => {
      const t = new Date(v.viewedAt);
      return t >= d && t < nextD;
    }).length;
    dayLabels.push(d.toLocaleDateString("en-US", { weekday: "short" }));
    dayCounts.push(count);
  }
  const maxDayCount = Math.max(...dayCounts, 1);

  // --- Top 5 most viewed products ---
  const viewCountMap = new Map<string, number>();
  for (const v of viewsRaw) {
    viewCountMap.set(v.productId, (viewCountMap.get(v.productId) ?? 0) + 1);
  }
  const topProducts = [...viewCountMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([productId, count]) => {
      const product = products.find((p) => p.id === productId);
      return { name: product?.name ?? "Unknown", count };
    });
  const maxTopCount = topProducts.length > 0 ? topProducts[0].count : 1;

  // --- Views by category ---
  const categoryViewMap = new Map<string, number>();
  for (const v of viewsRaw) {
    const product = products.find((p) => p.id === v.productId);
    if (product) {
      const catName = product.category.name;
      categoryViewMap.set(catName, (categoryViewMap.get(catName) ?? 0) + 1);
    }
  }
  const categoryViews = [...categoryViewMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
  const maxCatCount = categoryViews.length > 0 ? categoryViews[0].count : 1;

  const totalWeekViews = viewsRaw.length;

  const stats = [
    {
      label: "Products",
      value: totalProducts.toLocaleString(),
      detail: "live in catalog",
      icon: Package,
      accent: "text-sky-600",
    },
    {
      label: "Featured",
      value: featuredCount.toLocaleString(),
      detail: "on storefront",
      icon: Star,
      accent: "text-amber-600",
    },
    {
      label: "Out of Stock",
      value: outOfStock.toLocaleString(),
      detail: "need attention",
      icon: TriangleAlert,
      accent: "text-rose-600",
    },
    {
      label: "Today's Views",
      value: todayViews.toLocaleString(),
      detail: "product page visits",
      icon: Eye,
      accent: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted">Admin Overview</p>
          <h1 className="mt-2 font-display text-4xl leading-none text-foreground sm:text-5xl">Dashboard</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm uppercase tracking-[0.16em] text-background hover:-translate-y-0.5 hover:bg-foreground/92"
        >
          Add Product
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="surface-panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted sm:text-xs">{stat.label}</span>
              <stat.icon size={16} className={stat.accent} />
            </div>
            <p className="mt-4 font-display text-3xl leading-none text-foreground sm:mt-5 sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-xs text-muted sm:mt-3 sm:text-sm">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* 7-Day Views Chart */}
        <div className="surface-panel rounded-[28px] p-5 sm:rounded-[32px] sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Weekly Traffic</p>
              <h2 className="font-display mt-2 text-2xl text-foreground sm:mt-3 sm:text-3xl">
                {totalWeekViews} views
              </h2>
            </div>
            <div className="rounded-full border border-border/70 bg-background/35 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-muted sm:px-4 sm:py-2 sm:text-xs">
              Last 7 days
            </div>
          </div>

          <div className="mt-8 flex items-end gap-2 sm:gap-3" style={{ height: "160px" }}>
            {dayCounts.map((count, i) => (
              <div key={dayLabels[i]} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full">
                  <div
                    className="mx-auto w-full max-w-[40px] rounded-t-lg bg-[linear-gradient(180deg,var(--color-accent),var(--color-accent-light))] transition-all"
                    style={{
                      height: `${Math.max((count / maxDayCount) * 140, count > 0 ? 8 : 2)}px`,
                    }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-wide text-muted">{dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory snapshot */}
        <div className="surface-panel rounded-[28px] p-5 sm:rounded-[32px] sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Inventory</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-[20px] border border-border/70 bg-background/35 p-4 sm:rounded-[24px] sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">Total Value</p>
              <p className="mt-2 font-display text-2xl text-foreground sm:mt-3 sm:text-4xl">
                ${inventoryValue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-[20px] border border-border/70 bg-background/35 p-4 sm:rounded-[24px] sm:p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">Avg Price</p>
              <p className="mt-2 font-display text-2xl text-foreground sm:mt-3 sm:text-4xl">
                ${totalProducts ? Math.round(inventoryValue / totalProducts).toLocaleString() : 0}
              </p>
            </div>
          </div>

          {/* Views by category */}
          {categoryViews.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.22em] text-muted">Views by Category</p>
              <div className="mt-4 space-y-3">
                {categoryViews.map((cat) => (
                  <div key={cat.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{cat.name}</span>
                      <span className="text-xs text-muted">{cat.count}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-background/60">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-light))]"
                        style={{ width: `${Math.max((cat.count / maxCatCount) * 100, 8)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top viewed products */}
      {topProducts.length > 0 && (
        <div className="surface-panel rounded-[28px] p-5 sm:rounded-[32px] sm:p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Most Viewed Products</p>
          <h2 className="font-display mt-2 text-2xl text-foreground sm:mt-3 sm:text-3xl">Top 5 this week</h2>
          <div className="mt-6 space-y-4">
            {topProducts.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center gap-4 rounded-[20px] border border-border/70 bg-background/25 px-4 py-3 sm:rounded-[24px] sm:px-5 sm:py-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-medium text-accent">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-background/60">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(item.count / maxTopCount) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm tabular-nums text-muted">{item.count} views</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
