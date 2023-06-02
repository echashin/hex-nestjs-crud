import { applyDecorators, Put, Type } from "@nestjs/common";
import {ApiExtension, ApiOkResponse, ApiOperation, getSchemaPath} from "@nestjs/swagger";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";



export const CrudRecover: any = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOperation({ summary: `Recover item ${model.name}` }),
    ApiExtension('x-crud-method', { type: CrudMethodsEnum.recover }),
    ApiOkResponse({
      schema: {
        title: `${model.name}`,
        $ref: getSchemaPath(model),
      },
    }),
    Put(":id")
  );
};
