"use client";

import { useState } from "react";
import { Check, Gift, Sparkles, Zap } from "lucide-react";
import { useCart } from "@/components/cart-context";

type Props = {
  product: { id: string; name: string; price: number; image: string };
  inStock: boolean;
};

const finishes = [
  {
    value: "Gold-Tone Edit",
    title: "Gold-Tone",
    copy: "Warmer finishes with polished statement pieces and everyday shine.",
  },
  {
    value: "Silver-Tone Edit",
    title: "Silver-Tone",
    copy: "Cooler metallic styling with brighter contrast and sleek layering energy.",
  },
  {
    value: "Mixed Surprise",
    title: "Mixed",
    copy: "A more open-ended curation chosen for balance, styling, and surprise.",
  },
] as const;

export function MysteryBoxPurchase({ product, inStock }: Props) {
  const { addItem, setIsOpen } = useCart();
  const [selectedFinish, setSelectedFinish] = useState<(typeof finishes)[number]["value"]>(finishes[2].value);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  function handleAdd(openCart = false) {
    addItem({
      ...product,
      color: selectedFinish,
      note: note.trim() || undefined,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);

    if (openCart) {
      setIsOpen(true);
    }
  }

  return (
    <div className="mt-7 space-y-6">
      <div className="rounded-[28px] border border-border/70 bg-background/25 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted">
          <Gift size={14} className="text-accent" />
          Build Your Edit
        </div>

        <div className="mt-4 grid gap-3">
          {finishes.map((finish) => (
            <button
              key={finish.value}
              type="button"
              onClick={() => setSelectedFinish(finish.value)}
              className={`rounded-[24px] border p-4 text-left transition-all ${
                selectedFinish === finish.value
                  ? "border-accent bg-accent/10 shadow-[0_10px_30px_color-mix(in_srgb,var(--color-accent)_18%,transparent)]"
                  : "border-border/70 bg-background/20 hover:border-accent/45 hover:bg-background/35"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{finish.title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{finish.copy}</p>
                </div>
                <span
                  className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    selectedFinish === finish.value
                      ? "border-accent bg-accent text-white"
                      : "border-border/80 text-transparent"
                  }`}
                  aria-hidden="true"
                >
                  <Check size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5">
          <label htmlFor="mystery-note" className="text-[11px] uppercase tracking-[0.22em] text-muted">
            Preference Note
          </label>
          <textarea
            id="mystery-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Optional: gold only, no earrings, gift for sister, prefer delicate pieces..."
            className="mt-2 w-full resize-none rounded-[22px] border border-border/70 bg-background/35 px-4 py-3 text-sm leading-6 text-foreground transition-colors focus:border-foreground focus:outline-none"
          />
          <p className="mt-2 text-xs leading-6 text-muted">
            We’ll use this as a helpful preference note, not a guaranteed exact-piece request.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[24px] border border-border/70 bg-background/20 p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Worth More</p>
          <p className="mt-2 text-lg font-light text-foreground">$120+ value</p>
          <p className="mt-1 text-sm leading-6 text-muted">Curated to land above the selling price.</p>
        </div>
        <div className="rounded-[24px] border border-border/70 bg-background/20 p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Selected by Hand</p>
          <p className="mt-2 text-lg font-light text-foreground">Studio-picked</p>
          <p className="mt-1 text-sm leading-6 text-muted">Chosen for finish, wearability, and mix.</p>
        </div>
        <div className="rounded-[24px] border border-border/70 bg-background/20 p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted">Good to Know</p>
          <p className="mt-2 text-lg font-light text-foreground">Final mix varies</p>
          <p className="mt-1 text-sm leading-6 text-muted">Every bag is individual and intentionally non-identical.</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => handleAdd(false)}
          disabled={!inStock}
          className={`flex min-h-13 flex-1 items-center justify-center gap-2 rounded-full px-5 py-4 text-sm uppercase tracking-[0.2em] ${
            !inStock
              ? "cursor-not-allowed bg-border text-muted"
              : added
                ? "bg-green-800 text-white"
                : "bg-foreground text-background shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-foreground/92"
          }`}
        >
          {!inStock ? (
            "Out of Stock"
          ) : added ? (
            <>
              <Check size={16} /> Added
            </>
          ) : (
            <>
              <Sparkles size={15} />
              Add Mystery Box
            </>
          )}
        </button>

        {inStock && (
          <button
            type="button"
            onClick={() => handleAdd(true)}
            className="flex min-h-13 items-center justify-center gap-2 rounded-full border border-accent bg-accent/10 px-6 py-4 text-sm uppercase tracking-[0.2em] text-accent hover:-translate-y-0.5 hover:bg-accent/20"
          >
            <Zap size={15} />
            Buy Now
          </button>
        )}
      </div>
    </div>
  );
}
