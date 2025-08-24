import { fetchCollectionById } from "@/lib/collections";
import { fetchProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default async function CollectionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collection = await fetchCollectionById<Record<string, unknown>>(id);
  const name = (collection && typeof collection === "object" && "name" in collection && typeof (collection as { name: unknown }).name === "string") ? (collection as { name: string }).name : "";
  const description = (collection && typeof collection === "object" && "description" in collection && typeof (collection as { description: unknown }).description === "string") ? (collection as { description: string }).description : "";
  const { results: products } = await fetchProducts<Record<string, unknown>>({ page: 1, page_size: 24, collection: id });
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{name}</h1>
        {description ? <p className="opacity-90">{description}</p> : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p, idx) => {
          let key = String(idx);
          if (p && typeof p === "object" && "id" in p) {
            const maybeId = (p as { id: unknown }).id;
            if (typeof maybeId === "string" || typeof maybeId === "number") key = String(maybeId);
          }
          return <ProductCard key={key} product={p} />;
        })}
      </div>
    </div>
  );
}


