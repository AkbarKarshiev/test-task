import { InjectionToken } from '@angular/core';

export interface NavigationPaths {
    home: string;
    main: string;
    list: string;
    auth: string;

    // Errors
    serverError: string;
    notFound: string;
}

export const NAVIGATION_PATHS: NavigationPaths = {
    home: 'home',
    main: 'main',
    list: 'list',
    auth: 'auth',

    serverError: 'server-error',
    notFound: 'not-found',
};

export const PATHS = new InjectionToken<Record<string, string>>('NAVIGATION_PATHS');
