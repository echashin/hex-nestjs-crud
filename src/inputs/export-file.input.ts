import {ApiProperty} from "@nestjs/swagger";
import {Exclude, Expose, Transform} from "class-transformer";
import {TransformFnParams} from "class-transformer/types/interfaces";
import {IsDefined, IsEnum, IsNotEmpty, IsOptional,} from "class-validator";
import {TransferFileTypeEnum} from "../enums/transfer-file-type.enum";

@Exclude()
export class ExportFileInput {
    @ApiProperty({required: false, type: String, isArray: true})
    @IsOptional()
    @Transform(
        ({value}: TransformFnParams) =>
            value && (Array.isArray(value) ? value : [value as unknown as string])
    )
    @Expose()
    ids?: string[];

    @ApiProperty({
        type: TransferFileTypeEnum,
        required: true,
        default: TransferFileTypeEnum.json,
        enum: TransferFileTypeEnum,
        enumName: 'TransferFileTypeEnum'
    })
    @IsNotEmpty()
    @IsDefined()
    @IsEnum(TransferFileTypeEnum)
    @Expose()
    fileExt!: TransferFileTypeEnum;
}
