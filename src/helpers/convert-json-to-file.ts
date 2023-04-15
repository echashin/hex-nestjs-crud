import {checkFileExt} from "./check-file-ext";
import {TransferFileTypeEnum} from "../enums/transfer-file-type.enum";
import {convertJsonToExcel} from "./convert-json-to-excel";
import {convertJsonToJsonFile} from "./convert-json-to-json-file";

export function convertJsonToFile<T>(items: T[], fileExt: string): Buffer {
    checkFileExt(fileExt);

    if (
        fileExt === TransferFileTypeEnum.xlsx ||
        fileExt === TransferFileTypeEnum.ods
    ) {
        return convertJsonToExcel<T>(items, fileExt);
    } else if (fileExt === TransferFileTypeEnum.json) {
        return convertJsonToJsonFile<T>(items);
    }
}