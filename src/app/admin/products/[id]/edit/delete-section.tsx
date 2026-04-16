"use client";

import { useState } from "react";
import { Trash2, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteSection({ productId, productName }: { productId: string; productName: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (!confirming) {
    return (
      <div className="surface-panel rounded-[28px] p-5 sm:rounded-[32px] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-red-500">Danger Zone</p>
            <p className="mt-2 text-sm text-muted">
              Permanently delete this product and all its images. This cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setConfirming(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-red-300 px-6 py-3 text-sm uppercase tracking-[0.14em] text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
          >
            <Trash2 size={15} />
            Delete Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border-2 border-red-300 bg-red-50 p-5 dark:border-red-800 dark:bg-red-950/30 sm:rounded-[32px] sm:p-8">
      <p className="text-sm font-medium text-red-700 dark:text-red-400">
        Are you sure you want to delete &ldquo;{productName}&rdquo;?
      </p>
      <p className="mt-1 text-sm text-red-600/70 dark:text-red-400/70">
        This will permanently remove the product and all associated images.
      </p>
      <div className="mt-5 flex gap-3">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? <LoaderCircle size={15} className="animate-spin" /> : <Trash2 size={15} />}
          {deleting ? "Deleting..." : "Yes, Delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          disabled={deleting}
          className="rounded-full px-6 py-3 text-sm uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
