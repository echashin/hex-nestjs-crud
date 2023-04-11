import { applyDecorators, Post, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
} from "@nestjs/swagger";
import * as multer from "multer";

import { AclAction } from "../../acl/decorators/acl-action.decorator";
import { ImportDto } from "../dto/import.dto";

export function CrudImport(path: string = "import"): any {
  return applyDecorators(
    AclAction(
      `CRUD_IMPORT_${path.toLocaleUpperCase()}`,
      `Import multiple items by file upload`
    ),
    Post(path),
    ApiOperation({ summary: `Import multiple items by file upload` }),
    ApiConsumes("multipart/form-data"),
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
    ApiCreatedResponse({ type: ImportDto }),
    UseInterceptors(
      FileInterceptor("file", {
        storage: multer.memoryStorage(),
      })
    )
  );
}
