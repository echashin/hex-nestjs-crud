"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueInArray = void 0;
function UniqueInArray(items, uniqueKeys) {
    const duplicates = new Map();
    const errors = [];
    for (const item of items) {
        for (const key of uniqueKeys) {
            const value = item[key];
            if (duplicates.has(key) && duplicates.get(key).has(value)) {
                errors.push({
                    target: item,
                    property: key,
                    value,
                    children: [],
                    constraints: { unique: `${key} not unique` },
                });
            }
            if (duplicates.has(key)) {
                duplicates.get(key).add(value);
            }
            else {
                duplicates.set(key, new Set([value]));
            }
        }
    }
    return errors;
}
exports.UniqueInArray = UniqueInArray;
//# sourceMappingURL=unique-in-array.js.map