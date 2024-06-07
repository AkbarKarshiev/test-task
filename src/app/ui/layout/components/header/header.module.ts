import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { LogoModule } from '../logo/logo.module';
import { ProfileControlsModule } from '../profile-controls/profile-controls.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [LogoModule, ProfileControlsModule],
  exports: [HeaderComponent],
})
export class HeaderModule { }
