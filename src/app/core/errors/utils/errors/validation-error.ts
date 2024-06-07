import { CommonError } from './common-error';
import { CommonHttpLikeError } from '../error-interfaces';

export class ValidationError extends CommonError<CommonHttpLikeError> {
    constructor(private response: CommonHttpLikeError) {
        super(response);
    }

    public get statusText(): string {
        return this.response?.statusText ?? '';
    }
}
