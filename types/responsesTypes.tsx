export type PaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export type Paginated<T> = {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type CursorPaginated<T> = {
  data: T[];
  links: PaginationLinks;
  meta: {
    path: string;
    per_page: number;
    next_cursor: string | null;
    prev_cursor: string | null;
  };
};
