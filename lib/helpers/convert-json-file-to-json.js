"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonFileToJson = void 0;
const dot_object_1 = __importDefault(require("dot-object"));
function convertJsonFileToJson(buffer) {
    return JSON.parse(buffer.toString()).map((row) => dot_object_1.default.object(row));
}
exports.convertJsonFileToJson = convertJsonFileToJson;
//# sourceMappingURL=convert-json-file-to-json.js.map