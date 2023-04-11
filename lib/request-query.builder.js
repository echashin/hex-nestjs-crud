"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestQueryBuilder = void 0;
const qs_1 = require("qs");
const request_query_validator_1 = require("./request-query.validator");
const checks_util_1 = require("./utils/checks.util");
class RequestQueryBuilder {
    constructor() {
        this.paramNames = {};
        this.queryObject = {};
        this.setParamNames();
    }
    static setOptions(options) {
        RequestQueryBuilder._options = {
            ...RequestQueryBuilder._options,
            ...options,
            paramNamesMap: {
                ...RequestQueryBuilder._options.paramNamesMap,
                ...options.paramNamesMap,
            },
        };
    }
    static getOptions() {
        return RequestQueryBuilder._options;
    }
    static create(params) {
        const qb = new RequestQueryBuilder();
        return (0, checks_util_1.isObject)(params) ? qb.createFromParams(params) : qb;
    }
    get options() {
        return RequestQueryBuilder._options;
    }
    setParamNames() {
        for (const key of Object.keys(RequestQueryBuilder._options.paramNamesMap)) {
            const name = RequestQueryBuilder._options.paramNamesMap[key];
            this.paramNames[key] = (0, checks_util_1.isString)(name)
                ? name
                : name[0];
        }
    }
    query(encode = true) {
        if (this.queryObject[this.paramNames.search]) {
            this.queryObject[this.paramNames.filter] = undefined;
            this.queryObject[this.paramNames.or] = undefined;
        }
        this.queryString = (0, qs_1.stringify)(this.queryObject, { encode });
        return this.queryString;
    }
    select(fields) {
        if ((0, checks_util_1.isArrayFull)(fields)) {
            (0, request_query_validator_1.validateFields)(fields);
            this.queryObject[this.paramNames.fields] = fields.join(this.options.delimStr);
        }
        return this;
    }
    search(s) {
        if (!(0, checks_util_1.isNil)(s) && (0, checks_util_1.isObject)(s)) {
            this.queryObject[this.paramNames.search] = JSON.stringify(s);
        }
        return this;
    }
    setFilter(f) {
        this.setCondition(f, "filter");
        return this;
    }
    setOr(f) {
        this.setCondition(f, "or");
        return this;
    }
    setJoin(j) {
        if (!(0, checks_util_1.isNil)(j)) {
            const param = this.checkQueryObjectParam("join", []);
            this.queryObject[param] = [
                ...this.queryObject[param],
                ...(Array.isArray(j) && !(0, checks_util_1.isString)(j[0])
                    ? j.map((o) => this.addJoin(o))
                    : [this.addJoin(j)]),
            ];
        }
        return this;
    }
    sortBy(s) {
        if (!(0, checks_util_1.isNil)(s)) {
            const param = this.checkQueryObjectParam("sort", []);
            this.queryObject[param] = [
                ...this.queryObject[param],
                ...(Array.isArray(s) && !(0, checks_util_1.isString)(s[0])
                    ? s.map((o) => this.addSortBy(o))
                    : [this.addSortBy(s)]),
            ];
        }
        return this;
    }
    setLimit(n) {
        this.setNumeric(n, "limit");
        return this;
    }
    setOffset(n) {
        this.setNumeric(n, "offset");
        return this;
    }
    setPage(n) {
        this.setNumeric(n, "page");
        return this;
    }
    resetCache() {
        this.setNumeric(0, "cache");
        return this;
    }
    cond(f, cond = "search") {
        const filter = Array.isArray(f)
            ? { field: f[0], operator: f[1], value: f[2] }
            : f;
        (0, request_query_validator_1.validateCondition)(filter, cond);
        const d = this.options.delim;
        return (filter.field +
            d +
            filter.operator +
            ((0, checks_util_1.hasValue)(filter.value) ? d + filter.value : ""));
    }
    addJoin(j) {
        const join = Array.isArray(j)
            ? { field: j[0], select: j[1] }
            : j;
        (0, request_query_validator_1.validateJoin)(join);
        const d = this.options.delim;
        const ds = this.options.delimStr;
        return (join.field + ((0, checks_util_1.isArrayFull)(join.select) ? d + join.select.join(ds) : ""));
    }
    addSortBy(s) {
        const sort = Array.isArray(s)
            ? { field: s[0], order: s[1] }
            : s;
        (0, request_query_validator_1.validateSort)(sort);
        const ds = this.options.delimStr;
        return sort.field + ds + sort.order;
    }
    createFromParams(params) {
        this.select(params.fields);
        this.search(params.search);
        this.setFilter(params.filter);
        this.setOr(params.or);
        this.setJoin(params.join);
        this.setLimit(params.limit);
        this.setOffset(params.offset);
        this.setPage(params.page);
        this.sortBy(params.sort);
        if (params.resetCache) {
            this.resetCache();
        }
        return this;
    }
    checkQueryObjectParam(cond, defaults) {
        const param = this.paramNames[cond];
        if ((0, checks_util_1.isNil)(this.queryObject[param]) && !(0, checks_util_1.isUndefined)(defaults)) {
            this.queryObject[param] = defaults;
        }
        return param;
    }
    setCondition(f, cond) {
        if (!(0, checks_util_1.isNil)(f)) {
            const param = this.checkQueryObjectParam(cond, []);
            this.queryObject[param] = [
                ...this.queryObject[param],
                ...(Array.isArray(f) && !(0, checks_util_1.isString)(f[0])
                    ? f.map((o) => this.cond(o, cond))
                    : [this.cond(f, cond)]),
            ];
        }
    }
    setNumeric(n, cond) {
        if (!(0, checks_util_1.isNil)(n)) {
            (0, request_query_validator_1.validateNumeric)(n, cond);
            this.queryObject[this.paramNames[cond]] = n;
        }
    }
}
exports.RequestQueryBuilder = RequestQueryBuilder;
RequestQueryBuilder._options = {
    delim: "||",
    delimStr: ",",
    paramNamesMap: {
        fields: ["fields", "select"],
        search: "s",
        filter: "filter",
        or: "or",
        join: "join",
        sort: "sort",
        limit: ["limit", "per_page"],
        offset: "offset",
        page: "page",
        cache: "cache",
    },
};
//# sourceMappingURL=request-query.builder.js.map