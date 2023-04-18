"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRequest = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
exports.CrudRequest = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request[constants_1.PARSED_CRUD_REQUEST_KEY];
});
//# sourceMappingURL=crud-request.decorator.js.map