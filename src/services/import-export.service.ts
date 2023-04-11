import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import dot from "dot-object";
import * as XLSX from "xlsx";

import { TransferFileTypeEnum } from "../../shared/enums/transfer-file-type.enum";
import { LangCodeListType } from "../../shared/types/lang-code-list.type";

@Injectable()
export class ImportExportService {
  convertFileToJson<T>(buffer: Buffer, fileExt: string): T[] {
    this.checkFileExt(fileExt);

    if (
      fileExt === TransferFileTypeEnum.xlsx ||
      fileExt === TransferFileTypeEnum.ods
    ) {
      return this.convertExcelToJson<T>(buffer);
    } else if (fileExt === TransferFileTypeEnum.json) {
      return this.convertJsonFileToJson<T>(buffer);
    }
  }

  convertJsonToFile<T>(items: T[], fileExt: string): Buffer {
    this.checkFileExt(fileExt);

    if (
      fileExt === TransferFileTypeEnum.xlsx ||
      fileExt === TransferFileTypeEnum.ods
    ) {
      return this.convertJsonToExcel<T>(items, fileExt);
    } else if (fileExt === TransferFileTypeEnum.json) {
      return this.convertJsonToJsonFile<T>(items);
    }
  }

  convertExcelToJson<T>(buffer: Buffer): T[] {
    const workbook: XLSX.WorkBook = XLSX.read(buffer);
    const sheet_name_list: string[] = workbook.SheetNames;
    return XLSX.utils
      .sheet_to_json(workbook.Sheets[sheet_name_list[0]])
      .map((row: any) => dot.object(row) as unknown as T);
  }

  convertJsonFileToJson<T>(buffer: Buffer): T[] {
    return JSON.parse(buffer.toString()).map(
      (row: any) => dot.object(row) as unknown as T
    );
  }

  convertJsonToJsonFile<T>(items: T[]): Buffer {
    const json: Record<string, string | number | boolean>[] =
      this.customObjectsToJson<T>(items);
    return Buffer.from(JSON.stringify(json));
  }

  convertJsonToExcel<T>(items: T[], bookType: XLSX.BookType = "xlsx"): Buffer {
    const json: Record<string, string | number | boolean>[] =
      this.customObjectsToJson<T>(items, true);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    const workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(workBook, workSheet, `items`);
    return XLSX.write(workBook, { type: "buffer", bookType });
  }

  customObjectsToJson<T>(
    items: T[],
    toDotted: boolean = false
  ): Record<string, string | number | boolean>[] {
    if (items.length === 0) {
      throw new NotFoundException("Items not found");
    }

    const reg: RegExp = new RegExp(`_i18n$`);
    const keys: string[] = Object.keys(items[0]);
    const multilang: string[] = keys.filter((key: string) => reg.test(key));
    const empty_i18n: LangCodeListType = {
      DE: "",
      EN: "",
      FR: "",
    };

    return items
      .map((item: T) => {
        for (const key of multilang) {
          item[key] = item[key] ?? empty_i18n;
        }
        return item;
      })
      .map((item: T) => (toDotted ? dot.dot(item) : item));
  }

  checkFileExt(fileExt: string): void {
    if (
      !(Object.values(TransferFileTypeEnum) as string[]).includes(
        fileExt.toLowerCase()
      )
    ) {
      throw new BadRequestException("Not supported file format");
    }
  }
}
