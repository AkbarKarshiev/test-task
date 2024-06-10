import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Update } from '@ngrx/entity';

import * as ListActions from './list.actions';

import { ListApiService } from '../api/list-api.service';
import { ErrorFactoryService } from '../../../core/errors/service/error-factory.service';
import { PageLoaderService } from '../../../core/service/page-loader.service';
import { ListItem } from '../common/list.interface';

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

  loadOneItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.loadOneItem),
      switchMap(({ id }) =>
        this.listApiService.loadOneListItem(id).pipe(
          map((item: ListItem) => ListActions.loadOneItemSuccess({ item })),
          catchError((error: HttpErrorResponse) => of(ListActions.loadOneItemFailure({ error })))
        )
      )
    );
  })

  createNewListItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.createOneItem),
      switchMap(({ item }) =>
        this.listApiService.createListItem(item).pipe(
          map(() => ListActions.createOneItemSuccess()),
          catchError((error: HttpErrorResponse) => of(ListActions.createOneItemFailure({ error })))
        )
      )
    );
  });

  createNewListItemLoader$= createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.createOneItem),
      tap(() => {
        this.pageLoaderService.startLoading();
      }),
    );
  }, { functional: true, dispatch: false });

  createNewListItemSuccess$= createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.createOneItemSuccess),
      map(() => {
        this.modalService.dismissAll('success');
        this.pageLoaderService.stopLoading();
        this.toastr.success('Item created successfully');
        return ListActions.load();
      }),
    );
  });

  ListFailureHandler$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        ListActions.createOneItemFailure,
        ListActions.updateOneItemFailure,
        ListActions.loadOneItemFailure,
        ListActions.deleteOneItemFailure,
      ),
      filter(Boolean),
      tap(({ error }: { error: HttpErrorResponse}) => {
        const getErrorMsg = this.errorFactory.getErrorMessage(this.errorFactory.fromResponse(error));

        this.pageLoaderService.stopLoading();
        this.toastr.error(getErrorMsg);
      }),
    );
  }, { functional: true, dispatch: false });

  updateListItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.updateOneItem),
      switchMap(({ id, item}) =>
        this.listApiService.updateListItem(id, item).pipe(
          map((response: ListItem) => {
            const item: Update<ListItem> = {
              id: response.id,
              changes: response
            }
            return ListActions.updateOneItemSuccess({ item });
          }),
          catchError((error: HttpErrorResponse) => of(ListActions.updateOneItemFailure({ error })))
        )
      )
    );
  });

  listItemOperationsStartLoader$= createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.createOneItem, ListActions.updateOneItem, ListActions.deleteOneItem),
      tap(() => {
        this.pageLoaderService.startLoading();
      }),
    );
  }, { functional: true, dispatch: false });

  updateNewListItemSuccess$= createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.updateOneItemSuccess),
      tap(() => {
        this.modalService.dismissAll('success');
        this.pageLoaderService.stopLoading();
        this.toastr.success('Item updated successfully');
      }),
    );
  }, { functional: true, dispatch: false });

  deleteListItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.deleteOneItem),
      switchMap(({ id}) =>
        this.listApiService.deleteListItem(id).pipe(
          map(() => ListActions.deleteOneItemSuccess({ id })),
          catchError((error: HttpErrorResponse) => of(ListActions.deleteOneItemFailure({ error })))
        )
      )
    );
  });

  deleteListItemSuccess$= createEffect(() => {
    return this.actions$.pipe(
      ofType(ListActions.deleteOneItemSuccess),
      map(() => {
        this.pageLoaderService.stopLoading();
        this.toastr.success('Item was deleted successfully');
        return ListActions.load();
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly listApiService: ListApiService,
    private readonly errorFactory: ErrorFactoryService,
    private readonly toastr: ToastrService,
    private readonly pageLoaderService: PageLoaderService,
    private readonly modalService: NgbModal
  ) {}
}
