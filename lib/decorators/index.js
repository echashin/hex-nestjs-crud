"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./api-paginated-response"), exports);
__exportStar(require("./crud-controller.decorator"), exports);
__exportStar(require("./crud-create.decorator"), exports);
__exportStar(require("./crud-create-many.decorator"), exports);
__exportStar(require("./crud-delete.decorator"), exports);
__exportStar(require("./crud-delete-many.decorator"), exports);
__exportStar(require("./crud-export.decorator"), exports);
__exportStar(require("./crud-find.decorator"), exports);
__exportStar(require("./crud-find-one.decorator"), exports);
__exportStar(require("./crud-import.decorator"), exports);
__exportStar(require("./crud-recover.decorator"), exports);
__exportStar(require("./crud-update.decorator"), exports);
__exportStar(require("./crud-update-many.decorator"), exports);
__exportStar(require("./parsed-request.decorator"), exports);
//# sourceMappingURL=index.js.map