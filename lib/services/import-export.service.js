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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportExportService = void 0;
const common_1 = require("@nestjs/common");
const dot_object_1 = __importDefault(require("dot-object"));
const XLSX = __importStar(require("xlsx"));
const transfer_file_type_enum_1 = require("../enums/transfer-file-type.enum");
let ImportExportService = class ImportExportService {
    convertFileToJson(buffer, fileExt) {
        this.checkFileExt(fileExt);
        if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.xlsx ||
            fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.ods) {
            return this.convertExcelToJson(buffer);
        }
        else if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.json) {
            return this.convertJsonFileToJson(buffer);
        }
    }
    convertJsonToFile(items, fileExt) {
        this.checkFileExt(fileExt);
        if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.xlsx ||
            fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.ods) {
            return this.convertJsonToExcel(items, fileExt);
        }
        else if (fileExt === transfer_file_type_enum_1.TransferFileTypeEnum.json) {
            return this.convertJsonToJsonFile(items);
        }
    }
    convertExcelToJson(buffer) {
        const workbook = XLSX.read(buffer);
        const sheet_name_list = workbook.SheetNames;
        return XLSX.utils
            .sheet_to_json(workbook.Sheets[sheet_name_list[0]])
            .map((row) => dot_object_1.default.object(row));
    }
    convertJsonFileToJson(buffer) {
        return JSON.parse(buffer.toString()).map((row) => dot_object_1.default.object(row));
    }
    convertJsonToJsonFile(items) {
        const json = this.customObjectsToJson(items);
        return Buffer.from(JSON.stringify(json));
    }
    convertJsonToExcel(items, bookType = "xlsx") {
        const json = this.customObjectsToJson(items, true);
        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(json);
        XLSX.utils.book_append_sheet(workBook, workSheet, `items`);
        return XLSX.write(workBook, { type: "buffer", bookType });
    }
    customObjectsToJson(items, toDotted = false) {
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
    checkFileExt(fileExt) {
        if (!Object.values(transfer_file_type_enum_1.TransferFileTypeEnum).includes(fileExt.toLowerCase())) {
            throw new common_1.BadRequestException("Not supported file format");
        }
    }
};
ImportExportService = __decorate([
    (0, common_1.Injectable)()
], ImportExportService);
exports.ImportExportService = ImportExportService;
//# sourceMappingURL=import-export.service.js.map