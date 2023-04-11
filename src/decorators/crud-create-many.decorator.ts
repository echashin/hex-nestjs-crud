import {applyDecorators, Post} from "@nestjs/common";
import {ApiCreatedResponse, ApiOperation} from "@nestjs/swagger";


export function CrudCreateMany(): any {
    return applyDecorators(
        ApiOperation({summary: `Create multiple items`}),
        ApiCreatedResponse({type: Number}),
        Post("bulk-create")
    );
}
