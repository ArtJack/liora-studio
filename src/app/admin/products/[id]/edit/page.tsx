export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductForm } from "../../product-form";
import { updateProduct } from "../../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { position: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  const boundAction = updateProduct.bind(null, id);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to Products
      </Link>
      <div className="surface-panel rounded-[32px] px-6 py-8 sm:px-8">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">Product Editor</p>
        <h1 className="font-display mt-3 text-5xl leading-none text-foreground">
          Edit: {product.name}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          Update pricing, product details, and gallery media from one place. Uploaded images
          will automatically populate the product gallery in storefront order.
        </p>
      </div>
      <ProductForm
        categories={categories}
        product={{
          name: product.name,
          description: product.description,
          price: product.price,
          comparePrice: product.comparePrice,
          categoryId: product.categoryId,
          sizes: product.sizes,
          colors: product.colors,
          featured: product.featured,
          inStock: product.inStock,
          images: product.images,
        }}
        action={boundAction}
        submitLabel="Update Product"
      />
    </div>
  );
}
