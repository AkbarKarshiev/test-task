import { HttpStatusCode } from '@angular/common/http';

export type Nullable<T> = T | null | undefined;

export interface HttpLikeError<T = any> {
    status: HttpStatusCode;
    error?: Nullable<T>;
    message?: Nullable<string>;
}
