import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";

import { Pageable } from "../dto/pageable.dto";

export const ApiPaginatedResponse: any = <TModel extends Type<any>>(
  model: TModel
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `Pageable<${model.name}>`,
        allOf: [
          { $ref: getSchemaPath(Pageable) },
          {
            properties: {
              items: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};
