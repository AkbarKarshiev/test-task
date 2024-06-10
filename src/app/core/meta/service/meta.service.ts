import { Inject, Injectable, Optional } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { META_CONFIG, META_CONFIG_DEFAULT, MetaConfig } from '../common/meta.interface';
import { EnvironmentService } from '../../environments/service/environment.service';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly metaConfig: MetaConfig;

  constructor(
    private readonly titleService: Title,
    private readonly environmentService: EnvironmentService,
    @Optional() @Inject(META_CONFIG) metaConfig: MetaConfig | null,
  ) {
    this.metaConfig = metaConfig ?? META_CONFIG_DEFAULT;
  }

  update(metaConfig?: Partial<MetaConfig>): void {
    const config: MetaConfig = { ...this.metaConfig, ...metaConfig };
    this.titleService.setTitle(`${config.title} | ${this.environmentService.environments.brand}`);
  }
}
