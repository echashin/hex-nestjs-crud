import * as XLSX from "xlsx";
import {customObjectsToJson} from "./custom-objects-to-json";

export function convertJsonToExcel<T>(items: T[], bookType: XLSX.BookType = "xlsx"): Buffer {
    const json: Record<string, string | number | boolean>[] =
        customObjectsToJson<T>(items, true);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(workBook, workSheet, `items`);
    return XLSX.write(workBook, {type: "buffer", bookType});
}
