import { HttpStatusCode } from '@angular/common/http';
import { Nullable } from '../../common/types/typings';

export interface CommonHttpLikeError {
    status: HttpStatusCode;
    statusText?: Nullable<string>;
    error?: any;
}

export interface ServerHttpLikeError {
    status: HttpStatusCode;
    statusMessage?: Nullable<string>;
    error?: any;
}
