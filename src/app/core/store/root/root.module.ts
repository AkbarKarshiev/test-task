import { APP_INITIALIZER, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { rootInitialState, rootReducer } from './root.reducer';
import { AuthFacade } from '../../../pages/auth/state/auth.facade';
import { AuthEffects } from '../../../pages/auth/state/auth.effects';
import { environment } from '../../../../environments/environment';
import { AuthApiModule } from '../../../pages/auth/api/auth-api.module';
import { RootRouterStateSerializerService } from './root-router-state-serializer.service';

@NgModule({
  imports: [
    AuthApiModule,
    StoreModule.forRoot(rootReducer, {
      initialState: rootInitialState,
      metaReducers: [],
    }),
    EffectsModule.forRoot([
      AuthEffects,
    ]),
    StoreRouterConnectingModule.forRoot({
      serializer: RootRouterStateSerializerService,
    }),
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
