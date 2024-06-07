import { Nullable } from '../../common/types/typings';
import { isNil } from '../../common/utils/helper-functions';

const errorMessageFields: Array<string> = ['message', 'detail'];

export function getMessageFromErrorResponse(response: any): Nullable<string> {
    if (isNil(response)) {
        return null;
    }
    if (!isNil(response.error)) {
        if (typeof response.error === 'string' && response.error !== '') {
            return response.error;
        }
        for (const value of errorMessageFields) {
            if (typeof response.error[value] === 'string' && response.error[value] !== '') {
                return response.error[value];
            }
        }
    }
    return response.message ?? null;
}
