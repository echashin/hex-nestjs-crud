import {applyDecorators, Post} from "@nestjs/common";
import {ApiCreatedResponse, ApiExtension, ApiOperation} from "@nestjs/swagger";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";


export function CrudCreateMany(): any {
    return applyDecorators(
        ApiOperation({summary: `Create multiple items`}),
        ApiExtension('x-crud-method', { type: CrudMethodsEnum.createMany }),
        ApiCreatedResponse({type: Number}),
        Post("bulk-create")
    );
}
