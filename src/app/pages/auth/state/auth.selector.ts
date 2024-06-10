import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

export const selectListState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectUserName = createSelector(selectListState, (state: AuthState) => state.username);

export const selectUserId = createSelector(selectListState, (state: AuthState) => state.user_id);

export const selectAuthToken = createSelector(selectListState, (state: AuthState) => state.token);

export const selectLoading = createSelector(selectListState, (state: AuthState) => state.loading);

export const selectLoggedIn = createSelector(selectListState, (state: AuthState) => state.logged_in);

