import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';

import { AuthFacade } from '../../../pages/auth/state/auth.facade';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authFacade = inject(AuthFacade);

  return authFacade.userToken$.pipe(
    take(1),
    switchMap((token: string | null) => {
      let extendedReq = req;

      if (token) {
        extendedReq = req.clone({
          setHeaders: {
            Authorization: `Token ${token}`
          }
        });
      }

      return next(extendedReq);
    }),
  )
}
