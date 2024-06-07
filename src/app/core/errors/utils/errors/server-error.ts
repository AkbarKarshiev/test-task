import { HttpStatusCode } from '@angular/common/http';
import { CommonError } from './common-error';
import { ServerHttpLikeError } from '../error-interfaces';

export class ServerError extends CommonError<ServerHttpLikeError> {
    constructor(private response: ServerHttpLikeError) {
        super(response);
        if (this._status < HttpStatusCode.InternalServerError) {
            console.warn(`This server error has wrong status: ${this.status}`);
            this._status = HttpStatusCode.InternalServerError;
        }
    }

    public get statusMessage(): string {
        return this.response?.statusMessage ?? '';
    }
}
