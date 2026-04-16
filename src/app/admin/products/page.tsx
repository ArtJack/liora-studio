export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { DeleteProductButton } from "./delete-button";
import { AdminProductThumb } from "./admin-product-thumb";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      images: { orderBy: { position: "asc" }, take: 1 },
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light">Products</h1>
          <p className="text-sm text-muted mt-1">{products.length} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 text-sm tracking-wide hover:bg-foreground/90 transition-colors rounded-lg"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Mobile card layout */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}/edit`}
            className="flex items-center gap-3 rounded-[20px] border border-border bg-surface p-3 transition-colors active:bg-surface-hover"
          >
            <div className="h-16 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-background relative">
              <AdminProductThumb
                name={product.name}
                category={product.category.name}
                src={product.images[0]?.url}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
              <p className="mt-0.5 text-xs text-muted">{product.category.name}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-sm font-medium">${product.price.toLocaleString()}</span>
                <span
                  className={`inline-flex text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-full ${
                    product.inStock
                      ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out"}
                </span>
                {product.featured && (
                  <span className="inline-flex text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
        {products.length === 0 && (
          <p className="py-12 text-center text-muted col-span-full">
            No products yet. Add your first product to get started.
          </p>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-xs text-muted tracking-wide uppercase">
              <th className="text-left px-5 py-3">Product</th>
              <th className="text-left px-5 py-3">Category</th>
              <th className="text-left px-5 py-3">Price</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-right px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border last:border-0 hover:bg-surface-hover transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-background rounded overflow-hidden flex-shrink-0 relative">
                      <AdminProductThumb
                        name={product.name}
                        category={product.category.name}
                        src={product.images[0]?.url}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-muted">{product.category.name}</td>
                <td className="px-5 py-3 text-sm">${product.price.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full ${
                      product.inStock
                        ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  {product.featured && (
                    <span className="inline-flex text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 ml-1">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="p-1.5 text-muted hover:text-foreground transition-colors"
                    >
                      <Pencil size={14} />
                    </Link>
                    <DeleteProductButton id={product.id} name={product.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-muted">
                  No products yet. Add your first product to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
