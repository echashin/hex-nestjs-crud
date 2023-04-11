"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportErrorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const input_error_1 = require("../interfaces/input-error");
let ImportErrorDto = class ImportErrorDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Object, description: "Input value" }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], ImportErrorDto.prototype, "target", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: [input_error_1.InputError],
        description: "Validation errors",
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], ImportErrorDto.prototype, "errors", void 0);
ImportErrorDto = __decorate([
    (0, class_transformer_1.Exclude)()
], ImportErrorDto);
exports.ImportErrorDto = ImportErrorDto;
//# sourceMappingURL=import-error.dto.js.map