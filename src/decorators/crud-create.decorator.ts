import { applyDecorators, Post, Type } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";

export const CrudCreate: any = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOperation({ summary: `Create one item ${model.name}` }),
    ApiExtraModels(model),
    ApiCreatedResponse({
      schema: {
        title: `${model.name}`,
        $ref: getSchemaPath(model),
      },
      headers: {
        Location: {
          description: "...",
          schema: { title: `${model.name}`, $ref: getSchemaPath(model) },
        },
      },
    }),
    Post()
  );
};
