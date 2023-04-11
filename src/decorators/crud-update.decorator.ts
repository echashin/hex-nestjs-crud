import {applyDecorators, Patch, Type} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, getSchemaPath} from "@nestjs/swagger";


export const CrudUpdate: any = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiOperation({summary: `Update item ${model.name}`}),
        ApiOkResponse({
            schema: {
                title: `${model.name}`,
                $ref: getSchemaPath(model),
            },
        }),
        Patch(":id")
    );
};
