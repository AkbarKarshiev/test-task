import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './components/header/header.module';
import { RouterOutlet } from '@angular/router';


@NgModule({
  imports: [CommonModule, HeaderModule, RouterOutlet],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule { }
