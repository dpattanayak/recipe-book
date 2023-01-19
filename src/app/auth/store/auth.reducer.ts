import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.ACTIONS.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthActions.ACTIONS.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthActions.ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };

    case AuthActions.ACTIONS.AUTHENTICATE_SUCCESS:
      const user = new User(
        (action.payload as AuthActions.AuthenticateSuccess).email,
        (action.payload as AuthActions.AuthenticateSuccess).userId,
        (action.payload as AuthActions.AuthenticateSuccess).token,
        (action.payload as AuthActions.AuthenticateSuccess).expirationDate
      );

      return {
        ...state,
        authError: null,
        user: user,
        loading: false,
      };

    case AuthActions.ACTIONS.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: <string>(<unknown>action.payload),
        loading: false,
      };

    case AuthActions.ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
