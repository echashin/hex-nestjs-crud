"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customObjectsToJson = void 0;
const common_1 = require("@nestjs/common");
const dot_object_1 = __importDefault(require("dot-object"));
function customObjectsToJson(items, toDotted = false) {
    if (items.length === 0) {
        throw new common_1.NotFoundException("Items not found");
    }
    const reg = new RegExp(`_i18n$`);
    const keys = Object.keys(items[0]);
    const multilang = keys.filter((key) => reg.test(key));
    const empty_i18n = {
        DE: "",
        EN: "",
        FR: "",
    };
    return items
        .map((item) => {
        for (const key of multilang) {
            item[key] = item[key] ?? empty_i18n;
        }
        return item;
    })
        .map((item) => (toDotted ? dot_object_1.default.dot(item) : item));
}
exports.customObjectsToJson = customObjectsToJson;
//# sourceMappingURL=custom-objects-to-json.js.map