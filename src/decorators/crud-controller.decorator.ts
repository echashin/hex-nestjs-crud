import { applyDecorators, Controller, Type } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

import { LangCodeEnum } from "../../shared/enums/lang-code.enum";
import { camelToKebab } from "../../shared/helpers/camel-to-kebab";

export const CrudController: any = <TModel extends Type<any>>(
  model: TModel
) => {
  const name: string = `crud-${camelToKebab(model.name).replace(
    /-entity$/,
    ""
  )}`;
  return applyDecorators(
    ApiHeader({
      name: "lang",
      required: true,
      enum: LangCodeEnum,
      example: LangCodeEnum.en,
    }),
    ApiTags(name),
    Controller(name)
  );
};
