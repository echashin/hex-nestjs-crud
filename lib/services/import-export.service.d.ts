/// <reference types="node" />
import * as XLSX from "xlsx";
export declare class ImportExportService {
    convertFileToJson<T>(buffer: Buffer, fileExt: string): T[];
    convertJsonToFile<T>(items: T[], fileExt: string): Buffer;
    convertExcelToJson<T>(buffer: Buffer): T[];
    convertJsonFileToJson<T>(buffer: Buffer): T[];
    convertJsonToJsonFile<T>(items: T[]): Buffer;
    convertJsonToExcel<T>(items: T[], bookType?: XLSX.BookType): Buffer;
    customObjectsToJson<T>(items: T[], toDotted?: boolean): Record<string, string | number | boolean>[];
    checkFileExt(fileExt: string): void;
}
//# sourceMappingURL=import-export.service.d.ts.map