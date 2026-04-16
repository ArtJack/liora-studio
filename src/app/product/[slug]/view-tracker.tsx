"use client";

import { useEffect } from "react";

export function ViewTracker({ productId }: { productId: string }) {
  useEffect(() => {
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    }).catch(() => {
      // silently ignore tracking failures
    });
  }, [productId]);

  return null;
}
