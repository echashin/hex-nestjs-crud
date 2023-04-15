import {NotFoundException} from "@nestjs/common";
import dot from "dot-object";

export function customObjectsToJson<T>(
    items: T[],
    toDotted: boolean = false
): Record<string, string | number | boolean>[] {
    if (items.length === 0) {
        throw new NotFoundException("Items not found");
    }

    const reg: RegExp = new RegExp(`_i18n$`);
    const keys: string[] = Object.keys(items[0]);
    const multilang: string[] = keys.filter((key: string) => reg.test(key));

    const empty_i18n: Object = {
        DE: "",
        EN: "",
        FR: "",
    };

    return items
        .map((item: T) => {
            for (const key of multilang) {
                item[key] = item[key] ?? empty_i18n;
            }
            return item;
        })
        .map((item: T) => (toDotted ? dot.dot(item) : item));
}