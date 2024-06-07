import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
