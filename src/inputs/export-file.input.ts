import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform } from "class-transformer";
import { TransformFnParams } from "class-transformer/types/interfaces";
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

@Exclude()
export class ExportFileInput {
  @ApiProperty({ required: false, type: String, isArray: true })
  @IsOptional()
  @Transform(
    ({ value }: TransformFnParams) =>
      value && (Array.isArray(value) ? value : [value as unknown as string])
  )
  @Expose()
  ids?: string[];

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @Expose()
  fileExt!: string;

  @ApiProperty({ required: false, type: String })
  @IsUUID(4)
  @IsOptional()
  @Expose()
  storeId?: string;
}
