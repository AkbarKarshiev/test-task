import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { ListItem, ListItemToSubmit } from '../common/list.interface';

export const init = createAction('[List] Init');

export const load = createAction('[List] Load');

export const loadSuccess = createAction('[List] Load Success', props<{ items: ListItem[] }>());

export const loadFailure = createAction('[List] Load Failure', props<{ error: HttpErrorResponse }>());

export const loadOneItem = createAction('[List] Load One Item', props<{ id: string }>());

export const createOneItem = createAction('[List] Create An Item', props<{ item: ListItemToSubmit }>());

export const updateOneItem = createAction('[List] Delete An Item', props<{ id: string, item: ListItemToSubmit }>());

export const deleteOneItem = createAction('[List] Delete An Item', props<{ id: string }>());

