import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
    username: string | null;
    user_id: number | null;
    token: string | null;

    loading: boolean;
    logged_in: boolean;
}

export const initialAuthState: AuthState = {
    username: null,
    user_id: null,
    token: null,
    loading: false,
    logged_in: false,
};

const reducer = createReducer(
    initialAuthState,
    on(
        AuthActions.checkAuthSuccess,
        (state: AuthState, { authData }): AuthState => {
            const hasToken = Boolean(authData.token);
            const resultState = { ...state, ...authData, logged_in: hasToken };

            return { ...resultState }
        },
    ),
    on(
        AuthActions.logIn,
        (state: AuthState): AuthState => ({ ...state, loading: true }),
    ),
    on(
        AuthActions.logInSuccess,
        (state: AuthState, { response }): AuthState => ({
            ...state,
            loading: false,
            logged_in: true,
            token: response.token,
            username: response.username,
            user_id: response.user_id,
        }),
    ),
    on(
        AuthActions.logInFailure,
        (state: AuthState): AuthState => ({
            ...state,
            loading: false,
            logged_in: false,
            username: null,
            token: null,
            user_id: null,
        }),
    ),
    on(
        AuthActions.logOut,
        (state: AuthState): AuthState => ({
            ...state,
            loading: false,
            logged_in: false,
            username: null,
            token: null,
            user_id: null,
        }),
    ),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return reducer(state, action);
}

