"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFileToJson = void 0;
const check_file_ext_1 = require("./check-file-ext");
const transfer_file_type_enum_1 = require("../enums/transfer-file-type.enum");
const convert_excel_to_json_1 = require("./convert-excel-to-json");
const convert_json_file_to_json_1 = require("./convert-json-file-to-json");
function convertFileToJson(buffer, fileExt) {
    (0, check_file_ext_1.checkFileExt)(fileExt);
    if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.xlsx ||
        fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.ods) {
        return (0, convert_excel_to_json_1.convertExcelToJson)(buffer);
    }
    else if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.json) {
        return (0, convert_json_file_to_json_1.convertJsonFileToJson)(buffer);
    }
}
exports.convertFileToJson = convertFileToJson;
//# sourceMappingURL=convert-file-to-json.js.map