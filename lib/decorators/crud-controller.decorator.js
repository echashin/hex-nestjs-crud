"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const change_case_1 = require("change-case");
const dto_1 = require("../dto");
const inputs_1 = require("../inputs");
const CrudController = (model) => {
    const name = `crud-${(0, change_case_1.paramCase)(model.name).replace(/-entity$/, "")}`;
    return (0, common_1.applyDecorators)((0, swagger_1.ApiTags)(name), (0, common_1.Controller)(name), (0, swagger_1.ApiExtraModels)(dto_1.Pageable, inputs_1.FindInput));
};
exports.CrudController = CrudController;
//# sourceMappingURL=crud-controller.decorator.js.map