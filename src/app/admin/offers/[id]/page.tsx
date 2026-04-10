export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { statusLabel, statusClasses } from "@/lib/offer-status";
import { OfferActions } from "./offer-actions";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, User, Mail, ExternalLink } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminOfferDetailPage({ params }: Props) {
  const { id } = await params;

  const offer = await prisma.offer.findUnique({
    where: { id },
    include: {
      product: {
        include: { images: { orderBy: { position: "asc" }, take: 1 }, category: true },
      },
    },
  });

  if (!offer) notFound();

  const product = offer.product;
  const image = product.images[0]?.url;
  const pctOff = Math.round(((product.price - offer.offerPrice) / product.price) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/offers"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to Offers
      </Link>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-light">Offer Details</h1>
            <p className="mt-1 text-sm text-muted">ID: {offer.id}</p>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-wider ${statusClasses(offer.status)}`}
          >
            {statusLabel(offer.status)}
          </span>
        </div>

        {/* Product card */}
        <div className="overflow-hidden rounded-xl border border-border bg-surface p-5">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Product</p>
          <div className="flex gap-4">
            <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-background">
              {image ? (
                <Image src={image} alt={product.name} fill className="object-cover" sizes="64px" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-muted">
                  IMG
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="mt-0.5 text-xs text-muted">{product.category.name}</p>
              <p className="mt-2 text-sm">
                List price: <span className="font-medium">${product.price.toLocaleString()}</span>
              </p>
            </div>
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center gap-1 self-start text-xs text-muted hover:text-foreground"
              target="_blank"
            >
              <ExternalLink size={12} /> View
            </Link>
          </div>
        </div>

        {/* Offer & customer info */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Offer</p>
            <p className="text-3xl font-light">${offer.offerPrice.toLocaleString()}</p>
            <p className="mt-1 text-sm text-muted">
              {pctOff > 0 ? `${pctOff}% below list price` : "At or above list price"}
            </p>
            {offer.counterPrice && (
              <div className="mt-3 border-t border-border pt-3">
                <p className="text-xs text-muted">Counter-offer</p>
                <p className="mt-1 text-lg font-medium">${offer.counterPrice.toLocaleString()}</p>
              </div>
            )}
            {offer.adminNote && (
              <div className="mt-3 border-t border-border pt-3">
                <p className="text-xs text-muted">Admin note</p>
                <p className="mt-1 text-sm italic">&ldquo;{offer.adminNote}&rdquo;</p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Customer</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User size={14} className="text-muted" />
                <span className="text-sm">{offer.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-muted" />
                <span className="text-sm">{offer.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-muted" />
                <span className="text-sm">
                  {offer.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-3">
              <p className="text-xs text-muted">Customer tracking link</p>
              <p className="mt-1 break-all text-xs font-mono text-muted">
                /offer/{offer.token}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        {offer.status === "pending" && (
          <OfferActions offerId={offer.id} listPrice={product.price} offerPrice={offer.offerPrice} />
        )}
      </div>
    </div>
  );
}
