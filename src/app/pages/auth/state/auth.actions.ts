import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthSubmitBody, AuthResponse } from '../common/auth.interface';

export const checkAuth = createAction('[Auth] Check Auth');

export const checkAuthSuccess = createAction('[Auth] Check Auth Success', props<{ authData: Partial<AuthResponse> }>());

export const logIn = createAction('[Auth] LogIn', props<{ submitData: AuthSubmitBody }>());

export const logInSuccess = createAction('[Auth] LogIn Success', props<{ response: AuthResponse }>());

export const logInFailure = createAction('[Auth] LogIn Failure', props<{ error: HttpErrorResponse }>());

export const logOut = createAction('[Auth] LogOut');

