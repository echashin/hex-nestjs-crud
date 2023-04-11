export type QueryFields = string[];

export type QueryFilter = {
  field: string;
  operator: ComparisonOperator;
  value?: any;
};

export type QueryFilterArr = [string, ComparisonOperator, any?];

export type QueryJoin = {
  field: string;
  select?: QueryFields;
};

export type QueryJoinArr = [string, QueryFields?];

export type QuerySort = {
  field: string;
  order: QuerySortOperator;
};

export type QuerySortArr = [string, QuerySortOperator];

export type QuerySortOperator = "ASC" | "DESC";

type DeprecatedCondOperator =
  | "eq"
  | "ne"
  | "gt"
  | "lt"
  | "gte"
  | "lte"
  | "starts"
  | "ends"
  | "cont"
  | "excl"
  | "in"
  | "notin"
  | "isnull"
  | "notnull"
  | "between";

export enum CondOperator {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  EQUALS = "$eq",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NOT_EQUALS = "$ne",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GREATER_THAN = "$gt",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  LOWER_THAN = "$lt",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GREATER_THAN_EQUALS = "$gte",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  LOWER_THAN_EQUALS = "$lte",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  STARTS = "$starts",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ENDS = "$ends",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CONTAINS = "$cont",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  EXCLUDES = "$excl",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IN = "$in",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NOT_IN = "$notin",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IS_NULL = "$isnull",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NOT_NULL = "$notnull",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BETWEEN = "$between",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  EQUALS_LOW = "$eqL",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NOT_EQUALS_LOW = "$neL",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  STARTS_LOW = "$startsL",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ENDS_LOW = "$endsL",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CONTAINS_LOW = "$contL",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  EXCLUDES_LOW = "$exclL",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IN_LOW = "$inL",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  NOT_IN_LOW = "$notinL",
}

export type ComparisonOperator = DeprecatedCondOperator | keyof SFieldOperator;

// new search
export type SPrimitivesVal = string | number | boolean;

export type SFiledValues = SPrimitivesVal | Array<SPrimitivesVal>;

export type SFieldOperator = {
  $eq?: SFiledValues;
  $ne?: SFiledValues;
  $gt?: SFiledValues;
  $lt?: SFiledValues;
  $gte?: SFiledValues;
  $lte?: SFiledValues;
  $starts?: SFiledValues;
  $ends?: SFiledValues;
  $cont?: SFiledValues;
  $excl?: SFiledValues;
  $in?: SFiledValues;
  $notin?: SFiledValues;
  $between?: SFiledValues;
  $isnull?: SFiledValues;
  $notnull?: SFiledValues;
  $eqL?: SFiledValues;
  $neL?: SFiledValues;
  $startsL?: SFiledValues;
  $endsL?: SFiledValues;
  $contL?: SFiledValues;
  $exclL?: SFiledValues;
  $inL?: SFiledValues;
  $notinL?: SFiledValues;
  $or?: SFieldOperator;
  $and?: never;
};

export type SField = SPrimitivesVal | SFieldOperator;

export type SFields = {
  [key: string]: SField | Array<SFields | SConditionAND> | undefined;
  $or?: Array<SFields | SConditionAND>;
  $and?: never;
};

export type SConditionAND = {
  $and?: Array<SFields | SConditionAND>;
  $or?: never;
};

export type SConditionKey = "$and" | "$or";

export type SCondition = SFields | SConditionAND;
