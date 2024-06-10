import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selector';
import { AuthSubmitBody } from '../common/auth.interface';

@Injectable()
export class AuthFacade {
    loading$ = this.store.select(AuthSelectors.selectLoading);

    loggedIn$ = this.store.select(AuthSelectors.selectLoggedIn);

    userName$ = this.store.select(AuthSelectors.selectUserName);

    userId$ = this.store.select(AuthSelectors.selectUserId);

    userToken$ = this.store.select(AuthSelectors.selectAuthToken);

    constructor(private readonly store: Store) {}

    public checkAuth(): void {
        this.store.dispatch(AuthActions.checkAuth());
    }

    public logIn(submitData: AuthSubmitBody): void {
        this.store.dispatch(AuthActions.logIn({ submitData }));
    }

    public logOut(): void {
        this.store.dispatch(AuthActions.logOut());
    }
}
