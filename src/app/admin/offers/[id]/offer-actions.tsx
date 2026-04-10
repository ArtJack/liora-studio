"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptOffer, rejectOffer, counterOffer } from "../actions";
import { Check, X, ArrowLeftRight } from "lucide-react";

type Props = {
  offerId: string;
  listPrice: number;
  offerPrice: number;
};

export function OfferActions({ offerId, listPrice, offerPrice }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<"idle" | "counter">("idle");
  const [loading, setLoading] = useState(false);
  const [counterPrice, setCounterPrice] = useState("");
  const [adminNote, setAdminNote] = useState("");

  async function handleAccept() {
    setLoading(true);
    try {
      await acceptOffer(offerId);
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  async function handleReject() {
    setLoading(true);
    try {
      await rejectOffer(offerId);
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  async function handleCounter() {
    const price = parseFloat(counterPrice);
    if (isNaN(price) || price <= 0) return;
    setLoading(true);
    try {
      await counterOffer(offerId, price, adminNote || undefined);
      router.refresh();
    } catch {
      setLoading(false);
    }
  }

  if (mode === "counter") {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">Send Counter-Offer</p>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-muted">Counter price</label>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(e.target.value)}
                  placeholder={`Between ${offerPrice} and ${listPrice}`}
                  className="w-full rounded-lg border border-border bg-background py-2.5 pl-7 pr-3 text-sm outline-none focus:border-foreground/50"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-muted">Note to customer (optional)</label>
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              rows={2}
              placeholder="e.g. This is the lowest we can go for this item..."
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground/50"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCounter}
              disabled={loading || !counterPrice}
              className="flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm tracking-wide text-background transition-colors hover:bg-foreground/90 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Counter-Offer"}
            </button>
            <button
              onClick={() => setMode("idle")}
              disabled={loading}
              className="rounded-lg border border-border px-5 py-2.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">Actions</p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleAccept}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm tracking-wide text-white transition-colors hover:bg-green-700 disabled:opacity-60"
        >
          <Check size={16} />
          {loading ? "Processing..." : "Accept Offer"}
        </button>
        <button
          onClick={() => setMode("counter")}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm tracking-wide text-white transition-colors hover:bg-sky-700 disabled:opacity-60"
        >
          <ArrowLeftRight size={16} />
          Counter-Offer
        </button>
        <button
          onClick={handleReject}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg border border-red-300 px-5 py-2.5 text-sm tracking-wide text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 disabled:opacity-60"
        >
          <X size={16} />
          {loading ? "Processing..." : "Decline"}
        </button>
      </div>
    </div>
  );
}
