import Link from "next/link";
import { fetchProductById } from "@/lib/products";
import { inferProductFields } from "@/lib/infer";
import { formatTomans } from "@/lib/format";
import { ProductCartControls } from "@/components/ProductCartControls";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProductById<Record<string, unknown>>(id);
  const p = inferProductFields(product);

  let tags: string[] | null = null;
  let collections: Array<{ id: string; name: string }> = [];
  let comments: Array<{ id?: string | number; text: string }> = [];
  if (product && typeof product === "object" && "tags" in product) {
    const raw = (product as Record<string, unknown>).tags;
    if (Array.isArray(raw)) {
      const normalized = raw.map((v) => (typeof v === "string" ? v : String(v)));
      tags = normalized;
    }
  }
  if (product && typeof product === "object" && "collections" in product) {
    const raw = (product as Record<string, unknown>).collections;
    if (Array.isArray(raw)) {
      const acc: Array<{ id: string; name: string }> = [];
      for (const c of raw) {
        if (c && typeof c === "object") {
          const cid = (c as Record<string, unknown>).id;
          const cname = (c as Record<string, unknown>).name;
          if ((typeof cid === "string" || typeof cid === "number") && typeof cname === "string") {
            acc.push({ id: String(cid), name: cname });
          }
        }
      }
      collections = acc;
    }
  }
  if (product && typeof product === "object" && "comments" in product) {
    const raw = (product as Record<string, unknown>).comments;
    if (Array.isArray(raw)) {
      const acc: Array<{ id?: string | number; text: string }> = [];
      for (const c of raw) {
        if (c && typeof c === "object") {
          const text = (c as Record<string, unknown>).text;
          const idVal = (c as Record<string, unknown>).id;
          if (typeof text === "string") {
            const id = (typeof idVal === "string" || typeof idVal === "number") ? idVal : undefined;
            acc.push({ id, text });
          }
        }
      }
      comments = acc;
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Product primary section */}
      <section className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 items-start">
        <div className="w-full aspect-[3/4] rounded-md bg-black/10" />
        <div className="space-y-3">
          <h1 className="text-2xl font-bold">{p.name}</h1>
          {p.brandName ? (
            <Link href={p.brandId ? `/brands/${p.brandId}` : "#"} className="font-semibold hover:underline inline-block">
              {p.brandName}
            </Link>
          ) : null}
          {p.description ? <p className="opacity-90">{p.description}</p> : null}
          <div className="flex items-center gap-4">
            <div className="text-[18px] font-bold text-[color:var(--color-accent)]">
              {typeof p.price === "number" ? formatTomans(p.price) : ""}
            </div>
            <ProductCartControls product={product} />
          </div>
        </div>
      </section>
      <hr className="border-[color:var(--color-accent)]/30" />
      {/* Collections */}
      {collections.length > 0 ? (
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">مجموعه‌های مرتبط</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {collections.map((c) => (
              <Link key={c.id} href={`/collections/${c.id}`} className="px-2 py-1 rounded border border-[color:var(--color-accent)]/40 hover:underline">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      {tags && tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 text-xs">
          {tags.map((t, i) => (
            <span key={`${t}-${i}`} className="px-2 py-1 rounded-full border border-[color:var(--color-accent)]/40 bg-[color:var(--color-surface)]/60">{t}</span>
          ))}
        </div>
      ) : null}
      <hr className="border-[color:var(--color-accent)]/30" />
      {/* Comments */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">نظرات</h2>
        {comments.length === 0 ? (
          <div className="text-sm opacity-70">نظری ثبت نشده است.</div>
        ) : (
          <ul className="space-y-2">
            {comments.map((cm, idx) => (
              <li key={String(cm.id ?? idx)} className="p-3 rounded border border-[color:var(--color-accent)]/30 bg-[color:var(--color-surface)]/40 text-sm">
                {cm.text}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}


