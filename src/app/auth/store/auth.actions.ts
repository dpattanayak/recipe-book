import { Action } from '@ngrx/store';

export enum ACTIONS {
  LOGIN_START = '[Auth] Login Start',
  AUTHENTICATE_SUCCESS = '[Auth] Login Success',
  AUTHENTICATE_FAIL = '[Auth] Login Fail',
  SIGNUP_START = '[Auth] Signup Start',
  CLEAR_ERROR = '[Auth] Clear Error',
  AUTO_LOGIN = '[Auth] Auto Login',
  LOGOUT = '[Auth] Logout',
}

export class LoginStart implements Action {
  readonly type: string = ACTIONS.LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type: string = ACTIONS.AUTHENTICATE_SUCCESS;

  email: string;
  userId: string;
  token: string;
  expirationDate: Date;
  redirect: boolean;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type: string = ACTIONS.AUTHENTICATE_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type: string = ACTIONS.SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type: string = ACTIONS.CLEAR_ERROR;
}

export class Logout implements Action {
  readonly type: string = ACTIONS.LOGOUT;
}

export class AutoLogin implements Action {
  readonly type: string = ACTIONS.AUTO_LOGIN;
}

export type AuthActions =
  | LoginStart
  | AuthenticateSuccess
  | AuthenticateFail
  | SignupStart;
