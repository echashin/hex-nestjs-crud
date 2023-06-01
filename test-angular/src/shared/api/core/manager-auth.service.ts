import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiService } from "../../services/api.service";

import {
  ChangePasswordInput,
  EmailVerifiedDto,
  EmailVerifyInput,
  ManagerSignInInput,
  Object,
  RefreshTokenInput,
  ResetPasswordInput,
  SessionOutInput,
  SetPasswordInput,
  TokensDto,
} from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class ManagerAuthService extends ApiService {
  protected url: string = "http://localhost:3000";
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerSendVerificationEmail
   * @request POST:/manager-auth/send-verification-email
   * @secure
   * @response `201` `boolean`
   */
  sendVerificationEmail = (data?: Object): Observable<boolean> =>
    this.request<boolean, Object>(`/manager-auth/send-verification-email`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerSignIn
   * @request POST:/manager-auth/sign-in
   * @response `201` `TokensDto`
   */
  signIn = (data: ManagerSignInInput): Observable<TokensDto> =>
    this.request<TokensDto, ManagerSignInInput>(`/manager-auth/sign-in`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerSignOut
   * @request POST:/manager-auth/sign-out
   * @secure
   * @response `201` `boolean`
   */
  signOut = (data: RefreshTokenInput): Observable<boolean> =>
    this.request<boolean, RefreshTokenInput>(`/manager-auth/sign-out`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerSignOutAll
   * @request POST:/manager-auth/sign-out-all
   * @secure
   * @response `201` `number`
   */
  signOutAll = (data?: Object): Observable<number> =>
    this.request<number, Object>(`/manager-auth/sign-out-all`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerVerifyEmail
   * @request POST:/manager-auth/verify-email
   * @secure
   * @response `201` `boolean`
   */
  verifyEmail = (data: EmailVerifyInput): Observable<boolean> =>
    this.request<boolean, EmailVerifyInput>(`/manager-auth/verify-email`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerVerifyEmailWithToken
   * @summary Verify email by link from email.
   * @request GET:/manager-auth/verify-email-with-token/{token}
   * @secure
   * @response `200` `EmailVerifiedDto`
   */
  verifyEmailWithToken = (token: string): Observable<EmailVerifiedDto> =>
    this.request<EmailVerifiedDto, any>(`/manager-auth/verify-email-with-token/${token}`, "GET");
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerRefresh
   * @request POST:/manager-auth/refresh
   * @response `201` `TokensDto`
   */
  refresh = (data: RefreshTokenInput): Observable<TokensDto> =>
    this.request<TokensDto, RefreshTokenInput>(`/manager-auth/refresh`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerResetPassword
   * @request POST:/manager-auth/reset-password
   * @secure
   * @response `201` `boolean`
   */
  resetPassword = (data: ResetPasswordInput): Observable<boolean> =>
    this.request<boolean, ResetPasswordInput>(`/manager-auth/reset-password`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerSetPassword
   * @request POST:/manager-auth/set-password
   * @secure
   * @response `201` `boolean`
   */
  setPassword = (data: SetPasswordInput): Observable<boolean> =>
    this.request<boolean, SetPasswordInput>(`/manager-auth/set-password`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerChangePassword
   * @request POST:/manager-auth/change-password
   * @secure
   * @response `201` `boolean`
   */
  changePassword = (data: ChangePasswordInput): Observable<boolean> =>
    this.request<boolean, ChangePasswordInput>(`/manager-auth/change-password`, "POST", data);
  /**
   * No description
   *
   * @tags manager-auth
   * @name AuthManagerControllerSessionLogOut
   * @request POST:/manager-auth/session-log-out
   * @secure
   * @response `201` `boolean`
   */
  sessionLogOut = (data: SessionOutInput): Observable<boolean> =>
    this.request<boolean, SessionOutInput>(`/manager-auth/session-log-out`, "POST", data);
}
