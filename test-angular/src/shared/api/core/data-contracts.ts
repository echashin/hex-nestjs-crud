export type Object = object;

export interface ManagerSignInInput {
  deviceId: string;
  pushNotificationToken?: string;
  deviceType?: string;
  deviceName?: string;
  deviceBrand?: string;
  deviceOs?: string;
  appVersion?: string;
  ipAddress?: string;
  allowedNotifications?: boolean;
  allowedLocationTracking?: boolean;
  email: string;
  password: string;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenInput {
  deviceId: string;
  pushNotificationToken?: string;
  deviceType?: string;
  deviceName?: string;
  deviceBrand?: string;
  deviceOs?: string;
  appVersion?: string;
  ipAddress?: string;
  allowedNotifications?: boolean;
  allowedLocationTracking?: boolean;
  refreshToken: string;
}

export interface EmailVerifyInput {
  code: string;
}

export interface EmailVerifiedDto {
  status: string;
}

export interface ResetPasswordInput {
  email: string;
  deviceId: string;
}

export interface SetPasswordInput {
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface SessionOutInput {
  sessionId: string;
}

export interface ManagerEntity {
  id: string;
  isActive?: boolean;
  name_i18n?: string;
  create_date?: string;
  update_date?: string;
  email?: string;
  password?: string;
  tempPassword?: string;
  forgotUrl?: string;
  isEmailVerified?: boolean;
  lastLoginDate?: string;
  isOnline?: boolean;
  note?: string;
  appVersion?: string;
  firstName?: string;
  lastName?: string;
  phoneCountryCode?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  photoUrl?: string;
}

export interface Pageable {
  /*
   * Number of items on the current page
   */
  count: number;

  /*
   * Total number of items
   */
  total: number;

  /*
   * Current page
   */
  page: number;

  /*
   * Total number of pages
   */
  pageCount: number;
}

export interface FindInput {
  /*
   * Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
   */
  fields?: string;

  /*
   * Adds search condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#search" target="_blank">Docs</a>
   */
  s?: string;

  /*
   * Adds filter condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#filter" target="_blank">Docs</a>
   */
  filter?: string[];

  /*
   * Adds OR condition. <a href="https://github.com/nestjsx/crud/wiki/Requests#or" target="_blank">Docs</a>
   */
  or?: string[];

  /*
   * Adds sort by field. <a href="https://github.com/nestjsx/crud/wiki/Requests#sort" target="_blank">Docs</a>
   */
  sort?: string[];

  /*
   * Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
   */
  join?: string[];

  /*
   * Limit amount of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#limit" target="_blank">Docs</a>
   */
  limit?: number;

  /*
   * Page portion of resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#page" target="_blank">Docs</a>
   */
  page?: number;

  /*
   * Load deleted items
   */
  softDelete?: boolean;
}

export interface FindOneInput {
  /*
   * Selects resource fields. <a href="https://github.com/nestjsx/crud/wiki/Requests#select" target="_blank">Docs</a>
   */
  fields?: string;

  /*
   * Adds relational resources. <a href="https://github.com/nestjsx/crud/wiki/Requests#join" target="_blank">Docs</a>
   */
  join?: string[];

  /*
   * Load deleted items
   */
  softDelete?: boolean;
}

export interface ManagerCreateInput {
  email: string;
  password: string;
  note?: string;
  firstName: string;
  lastName: string;
}

export interface ManagerUpdateInput {
  email: string;
  password: string;
  note?: string;
  firstName: string;
  lastName: string;
}

export interface InputError {
  message: string;
  property: string;
}

export interface ImportErrorDto {
  /*
   * Input value
   */
  target?: object;

  /*
   * Validation errors
   */
  errors?: InputError[];
}

export interface ImportDto {
  /*
   * Input object keys
   */
  keys: string[];

  /*
   * Validation errors
   */
  errors: ImportErrorDto[];

  /*
   * Number of rows with errors
   */
  isValid: boolean;

  /*
   * Number of rows with errors
   */
  errorCount: number;

  /*
   * Total imported rows count
   */
  successCount: number;

  /*
   * Total rows count
   */
  totalCount: number;
}

export enum TransferFileTypeEnum {
  Xlsx = "xlsx",
  Ods = "ods",
  Json = "json",
}

export interface ExportFileInput {
  ids?: string[];
  fileExt: TransferFileTypeEnum;
}
