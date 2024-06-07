import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ListApiService } from '../api/list-api.service';
import * as ListActions from './list.actions';

@Injectable()
export class ListEffects {
    load$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ListActions.load),
            switchMap(() =>
                this.listApiService.loadList().pipe(
                    map(response => {
                        const items = response.results;
                        return ListActions.loadSuccess({ items });
                    }),
                    catchError(error => of(ListActions.loadFailure({ error })))
                )
            ),
        );
    });

    constructor(private readonly actions$: Actions, private readonly listApiService: ListApiService) {}
}
