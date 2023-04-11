"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRequestInterceptor = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const enums_1 = require("../enums");
const request_query_parser_1 = require("../request-query.parser");
const checks_util_1 = require("../utils/checks.util");
let CrudRequestInterceptor = class CrudRequestInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        try {
            if (!req[constants_1.PARSED_CRUD_REQUEST_KEY]) {
                const crudOptions = {
                    query: {},
                    routes: {},
                    params: {},
                };
                const parser = request_query_parser_1.RequestQueryParser.create();
                const action = undefined;
                parser.parseQuery(req.query);
                parser.search = { $and: this.getSearch(parser, crudOptions, action) };
                req[constants_1.PARSED_CRUD_REQUEST_KEY] = this.getCrudRequest(parser, crudOptions);
            }
            return next.handle();
        }
        catch (error) {
            throw error instanceof common_1.BadRequestException
                ? new common_1.BadRequestException(error.message)
                : error;
        }
    }
    getCrudRequest(parser, crudOptions) {
        const parsed = parser.getParsed();
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
    getSearch(parser, crudOptions, action, params) {
        const paramsSearch = this.getParamsSearch(parser, crudOptions, params);
        if ((0, checks_util_1.isFunction)(crudOptions.query.filter)) {
            const filterCond = crudOptions.query.filter(parser.search, action === enums_1.CrudActions.ReadAll) || {};
            return [...paramsSearch, filterCond];
        }
        const optionsFilter = (0, checks_util_1.isArrayFull)(crudOptions.query.filter)
            ? crudOptions.query.filter.map((element) => parser.convertFilterToSearch(element))
            : [crudOptions.query.filter || {}];
        let search = [];
        if (parser.search) {
            search = [parser.search];
        }
        else if ((0, checks_util_1.hasLength)(parser.filter) && (0, checks_util_1.hasLength)(parser.or)) {
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
                                    $and: parser.filter.map((element) => parser.convertFilterToSearch(element)),
                                },
                                {
                                    $and: parser.or.map((element) => parser.convertFilterToSearch(element)),
                                },
                            ],
                        },
                    ];
        }
        else if ((0, checks_util_1.hasLength)(parser.filter)) {
            search = parser.filter.map((element) => parser.convertFilterToSearch(element));
        }
        else {
            if ((0, checks_util_1.hasLength)(parser.or)) {
                search =
                    parser.or.length === 1
                        ? [parser.convertFilterToSearch(parser.or[0])]
                        : [
                            {
                                $or: parser.or.map((element) => parser.convertFilterToSearch(element)),
                            },
                        ];
            }
        }
        return [...paramsSearch, ...optionsFilter, ...search];
    }
    getParamsSearch(parser, crudOptions, params) {
        if (params) {
            parser.parseParams(params, crudOptions.params);
            return (0, checks_util_1.isArrayFull)(parser.paramsFilter)
                ? parser.paramsFilter.map((element) => parser.convertFilterToSearch(element))
                : [];
        }
        return [];
    }
};
CrudRequestInterceptor = __decorate([
    (0, common_1.Injectable)()
], CrudRequestInterceptor);
exports.CrudRequestInterceptor = CrudRequestInterceptor;
//# sourceMappingURL=crud-request.interceptor.js.map