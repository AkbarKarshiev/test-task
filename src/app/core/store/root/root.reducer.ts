import * as fromAuthReducer from '../../../pages/auth/state/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface RootState {
    auth: fromAuthReducer.AuthState;
}

export const rootReducer: ActionReducerMap<RootState> = {
    auth: fromAuthReducer.authReducer,
};

