import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { EnvironmentService } from '../../../../core/environments/service/environment.service';
import { NavigationPaths, PATHS } from '../../../../core/navigation/common/navigation.interface';

@Component({
  selector: 'pm-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent implements OnInit {
  public brand!: string;

  constructor(private readonly environmentService: EnvironmentService, @Inject(PATHS) public readonly paths: NavigationPaths) {}

  public ngOnInit() {
    this.brand = this.environmentService.environments.brand;
  }
}
