"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-context";
import { Check, Zap } from "lucide-react";

type Props = {
  product: { id: string; name: string; price: number; image: string };
  sizes: string[];
  colors: string[];
  inStock: boolean;
};

export function AddToCartButton({ product, sizes, colors, inStock }: Props) {
  const { addItem, setIsOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      ...product,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="mt-6 space-y-4">
      {sizes.length > 0 && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`min-w-[3rem] rounded-full border px-4 py-2.5 text-xs uppercase tracking-[0.18em] ${
                  selectedSize === size
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-accent/60 hover:text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Color</p>
          <input
            type="text"
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
            className="h-12 w-full rounded-2xl border border-border bg-background/35 px-4 text-sm transition-colors focus:border-foreground focus:outline-none"
            placeholder="Write preferred color"
          />
          <p className="mt-2 text-xs leading-6 text-muted">
            Available tones: {colors.join(", ")}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleAdd}
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
            "Add to Cart"
          )}
        </button>
        {inStock && (
          <button
            type="button"
            onClick={() => {
              handleAdd();
              setIsOpen(true);
            }}
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
