"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFileExt = void 0;
const transfer_file_type_enum_1 = require("../enums/transfer-file-type.enum");
const common_1 = require("@nestjs/common");
function checkFileExt(fileExt) {
    if (!Object.values(transfer_file_type_enum_1.TransferFileTypeEnum).includes(fileExt.toLowerCase())) {
        throw new common_1.BadRequestException("Not supported file format");
    }
}
exports.checkFileExt = checkFileExt;
//# sourceMappingURL=check-file-ext.js.map