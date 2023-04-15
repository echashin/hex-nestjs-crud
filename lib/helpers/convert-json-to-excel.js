"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonToExcel = void 0;
const XLSX = __importStar(require("xlsx"));
const custom_objects_to_json_1 = require("./custom-objects-to-json");
function convertJsonToExcel(items, bookType = "xlsx") {
    const json = (0, custom_objects_to_json_1.customObjectsToJson)(items, true);
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(workBook, workSheet, `items`);
    return XLSX.write(workBook, { type: "buffer", bookType });
}
exports.convertJsonToExcel = convertJsonToExcel;
//# sourceMappingURL=convert-json-to-excel.js.map