import Link from "next/link";

export function BrandCard({ brand }: { brand: Record<string, unknown> }) {
  const id = (brand && typeof brand === "object" && "id" in brand) ? String((brand as { id: unknown }).id) : "";
  const name = (brand && typeof brand === "object" && "name" in brand && typeof (brand as { name: unknown }).name === "string") ? (brand as { name: string }).name : "برند";
  const description = (brand && typeof brand === "object" && "description" in brand && typeof (brand as { description: unknown }).description === "string") ? (brand as { description: string }).description : "";
  return (
    <Link href={`/brands/${id}`} className="border rounded-lg p-3 block border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/40">
      <div className="font-medium">{name}</div>
      {description ? <div className="text-xs opacity-80 line-clamp-2">{description}</div> : null}
    </Link>
  );
}


