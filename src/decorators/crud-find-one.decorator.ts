import {
    applyDecorators,
    ClassSerializerInterceptor,
    Get,
    Type,
    UseInterceptors,
} from "@nestjs/common";
import {
    ApiExtension,
    ApiExtraModels,
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    getSchemaPath,
} from "@nestjs/swagger";

import {CrudRequestInterceptor} from "../interceptors/crud-request.interceptor";
import {FindOneInput} from "../inputs";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";

export const CrudFindOne: any = <TModel extends Type<any>>(entity: TModel) => {
    return applyDecorators(
        Get(":id"),
        ApiOperation({
            summary: `Retrieve one item ${entity.name}`,
            description: "find on item",
        }),
        ApiExtraModels(FindOneInput),
        ApiExtension('x-crud-method', { type: CrudMethodsEnum.findOne }),
        UseInterceptors(
            CrudRequestInterceptor,
            ClassSerializerInterceptor,
        ),
        ApiOkResponse({
            schema: {
                title: `${entity.name}`,
                $ref: getSchemaPath(entity),
            },
        }),
        ApiQuery({
            name: "fields",
            required: false,
            type: String,
            isArray: false,
            description:
                'Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "join",
            required: false,
            explode: true,
            type: String,
            isArray: true,
            description:
                'Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>',
        }),
        ApiQuery({
            name: "includeDeleted",
            required: false,
            type: Boolean,
            description: "Load deleted items",
        }),
    );
};
