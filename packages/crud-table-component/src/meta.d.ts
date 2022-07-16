// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { MetaSuraPagination as OriginalMetaPagination } from "@asurraa/sura-ui-fetcher/dist/sura-fetcher.service";

export interface MetaPagination {
  totalItems: number;
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
}

export declare module "@asurraa/sura-ui-fetcher/dist/sura-fetcher.service" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export declare interface MetaSuraPagination extends MetaPagination {}
}
