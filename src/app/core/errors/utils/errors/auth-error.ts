import { CommonError } from './common-error';
import { CommonHttpLikeError } from '../error-interfaces';

export class AuthError extends CommonError<CommonHttpLikeError> {
    constructor(private response: CommonHttpLikeError) {
        super(response);
    }

    public get statusText(): string {
        return this.response?.statusText ?? '';
    }
}
