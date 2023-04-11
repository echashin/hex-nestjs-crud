import { applyDecorators, Put, Type } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";



export const CrudRecover: any = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOperation({ summary: `Recover item ${model.name}` }),
    ApiOkResponse({
      schema: {
        title: `${model.name}`,
        $ref: getSchemaPath(model),
      },
    }),
    Put(":id")
  );
};
