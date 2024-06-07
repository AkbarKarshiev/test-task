import { Injectable } from '@angular/core';
import { HttpLikeError, Nullable } from '../../common/types/typings';
import { ApiError } from '../common/api-error';
import { isResponse } from '../../common/utils/helper-functions';
import { HttpStatusCode } from '@angular/common/http';
import { ServerError } from '../utils/errors/server-error';
import { ValidationError } from '../utils/errors/validation-error';
import { AuthError } from '../utils/errors/auth-error';
import { CommonError } from '../utils/errors/common-error';

@Injectable({
    providedIn: 'root',
})
export class ErrorFactoryService {

    public getErrorMessage(error: ApiError): string {
        return error.message;
    }

    public fromResponse<T extends HttpLikeError>(response: Nullable<Partial<T>>): ApiError {
        if (!isResponse(response)) {
            return new ApiError();
        }

        if (typeof response.error === 'object' && response.status === HttpStatusCode.Unauthorized) {
            return this.createAuthorizedError(response);
        }

        if (typeof response.error === 'object' && response.status === HttpStatusCode.BadRequest) {
            return this.createValidationError(response);
        }

        if (typeof response.error === 'string' && response.status >= HttpStatusCode.InternalServerError) {
            return this.createServerError(response);
        }

        return new CommonError(response);
    }

    private createAuthorizedError(response: HttpLikeError): AuthError {
        return new AuthError(response);
    }

    private createServerError(response: HttpLikeError): ServerError {
        return new ServerError(response);
    }

    private createValidationError(response: HttpLikeError): ValidationError {
        return new ValidationError(response);
    }
}
