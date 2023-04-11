import { QueryFilterOption } from "../types/query-filter-option.type";
import { QueryFields, QuerySort } from "../types/request-query.types";

export interface QueryOptions {
  allow?: QueryFields;
  exclude?: QueryFields;
  persist?: QueryFields;
  filter?: QueryFilterOption;
  join?: JoinOptions;
  sort?: QuerySort[];
  limit?: number;
  maxLimit?: number;
  cache?: number | false;
  alwaysPaginate?: boolean;
}

export interface JoinOptions {
  [key: string]: JoinOption;
}

export interface JoinOption {
  allow?: QueryFields;
  exclude?: QueryFields;
  persist?: QueryFields;
  eager?: boolean;
  required?: boolean;
  alias?: string;
}
