"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUUID = exports.validateParamOption = exports.validateNumeric = exports.validateSort = exports.validateJoin = exports.validateComparisonOperator = exports.validateCondition = exports.validateFields = exports.sortOrdersList = exports.comparisonOperatorsList = exports.deprecatedComparisonOperatorsList = void 0;
const common_1 = require("@nestjs/common");
const request_query_types_1 = require("./types/request-query.types");
const checks_util_1 = require("./utils/checks.util");
exports.deprecatedComparisonOperatorsList = [
    "eq",
    "ne",
    "gt",
    "lt",
    "gte",
    "lte",
    "starts",
    "ends",
    "cont",
    "excl",
    "in",
    "notin",
    "isnull",
    "notnull",
    "between",
];
exports.comparisonOperatorsList = [
    ...exports.deprecatedComparisonOperatorsList,
    ...Object.keys(request_query_types_1.CondOperator).map((n) => request_query_types_1.CondOperator[n]),
];
exports.sortOrdersList = ["ASC", "DESC"];
const comparisonOperatorsListStr = exports.comparisonOperatorsList.join(",");
const sortOrdersListStr = exports.sortOrdersList.join(",");
function validateFields(fields) {
    if (!(0, checks_util_1.isArrayStrings)(fields)) {
        throw new common_1.BadRequestException("Invalid fields. Array of strings expected");
    }
}
exports.validateFields = validateFields;
function validateCondition(val, cond) {
    if (!(0, checks_util_1.isObject)(val) || !(0, checks_util_1.isStringFull)(val.field)) {
        throw new common_1.BadRequestException(`Invalid field type in ${cond} condition. String expected`);
    }
    validateComparisonOperator(val.operator);
}
exports.validateCondition = validateCondition;
function validateComparisonOperator(operator) {
    if (!exports.comparisonOperatorsList.includes(operator)) {
        throw new common_1.BadRequestException(`Invalid comparison operator. ${comparisonOperatorsListStr} expected`);
    }
}
exports.validateComparisonOperator = validateComparisonOperator;
function validateJoin(join) {
    if (!(0, checks_util_1.isObject)(join) || !(0, checks_util_1.isStringFull)(join.field)) {
        throw new common_1.BadRequestException("Invalid join field. String expected");
    }
    if (!(0, checks_util_1.isUndefined)(join.select) && !(0, checks_util_1.isArrayStrings)(join.select)) {
        throw new common_1.BadRequestException("Invalid join select. Array of strings expected");
    }
}
exports.validateJoin = validateJoin;
function validateSort(sort) {
    if (!(0, checks_util_1.isObject)(sort) || !(0, checks_util_1.isStringFull)(sort.field)) {
        throw new common_1.BadRequestException("Invalid sort field. String expected");
    }
    if (!(0, checks_util_1.isEqual)(sort.order, exports.sortOrdersList[0]) &&
        !(0, checks_util_1.isEqual)(sort.order, exports.sortOrdersList[1])) {
        throw new common_1.BadRequestException(`Invalid sort order. ${sortOrdersListStr} expected`);
    }
}
exports.validateSort = validateSort;
function validateNumeric(val, num) {
    if (!(0, checks_util_1.isNumber)(val)) {
        throw new common_1.BadRequestException(`Invalid ${num}. Number expected`);
    }
}
exports.validateNumeric = validateNumeric;
function validateParamOption(options, name) {
    if (!(0, checks_util_1.isObject)(options)) {
        throw new common_1.BadRequestException(`Invalid param ${name}. Invalid crud options`);
    }
    const option = options[name];
    if (option && option.disabled) {
        return;
    }
    if (!(0, checks_util_1.isObject)(option) || (0, checks_util_1.isNil)(option.field) || (0, checks_util_1.isNil)(option.type)) {
        throw new common_1.BadRequestException(`Invalid param option in Crud`);
    }
}
exports.validateParamOption = validateParamOption;
function validateUUID(str, name) {
    const uuid = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
    const uuidV4 = /^[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[\da-f]{4}-[\da-f]{12}$/i;
    if (!uuidV4.test(str) && !uuid.test(str)) {
        throw new common_1.BadRequestException(`Invalid param ${name}. UUID string expected`);
    }
}
exports.validateUUID = validateUUID;
//# sourceMappingURL=request-query.validator.js.map