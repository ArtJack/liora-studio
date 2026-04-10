export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { statusLabel, statusClasses, OFFER_STATUS } from "@/lib/offer-status";
import { CounterResponse } from "./counter-response";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Package } from "lucide-react";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function OfferPage({ params }: Props) {
  const { token } = await params;

  const offer = await prisma.offer.findUnique({
    where: { token },
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

  const isResolved =
    offer.status === OFFER_STATUS.ACCEPTED ||
    offer.status === OFFER_STATUS.REJECTED ||
    offer.status === OFFER_STATUS.COUNTER_ACCEPTED ||
    offer.status === OFFER_STATUS.COUNTER_REJECTED;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href={`/product/${product.slug}`}
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
      >
        <ArrowLeft size={14} /> Back to Product
      </Link>

      <div className="surface-panel rounded-[32px] p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-2 text-accent">
          <Package size={16} />
          <p className="text-xs uppercase tracking-[0.24em]">Offer Details</p>
        </div>

        {/* Product info */}
        <div className="flex gap-4 rounded-[24px] border border-border/70 bg-background/30 p-4">
          <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-surface">
            {image ? (
              <Image src={image} alt={product.name} fill className="object-cover" sizes="64px" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-border text-[10px] text-muted">
                IMG
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{product.category.name}</p>
            <h2 className="mt-1 text-lg font-medium">{product.name}</h2>
            <p className="mt-1 text-sm text-muted">
              List price: <span className="text-foreground">${product.price.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* Offer details */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[20px] border border-border/70 bg-background/25 p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Your Offer</p>
            <p className="mt-2 text-2xl font-light">${offer.offerPrice.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted">{pctOff > 0 ? `${pctOff}% below list` : "At or above list"}</p>
          </div>
          <div className="rounded-[20px] border border-border/70 bg-background/25 p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Status</p>
            <div className="mt-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-wider ${statusClasses(offer.status)}`}
              >
                {statusLabel(offer.status)}
              </span>
            </div>
          </div>
          <div className="rounded-[20px] border border-border/70 bg-background/25 p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Submitted</p>
            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <Clock size={14} className="text-muted" />
              {offer.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Counter offer section */}
        {offer.status === OFFER_STATUS.COUNTERED && offer.counterPrice && (
          <div className="mt-6 rounded-[24px] border border-sky-200 bg-sky-50/50 p-5 dark:border-sky-900 dark:bg-sky-950/30">
            <CounterResponse token={token} counterPrice={offer.counterPrice} />
            {offer.adminNote && (
              <p className="mt-4 text-sm italic text-muted">
                &ldquo;{offer.adminNote}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Status messages */}
        {offer.status === OFFER_STATUS.ACCEPTED && (
          <div className="mt-6 rounded-[24px] border border-green-200 bg-green-50/50 p-5 dark:border-green-900 dark:bg-green-950/30">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Your offer has been accepted!
            </p>
            <p className="mt-2 text-sm text-muted">
              We&apos;ll reach out to {offer.customerEmail} to finalize the purchase.
            </p>
          </div>
        )}

        {offer.status === OFFER_STATUS.COUNTER_ACCEPTED && (
          <div className="mt-6 rounded-[24px] border border-green-200 bg-green-50/50 p-5 dark:border-green-900 dark:bg-green-950/30">
            <p className="text-sm font-medium text-green-700 dark:text-green-400">
              Counter-offer accepted at ${offer.counterPrice?.toLocaleString()}!
            </p>
            <p className="mt-2 text-sm text-muted">
              We&apos;ll reach out to {offer.customerEmail} to finalize the purchase.
            </p>
          </div>
        )}

        {offer.status === OFFER_STATUS.REJECTED && (
          <div className="mt-6 rounded-[24px] border border-red-200 bg-red-50/50 p-5 dark:border-red-900 dark:bg-red-950/30">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              This offer was declined.
            </p>
            <p className="mt-2 text-sm text-muted">
              Thank you for your interest. Feel free to make a new offer or explore other products.
            </p>
          </div>
        )}

        {offer.status === OFFER_STATUS.COUNTER_REJECTED && (
          <div className="mt-6 rounded-[24px] border border-red-200 bg-red-50/50 p-5 dark:border-red-900 dark:bg-red-950/30">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              Counter-offer was declined.
            </p>
            <p className="mt-2 text-sm text-muted">
              Thank you for considering it. Feel free to make a new offer.
            </p>
          </div>
        )}

        {offer.status === OFFER_STATUS.PENDING && (
          <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50/50 p-5 dark:border-amber-900 dark:bg-amber-950/30">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
              Your offer is under review.
            </p>
            <p className="mt-2 text-sm text-muted">
              Our team is reviewing your offer. Check back here for updates.
            </p>
          </div>
        )}

        {/* Customer info */}
        {isResolved && (
          <div className="mt-6 border-t border-border pt-6">
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm uppercase tracking-[0.16em] text-background hover:-translate-y-0.5 hover:bg-foreground/92"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
