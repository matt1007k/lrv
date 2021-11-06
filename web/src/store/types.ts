export type PaginationLinksType = {
  page: number;
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
