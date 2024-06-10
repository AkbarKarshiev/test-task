import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

import { AuthFacade } from '../../pages/auth/state/auth.facade';
import { NavigationService } from '../navigation/service/navigation.service';
import { NavigationPaths, PATHS } from '../navigation/common/navigation.interface';

export const authGuard: CanActivateFn = (): Observable<boolean> | Promise<boolean> => {
  const authFacade = inject(AuthFacade);
  const navigationService = inject(NavigationService);
  const paths = inject<NavigationPaths>(PATHS);

  return authFacade.loggedIn$.pipe(
    switchMap((loggedIn) => {
      if (!loggedIn) {
        return navigationService.navigate([paths.home, paths.auth])
      }

      return of(true);
    }),
  );
};
