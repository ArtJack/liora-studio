"use client";

import { useRef, useState, type ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const DELETE_THRESHOLD = 80;
const SNAP_WIDTH = 80;

export function SwipeableCard({
  children,
  productId,
  productName,
  href,
}: {
  children: ReactNode;
  productId: string;
  productName: string;
  href: string;
}) {
  const router = useRouter();
  const [offsetX, setOffsetX] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);
  const isHorizontal = useRef<boolean | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    currentX.current = isOpen ? -SNAP_WIDTH : 0;
    dragging.current = true;
    isHorizontal.current = null;
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!dragging.current) return;

    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;

    // Decide direction on first significant move
    if (isHorizontal.current === null) {
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy);
      }
      return;
    }

    if (!isHorizontal.current) return;

    const base = isOpen ? -SNAP_WIDTH : 0;
    const raw = base + dx;
    // Clamp: can't go right of 0, max left = -140
    const clamped = Math.max(-140, Math.min(0, raw));
    setOffsetX(clamped);
  }

  function onTouchEnd() {
    dragging.current = false;
    if (isHorizontal.current === false) return;

    if (offsetX < -DELETE_THRESHOLD / 2) {
      setOffsetX(-SNAP_WIDTH);
      setIsOpen(true);
    } else {
      setOffsetX(0);
      setIsOpen(false);
    }
  }

  function handleTap() {
    if (isOpen) {
      setOffsetX(0);
      setIsOpen(false);
    } else {
      router.push(href);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${productName}"? This cannot be undone.`)) return;
    setDeleting(true);
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[20px]">
      {/* Delete action behind */}
      <div className="absolute inset-y-0 right-0 flex w-[80px] items-center justify-center bg-red-600">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex h-full w-full flex-col items-center justify-center gap-1 text-white"
        >
          <Trash2 size={20} />
          <span className="text-[10px] uppercase tracking-wider font-medium">
            {deleting ? "..." : "Delete"}
          </span>
        </button>
      </div>

      {/* Foreground card */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={handleTap}
        className="relative flex items-center gap-3 border border-border bg-surface p-3 transition-transform duration-200 ease-out cursor-pointer"
        style={{
          transform: `translateX(${offsetX}px)`,
          transitionDuration: dragging.current ? "0ms" : "200ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}
