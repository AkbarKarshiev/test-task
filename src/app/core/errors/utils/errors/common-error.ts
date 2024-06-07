import { HttpLikeError, Nullable } from '../../../common/types/typings';
import { ApiError } from '../../common/api-error';
import { getMessageFromErrorResponse } from '../helper-functions';

export class CommonError<T extends HttpLikeError> extends ApiError {
    protected _error?: Nullable<T['error']>;
    protected _status!: T['status'];

    public get error(): Nullable<T['error']> {
        return this._error;
    }

    public get status(): T['status'] {
        return this._status;
    }

    constructor(response: T) {
        super(getMessageFromErrorResponse(response));
        this._status = response.status;
        this._error = response.error;
    }
}
