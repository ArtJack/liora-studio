"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { respondToCounter } from "./actions";
import { Check, X } from "lucide-react";

type Props = {
  token: string;
  counterPrice: number;
};

export function CounterResponse({ token, counterPrice }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState<"accept" | "reject" | null>(null);

  async function handleResponse(accept: boolean) {
    setLoading(true);
    setAction(accept ? "accept" : "reject");
    try {
      await respondToCounter(token, accept);
      router.refresh();
    } catch {
      setLoading(false);
      setAction(null);
    }
  }

  return (
    <div className="mt-6 space-y-3">
      <p className="text-sm font-medium">
        The seller has countered with{" "}
        <span className="text-lg font-semibold text-foreground">
          ${counterPrice.toLocaleString()}
        </span>
      </p>
      <p className="text-sm text-muted">Would you like to accept this counter-offer?</p>
      <div className="flex gap-3">
        <button
          onClick={() => handleResponse(true)}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm uppercase tracking-[0.18em] text-background hover:-translate-y-0.5 hover:bg-foreground/92 disabled:opacity-60"
        >
          {loading && action === "accept" ? (
            "Accepting..."
          ) : (
            <>
              <Check size={16} /> Accept Counter
            </>
          )}
        </button>
        <button
          onClick={() => handleResponse(false)}
          disabled={loading}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3.5 text-sm uppercase tracking-[0.18em] text-muted hover:text-foreground disabled:opacity-60"
        >
          {loading && action === "reject" ? (
            "Declining..."
          ) : (
            <>
              <X size={16} /> Decline
            </>
          )}
        </button>
      </div>
    </div>
  );
}
