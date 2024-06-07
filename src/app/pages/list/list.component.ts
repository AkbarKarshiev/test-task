import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pm-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {

}
