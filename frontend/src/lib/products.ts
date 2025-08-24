import qs from "qs";
import { api } from "@/lib/api-client";
import type { ListParams, PaginatedResponse } from "@/lib/types";

export async function fetchProducts<T = Record<string, unknown>>(
  params: ListParams = {}
): Promise<PaginatedResponse<T>> {
  // Default DRF-style endpoint path; adjust if your backend differs
  const endpoint = "/api/products/";
  const queryString = qs.stringify(params, { arrayFormat: "comma", skipNulls: true });
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  try {
    const response = await api.get<PaginatedResponse<T>>(url);
    return response.data;
  } catch (error) {
    console.warn("fetchProducts failed", error);
    return { count: 0, next: null, previous: null, results: [] } as PaginatedResponse<T>;
  }
}

export async function fetchProductById<T = Record<string, unknown>>(id: string | number): Promise<T> {
  const { data } = await api.get<T>(`/api/products/${id}/`);
  return data;
}



