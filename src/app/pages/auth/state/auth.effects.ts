import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, filter, map, of, switchMap, take, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthApiService } from '../api/auth-api.service';
import * as AuthActions from './auth.actions';
import { AuthResponse, AuthSubmitBody } from '../common/auth.interface';
import { ErrorFactoryService } from '../../../core/errors/service/error-factory.service';
import { LocalAsyncStorageService } from '../../../core/storage/local/local-async-storage.service';

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
            switchMap(() => combineLatest([
                this.localAsyncStorage.getItem(AuthItemLocalStorageKeys.Token).pipe(take(1)),
                this.localAsyncStorage.getItem(AuthItemLocalStorageKeys.UserName).pipe(take(1)),
                this.localAsyncStorage.getItem(AuthItemLocalStorageKeys.UserId).pipe(take(1)),
            ]).pipe(
                map(([token, userName, userId]) => {
                    const userData: Partial<AuthResponse> = {}
                    const convertedNumber = Number(userId as string);

                    token && (userData.token = token as string);
                    userName && (userData.username = userName as string);
                    Boolean(convertedNumber) && (userData.user_id = convertedNumber);

                    return AuthActions.checkAuthSuccess({ authData: userData });
                }),
            )),
        );
    });

    logIn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logIn),
            switchMap(({ submitData }: { submitData: AuthSubmitBody }) =>
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
                this.localAsyncStorage.setItem(AuthItemLocalStorageKeys.Token, response.token);
                this.localAsyncStorage.setItem(AuthItemLocalStorageKeys.UserName, response.username);
                this.localAsyncStorage.setItem(AuthItemLocalStorageKeys.UserId, response.user_id);
            }),
        );
    }, { functional: true, dispatch: false })

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
                this.localAsyncStorage.removeItem(AuthItemLocalStorageKeys.Token);
                this.localAsyncStorage.removeItem(AuthItemLocalStorageKeys.UserName);
                this.localAsyncStorage.removeItem(AuthItemLocalStorageKeys.UserId);
            }),
        );
    }, { functional: true, dispatch: false });

    constructor(
        private readonly actions$: Actions,
        private readonly authApiService: AuthApiService,
        private readonly errorFactory: ErrorFactoryService,
        private readonly toastr: ToastrService,
        private readonly localAsyncStorage: LocalAsyncStorageService,
    ) {}
}
