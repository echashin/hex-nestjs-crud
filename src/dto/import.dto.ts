import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

import { ImportErrorDto } from "./import-error.dto";

@Exclude()
export class ImportDto {
  @ApiProperty({
    required: true,
    type: [String],
    description: "Input object keys",
  })
  @Expose()
  keys!: string[];

  @ApiProperty({
    required: true,
    type: [ImportErrorDto],
    description: "Validation errors",
  })
  @Expose()
  errors!: ImportErrorDto[];

  @ApiProperty({
    required: true,
    type: Boolean,
    description: "Number of rows with errors",
  })
  @Expose()
  isValid!: boolean;

  @ApiProperty({
    required: true,
    type: Number,
    description: "Number of rows with errors",
  })
  @Expose()
  errorCount!: number;

  @ApiProperty({
    required: true,
    type: Number,
    description: "Total imported rows count",
  })
  @Expose()
  successCount!: number;

  @ApiProperty({
    required: true,
    type: Number,
    description: "Total rows count",
  })
  @Expose()
  totalCount!: number;
}
