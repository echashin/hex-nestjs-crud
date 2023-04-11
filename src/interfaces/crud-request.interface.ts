import { CrudRequestOptions } from "./crud-options.interface";
import { ParsedRequestParams } from "./parsed-request.interface";

export interface CrudRequest {
  parsed: ParsedRequestParams;
  options: CrudRequestOptions;
}
