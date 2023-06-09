"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.hasValue = exports.isValue = exports.isDate = exports.isDateString = exports.isNumeric = exports.isBoolean = exports.isIn = exports.isTrue = exports.isFalse = exports.isEqual = exports.isNumber = exports.isObject = exports.isArrayStrings = exports.isArrayFull = exports.isStringFull = exports.hasLength = exports.isString = exports.isNil = exports.isNull = exports.isUndefined = void 0;
const isUndefined = (val) => typeof val === "undefined";
exports.isUndefined = isUndefined;
const isNull = (val) => val === null;
exports.isNull = isNull;
const isNil = (val) => (0, exports.isUndefined)(val) || (0, exports.isNull)(val);
exports.isNil = isNil;
const isString = (val) => typeof val === "string";
exports.isString = isString;
const hasLength = (val) => val.length > 0;
exports.hasLength = hasLength;
const isStringFull = (val) => (0, exports.isString)(val) && (0, exports.hasLength)(val);
exports.isStringFull = isStringFull;
const isArrayFull = (val) => Array.isArray(val) && (0, exports.hasLength)(val);
exports.isArrayFull = isArrayFull;
const isArrayStrings = (val) => (0, exports.isArrayFull)(val) && val.every((v) => (0, exports.isStringFull)(v));
exports.isArrayStrings = isArrayStrings;
const isObject = (val) => typeof val === "object" && !(0, exports.isNull)(val);
exports.isObject = isObject;
const isNumber = (val) => typeof val === "number" && !Number.isNaN(val) && Number.isFinite(val);
exports.isNumber = isNumber;
const isEqual = (val, eq) => val === eq;
exports.isEqual = isEqual;
const isFalse = (val) => val === false;
exports.isFalse = isFalse;
const isTrue = (val) => val === true;
exports.isTrue = isTrue;
const isIn = (val, arr = []) => arr.some((o) => (0, exports.isEqual)(val, o));
exports.isIn = isIn;
const isBoolean = (val) => typeof val === "boolean";
exports.isBoolean = isBoolean;
const isNumeric = (val) => /^[+-]?(\d*\.)?\d+$/.test(val);
exports.isNumeric = isNumeric;
const isDateString = (val) => (0, exports.isStringFull)(val) &&
    /^\d{4}-[01]\d-[0-3]\d(?:T[0-2](?:\d:[0-5]){2}\d(?:\.\d+)?(?:Z|[+-][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(val);
exports.isDateString = isDateString;
const isDate = (val) => val instanceof Date;
exports.isDate = isDate;
const isValue = (val) => (0, exports.isStringFull)(val) || (0, exports.isNumber)(val) || (0, exports.isBoolean)(val) || (0, exports.isDate)(val);
exports.isValue = isValue;
const hasValue = (val) => (0, exports.isArrayFull)(val)
    ? val.every((o) => (0, exports.isValue)(o))
    : (0, exports.isValue)(val);
exports.hasValue = hasValue;
const isFunction = (val) => typeof val === "function";
exports.isFunction = isFunction;
//# sourceMappingURL=checks.util.js.map