import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { LayoutService } from './service/layout.service';
import { PageLoaderService } from '../../core/service/page-loader.service';

@Component({
  selector: 'pm-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  public readonly breakpoints = Breakpoints;
  public readonly loading$ = this.pageLoaderService.loading$;
  public readonly layoutTypes$: Observable<string> = this.layoutService.layoutType$

  constructor(private readonly layoutService: LayoutService, private readonly pageLoaderService: PageLoaderService) {}
}
