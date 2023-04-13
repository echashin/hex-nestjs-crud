import {applyDecorators, Controller, Type} from "@nestjs/common";
import {ApiExtraModels, ApiTags} from "@nestjs/swagger";
import {paramCase} from "change-case";
import {Pageable} from "../dto";


export const CrudController: any = <TModel extends Type<any>>(
    model: TModel
) => {
    const name: string = `crud-${paramCase(model.name).replace(
        /-entity$/,
        ""
    )}`;
    return applyDecorators(
        // ApiHeader({
        //   name: "lang",
        //   required: true,
        //   enum: LangCodeEnum,
        //   example: LangCodeEnum.en,
        // }),
        ApiExtraModels(Pageable),
        ApiTags(name),
        Controller(name)
    );
};
