import { ActionReducerMap } from '@ngrx/store';
import { Params } from '@angular/router';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import * as fromAuthReducer from '../../../pages/auth/state/auth.reducer';

export interface RouterReducerStateExtended<T extends Record<string, unknown> = Record<string, unknown>> {
    url: string;
    params: Params;
    queryParams: Params;
    data?: T
}

export interface RootState {
    auth: fromAuthReducer.AuthState;
    router: RouterReducerState<RouterReducerStateExtended> | null;
}

export const rootReducer: ActionReducerMap<RootState> = {
    auth: fromAuthReducer.authReducer,
    router: routerReducer,
};

export const rootInitialState: RootState = {
    auth: fromAuthReducer.initialAuthState,
    router: null,
};

