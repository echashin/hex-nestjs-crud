import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FindInput {
  @ApiProperty({
    type: String,
    isArray: false,
    description: 'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>',
    required: false,
    //format: 'form',
  })
  @Expose()
  fields?: string;

  @ApiProperty({
    type: String,
    isArray: false,
    required: false,
    description: 'Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>',
  })
  @Expose()
  s?: string;

  @ApiProperty({
    type: String,
    isArray: true,
    required: false,
    description: 'Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>',
  })
  @Expose()
  filter?: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    required: false,
    description: 'Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>',
  })
  @Expose()
  or?: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    required: false,
    description: 'Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>',
  })
  @Expose()
  sort?: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    required: false,
    description: 'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>',
  })
  @Expose()
  join?: string[];

  @ApiProperty({
    type: Number,
    isArray: false,
    required: false,
    description: 'Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>',
  })
  @Expose()
  limit?: number;

  // @ApiProperty({
  //   type: Number,
  //   isArray: false,
  //   required: false,
  //   description: 'Offset amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#offset" target="_blank">Docs</a>',
  // })
  // offset?: number;

  @ApiProperty({
    type: Number,
    isArray: false,
    required: false,
    description: 'Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>',
    example: 1,
  })
  @Expose()
  page?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Load deleted items',
    example: false,
  })
  @Expose()
  softDelete?: boolean;

  // @ApiProperty({
  //   type: Number,
  //   isArray: false,
  //   required: false,
  //   description: 'Reset cache (if was enabled). <a href="https://github.com/nestjsx/crud/wiki/Requests#cache" target="_blank">Docs</a>',
  // })
  // cache?: number;
}
