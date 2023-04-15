import dot from "dot-object";
export function convertJsonFileToJson<T>(buffer: Buffer): T[] {
    return JSON.parse(buffer.toString()).map(
        (row: any) => dot.object(row) as unknown as T
    );
}