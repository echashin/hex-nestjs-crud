import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

import { InputError } from "../../shared/models/input-error";

@Exclude()
export class ImportErrorDto {
  @ApiProperty({ required: false, type: Object, description: "Input value" })
  @Expose()
  target: Record<string, any>;

  @ApiProperty({
    required: false,
    type: [InputError],
    description: "Validation errors",
  })
  @Expose()
  errors: InputError[];
}
