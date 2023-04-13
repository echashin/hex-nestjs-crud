import {applyDecorators, Controller, Type} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {paramCase} from "change-case";


export const CrudController: any = <TModel extends Type<any>>(
    model: TModel
) => {
    const name: string = `crud-${paramCase(model.name).replace(
        /-entity$/,
        ""
    )}`;
    return applyDecorators(
        ApiTags(name),
        Controller(name)
    );
};
