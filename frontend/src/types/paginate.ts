import type { BackendKanji } from './kanji.ts';

export interface PaginatedResponse {
  data: BackendKanji[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}
