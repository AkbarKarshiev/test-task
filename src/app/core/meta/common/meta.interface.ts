import { InjectionToken } from '@angular/core';

export interface MetaConfig {
  readonly title: string;
  readonly url?: string;
}

export const META_CONFIG = new InjectionToken<MetaConfig>('MetaConfig');

export const META_CONFIG_DEFAULT: MetaConfig = {
  title: "World's best Todo App",
}
