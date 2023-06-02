import {applyDecorators, Delete} from "@nestjs/common";
import {ApiExtension, ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";


export function CrudDeleteOne(): any {
    return applyDecorators(
        ApiOperation({summary: "Delete one item"}),
        ApiExtension('x-crud-method', { type: CrudMethodsEnum.deleteOne }),
        ApiOkResponse({type: Number}),
        Delete(":id")
    );
}
