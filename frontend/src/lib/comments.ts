import qs from "qs";
import { api } from "@/lib/api-client";
import type { ListParams, PaginatedResponse } from "@/lib/types";

// This function already exists
export async function fetchComments<T = Record<string, unknown>>(
  params: ListParams = {}
): Promise<PaginatedResponse<T>> {
  const endpoint = "/api/comments/";
  const queryString = qs.stringify(params, { arrayFormat: "comma", skipNulls: true });
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  const { data } = await api.get<PaginatedResponse<T>>(url);
  return data;
}

// Add this new function to post a comment
export async function postComment(data: { product: string | number; text: string }) {
  const response = await api.post("/api/comments/", data);
  return response.data;
}