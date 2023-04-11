import {applyDecorators, Delete} from "@nestjs/common";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";


export function CrudDelete(): any {
    return applyDecorators(
        ApiOperation({summary: "Delete one item"}),
        ApiOkResponse({type: Number}),
        Delete(":id")
    );
}
