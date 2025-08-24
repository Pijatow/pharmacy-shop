import { fetchCollections } from "@/lib/collections";
import { CollectionCard } from "@/components/CollectionCard";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const { results } = await fetchCollections<Record<string, unknown>>({ page: 1, page_size: 24 });
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">مجموعه‌ها</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((c, idx) => {
          let key = String(idx);
          if (c && typeof c === "object" && "id" in c) {
            const maybeId = (c as { id: unknown }).id;
            if (typeof maybeId === "string" || typeof maybeId === "number") {
              key = String(maybeId);
            }
          }
          return <CollectionCard key={key} collection={c} />;
        })}
      </div>
    </div>
  );
}


