import Link from "next/link";

export function CollectionCard({ collection }: { collection: Record<string, unknown> }) {
  const id = (collection && typeof collection === "object" && "id" in collection) ? String((collection as { id: unknown }).id) : "";
  const name = (collection && typeof collection === "object" && "name" in collection && typeof (collection as { name: unknown }).name === "string") ? (collection as { name: string }).name : "مجموعه";
  const description = (collection && typeof collection === "object" && "description" in collection && typeof (collection as { description: unknown }).description === "string") ? (collection as { description: string }).description : "";
  let products: Array<Record<string, unknown>> = [];
  if (collection && typeof collection === "object" && "products" in collection) {
    const raw = (collection as Record<string, unknown>).products as unknown;
    if (Array.isArray(raw)) products = raw as Array<Record<string, unknown>>;
  }
  const firstThree = products.slice(0, 3);
  return (
    <Link href={`/collections/${id}`} className="border rounded-lg p-3 block border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/40">
      <div className="font-medium">{name}</div>
      {description ? <div className="text-xs opacity-80 line-clamp-2">{description}</div> : null}
      {firstThree.length > 0 ? (
        <div className="mt-2 flex items-center gap-2">
          {firstThree.map((_, idx) => (
            <div key={idx} className="w-10 h-10 rounded bg-black/10" />
          ))}
        </div>
      ) : null}
    </Link>
  );
}


