export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type ListParams = {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  [key: string]: unknown;
};
