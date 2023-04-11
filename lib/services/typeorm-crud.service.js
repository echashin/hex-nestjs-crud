"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmCrudService = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const deepmerge_1 = __importDefault(require("deepmerge"));
const typeorm_1 = require("typeorm");
const empty_crud_request_1 = require("../empty-crud-request");
const checks_util_1 = require("../utils/checks.util");
const obj_util_1 = require("../utils/obj.util");
const exception_factory_1 = require("../helpers/exception-factory");
const unique_in_array_1 = require("../validators/unique-in-array");
class TypeOrmCrudService {
    constructor(repository, join = {}) {
        this.repository = repository;
        this.entityColumnsHash = {};
        this.entityRelationsHash = {};
        this.join = {};
        this.exclude = [];
        this.join = join;
        this.onInitMapEntityColumns();
        this.onInitMapRelations();
    }
    get findOne() {
        return this.repository.findOne.bind(this.repository);
    }
    get find() {
        return this.repository.find.bind(this.repository);
    }
    get count() {
        return this.repository.count.bind(this.repository);
    }
    async getMany(req, langCode) {
        const { parsed, options } = req;
        const builder = await this.createBuilder(parsed, options, langCode);
        return this.doGetMany(builder, parsed, options);
    }
    async getOne(req, langCode) {
        return this.getOneOrFail(req, langCode);
    }
    async delete(ids) {
        const resp = await this.repository.delete(ids);
        if (!Array.isArray(ids) && resp.affected !== 1) {
            throw new common_1.NotFoundException(`Item not found id:${ids}`);
        }
        return resp.affected;
    }
    async recover(id) {
        return await this.repository.recover({ id });
    }
    async softDelete(ids) {
        const resp = await this.repository.softDelete(ids);
        if (!Array.isArray(ids) && resp.affected !== 1) {
            throw new common_1.NotFoundException(`Item not found id:${ids}`);
        }
        return resp.affected;
    }
    async create(input) {
        return this.repository.save(this.repository.create(input));
    }
    async update(id, input) {
        const entity = await this.findOne({ where: { id } });
        return this.repository.save((0, deepmerge_1.default)(entity, input));
    }
    decidePagination(parsed, options) {
        return (options.query.alwaysPaginate ||
            ((Number.isFinite(parsed.page) || Number.isFinite(parsed.offset)) &&
                !!this.getTake(parsed, options.query)));
    }
    get entityType() {
        return this.repository.target;
    }
    get alias() {
        return this.repository.metadata.targetName;
    }
    async createBuilder(parsed, options, langCode, many = true) {
        const builder = this.repository.createQueryBuilder(this.alias);
        this.select = this.getSelect(parsed, options.query);
        this.setSearchCondition(builder, langCode, parsed.search);
        const joinOptions = options.query.join || {};
        if ((0, checks_util_1.isArrayFull)(parsed.join)) {
            for (let i = 0; i < parsed.join.length; i++) {
                this.setJoin(parsed.join[i], joinOptions, builder);
            }
        }
        if (many) {
            const sort = this.getSort(parsed, options.query, langCode);
            builder.orderBy(sort);
            const take = this.getTake(parsed, options.query);
            if (Number.isFinite(take)) {
                builder.take(take);
            }
            const skip = this.getSkip(parsed, take);
            if (Number.isFinite(skip)) {
                builder.skip(skip);
            }
        }
        if (options.query.cache && parsed.cache !== 0) {
            builder.cache(builder.getQueryAndParameters(), options.query.cache);
        }
        builder.select(this.select);
        if (langCode !== 'all') {
            const i18nColumns = this.select.filter((col) => col.endsWith("_i18n"));
            for (const col of i18nColumns) {
                const splitted = col.split(".");
                const alias = splitted.join("_");
                const field = `"${splitted.at(-1)}"->>'${langCode}'`;
                splitted.splice(-1, 1);
                const select = [
                    ...splitted.map((s) => `"${s}"`),
                    field,
                ].join(".");
                builder.addSelect(select, alias);
            }
        }
        return builder;
    }
    async doGetMany(builder, query, options) {
        if (this.decidePagination(query, options)) {
            const [data, total] = await builder.getManyAndCount();
            const limit = builder.expressionMap.take;
            const offset = builder.expressionMap.skip;
            return this.createPageInfo(data, total, limit || total, offset || 0);
        }
        return builder.getMany();
    }
    onInitMapEntityColumns() {
        this.entityColumns = this.repository.metadata.columns.map((prop) => {
            if (prop.embeddedMetadata) {
                this.entityColumnsHash[prop.propertyPath] = true;
                return prop.propertyPath;
            }
            this.entityColumnsHash[prop.propertyName] = true;
            return prop.propertyName;
        });
        this.entityPrimaryColumns = this.repository.metadata.columns
            .filter((prop) => prop.isPrimary)
            .map((prop) => prop.propertyName);
    }
    onInitMapRelations() {
        this.entityRelationsHash = Object.fromEntries(this.repository.metadata.relations.map((curr) => [
            curr.propertyName,
            {
                name: curr.propertyName,
                columns: curr.inverseEntityMetadata.columns.map((col) => col.propertyName),
                primaryColumns: curr.inverseEntityMetadata.primaryColumns.map((col) => col.propertyName),
            },
        ]));
    }
    async getOneOrFail(req, langCode, shallow = false) {
        const { parsed, options } = req;
        const builder = shallow
            ? this.repository.createQueryBuilder(this.alias)
            : await this.createBuilder(parsed, options, langCode, false);
        if (shallow) {
            this.setSearchCondition(builder, langCode, parsed.search);
        }
        const found = await builder.getOne();
        if (!found) {
            this.throwNotFoundException(this.alias);
        }
        return found;
    }
    getAllowedColumns(columns, options) {
        return (!options.exclude || options.exclude.length === 0) &&
            (!options.allow || options.allow.length === 0)
            ? columns
            : columns.filter((column) => (options.exclude && options.exclude.length > 0
                ? !options.exclude.includes(column)
                : true) &&
                (options.allow && options.allow.length > 0
                    ? options.allow.includes(column)
                    : true));
    }
    getRelationMetadata(field) {
        try {
            const fields = field.split(".");
            const target = fields[fields.length - 1];
            const paths = fields.slice(0, -1);
            let relations = this.repository.metadata.relations;
            for (const propertyName of paths) {
                relations = relations.find((o) => o.propertyName === propertyName).inverseEntityMetadata.relations;
            }
            const relation = relations.find((o) => o.propertyName === target);
            relation.nestedRelation = `${fields[fields.length - 2]}.${target}`;
            return relation;
        }
        catch {
            return null;
        }
    }
    setJoin(cond, joinOptions, builder) {
        if (this.entityRelationsHash[cond.field] === undefined &&
            cond.field.includes(".")) {
            const curr = this.getRelationMetadata(cond.field);
            if (!curr) {
                this.entityRelationsHash[cond.field] = null;
                return true;
            }
            this.entityRelationsHash[cond.field] = {
                name: curr.propertyName,
                columns: curr.inverseEntityMetadata.columns.map((col) => col.propertyName),
                primaryColumns: curr.inverseEntityMetadata.primaryColumns.map((col) => col.propertyName),
                nestedRelation: curr.nestedRelation,
            };
        }
        if (cond.field &&
            this.entityRelationsHash[cond.field] &&
            joinOptions[cond.field]) {
            const relation = this.entityRelationsHash[cond.field];
            const options = joinOptions[cond.field];
            const allowed = this.getAllowedColumns(relation.columns, options);
            if (allowed.length === 0) {
                return true;
            }
            const alias = options.alias || relation.name;
            const columns = !cond.select || cond.select.length === 0
                ? allowed
                : cond.select.filter((col) => allowed.includes(col));
            const select = [
                ...relation.primaryColumns,
                ...(options.persist && options.persist.length > 0
                    ? options.persist
                    : []),
                ...columns,
            ].map((col) => `${alias}.${col}`);
            const relationPath = relation.nestedRelation || `${this.alias}.${relation.name}`;
            const relationType = options.required ? "innerJoin" : "leftJoin";
            builder[relationType](relationPath, alias);
            this.select = [...this.select, ...select];
        }
        return true;
    }
    setAndWhere(cond, i, builder, langCode) {
        const { str, params } = this.mapOperatorsToQuery(cond, `andWhere${i}`, langCode);
        builder.andWhere(str, params);
    }
    setOrWhere(cond, i, builder, langCode) {
        const { str, params } = this.mapOperatorsToQuery(cond, `orWhere${i}`, langCode);
        builder.orWhere(str, params);
    }
    setSearchCondition(builder, langCode, search, condition = "$and") {
        if ((0, checks_util_1.isObject)(search)) {
            const keys = (0, obj_util_1.objKeys)(search);
            if (keys.length > 0) {
                if ((0, checks_util_1.isArrayFull)(search.$and)) {
                    if (search.$and.length === 1) {
                        this.setSearchCondition(builder, langCode, search.$and[0], condition);
                    }
                    else {
                        this.builderAddBrackets(builder, condition, new typeorm_1.Brackets((qb) => {
                            for (const item of search.$and) {
                                this.setSearchCondition(qb, langCode, item, "$and");
                            }
                        }));
                    }
                }
                else if ((0, checks_util_1.isArrayFull)(search.$or)) {
                    if (keys.length === 1) {
                        if (search.$or.length === 1) {
                            this.setSearchCondition(builder, langCode, search.$or[0], condition);
                        }
                        else {
                            this.builderAddBrackets(builder, condition, new typeorm_1.Brackets((qb) => {
                                for (const item of search.$or) {
                                    this.setSearchCondition(qb, langCode, item, "$or");
                                }
                            }));
                        }
                    }
                    else {
                        this.builderAddBrackets(builder, condition, new typeorm_1.Brackets((qb) => {
                            for (const field of keys) {
                                if (field !== "$or") {
                                    const value = search[field];
                                    if (!(0, checks_util_1.isObject)(value)) {
                                        this.builderSetWhere(qb, langCode, "$and", field, value);
                                    }
                                    else {
                                        this.setSearchFieldObjectCondition(qb, langCode, "$and", field, value);
                                    }
                                }
                                else {
                                    if (search.$or.length === 1) {
                                        this.setSearchCondition(builder, langCode, search.$or[0], "$and");
                                    }
                                    else {
                                        this.builderAddBrackets(qb, "$and", new typeorm_1.Brackets((qb2) => {
                                            for (const item of search.$or) {
                                                this.setSearchCondition(qb2, langCode, item, "$or");
                                            }
                                        }));
                                    }
                                }
                            }
                        }));
                    }
                }
                else {
                    if (keys.length === 1) {
                        const field = keys[0];
                        const value = search[field];
                        if (!(0, checks_util_1.isObject)(value)) {
                            this.builderSetWhere(builder, langCode, condition, field, value);
                        }
                        else {
                            this.setSearchFieldObjectCondition(builder, langCode, condition, field, value);
                        }
                    }
                    else {
                        this.builderAddBrackets(builder, condition, new typeorm_1.Brackets((qb) => {
                            for (const field of keys) {
                                const value = search[field];
                                if (!(0, checks_util_1.isObject)(value)) {
                                    this.builderSetWhere(qb, langCode, "$and", field, value);
                                }
                                else {
                                    this.setSearchFieldObjectCondition(qb, langCode, "$and", field, value);
                                }
                            }
                        }));
                    }
                }
            }
        }
    }
    builderAddBrackets(builder, condition, brackets) {
        if (condition === "$and") {
            builder.andWhere(brackets);
        }
        else {
            builder.orWhere(brackets);
        }
    }
    builderSetWhere(builder, langCode, condition, field, value, operator = "$eq") {
        const time = process.hrtime();
        const index = `${field}${time[0]}${time[1]}`;
        const args = [
            { field, operator: (0, checks_util_1.isNull)(value) ? "$isnull" : operator, value },
            index,
            builder,
            langCode,
        ];
        const fn = condition === "$and" ? this.setAndWhere : this.setOrWhere;
        fn.apply(this, args);
    }
    setSearchFieldObjectCondition(builder, langCode, condition, field, object) {
        if ((0, checks_util_1.isObject)(object)) {
            const operators = (0, obj_util_1.objKeys)(object);
            if (operators.length === 1) {
                const operator = operators[0];
                const value = object[operator];
                if ((0, checks_util_1.isObject)(object.$or)) {
                    const orKeys = (0, obj_util_1.objKeys)(object.$or);
                    this.setSearchFieldObjectCondition(builder, langCode, orKeys.length === 1 ? condition : "$or", field, object.$or);
                }
                else {
                    this.builderSetWhere(builder, langCode, condition, field, value, operator);
                }
            }
            else {
                if (operators.length > 1) {
                    this.builderAddBrackets(builder, condition, new typeorm_1.Brackets((qb) => {
                        for (const operator of operators) {
                            const value = object[operator];
                            if (operator !== "$or") {
                                this.builderSetWhere(qb, langCode, condition, field, value, operator);
                            }
                            else {
                                const orKeys = (0, obj_util_1.objKeys)(object.$or);
                                if (orKeys.length === 1) {
                                    this.setSearchFieldObjectCondition(qb, langCode, condition, field, object.$or);
                                }
                                else {
                                    this.builderAddBrackets(qb, condition, new typeorm_1.Brackets((qb2) => {
                                        this.setSearchFieldObjectCondition(qb2, langCode, "$or", field, object.$or);
                                    }));
                                }
                            }
                        }
                    }));
                }
            }
        }
    }
    getSelect(query, options) {
        const allowed = this.getAllowedColumns(this.entityColumns, options);
        const columns = query.fields && query.fields.length > 0
            ? query.fields.filter((field) => allowed.includes(field))
            : allowed;
        const select = [
            ...(options.persist && options.persist.length > 0 ? options.persist : []),
            ...columns,
            ...this.entityPrimaryColumns,
        ].map((col) => {
            return `${this.alias}.${col}`;
        });
        return [...new Set(select)];
    }
    getSort(query, options, langCode) {
        if (query.sort && query.sort.length > 0) {
            return this.mapSort(query.sort, langCode);
        }
        else {
            return options.sort && options.sort.length > 0
                ? this.mapSort(options.sort, langCode)
                : {};
        }
    }
    getFieldWithAlias(rawField, langCode) {
        const field = this.addLanguageToField(rawField, langCode);
        const cols = field.split(".");
        switch (cols.length) {
            case 1:
                return `"${this.alias}"."${field}"`;
            case 2:
                return field;
            default:
                return cols.slice(-2, cols.length).join(".");
        }
    }
    addLanguageToField(field, langCode) {
        return field.endsWith("_i18n") && langCode !== 'all'
            ? `${field}->>'${langCode}'`
            : field;
    }
    mapSort(sort, langCode) {
        const params = {};
        for (const element of sort) {
            params[this.getFieldWithAlias(element.field, langCode)] = element.order;
        }
        return params;
    }
    mapOperatorsToQuery(cond, param, langCode) {
        const field = this.getFieldWithAlias(cond.field, langCode);
        const likeOperator = "ILIKE";
        let str;
        let params;
        if (cond.operator[0] !== "$") {
            cond.operator = `$${cond.operator}`;
        }
        switch (cond.operator) {
            case "$eq":
                str = `${field} = :${param}`;
                break;
            case "$ne":
                str = `${field} != :${param}`;
                break;
            case "$gt":
                str = `${field} > :${param}`;
                break;
            case "$lt":
                str = `${field} < :${param}`;
                break;
            case "$gte":
                str = `${field} >= :${param}`;
                break;
            case "$lte":
                str = `${field} <= :${param}`;
                break;
            case "$starts":
                str = `${field} LIKE :${param}`;
                params = { [param]: `${cond.value}%` };
                break;
            case "$ends":
                str = `${field} LIKE :${param}`;
                params = { [param]: `%${cond.value}` };
                break;
            case "$cont":
                str = `${field} LIKE :${param}`;
                params = { [param]: `%${cond.value}%` };
                break;
            case "$excl":
                str = `${field} NOT LIKE :${param}`;
                params = { [param]: `%${cond.value}%` };
                break;
            case "$in":
                this.checkFilterIsArray(cond);
                str = `${field} IN (:...${param})`;
                break;
            case "$notin":
                this.checkFilterIsArray(cond);
                str = `${field} NOT IN (:...${param})`;
                break;
            case "$isnull":
                str = `${field} IS NULL`;
                params = {};
                break;
            case "$notnull":
                str = `${field} IS NOT NULL`;
                params = {};
                break;
            case "$between":
                this.checkFilterIsArray(cond, cond.value.length !== 2);
                str = `${field} BETWEEN :${param}0 AND :${param}1`;
                params = {
                    [`${param}0`]: cond.value[0],
                    [`${param}1`]: cond.value[1],
                };
                break;
            case "$eqL":
                str = `LOWER(${field}) = :${param}`;
                break;
            case "$neL":
                str = `LOWER(${field}) != :${param}`;
                break;
            case "$startsL":
                str = `${field} ${likeOperator} :${param}`;
                params = { [param]: `${cond.value}%` };
                break;
            case "$endsL":
                str = `${field} ${likeOperator} :${param}`;
                params = { [param]: `%${cond.value}` };
                break;
            case "$contL":
                str = `${field} ${likeOperator} :${param}`;
                params = { [param]: `%${cond.value}%` };
                break;
            case "$exclL":
                str = `${field} NOT ${likeOperator} :${param}`;
                params = { [param]: `%${cond.value}%` };
                break;
            case "$inL":
                this.checkFilterIsArray(cond);
                str = `LOWER(${field}) IN (:...${param})`;
                break;
            case "$notinL":
                this.checkFilterIsArray(cond);
                str = `LOWER(${field}) NOT IN (:...${param})`;
                break;
            default:
                str = `${field} = :${param}`;
                break;
        }
        if (typeof params === "undefined") {
            params = { [param]: cond.value };
        }
        return { str, params };
    }
    checkFilterIsArray(cond, withLength) {
        if (!Array.isArray(cond.value) ||
            cond.value.length === 0 ||
            (!(0, checks_util_1.isNil)(withLength) ? withLength : false)) {
            this.throwBadRequestException(`Invalid column '${cond.field}' value`);
        }
    }
    async import(inputCls, data) {
        const inputs = (0, class_transformer_1.plainToClass)(inputCls, data, {
            enableImplicitConversion: true,
        });
        const inputObjectClass = (0, class_transformer_1.plainToClass)(inputCls, {});
        const errors = [];
        const keys = Object.keys(inputObjectClass);
        let errorCount = 0;
        const uniqueFields = keys.filter((key) => Reflect.getMetadata("validator:unique", inputObjectClass, key));
        const uniqueErrors = (0, unique_in_array_1.UniqueInArray)(inputs, uniqueFields);
        errorCount = uniqueErrors.length;
        for (const err of uniqueErrors) {
            errors.push({
                target: err.target,
                errors: (0, exception_factory_1.mapErrors)([err]),
            });
        }
        for (const input of inputs) {
            const validationErrors = await (0, class_validator_1.validate)(input, {
                skipMissingProperties: true,
                whitelist: true,
            });
            if (validationErrors.length > 0) {
                errorCount++;
                const existingError = errors.findIndex(({ target }) => (0, checks_util_1.isEqual)(target, input));
                if (existingError < 0) {
                    errors.push({
                        target: input,
                        errors: (0, exception_factory_1.mapErrors)(validationErrors),
                    });
                }
                else {
                    errors[existingError] = {
                        target: input,
                        errors: [
                            ...errors[existingError].errors,
                            ...(0, exception_factory_1.mapErrors)(validationErrors),
                        ],
                    };
                }
            }
        }
        if (errorCount > 0) {
            return {
                keys,
                errorCount,
                errors,
                isValid: false,
                successCount: 0,
                totalCount: inputs.length,
            };
        }
        await (0, typeorm_1.getManager)().transaction(async () => {
            await this.repository.save(this.repository.create(inputs), { chunk: 500 });
        });
        return {
            keys,
            errors: [],
            isValid: true,
            successCount: inputs.length,
            errorCount: 0,
            totalCount: inputs.length,
        };
    }
    async crudGetOne(id, langCode, req = empty_crud_request_1.emptyCrudRequest) {
        return this.getOne({
            parsed: {
                ...req.parsed,
                search: { id },
            },
            options: {
                ...req.options,
                params: {
                    id: {
                        field: "id",
                        type: "uuid",
                        primary: true,
                    },
                },
            },
        }, langCode);
    }
    async crudGetMany(req = empty_crud_request_1.emptyCrudRequest, langCode) {
        const request = {
            parsed: {
                ...req.parsed,
            },
            options: {
                ...req.options,
                query: {
                    ...req.options.query,
                    alwaysPaginate: true,
                    exclude: [...this.exclude, "version"],
                    join: this.join,
                },
                params: {
                    ...req.options.params,
                },
            },
        };
        const { data, count, page, pageCount, total } = (await this.getMany(request, langCode));
        return {
            items: data,
            count,
            page,
            pageCount,
            total,
        };
    }
    throwBadRequestException(msg) {
        throw new common_1.BadRequestException(msg);
    }
    throwNotFoundException(name) {
        throw new common_1.NotFoundException(`${name} not found`);
    }
    throwInternalServerException(name, operation) {
        throw new common_1.NotFoundException(`Error performing ${operation} on ${name}.`);
    }
    createPageInfo(data, total, limit, offset) {
        return {
            data,
            count: data.length,
            total,
            page: Math.floor(offset / limit) + 1,
            pageCount: limit && total ? Math.ceil(total / limit) : undefined,
        };
    }
    getTake(query, options) {
        if (query.limit) {
            if (options.maxLimit) {
                return query.limit <= options.maxLimit ? query.limit : options.maxLimit;
            }
            else {
                return query.limit;
            }
        }
        if (options.limit) {
            if (options.maxLimit) {
                return options.limit <= options.maxLimit
                    ? options.limit
                    : options.maxLimit;
            }
            else {
                return options.limit;
            }
        }
        return options.maxLimit ?? null;
    }
    getSkip(query, take) {
        return query.page && take ? take * (query.page - 1) : query.offset ?? null;
    }
}
exports.TypeOrmCrudService = TypeOrmCrudService;
//# sourceMappingURL=typeorm-crud.service.js.map