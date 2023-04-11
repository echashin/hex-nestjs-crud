import { ValidationError } from "class-validator";

export function UniqueInArray<T extends object>(
  items: T[],
  uniqueKeys: string[]
): ValidationError[] {
  const duplicates: Map<string, Set<any>> = new Map();
  const errors: ValidationError[] = [];

  for (const item of items) {
    for (const key of uniqueKeys) {
      const value: any = item[key];
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
      } else {
        duplicates.set(key, new Set([value]));
      }
    }
  }
  return errors;
}
