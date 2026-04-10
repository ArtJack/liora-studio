import { prisma } from "@/lib/db";
import Link from "next/link";
import { statusLabel, statusClasses } from "@/lib/offer-status";
import { MessageSquare } from "lucide-react";

export default async function AdminOffersPage() {
  const offers = await prisma.offer.findMany({
    include: {
      product: { include: { images: { orderBy: { position: "asc" }, take: 1 } } },
    },
    orderBy: { createdAt: "desc" },
  });

  const pending = offers.filter((o) => o.status === "pending").length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light">Offers</h1>
          <p className="mt-1 text-sm text-muted">
            {offers.length} total &middot; {pending} pending
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3 text-left">Customer</th>
              <th className="px-5 py-3 text-left">Product</th>
              <th className="px-5 py-3 text-left">Offer</th>
              <th className="px-5 py-3 text-left">List Price</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer.id}
                className="border-b border-border last:border-0 transition-colors hover:bg-surface-hover"
              >
                <td className="px-5 py-3">
                  <p className="text-sm font-medium">{offer.customerName}</p>
                  <p className="text-xs text-muted">{offer.customerEmail}</p>
                </td>
                <td className="px-5 py-3 text-sm text-muted">{offer.product.name}</td>
                <td className="px-5 py-3 text-sm font-medium">
                  ${offer.offerPrice.toLocaleString()}
                </td>
                <td className="px-5 py-3 text-sm text-muted">
                  ${offer.product.price.toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${statusClasses(offer.status)}`}
                  >
                    {statusLabel(offer.status)}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-muted">
                  {offer.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/offers/${offer.id}`}
                    className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
                  >
                    <MessageSquare size={14} />
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {offers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-muted">
                  No offers yet. Offers from customers will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
