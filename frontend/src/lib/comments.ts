import qs from "qs";
import { api } from "@/lib/api-client";
import type { ListParams, PaginatedResponse } from "@/lib/types";

export async function fetchComments<T = Record<string, unknown>>(
  params: ListParams = {}
): Promise<PaginatedResponse<T>> {
  const endpoint = "/api/comments/";
  const queryString = qs.stringify(params, { arrayFormat: "comma", skipNulls: true });
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  const { data } = await api.get<PaginatedResponse<T>>(url);
  return data;
}


