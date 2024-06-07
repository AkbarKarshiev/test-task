import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { LayoutService } from './service/layout.service';

@Component({
  selector: 'pm-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {
  public readonly breakpoints = Breakpoints;

  layoutTypes$!: Observable<string>

  constructor(private readonly layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutTypes$ = this.layoutService.layoutType$;
  }
}
