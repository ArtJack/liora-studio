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
    <Link href={`/product/${slug}`} className="group block">
      <div className="surface-panel overflow-hidden rounded-[28px] p-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[22px] bg-surface">
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
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end justify-center gap-3 bg-gradient-to-t from-black/50 via-transparent to-transparent p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-neutral-900 shadow-lg backdrop-blur-sm translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
              <Eye size={13} /> Quick View
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-accent/90 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-white shadow-lg backdrop-blur-sm translate-y-3 transition-transform duration-500 delay-75 group-hover:translate-y-0">
              <ShoppingBag size={13} /> Add to Bag
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 px-1">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{category}</p>
        <h3 className="font-display text-[15px] font-normal leading-6 group-hover:text-accent">{name}</h3>
        <div className="flex items-center gap-2 text-sm">
          <p>${price.toLocaleString()}</p>
          {comparePrice && comparePrice > price && (
            <p className="text-sm text-muted line-through">${comparePrice.toLocaleString()}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
