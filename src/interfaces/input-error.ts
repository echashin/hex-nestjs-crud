import { ApiProperty } from "@nestjs/swagger";

export class InputError {
  @ApiProperty({ required: true, type: String })
  message!: string;

  @ApiProperty({ required: true, type: String })
  property!: string;
}
