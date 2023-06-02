import {applyDecorators, Patch} from "@nestjs/common";
import {ApiExtension, ApiOkResponse, ApiOperation, ApiQuery} from "@nestjs/swagger";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";


export function CrudUpdateMany(): any {
    return applyDecorators(
        ApiOperation({summary: `Update multiple items`}),
        ApiOkResponse({type: Number}),
        ApiExtension('x-crud-method', {type: CrudMethodsEnum.updateMany}),
        ApiQuery({
            name: "ids",
            required: true,
            type: String,
            isArray: true,
            description: "ID`s of items selected for update",
        }),
        Patch()
    );
}
