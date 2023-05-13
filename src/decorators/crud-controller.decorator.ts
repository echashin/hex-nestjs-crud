import { applyDecorators, Controller, Type } from "@nestjs/common";
import { ApiExtraModels, ApiTags } from "@nestjs/swagger";
import { paramCase } from "change-case";
import { Pageable } from "../dto";
import { FindInput } from "../inputs";


export const CrudController: any = <TModel extends Type<any>>(
    model: TModel
) => {
    const name: string = `crud-${paramCase(model.name).replace(
        /-entity$/,
        ""
    )}`;
    return applyDecorators(
        ApiTags(name),
        Controller(name),
        ApiExtraModels(Pageable, FindInput)
    );
};
