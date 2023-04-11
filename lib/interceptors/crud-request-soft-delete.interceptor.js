"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRequestSoftDeleteInterceptor = void 0;
const common_1 = require("@nestjs/common");
let CrudRequestSoftDeleteInterceptor = class CrudRequestSoftDeleteInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        if (req.query.softDelete) {
            req["NESTJSX_PARSED_CRUD_REQUEST_KEY"].options.query.softDelete = true;
            req["NESTJSX_PARSED_CRUD_REQUEST_KEY"].parsed.includeDeleted = 1;
        }
        return next.handle();
    }
};
CrudRequestSoftDeleteInterceptor = __decorate([
    (0, common_1.Injectable)()
], CrudRequestSoftDeleteInterceptor);
exports.CrudRequestSoftDeleteInterceptor = CrudRequestSoftDeleteInterceptor;
//# sourceMappingURL=crud-request-soft-delete.interceptor.js.map