import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { ENVIRONMENTS } from './core/environments/common/environment.interface';
import { environment } from '../environments/environment';
import { NAVIGATION_PATHS, PATHS } from './core/navigation/common/navigation.interface';

import { ListStateModule } from './pages/list/state/list-state.module';
import { RootStoreModule } from './core/store/root/root.module';
import { authInterceptor } from './core/api/interceptors/auth.interceptor';

@NgModule({
  imports: [
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.doubleBounce,
      backdropBackgroundColour: "rgba(0,0,0,0.5)",
    }),
    ToastrModule.forRoot(),
    RootStoreModule,
    ListStateModule,

  ],
  providers: [
    provideHttpClient(
        withInterceptors([authInterceptor]),
    ),
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
    {
      provide: PATHS,
      useValue: NAVIGATION_PATHS,
    },
  ],
})
export class AppCoreModule { }
