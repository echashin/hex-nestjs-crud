import {BadRequestException} from "@nestjs/common";

import {
    ParamOption,
    ParamsOptions,
} from "./interfaces/params-options.interface";
import {ParsedRequestParams} from "./interfaces/parsed-request.interface";
import {RequestQueryBuilderOptions} from "./interfaces/request-query-builder-options.interface";
import {RequestQueryBuilder} from "./request-query.builder";
import {
    validateCondition,
    validateJoin,
    validateNumeric,
    validateParamOption,
    validateSort,
    validateUUID,
} from "./request-query.validator";
import {
    ComparisonOperator,
    QueryFields,
    QueryFilter,
    QueryJoin,
    QuerySort,
    SCondition,
    SConditionAND,
    SFields,
} from "./types/request-query.types";
import {
    hasLength,
    hasValue,
    isArrayFull,
    isDate,
    isDateString,
    isNil,
    isObject,
    isString,
    isStringFull,
} from "./utils/checks.util";

// tslint:disable:variable-name ban-types
export class RequestQueryParser implements ParsedRequestParams {
    public fields: QueryFields = [];
    public paramsFilter: QueryFilter[] = [];
    public search: SCondition;
    public filter: QueryFilter[] = [];
    public or: QueryFilter[] = [];
    public join: QueryJoin[] = [];
    public sort: QuerySort[] = [];
    public limit: number;
    public offset: number;
    public page: number;
    public cache: number;
    public includeDeleted: number;

    private _params: any;
    private _query: any;
    private _paramNames: string[];
    private _paramsOptions: ParamsOptions;

    private get _options(): RequestQueryBuilderOptions {
        return RequestQueryBuilder.getOptions();
    }

    static create(): RequestQueryParser {
        return new RequestQueryParser();
    }

    getParsed(): ParsedRequestParams {
        return {
            fields: this.fields,
            paramsFilter: this.paramsFilter,
            search: this.search,
            filter: this.filter,
            or: this.or,
            join: this.join,
            sort: this.sort,
            limit: this.limit,
            offset: this.offset,
            page: this.page,
            cache: this.cache,
            includeDeleted: this.includeDeleted,
        };
    }

    parseQuery(query: any): this {
        if (isObject(query)) {
            const paramNames: string[] = Object.keys(query);

            if (hasLength(paramNames)) {
                this._query = query;
                this._paramNames = paramNames;
                const searchData: any = this._query[this.getParamNames("search")[0]];

                this.search = this.parseSearchQueryParam(searchData) as any;
                if (isNil(this.search)) {
                    this.filter = this.parseQueryParam(
                        "filter",
                        this.conditionParser.bind(this, "filter")
                    );
                    this.or = this.parseQueryParam(
                        "or",
                        this.conditionParser.bind(this, "or")
                    );
                }
                this.fields =
                    this.parseQueryParam("fields", this.fieldsParser.bind(this))[0] || [];
                this.join = this.parseQueryParam("join", this.joinParser.bind(this));
                this.sort = this.parseQueryParam("sort", this.sortParser.bind(this));
                this.limit = this.parseQueryParam(
                    "limit",
                    this.numericParser.bind(this, "limit")
                )[0];
                this.offset = this.parseQueryParam(
                    "offset",
                    this.numericParser.bind(this, "offset")
                )[0];
                this.page = this.parseQueryParam(
                    "page",
                    this.numericParser.bind(this, "page")
                )[0];
                this.cache = this.parseQueryParam(
                    "cache",
                    this.numericParser.bind(this, "cache")
                )[0];
            }
        }

        return this;
    }

    parseParams(params: any, options: ParamsOptions): this {
        if (isObject(params)) {
            const paramNames: string[] = Object.keys(params);

            if (hasLength(paramNames)) {
                this._params = params;
                this._paramsOptions = options;
                this.paramsFilter = paramNames
                    .map((name: string) => this.paramParser(name))
                    .filter(Boolean);
            }
        }

        return this;
    }

    convertFilterToSearch(filter: QueryFilter): SFields | SConditionAND {
        const isEmptyValue: { isnull: boolean; notnull: boolean } = {
            isnull: true,
            notnull: true,
        };

        return filter
            ? {
                [filter.field]: {
                    [filter.operator]: isEmptyValue[filter.operator] ?? filter.value,
                },
            }
            : /* istanbul ignore next */ {};
    }

    private getParamNames(
        type: keyof RequestQueryBuilderOptions["paramNamesMap"]
    ): string[] {
        return this._paramNames.filter((p: string) => {
            const name: string | string[] = this._options.paramNamesMap[type];
            return isString(name) ? name === p : (name as string[]).includes(p);
        });
    }

    private getParamValues(value: string | string[], parser: Function): string[] {
        if (isStringFull(value)) {
            return [parser.call(this, value)];
        }

        if (isArrayFull(value)) {
            return (value as string[]).map((val: string) => parser(val));
        }

        return [];
    }

    private parseQueryParam(
        type: keyof RequestQueryBuilderOptions["paramNamesMap"],
        parser: Function
    ): any[] {
        const param: string[] = this.getParamNames(type);

        if (isArrayFull(param)) {
            return param.reduce(
                (a: any[], name: string) => [
                    ...a,
                    ...this.getParamValues(this._query[name], parser),
                ],
                []
            );
        }

        return [];
    }

    private parseValue(val: any): any {
        try {
            const parsed: any = JSON.parse(val);

            if (!isDate(parsed) && isObject(parsed)) {
                // throw new Error('Don\'t support object now');
                return val;
            } else if (
                typeof parsed === "number" &&
                parsed.toLocaleString("fullwide", {useGrouping: false}) !== val
            ) {
                // JS cannot handle big numbers. Leave it as a string to prevent data loss
                return val;
            }

            return parsed;
        } catch {
            if (isDateString(val)) {
                return new Date(val);
            }

            return val;
        }
    }

    private parseValues(vals: any): any {
        return isArrayFull(vals)
            ? vals.map((v: any) => this.parseValue(v))
            : this.parseValue(vals);
    }

    private fieldsParser(data: string): QueryFields {
        return data.split(this._options.delimStr);
    }

    private parseSearchQueryParam(d: any): SCondition {
        try {
            if (isNil(d)) {
                return undefined;
            }

            const data: any = JSON.parse(d);

            if (!isObject(data)) {
                throw new Error("Invalid search param. JSON expected");
            }

            return data;
        } catch {
            throw new BadRequestException("Invalid search param. JSON expected");
        }
    }

    private conditionParser(
        cond: "filter" | "or" | "search",
        data: string
    ): QueryFilter {
        const isArrayValue: string[] = [
            "in",
            "notin",
            "between",
            "$in",
            "$notin",
            "$between",
            "$inL",
            "$notinL",
        ];
        const isEmptyValue: string[] = ["isnull", "notnull", "$isnull", "$notnull"];
        const param: string[] = data.split(this._options.delim);
        const field: string = param[0];
        const operator: ComparisonOperator = param[1] as ComparisonOperator;
        let value: string = param[2] || "";

        if (isArrayValue.includes(operator)) {
            value = value.split(this._options.delimStr) as any;
        }

        value = this.parseValues(value);

        if (!isEmptyValue.includes(operator) && !hasValue(value)) {
            throw new BadRequestException(`Invalid ${cond} value`);
        }

        const condition: QueryFilter = {field, operator, value};
        validateCondition(condition, cond);

        return condition;
    }

    private joinParser(data: string): QueryJoin {
        const param: string[] = data.split(this._options.delim);
        const join: QueryJoin = {
            field: param[0],
            select: isStringFull(param[1])
                ? param[1].split(this._options.delimStr)
                : undefined,
        };
        validateJoin(join);

        return join;
    }

    private sortParser(data: string): QuerySort {
        const param: string[] = data.split(this._options.delimStr);
        const sort: QuerySort = {
            field: param[0],
            order: param[1] as any,
        };
        validateSort(sort);

        return sort;
    }

    private numericParser(
        num: "limit" | "offset" | "page" | "cache",
        data: string
    ): number {
        const val: any = this.parseValue(data);
        validateNumeric(val, num);

        return val;
    }

    private paramParser(name: string): QueryFilter {
        validateParamOption(this._paramsOptions, name);
        const option: ParamOption = this._paramsOptions[name];

        if (option.disabled) {
            return undefined;
        }

        let value: any = this._params[name];

        switch (option.type) {
            case "number":
                value = this.parseValue(value);
                validateNumeric(value, `param ${name}`);
                break;
            case "uuid":
                validateUUID(value, name);
                break;
            default:
                break;
        }

        return {field: option.field, operator: "$eq", value};
    }
}
