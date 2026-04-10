"use client";

import { useEffect } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-context";
import Image from "next/image";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="surface-panel fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col rounded-none border-l border-border/70 bg-surface">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-sm uppercase tracking-[0.2em]">
            Shopping Bag ({items.length})
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full border border-border/70 p-2 text-muted hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted">
              <ShoppingBag size={40} strokeWidth={1} />
              <p className="mt-4 text-sm">Your bag is empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 rounded-[26px] border border-border/60 bg-background/30 p-3"
                >
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-background">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="h-full w-full bg-border" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium">{item.name}</h3>
                    {(item.size || item.color) && (
                      <p className="mt-0.5 text-xs text-muted">
                        {[item.size, item.color].filter(Boolean).join(" / ")}
                      </p>
                    )}
                    <p className="mt-1 text-sm">${item.price.toLocaleString()}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded-full border border-border/70 p-1 text-muted hover:text-foreground"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded-full border border-border/70 p-1 text-muted hover:text-foreground"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-xs text-muted underline hover:text-foreground"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t border-border px-6 py-5">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium">${totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted">Shipping calculated at checkout</p>
            <button className="w-full rounded-full bg-foreground py-4 text-sm uppercase tracking-[0.18em] text-background shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-foreground/92">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
