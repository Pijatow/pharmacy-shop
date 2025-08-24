import { fetchBrandById } from "@/lib/brands";

export default async function BrandDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const brand = await fetchBrandById<Record<string, unknown>>(id);
  const name = (brand && typeof brand === "object" && "name" in brand && typeof (brand as { name: unknown }).name === "string") ? (brand as { name: string }).name : "";
  const description = (brand && typeof brand === "object" && "description" in brand && typeof (brand as { description: unknown }).description === "string") ? (brand as { description: string }).description : "";
  return (
    <div className="max-w-4xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">{name}</h1>
      {description ? <p className="opacity-90">{description}</p> : null}
    </div>
  );
}


