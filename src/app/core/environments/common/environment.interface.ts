import { InjectionToken } from '@angular/core';

export interface Environments {
    production: boolean;
    brand: string;
    appHost: string;
    api: string;
}

export const ENVIRONMENTS = new InjectionToken<Environments>('ENVIRONMENTS');

export const ENVIRONMENTS_DEFAULT: Environments = {
    production: false,
    brand: 'ToDo App',
    appHost: 'http://localhost',
    api: 'https://joldibaev.uz/api'
};
