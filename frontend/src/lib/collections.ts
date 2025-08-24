import qs from "qs";
import { api } from "@/lib/api-client";
import type { ListParams, PaginatedResponse } from "@/lib/types";

export async function fetchCollections<T = Record<string, unknown>>(
  params: ListParams = {}
): Promise<PaginatedResponse<T>> {
  const endpoint = "/api/collections/";
  const queryString = qs.stringify(params, { arrayFormat: "comma", skipNulls: true });
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  try {
    const { data } = await api.get<PaginatedResponse<T>>(url);
    return data;
  } catch (error) {
    console.warn("fetchCollections failed", error);
    return { count: 0, next: null, previous: null, results: [] } as PaginatedResponse<T>;
  }
}

export async function fetchCollectionById<T = Record<string, unknown>>(id: string | number): Promise<T> {
  const { data } = await api.get<T>(`/api/collections/${id}/`);
  return data;
}


