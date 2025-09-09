"use client";

import Image from "next/image";
import Link from "next/link";
import { inferProductFields } from "@/lib/infer";
import { formatTomans } from "@/lib/format";

export function ProductCard({ product }: { product: Record<string, unknown> }) {
  const p = inferProductFields(product);
  const resolvedBrandName = p.brandName;
  const hasValidId = typeof p.id === "string" || typeof p.id === "number";
  const idForHref = hasValidId ? String(p.id) : "";

  return (
    <div className="border rounded-lg p-3 flex flex-col gap-3 border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/40">
      <Link
        href={hasValidId ? `/products/${idForHref}` : "#"}
        className="relative w-full h-40 overflow-hidden rounded-md bg-black/5 block"
      >
        {p.pictures?.low ? (
          <Image
            src={p.pictures.low}
            alt={p.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" /> // Placeholder
        )}
      </Link>

      <div className="flex-1">
        {hasValidId ? (
          <Link
            href={`/products/${idForHref}`}
            className="font-medium text-[15px] hover:underline"
          >
            {p.name}
          </Link>
        ) : (
          <div className="font-medium text-[15px]">{p.name}</div>
        )}

        {resolvedBrandName && p.brandId ? (
          <Link
            href={`/brands/${p.brandId}`}
            className="text-[12px] opacity-70 mt-0.5 hover:underline block text-left"
          >
            {resolvedBrandName}
          </Link>
        ) : null}

        {p.description ? (
          <div className="text-[12px] opacity-80 line-clamp-2">
            {p.description}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-[14px] font-semibold text-[color:var(--color-accent)]">
          {typeof p.price === "number" ? formatTomans(p.price) : ""}
        </div>
      </div>
    </div>
  );
}
