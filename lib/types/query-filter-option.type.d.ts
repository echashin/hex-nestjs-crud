import { QueryFilter, SCondition } from "./request-query.types";
export declare type QueryFilterFunction = (search?: SCondition, getMany?: boolean) => SCondition | void;
export declare type QueryFilterOption = QueryFilter[] | SCondition | QueryFilterFunction;
//# sourceMappingURL=query-filter-option.type.d.ts.map