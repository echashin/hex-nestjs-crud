import { ObjectLiteral } from "../types/object-literal.type";
import { SCondition } from "../types/request-query.types";
export interface AuthOptions {
    property?: string;
    filter?: (req: any) => SCondition | void;
    or?: (req: any) => SCondition | void;
    persist?: (req: any) => ObjectLiteral;
}
//# sourceMappingURL=auth-options.interface.d.ts.map