import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { CrudActions } from "../enums";
import { MergedCrudOptions } from "../interfaces/crud-options.interface";
import { CrudRequest } from "../interfaces/crud-request.interface";
import { RequestQueryParser } from "../request-query.parser";
import { SCondition } from "../types/request-query.types";
export declare class CrudRequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    getCrudRequest(parser: RequestQueryParser, crudOptions: Partial<MergedCrudOptions>): CrudRequest;
    getSearch(parser: RequestQueryParser, crudOptions: Partial<MergedCrudOptions>, action: CrudActions, params?: any): SCondition[];
    getParamsSearch(parser: RequestQueryParser, crudOptions: Partial<MergedCrudOptions>, params?: any): SCondition[];
}
//# sourceMappingURL=crud-request.interceptor.d.ts.map