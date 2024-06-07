import { APP_INITIALIZER, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { rootReducer } from './root.reducer';
import { AuthFacade } from '../../../pages/auth/state/auth.facade';
import { AuthEffects } from '../../../pages/auth/state/auth.effects';
import { environment } from '../../../../environments/environment.development';
import { AuthApiModule } from '../../../pages/auth/api/auth-api.module';

@NgModule({
  imports: [
    AuthApiModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([
      AuthEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    AuthFacade,
    {
      provide: APP_INITIALIZER,
      useFactory: (authFacade: AuthFacade) => () => authFacade.checkAuth(),
      deps: [AuthFacade],
      multi: true,
    }
  ]
})
export class RootStoreModule { }
