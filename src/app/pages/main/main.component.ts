import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { EnvironmentService } from '../../core/environments/service/environment.service';
import { NavigationService } from '../../core/navigation/service/navigation.service';
import { NavigationPaths, PATHS } from '../../core/navigation/common/navigation.interface';
import { AuthFacade } from '../auth/state/auth.facade';

@Component({
  selector: 'pm-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public readonly userLoggedIn$ = this.authFacade.loggedIn$;

  public brand!: string;

  constructor(
      private readonly environmentService: EnvironmentService,
      private readonly authFacade: AuthFacade,
      private readonly navigationService: NavigationService,
      @Inject(PATHS) private readonly paths: NavigationPaths,
  ) {}

  public ngOnInit() {
    this.brand = this.environmentService.environments.brand;
  }

  public async logIn(): Promise<void> {
    await this.navigationService.navigate([this.paths.auth]);
  }

  public async goToListPage(): Promise<void> {
    await this.navigationService.navigate([this.paths.home, this.paths.list]);
  }
}
