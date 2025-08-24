import { fetchBrandById } from "@/lib/brands";

const brandIdToName = new Map<string, string>();

export async function getBrandNameById(id: string | number | null): Promise<string | null> {
  if (id === null) return null;
  const key = String(id);
  if (brandIdToName.has(key)) {
    return brandIdToName.get(key) ?? null;
  }
  try {
    const brand = await fetchBrandById<Record<string, unknown>>(key);
    const name = brand && typeof brand === "object" && "name" in brand && typeof (brand as { name: unknown }).name === "string" ? (brand as { name: string }).name : null;
    if (name) brandIdToName.set(key, name);
    return name;
  } catch {
    return null;
  }
}



