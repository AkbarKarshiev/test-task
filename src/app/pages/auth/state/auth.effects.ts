import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthApiService } from '../api/auth-api.service';
import * as AuthActions from './auth.actions';
import { AuthResponse, AuthSubmitBody } from '../common/auth.interface';
import { ErrorFactoryService } from '../../../core/errors/service/error-factory.service';
import { LocalAsyncStorageService } from '../../../core/storage/local/local-async-storage.service';
import { NavigationService } from '../../../core/navigation/service/navigation.service';
import { NavigationPaths, PATHS } from '../../../core/navigation/common/navigation.interface';

export enum AuthItemLocalStorageKeys {
    Token = 'token',
    UserName = 'username',
    UserId = 'user_id',
}

@Injectable()
export class AuthEffects {
  checkAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      switchMap(() => (of(this.localAsyncStorage.state)).pipe(
        map((data) => {
          const userData: Partial<AuthResponse> = {}


          if (AuthItemLocalStorageKeys.Token in data) {
            userData.token = data[AuthItemLocalStorageKeys.Token] as string
          }

          if (AuthItemLocalStorageKeys.UserName in data) {
            userData.username = data[AuthItemLocalStorageKeys.UserName] as string
          }

          if (AuthItemLocalStorageKeys.UserId in data) {
            userData.user_id = Number(data[AuthItemLocalStorageKeys.UserId] as string);
          }

          return AuthActions.checkAuthSuccess({ authData: userData });
        }),
      )),
    );
  });

  logIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logIn),
      exhaustMap(({ submitData }: { submitData: AuthSubmitBody }) =>
        this.authApiService.login(submitData).pipe(
          map((response: AuthResponse) => {
            return AuthActions.logInSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => of(AuthActions.logInFailure({ error })))
        )
      ),
    );
  });

  logInSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logInSuccess),
      tap(({ response }: { response: AuthResponse }) => {
        this.localAsyncStorage.setItems({
          [AuthItemLocalStorageKeys.Token]: response.token,
          [AuthItemLocalStorageKeys.UserName]: response.username,
          [AuthItemLocalStorageKeys.UserId]: response.user_id,
        });

        this.navigationService.navigate([this.paths.home, this.paths.list]).then();
      }),
    );
  }, { dispatch: false })

  logInFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logInFailure),
      filter(Boolean),
      tap(({ error }: { error: HttpErrorResponse}) => {
        const getErrorMsg = this.errorFactory.getErrorMessage(this.errorFactory.fromResponse(error));
        this.toastr.error(getErrorMsg);
      }),
    );
  }, { functional: true, dispatch: false });

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logOut),
      tap(() => {
        this.localAsyncStorage.removeItems([
          AuthItemLocalStorageKeys.Token,
          AuthItemLocalStorageKeys.UserName,
          AuthItemLocalStorageKeys.UserId,
        ]);

        this.navigationService.navigate([this.paths.auth]).then();
      }),
    );
}, { dispatch: false });

  constructor(
    private readonly actions$: Actions,
    private readonly authApiService: AuthApiService,
    private readonly errorFactory: ErrorFactoryService,
    private readonly toastr: ToastrService,
    private readonly localAsyncStorage: LocalAsyncStorageService,
    private readonly navigationService: NavigationService,
    @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}
}
