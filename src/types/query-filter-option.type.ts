import { QueryFilter, SCondition } from "./request-query.types";

export type QueryFilterFunction = (
  search?: SCondition,
  getMany?: boolean
) => SCondition | void;
export type QueryFilterOption =
  | QueryFilter[]
  | SCondition
  | QueryFilterFunction;
