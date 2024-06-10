import { HttpLikeError, Nullable } from '../types/typings';
import { filter, Observable, OperatorFunction, pipe, UnaryFunction } from 'rxjs';

export function isNil<T>(value: Nullable<T>): value is null | undefined {
    return value === null || value === undefined;
}

export function isResponse<T extends HttpLikeError>(v: Nullable<Partial<T>>): v is T {
    if (isNil(v)) {
        return false;
    } else {
        return !isNil(v.status) && typeof v.status === 'number' && !isNaN(v.status);
    }
}

export function filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
    return pipe(
      filter(x => x != null) as OperatorFunction<T | null |  undefined, T>
    );
}
