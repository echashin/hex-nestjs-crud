import { ParamsOptions } from "./interfaces/params-options.interface";
import { ComparisonOperator, QueryFields, QueryFilter, QueryJoin, QuerySort } from "./types/request-query.types";
export declare const deprecatedComparisonOperatorsList: string[];
export declare const comparisonOperatorsList: any[];
export declare const sortOrdersList: string[];
export declare function validateFields(fields: QueryFields): void;
export declare function validateCondition(val: QueryFilter, cond: "filter" | "or" | "search"): void;
export declare function validateComparisonOperator(operator: ComparisonOperator): void;
export declare function validateJoin(join: QueryJoin): void;
export declare function validateSort(sort: QuerySort): void;
export declare function validateNumeric(val: number, num: "limit" | "offset" | "page" | "cache" | string): void;
export declare function validateParamOption(options: ParamsOptions, name: string): void;
export declare function validateUUID(str: string, name: string): void;
//# sourceMappingURL=request-query.validator.d.ts.map