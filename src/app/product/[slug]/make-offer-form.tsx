"use client";

import { useState } from "react";
import { HandCoins, Check, Copy, ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  productId: string;
  listPrice: number;
};

export function MakeOfferForm({ productId, listPrice }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ token: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const offerPrice = parseFloat(price);
    if (!name.trim() || !email.trim() || isNaN(offerPrice) || offerPrice <= 0) {
      setError("Please fill in all fields with valid values.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          customerName: name.trim(),
          customerEmail: email.trim(),
          offerPrice,
        }),
      });

      const data = (await res.json()) as { success?: boolean; token?: string; error?: string };

      if (!res.ok || !data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult({ token: data.token! });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function copyLink() {
    if (!result) return;
    const url = `${window.location.origin}/offer/${result.token}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const pct = price ? Math.round(((listPrice - parseFloat(price)) / listPrice) * 100) : null;

  // Success state
  if (result) {
    return (
      <div className="mt-6 rounded-[28px] border border-green-200 bg-green-50/60 p-6 dark:border-green-900 dark:bg-green-950/40">
        <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Check size={18} />
          <p className="text-sm font-medium uppercase tracking-[0.16em]">Offer Submitted</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your offer has been sent to our team. We&apos;ll review it and respond shortly.
          Save the link below to track your offer status.
        </p>
        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/offer/${result.token}`}
            className="flex-1 truncate rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm text-accent hover:underline"
          >
            /offer/{result.token}
          </Link>
          <button
            onClick={copyLink}
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-background/50 text-muted hover:text-foreground"
            title="Copy link"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
        <Link
          href={`/offer/${result.token}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
        >
          View Offer Status <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border py-4 text-sm uppercase tracking-[0.2em] text-muted hover:border-accent/60 hover:text-foreground"
      >
        <HandCoins size={16} />
        Make an Offer
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-[28px] border border-border/70 bg-background/30 p-5">
      <div className="flex items-center gap-2">
        <HandCoins size={16} className="text-accent" />
        <p className="text-xs font-medium uppercase tracking-[0.2em]">Make an Offer</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-muted">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="h-11 w-full rounded-2xl border border-border bg-background/50 px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-muted">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 w-full rounded-2xl border border-border bg-background/50 px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-muted">Your Offer Price</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted">$</span>
          <input
            type="number"
            step="0.01"
            min="1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="h-11 w-full rounded-2xl border border-border bg-background/50 pl-8 pr-4 text-sm transition-colors focus:border-foreground focus:outline-none"
            placeholder="0.00"
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted">
          <span>List price: ${listPrice.toLocaleString()}</span>
          {pct !== null && !isNaN(pct) && (
            <span className={pct > 0 ? "text-accent" : "text-muted"}>
              {pct > 0 ? `${pct}% off` : pct < 0 ? `${Math.abs(pct)}% above` : "Same as list"}
            </span>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 rounded-full bg-foreground py-3 text-sm uppercase tracking-[0.18em] text-background shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-foreground/92 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Offer"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-full border border-border px-5 py-3 text-sm uppercase tracking-[0.18em] text-muted hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
