import qs from "qs";
import { api } from "@/lib/api-client";
import type { ListParams, PaginatedResponse } from "@/lib/types";

export async function fetchBrands<T = Record<string, unknown>>(
  params: ListParams = {}
): Promise<PaginatedResponse<T>> {
  const endpoint = "/api/brands/";
  const queryString = qs.stringify(params, { arrayFormat: "comma", skipNulls: true });
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  try {
    const { data } = await api.get<PaginatedResponse<T>>(url);
    return data;
  } catch (error) {
    console.warn("fetchBrands failed", error);
    return { count: 0, next: null, previous: null, results: [] } as PaginatedResponse<T>;
  }
}

export async function fetchBrandById<T = Record<string, unknown>>(id: string | number): Promise<T> {
  const { data } = await api.get<T>(`/api/brands/${id}/`);
  return data;
}


