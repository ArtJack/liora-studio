"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ProductPlaceholder } from "./product-placeholder";
import { Eye, ShoppingBag } from "lucide-react";

type ProductCardProps = {
  slug: string;
  name: string;
  price: number;
  comparePrice?: number | null;
  image?: string;
  category: string;
};

export function ProductCard({ slug, name, price, comparePrice, image, category }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(image) && !imageFailed;

  return (
    <Link
      href={`/product/${slug}`}
      className="group block h-full rounded-[30px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <div className="surface-panel flex h-full flex-col overflow-hidden rounded-[30px] p-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-surface">
          {showImage ? (
            <Image
              src={image!}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <ProductPlaceholder category={category} name={name} />
          )}
          {comparePrice && comparePrice > price && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[10px] uppercase tracking-wider text-white">
              Sale
            </span>
          )}
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/55 via-black/8 to-transparent p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span className="flex translate-y-3 items-center gap-1.5 rounded-full bg-white/92 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-neutral-900 shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-0">
              <Eye size={13} aria-hidden="true" /> View Product
            </span>
          </div>
        </div>
        <div className="min-w-0 px-2 pb-3.5 pt-4">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted">{category}</p>
          <h3 className="font-display mt-2 line-clamp-2 text-[18px] leading-[1.22] text-pretty transition-colors group-hover:text-accent">
            {name}
          </h3>
          <div className="mt-3 flex items-center gap-2 text-[15px] font-medium [font-variant-numeric:tabular-nums]">
            <p>${price.toLocaleString()}</p>
            {comparePrice && comparePrice > price && (
              <p className="text-sm font-normal text-muted line-through">
                ${comparePrice.toLocaleString()}
              </p>
            )}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-muted">
            <ShoppingBag size={12} aria-hidden="true" />
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}
