import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthSubmitBody } from './common/auth.interface';
import { AuthFacade } from './state/auth.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { NavigationService } from '../../core/navigation/service/navigation.service';
import { NavigationPaths, PATHS } from '../../core/navigation/common/navigation.interface';

@Component({
  selector: 'pm-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  public readonly authForm: FormGroup = new FormGroup({
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  public readonly submitting$ = this.authFacade.loading$;
  public readonly loggedIn$ = this.authFacade.loggedIn$;

  constructor(
      public readonly authFacade: AuthFacade,
      private readonly navigationService: NavigationService,
      @Inject(PATHS) private readonly paths: NavigationPaths
  ) {
    this.loggedIn$.pipe(takeUntilDestroyed(), filter(Boolean)).subscribe({
      next: async (): Promise<void> => {
        await this.navigationService.navigate([this.paths.home, this.paths.list]);
      }
    });
  }

  public async goToMainPage(): Promise<void> {
    await this.navigationService.navigate([this.paths.home, this.paths.main]);
  }

  public submit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const submitData: AuthSubmitBody = this.authForm.value;

    this.authFacade.logIn(submitData);
  }
}
