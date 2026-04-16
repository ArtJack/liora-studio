import { getAdminCategories } from "@/lib/admin-data";
import { ProductForm } from "../product-form";
import { createProduct } from "../actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
  const categories = await getAdminCategories();

  return (
    <div>
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Back to Products
      </Link>
      <h1 className="text-2xl font-light mb-8">Add New Product</h1>
      <ProductForm
        categories={categories}
        action={createProduct}
        submitLabel="Create Product"
      />
    </div>
  );
}
