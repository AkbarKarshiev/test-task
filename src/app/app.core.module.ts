import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { ENVIRONMENTS } from './core/environments/common/environment.interface';
import { environment } from '../environments/environment.development';
import { NAVIGATION_PATHS, PATHS } from './core/navigation/common/navigation.interface';
import { AuthInterceptorService } from './core/api/interceptors/auth-interceptor.service';

import { ListStateModule } from './pages/list/state/list-state.module';
import { RootStoreModule } from './core/store/root/root.module';

@NgModule({
  imports: [
    RootStoreModule,
    ListStateModule,

    ToastrModule.forRoot(),
  ],
  providers: [
    provideHttpClient(),
    {
      provide: ENVIRONMENTS,
      useValue: environment,
    },
    {
      provide: PATHS,
      useValue: NAVIGATION_PATHS,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    },
  ],
})
export class AppCoreModule { }
