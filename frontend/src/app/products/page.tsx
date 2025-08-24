import Link from "next/link";
import { fetchProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const pageSize = Number(params.page_size ?? 12);
  const { results, next, previous, count } = await fetchProducts<Record<string, unknown>>({
    page,
    page_size: pageSize,
  });

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">محصولات</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((p, idx) => {
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
      <div className="flex items-center justify-between mt-6 text-sm">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Link
            href={{ pathname: "/products", query: { page: Math.max(1, page - 1), page_size: pageSize } }}
            className={`px-3 py-1 rounded border ${previous ? "" : "opacity-50 pointer-events-none"}`}
          >
            Prev
          </Link>
          <Link
            href={{ pathname: "/products", query: { page: Math.min(totalPages, page + 1), page_size: pageSize } }}
            className={`px-3 py-1 rounded border ${next ? "" : "opacity-50 pointer-events-none"}`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
