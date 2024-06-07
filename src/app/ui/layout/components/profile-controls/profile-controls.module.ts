import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileControlsComponent } from './profile-controls.component';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ProfileControlsComponent],
  exports: [
    ProfileControlsComponent,
  ],
  imports: [CommonModule, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem],
})
export class ProfileControlsModule { }
