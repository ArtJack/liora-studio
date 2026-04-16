import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";

const ADMIN_REVALIDATE = 30; // seconds

export const getAdminProducts = unstable_cache(
  async () =>
    prisma.product.findMany({
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        category: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ["admin-products"],
  { revalidate: ADMIN_REVALIDATE, tags: ["admin"] }
);

export const getAdminCategories = unstable_cache(
  async () => prisma.category.findMany({ orderBy: { name: "asc" } }),
  ["admin-categories"],
  { revalidate: ADMIN_REVALIDATE, tags: ["admin"] }
);

export const getAdminProduct = unstable_cache(
  async (id: string) =>
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { position: "asc" } } },
    }),
  ["admin-product"],
  { revalidate: ADMIN_REVALIDATE, tags: ["admin"] }
);

export const getAdminDashboard = unstable_cache(
  async () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(todayStart);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const [products, viewsRaw, todayViews] = await Promise.all([
      prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
      prisma.productView.findMany({
        where: { viewedAt: { gte: sevenDaysAgo } },
        select: { productId: true, viewedAt: true },
      }),
      prisma.productView.count({
        where: { viewedAt: { gte: todayStart } },
      }),
    ]);

    return { products, viewsRaw, todayViews };
  },
  ["admin-dashboard"],
  { revalidate: ADMIN_REVALIDATE, tags: ["admin"] }
);
