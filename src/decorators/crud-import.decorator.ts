import {applyDecorators, Post, UseInterceptors} from "@nestjs/common";
import {
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse, ApiExtension,
    ApiExtraModels,
    ApiOperation,
} from "@nestjs/swagger";


import {ImportDto} from "../dto/import.dto";
import {CrudMethodsEnum} from "../enums/crud-methods.enum";

export function CrudImport(path: string = "import"): any {
    return applyDecorators(
        Post(path),
        ApiOperation({summary: `Import multiple items by file upload`}),
        ApiConsumes("multipart/form-data"),
        ApiExtension('x-crud-method', { type: CrudMethodsEnum.import }),
        ApiBody({
            schema: {
                type: "object",
                required: ["file"],
                properties: {
                    file: {
                        type: "string",
                        format: "binary",
                    },
                },
            },
        }),
        ApiExtraModels(ImportDto),
        ApiCreatedResponse({type: ImportDto}),
    );
}
