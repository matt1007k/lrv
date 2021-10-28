export type PaginationLinksType = {
  page: number | null;
  perPage: number | null;
  lastPage: number | null;
  total: number;
};

export const initialPaginationLinks: PaginationLinksType = {
  page: 1,
  perPage: 10,
  lastPage: null,
  total: 0,
};
