import Link from "next/link";
import { fetchCollections } from "@/lib/collections";
import { fetchProducts } from "@/lib/products";
import { CollectionCard } from "@/components/CollectionCard";
import { ProductCard } from "@/components/ProductCard";

export default async function Home() {
  const [{ results: collections }, { results: products }] = await Promise.all([
    fetchCollections<Record<string, unknown>>({ page: 1, page_size: 6 }),
    fetchProducts<Record<string, unknown>>({ page: 1, page_size: 6 }),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      <section>
        <Link href="/collections" className="text-xl font-semibold mb-3 inline-block hover:underline">مجموعه‌ها</Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {collections.map((c, idx) => {
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
      </section>
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <Link href="/products" className="text-xl font-semibold hover:underline">محصولات</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p, idx) => {
            let key = String(idx);
            if (p && typeof p === "object" && "id" in p) {
              const maybeId = (p as { id: unknown }).id;
              if (typeof maybeId === "string" || typeof maybeId === "number") {
                key = String(maybeId);
              }
            }
            return <ProductCard key={key} product={p} />;
          })}
        </div>
      </section>
    </div>
  );
}
