"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonToFile = void 0;
const check_file_ext_1 = require("./check-file-ext");
const transfer_file_type_enum_1 = require("../enums/transfer-file-type.enum");
const convert_json_to_excel_1 = require("./convert-json-to-excel");
const convert_json_to_json_file_1 = require("./convert-json-to-json-file");
function convertJsonToFile(items, fileExt) {
    (0, check_file_ext_1.checkFileExt)(fileExt);
    if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.xlsx ||
        fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.ods) {
        return (0, convert_json_to_excel_1.convertJsonToExcel)(items, fileExt);
    }
    else if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.json) {
        return (0, convert_json_to_json_file_1.convertJsonToJsonFile)(items);
    }
}
exports.convertJsonToFile = convertJsonToFile;
//# sourceMappingURL=convert-json-to-file.js.map