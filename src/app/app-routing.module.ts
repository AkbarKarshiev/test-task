import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NAVIGATION_PATHS } from './core/navigation/common/navigation.interface';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutModule } from './ui/layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: NAVIGATION_PATHS.home,
        component: LayoutComponent,
        children: [
          {
            path: NAVIGATION_PATHS.main,
            loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
          },
          {
            path: NAVIGATION_PATHS.list,
            loadChildren: () => import('./pages/list/list.module').then(m => m.ListModule),
          },
          {
            path: '**',
            redirectTo: NAVIGATION_PATHS.main,
          },
        ]
      },
      {
        path: NAVIGATION_PATHS.auth,
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: '**',
        redirectTo: NAVIGATION_PATHS.home,
      },
    ],
  }
];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
