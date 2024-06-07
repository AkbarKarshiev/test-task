import { Nullable } from '../../common/types/typings';
import { isNil } from '../../common/utils/helper-functions';

const UNKNOWN_MESSAGE: string = 'Unknown error';

export class ApiError {
    private _message?: Nullable<string>;

    public get message(): string {
        return this._message ?? UNKNOWN_MESSAGE;
    }

    protected set message(text: string) {
        this._message = text;
    }

    constructor(message?: Nullable<string>) {
        if (!isNil(message)) {
            this.message = message;
        }
    }

    public toString(): string {
        return `ApiError: ${this.message}`;
    }
}
