import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pm-root',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private readonly modalConfig: NgbModalConfig) {
    modalConfig.centered = true;
  }
}
