import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { CreateEditListItemComponent } from './components/create-edit-list-item/create-edit-list-item.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateEditListItemComponent
  ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      ListRoutingModule,

      NgbDropdown,
      NgbDropdownItem,
      NgbDropdownMenu,
      NgbDropdownToggle,
    ],
})
export class ListModule { }
