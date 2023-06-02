import { applyDecorators, Post, Type } from "@nestjs/common";
import {
    ApiCreatedResponse, ApiExtension,
    ApiExtraModels,
    ApiOperation,
    getSchemaPath,
} from "@nestjs/swagger";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";

export const CrudCreate: any = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOperation({ summary: `Create one item ${model.name}` }),
    ApiExtraModels(model),
    ApiExtension('x-crud-method', { type: CrudMethodsEnum.create }),
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
