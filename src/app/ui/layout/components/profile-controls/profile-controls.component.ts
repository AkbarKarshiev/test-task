import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { AuthFacade } from '../../../../pages/auth/state/auth.facade';
import { NavigationService } from '../../../../core/navigation/service/navigation.service';
import { NavigationPaths, PATHS } from '../../../../core/navigation/common/navigation.interface';

@Component({
  selector: 'pm-profile-controls',
  templateUrl: './profile-controls.component.html',
  styleUrl: './profile-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileControlsComponent {
  public readonly userLoggedIn$ = this.authFacade.loggedIn$;
  public readonly userName$ = this.authFacade.userName$;
  public readonly userId$ = this.authFacade.userId$;

  constructor(
      private readonly authFacade: AuthFacade,
      private readonly navigationService: NavigationService,
      @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}

  public logOut(): void {
    this.authFacade.logOut();
  }

  public async logIn(): Promise<void> {
    await this.navigationService.navigate([this.paths.auth])
  }
}
