import { PaginationResult } from './pagination-result';

export interface ApiResult<T> {
  data: T;
  meta: PaginationResult;
}
