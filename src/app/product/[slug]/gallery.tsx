"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: { id: string; url: string; alt?: string | null }[];
  name: string;
};

export function ProductGallery({ images, name }: Props) {
  const [selected, setSelected] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeImage = images[selected];
  const activeFailed = activeImage ? failedImages[activeImage.id] : false;

  function markFailed(id: string) {
    setFailedImages((current) => ({ ...current, [id]: true }));
  }

  if (images.length === 0) {
    return (
      <div className="surface-panel flex aspect-[3/4] items-center justify-center rounded-[30px]">
        <div className="flex h-full w-full items-center justify-center rounded-[24px] bg-gradient-to-br from-border via-background to-surface">
          <span className="text-sm uppercase tracking-[0.2em] text-muted/50">{name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="surface-panel overflow-hidden rounded-[32px] p-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[26px] bg-surface">
          {activeFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-border via-background to-surface">
              <span className="text-sm uppercase tracking-[0.22em] text-muted/50">{name}</span>
            </div>
          ) : (
            <Image
              src={activeImage.url}
              alt={activeImage.alt ?? name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              onError={() => markFailed(activeImage.id)}
            />
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative h-20 w-16 overflow-hidden rounded-2xl border-2 ${
                i === selected ? "border-foreground shadow-md" : "border-transparent hover:border-border"
              }`}
            >
              {failedImages[img.id] ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-border to-background text-[10px] uppercase tracking-[0.2em] text-muted/60">
                  {i + 1}
                </div>
              ) : (
                <Image
                  src={img.url}
                  alt={img.alt ?? name}
                  fill
                  className="object-cover"
                  sizes="64px"
                  onError={() => markFailed(img.id)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
