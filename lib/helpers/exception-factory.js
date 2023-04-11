"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionFactory = exports.mapErrors = void 0;
const http_error_by_code_util_1 = require("@nestjs/common/utils/http-error-by-code.util");
function mapErrors(errors, parentProperty = "") {
    return errors.flatMap((error) => {
        if (error?.children && error?.children.length > 0) {
            return mapErrors(error.children, error.property).flat();
        }
        return {
            property: parentProperty
                ? `${parentProperty}.${error.property}`
                : error.property,
            message: Object.values(error.constraints)[0],
        };
    });
}
exports.mapErrors = mapErrors;
function exceptionFactory(validationErrors = []) {
    const errors = mapErrors(validationErrors);
    return new http_error_by_code_util_1.HttpErrorByCode[400](errors);
}
exports.exceptionFactory = exceptionFactory;
//# sourceMappingURL=exception-factory.js.map