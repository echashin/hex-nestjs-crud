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
exports.FindInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
let FindInput = class FindInput {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: false,
        description: 'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>',
        required: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FindInput.prototype, "fields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: false,
        required: false,
        description: 'Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], FindInput.prototype, "s", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        required: false,
        description: 'Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], FindInput.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        required: false,
        description: 'Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], FindInput.prototype, "or", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        required: false,
        description: 'Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], FindInput.prototype, "sort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        isArray: true,
        required: false,
        description: 'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], FindInput.prototype, "join", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        isArray: false,
        required: false,
        description: 'Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], FindInput.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        isArray: false,
        required: false,
        description: 'Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>',
        example: 1,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], FindInput.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        required: false,
        description: 'Load deleted items',
        example: false,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], FindInput.prototype, "softDelete", void 0);
FindInput = __decorate([
    (0, class_transformer_1.Exclude)()
], FindInput);
exports.FindInput = FindInput;
//# sourceMappingURL=find.input.js.map