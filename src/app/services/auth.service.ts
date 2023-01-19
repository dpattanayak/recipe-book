import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as authActions from '../auth/store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any = null;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new authActions.Logout(null));
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
