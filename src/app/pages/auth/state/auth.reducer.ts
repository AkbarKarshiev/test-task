import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
    username: string | null;
    user_id: number | null;

    loading: boolean;
    logged_in: boolean;
}

export const initialAuthState: AuthState = {
    username: null,
    user_id: null,
    loading: false,
    logged_in: false,
};

const reducer = createReducer(
    initialAuthState,
    on(
        AuthActions.checkAuthSuccess,
        (state: AuthState, { authData }): AuthState => {
            const hasToken = Boolean(authData.token);
            const resultState = { ...state, logged_in: hasToken };

            resultState.username = authData?.username || null;
            resultState.user_id = authData?.user_id || null;

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
            user_id: null,
        }),
    ),
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
    return reducer(state, action);
}

