import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LIST_FEATURE_KEY, listAdapter, ListState } from './list.reducer';

export const selectListState = createFeatureSelector<ListState>(LIST_FEATURE_KEY);

const { selectAll, selectEntities, selectTotal } = listAdapter.getSelectors();

export const selectList = createSelector(selectListState, (state: ListState) => selectAll(state));

export const selectListEntities = createSelector(selectListState, (state: ListState) => selectEntities(state));

export const selectListLoaded = createSelector(selectListState, (state: ListState) => state.loaded);

export const selectListLoading = createSelector(selectListState, (state: ListState) => state.loading);

export const selectEditItem = createSelector(selectListState, (state: ListState) => state.editingItem);

export const selectEditItemLoading = createSelector(selectListState, (state: ListState): boolean => state.loadingEditItem);

export const selectListItem = (id: string) => createSelector(selectListEntities, (entities) => entities[id] ?? null);
