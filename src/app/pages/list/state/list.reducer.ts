import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ListItem } from '../common/list.interface';
import { Action, createReducer, on } from '@ngrx/store';

import * as ListActions from './list.actions';

export const LIST_FEATURE_KEY = 'list';

export interface ListState extends EntityState<ListItem> {
    loaded: boolean;
}

export const listAdapter: EntityAdapter<ListItem> = createEntityAdapter<ListItem>();

export const initialListState: ListState = listAdapter.getInitialState({
    loaded: false,
});

const reducer = createReducer(
    initialListState,
    on(
        ListActions.loadSuccess,
        (state, { items }): ListState => {
            return listAdapter.setAll(items, { ...state, loaded: true });
        }
    ),
    on(
        ListActions.loadFailure,
        (state): ListState => ({
            ...state,
            loaded: true,
        })
    )
);

export function listReducer(state: ListState | undefined, action: Action): ListState {
    return reducer(state, action);
}

