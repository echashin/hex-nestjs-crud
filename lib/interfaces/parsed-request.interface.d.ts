import { QueryFields, QueryFilter, QueryJoin, QuerySort, SCondition } from "../types/request-query.types";
export interface ParsedRequestParams {
    fields: QueryFields;
    paramsFilter: QueryFilter[];
    search: SCondition;
    filter: QueryFilter[];
    or: QueryFilter[];
    join: QueryJoin[];
    sort: QuerySort[];
    limit: number;
    offset: number;
    page: number;
    cache: number;
    includeDeleted: number;
}
//# sourceMappingURL=parsed-request.interface.d.ts.map