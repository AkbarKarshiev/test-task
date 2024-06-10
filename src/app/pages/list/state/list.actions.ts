import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Update } from '@ngrx/entity';

import { ListItem, ListItemModel } from '../common/list.interface';

export const load = createAction('[List] Load');

export const loadSuccess = createAction('[List] Load Success', props<{ items: ListItem[] }>());

export const loadFailure = createAction('[List] Load Failure', props<{ error: HttpErrorResponse }>());

export const loadOneItem = createAction('[List] Load One Item', props<{ id: string }>());

export const loadOneItemSuccess = createAction('[List] Load Item Success', props<{ item: ListItem }>());

export const loadOneItemFailure = createAction('[List] Load Item Failure', props<{ error: HttpErrorResponse }>());

export const deleteEditItem = createAction('[List] Delete Edit Item');

export const createOneItem = createAction('[List] Create Item', props<{ item: ListItemModel }>());

export const createOneItemSuccess = createAction('[List] Create Item Success');

export const createOneItemFailure = createAction('[List] Create Item Failure', props<{ error: HttpErrorResponse }>());

export const updateOneItem = createAction('[List] Update An Item', props<{ id: string, item: ListItemModel }>());

export const updateOneItemSuccess = createAction('[List] Update Item Success', props<{ item: Update<ListItem> }>());

export const updateOneItemFailure = createAction('[List] Update Item Failure', props<{ error: HttpErrorResponse }>());

export const deleteOneItem = createAction('[List] Delete An Item', props<{ id: string }>());

export const deleteOneItemSuccess = createAction('[List] Delete Item Success', props<{ id: string }>());

export const deleteOneItemFailure = createAction('[List] Delete Item Failure', props<{ error: HttpErrorResponse }>());

