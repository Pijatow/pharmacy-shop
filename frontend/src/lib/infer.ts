export type InferredProductFields = {
  id: string | number | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  currency: string | null;
  brandName: string | null;
  brandId: string | number | null;
};

function readFirstString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim().length > 0) return value;
  }
  return null;
}

function readFirstNumber(obj: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
      return Number(value);
    }
  }
  return null;
}

function readId(obj: Record<string, unknown>): string | number | null {
  const raw = obj["id"] ?? obj["uuid"] ?? obj["pk"];
  if (typeof raw === "number") return raw;
  if (typeof raw === "string" && raw.trim().length > 0) return raw;
  return null;
}

export function inferProductFields(product: Record<string, unknown>): InferredProductFields {
  const name =
    readFirstString(product, [
      "name",
      "title",
      "product_name",
      "brand_name",
    ]) ?? "Unnamed";

  const description =
    readFirstString(product, ["description", "detail", "short_description"]) ?? null;

  const imageUrl =
    readFirstString(product, ["image", "image_url", "thumbnail", "photo"]) ?? null;

  const price = readFirstNumber(product, [
    "price",
    "unit_price",
    "mrp",
    "selling_price",
    "amount",
  ]);

  const currency =
    readFirstString(product, ["currency", "currency_code"]) ?? null;

  let brandName: string | null = null;
  let brandId: string | number | null = null;
  const brandField = (product as Record<string, unknown>)["brand"];
  const brandIdField = (product as Record<string, unknown>)["brand_id"] ?? (product as Record<string, unknown>)["brandId"];
  if (brandField && typeof brandField === "object") {
    if ("name" in brandField) {
      const bn = (brandField as Record<string, unknown>)["name"];
      if (typeof bn === "string" && bn.trim().length > 0) brandName = bn;
    }
    if ("id" in brandField) {
      const bid = (brandField as Record<string, unknown>)["id"];
      if (typeof bid === "number" || (typeof bid === "string" && bid.trim().length > 0)) {
        brandId = bid as string | number;
      }
    }
  } else if (typeof brandField === "number") {
    brandId = brandField;
  } else if (typeof brandField === "string" && brandField.trim().length > 0) {
    brandId = brandField;
  }
  if (!brandName) {
    brandName = readFirstString(product, ["brand_name", "brandName", "brand", "brandTitle"]);
  }
  if (!brandId) {
    if (typeof brandIdField === "number" || (typeof brandIdField === "string" && brandIdField.trim().length > 0)) {
      brandId = brandIdField as string | number;
    }
  }

  return {
    id: readId(product),
    name,
    description,
    imageUrl,
    price,
    currency,
    brandName,
    brandId,
  };
}



