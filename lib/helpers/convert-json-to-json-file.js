"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonToJsonFile = void 0;
const custom_objects_to_json_1 = require("./custom-objects-to-json");
function convertJsonToJsonFile(items) {
    const json = (0, custom_objects_to_json_1.customObjectsToJson)(items);
    return Buffer.from(JSON.stringify(json));
}
exports.convertJsonToJsonFile = convertJsonToJsonFile;
//# sourceMappingURL=convert-json-to-json-file.js.map