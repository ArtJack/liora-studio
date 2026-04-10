"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  name: string;
  category: string;
  src?: string;
};

function fallbackLabel(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function AdminProductThumb({ name, category, src }: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-border via-background to-surface text-[10px] uppercase tracking-[0.18em] text-muted">
        {fallbackLabel(name) || category.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      className="object-cover"
      sizes="40px"
      onError={() => setFailed(true)}
    />
  );
}
