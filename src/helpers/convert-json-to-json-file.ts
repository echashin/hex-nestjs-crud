import {customObjectsToJson} from "./custom-objects-to-json";

export function convertJsonToJsonFile<T>(items: T[]): Buffer {
    const json: Record<string, string | number | boolean>[] =
        customObjectsToJson<T>(items);
    return Buffer.from(JSON.stringify(json));
}