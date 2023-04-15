import {BadRequestException} from "@nestjs/common";

import {ParamOption, ParamsOptions,} from "./interfaces/params-options.interface";
import {
  ComparisonOperator,
  CondOperator,
  QueryFields,
  QueryFilter,
  QueryJoin,
  QuerySort,
} from "./types/request-query.types";
import {isArrayStrings, isEqual, isNil, isNumber, isObject, isStringFull, isUndefined,} from "./utils/checks.util";

export const deprecatedComparisonOperatorsList: string[] = [
  "eq",
  "ne",
  "gt",
  "lt",
  "gte",
  "lte",
  "starts",
  "ends",
  "cont",
  "excl",
  "in",
  "notin",
  "isnull",
  "notnull",
  "between",
];
export const comparisonOperatorsList: any[] = [
  ...deprecatedComparisonOperatorsList,
  ...Object.keys(CondOperator).map((n: string) => CondOperator[n]),
];

export const sortOrdersList: string[] = ["ASC", "DESC"];

const comparisonOperatorsListStr: string = comparisonOperatorsList.join(",");
const sortOrdersListStr: string = sortOrdersList.join(",");

export function validateFields(fields: QueryFields): void {
  if (!isArrayStrings(fields)) {
    throw new BadRequestException("Invalid fields. Array of strings expected");
  }
}

export function validateCondition(
  val: QueryFilter,
  cond: "filter" | "or" | "search"
): void {
  if (!isObject(val) || !isStringFull(val.field)) {
    throw new BadRequestException(
      `Invalid field type in ${cond} condition. String expected`
    );
  }
  validateComparisonOperator(val.operator);
}

export function validateComparisonOperator(operator: ComparisonOperator): void {
  if (!comparisonOperatorsList.includes(operator)) {
    throw new BadRequestException(
      `Invalid comparison operator. ${comparisonOperatorsListStr} expected`
    );
  }
}

export function validateJoin(join: QueryJoin): void {
  if (!isObject(join) || !isStringFull(join.field)) {
    throw new BadRequestException("Invalid join field. String expected");
  }
  if (!isUndefined(join.select) && !isArrayStrings(join.select)) {
    throw new BadRequestException(
      "Invalid join select. Array of strings expected"
    );
  }
}

export function validateSort(sort: QuerySort): void {
  if (!isObject(sort) || !isStringFull(sort.field)) {
    throw new BadRequestException("Invalid sort field. String expected");
  }
  if (
    !isEqual(sort.order, sortOrdersList[0]) &&
    !isEqual(sort.order, sortOrdersList[1])
  ) {
    throw new BadRequestException(
      `Invalid sort order. ${sortOrdersListStr} expected`
    );
  }
}

export function validateNumeric(
  val: number,
  num: "limit" | "offset" | "page" | "cache" | string
): void {
  if (!isNumber(val)) {
    throw new BadRequestException(`Invalid ${num}. Number expected`);
  }
}

export function validateParamOption(
  options: ParamsOptions,
  name: string
): void {
  if (!isObject(options)) {
    throw new BadRequestException(
      `Invalid param ${name}. Invalid crud options`
    );
  }
  const option: ParamOption = options[name];
  if (option && option.disabled) {
    return;
  }
  if (!isObject(option) || isNil(option.field) || isNil(option.type)) {
    throw new BadRequestException(`Invalid param option in Crud`);
  }
}

export function validateUUID(str: string, name: string): void {
  const uuid: RegExp = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
  const uuidV4: RegExp =
    /^[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[\da-f]{4}-[\da-f]{12}$/i;
  if (!uuidV4.test(str) && !uuid.test(str)) {
    throw new BadRequestException(
      `Invalid param ${name}. UUID string expected`
    );
  }
}
