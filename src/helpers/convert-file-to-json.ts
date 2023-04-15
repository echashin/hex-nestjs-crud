import {checkFileExt} from "./check-file-ext";
import {TransferFileTypeEnum} from "../enums/transfer-file-type.enum";
import {convertExcelToJson} from "./convert-excel-to-json";
import {convertJsonFileToJson} from "./convert-json-file-to-json";

export function convertFileToJson<T>(buffer: Buffer, fileExt: string): T[] {
    checkFileExt(fileExt);

    if (
        fileExt === TransferFileTypeEnum.xlsx ||
        fileExt === TransferFileTypeEnum.ods
    ) {
        return convertExcelToJson<T>(buffer);
    } else if (fileExt === TransferFileTypeEnum.json) {
        return convertJsonFileToJson<T>(buffer);
    }
}