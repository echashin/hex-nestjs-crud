import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";

import { PARSED_CRUD_REQUEST_KEY } from "../constants";

import { MergedCrudOptions } from "../interfaces/crud-options.interface";
import { CrudRequest } from "../interfaces/crud-request.interface";
import { ParsedRequestParams } from "../interfaces/parsed-request.interface";
import { RequestQueryParser } from "../request-query.parser";
import { QueryFilterFunction } from "../types/query-filter-option.type";
import {
  QueryFilter,
  SCondition,
  SConditionAND,
  SFields,
} from "../types/request-query.types";
import { hasLength, isArrayFull, isFunction } from "../utils/checks.util";

@Injectable()
export class CrudRequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: any = context.switchToHttp().getRequest();

    try {
      if (!req[PARSED_CRUD_REQUEST_KEY]) {
        const crudOptions: Partial<MergedCrudOptions> = {
          query: {},
          routes: {},
          params: {},
        };
        const parser: RequestQueryParser = RequestQueryParser.create();

        const action: undefined = undefined;
        parser.parseQuery(req.query);
        parser.search = { $and: this.getSearch(parser, crudOptions, action) };

        req[PARSED_CRUD_REQUEST_KEY] = this.getCrudRequest(parser, crudOptions);
      }

      return next.handle();
    } catch (error) {
      throw error instanceof BadRequestException
        ? new BadRequestException(error.message)
        : error;
    }
  }

  getCrudRequest(
    parser: RequestQueryParser,
    crudOptions: Partial<MergedCrudOptions>
  ): CrudRequest {
    const parsed: ParsedRequestParams = parser.getParsed();
    const { query, routes, params } = crudOptions;

    return {
      parsed,
      options: {
        query,
        routes,
        params,
      },
    };
  }

  // eslint-disable-next-line complexity
  getSearch(
    parser: RequestQueryParser,
    crudOptions: Partial<MergedCrudOptions>,
   params?: any
  ): SCondition[] {
    // params condition
    const paramsSearch: SCondition[] = this.getParamsSearch(
      parser,
      crudOptions,
      params
    );

    // if `CrudOptions.query.filter` is a function then return transformed query search conditions
    if (isFunction(crudOptions.query.filter)) {
      const filterCond: SFields | SConditionAND | void =
        (crudOptions.query.filter as QueryFilterFunction)(
          parser.search,
          true
        ) || {};

      return [...paramsSearch, filterCond];
    }

    // if `CrudOptions.query.filter` is array or search condition type
    const optionsFilter: (SFields | SConditionAND)[] = isArrayFull(
      crudOptions.query.filter
    )
      ? (crudOptions.query.filter as QueryFilter[]).map(
          (element: QueryFilter) => parser.convertFilterToSearch(element)
        )
      : [(crudOptions.query.filter as SCondition) || {}];

    let search: SCondition[] = [];

    if (parser.search) {
      search = [parser.search];
    } else if (hasLength(parser.filter) && hasLength(parser.or)) {
      search =
        parser.filter.length === 1 && parser.or.length === 1
          ? [
              {
                $or: [
                  parser.convertFilterToSearch(parser.filter[0]),
                  parser.convertFilterToSearch(parser.or[0]),
                ],
              },
            ]
          : [
              {
                $or: [
                  {
                    $and: parser.filter.map((element: QueryFilter) =>
                      parser.convertFilterToSearch(element)
                    ),
                  },
                  {
                    $and: parser.or.map((element: QueryFilter) =>
                      parser.convertFilterToSearch(element)
                    ),
                  },
                ],
              },
            ];
    } else if (hasLength(parser.filter)) {
      search = parser.filter.map((element: QueryFilter) =>
        parser.convertFilterToSearch(element)
      );
    } else {
      if (hasLength(parser.or)) {
        search =
          parser.or.length === 1
            ? [parser.convertFilterToSearch(parser.or[0])]
            : [
                {
                  $or: parser.or.map((element: QueryFilter) =>
                    parser.convertFilterToSearch(element)
                  ),
                },
              ];
      }
    }

    return [...paramsSearch, ...optionsFilter, ...search];
  }

  getParamsSearch(
    parser: RequestQueryParser,
    crudOptions: Partial<MergedCrudOptions>,
    params?: any
  ): SCondition[] {
    if (params) {
      parser.parseParams(params, crudOptions.params);

      return isArrayFull(parser.paramsFilter)
        ? parser.paramsFilter.map((element: QueryFilter) =>
            parser.convertFilterToSearch(element)
          )
        : [];
    }

    return [];
  }
}
