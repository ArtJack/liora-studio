import { unstable_cache } from "next/cache";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";

const STOREFRONT_REVALIDATE_SECONDS = 120;
const PRODUCT_REVALIDATE_SECONDS = 60;

export const getHomePageData = unstable_cache(
  async () => {
    const [featuredProducts, recentProducts, totalProducts] = await Promise.all([
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
      prisma.product.count(),
    ]);

    return { featuredProducts, recentProducts, totalProducts };
  },
  ["storefront-home"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS }
);

export const getShopCategories = unstable_cache(
  async () => prisma.category.findMany({ orderBy: { name: "asc" } }),
  ["storefront-categories"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS }
);

export const getShopProducts = unstable_cache(
  async (category?: string, sort?: string, q?: string) => {
    const where: Prisma.ProductWhereInput = {};

    if (category) {
      where.category = { slug: category };
    }

    if (q) {
      where.OR = [{ name: { contains: q } }, { description: { contains: q } }];
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "name") orderBy = { name: "asc" };

    return prisma.product.findMany({
      where,
      orderBy,
      include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
    });
  },
  ["storefront-products"],
  { revalidate: STOREFRONT_REVALIDATE_SECONDS }
);

export const getProductPageData = unstable_cache(
  async (slug: string) =>
    prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { position: "asc" } },
        category: true,
        reviews: { orderBy: { createdAt: "desc" } },
      },
    }),
  ["storefront-product"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS }
);

export const getRelatedProducts = unstable_cache(
  async (categoryId: string, productId: string) =>
    prisma.product.findMany({
      where: { categoryId, id: { not: productId } },
      include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
      take: 4,
    }),
  ["storefront-related-products"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS }
);
