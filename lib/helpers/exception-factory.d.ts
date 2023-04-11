import { ValidationError } from "@nestjs/common";
import { InputError } from "../interfaces/input-error";
export declare function mapErrors(errors: ValidationError[], parentProperty?: string): InputError[];
export declare function exceptionFactory(validationErrors?: ValidationError[]): any;
//# sourceMappingURL=exception-factory.d.ts.map