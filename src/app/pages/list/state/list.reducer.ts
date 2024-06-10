import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ListItem } from '../common/list.interface';
import { Action, createReducer, on } from '@ngrx/store';

import * as ListActions from './list.actions';

export const LIST_FEATURE_KEY = 'list';

export interface ListState extends EntityState<ListItem> {
  loaded: boolean;
  loading: boolean;
  loadingEditItem: boolean;
  editingItem: ListItem | null;
}

export const listAdapter: EntityAdapter<ListItem> = createEntityAdapter<ListItem>();

export const initialListState: ListState = listAdapter.getInitialState({
  loaded: false,
  loading: false,
  loadingEditItem: false,
  editingItem: null,
});

const reducer = createReducer(
  initialListState,
  on(
    ListActions.load,
    (state): ListState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    ListActions.loadSuccess,
    (state, { items }): ListState => {
      return listAdapter.setAll(items, { ...state, loaded: true, loading: false });
    }
  ),
  on(
    ListActions.loadFailure,
    (state): ListState => ({
      ...state,
      loaded: true,
      loading: false,
    })
  ),
  on(
    ListActions.loadOneItem,
    (state): ListState => ({
      ...state,
      loadingEditItem: true,
    })
  ),
  on(
    ListActions.loadOneItemSuccess,
    (state, { item }): ListState => ({
      ...state,
      loadingEditItem: false,
      editingItem: item,
    })
  ),
  on(
    ListActions.loadOneItemFailure,
    (state): ListState => ({
      ...state,
      loadingEditItem: false,
      editingItem: null,
    })
  ),
  on(
    ListActions.deleteEditItem,
    (state): ListState => ({
      ...state,
      editingItem: null,
    })
  ),
  on(
    ListActions.updateOneItemSuccess,
    (state, { item }): ListState => {
      return listAdapter.updateOne(item, state);
    }
  ),
);

export function listReducer(state: ListState | undefined, action: Action): ListState {
    return reducer(state, action);
}

