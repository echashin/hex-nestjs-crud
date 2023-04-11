"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudDelete = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function CrudDelete() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: "Delete one item" }), (0, swagger_1.ApiOkResponse)({ type: Number }), (0, common_1.Delete)(":id"));
}
exports.CrudDelete = CrudDelete;
//# sourceMappingURL=crud-delete.decorator.js.map