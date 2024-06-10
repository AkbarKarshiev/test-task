import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { AuthFacade } from '../../pages/auth/state/auth.facade';
import { NavigationService } from '../navigation/service/navigation.service';
import { NavigationPaths, PATHS } from '../navigation/common/navigation.interface';

export const authPageGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const navigationService = inject(NavigationService);
  const paths = inject<NavigationPaths>(PATHS);

  return authFacade.loggedIn$.pipe(
    switchMap((loggedIn) => {
      if (loggedIn) {
        return navigationService.navigate([paths.home, paths.main])
      }

      return of(true);
    }),
  );
};
