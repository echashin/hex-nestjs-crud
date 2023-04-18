"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportContentTypeInterceptor = void 0;
const common_1 = require("@nestjs/common");
const mime_types_1 = __importDefault(require("mime-types"));
const transfer_file_type_enum_1 = require("../enums/transfer-file-type.enum");
let ExportContentTypeInterceptor = class ExportContentTypeInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        if (req.query.fileExt &&
            Object.values(transfer_file_type_enum_1.TransferFileTypeEnum).includes(req.query.fileExt.toLowerCase())) {
            res.headers["Content-Type"] = mime_types_1.default.contentType(req.query.fileExt.toLowerCase());
        }
        return next.handle();
    }
};
ExportContentTypeInterceptor = __decorate([
    (0, common_1.Injectable)()
], ExportContentTypeInterceptor);
exports.ExportContentTypeInterceptor = ExportContentTypeInterceptor;
//# sourceMappingURL=export-content-type.interceptor.js.map