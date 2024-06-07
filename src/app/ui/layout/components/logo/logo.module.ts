import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import { RouterLink } from '@angular/router';
import { NavigationPathPipe } from '../../../../core/navigation/pipes/navigation-path.pipe';



@NgModule({
    declarations: [
        LogoComponent,
    ],
    imports: [
        CommonModule,
        RouterLink,
        NavigationPathPipe,
    ],
    exports: [
        LogoComponent,
    ],
})
export class LogoModule { }
