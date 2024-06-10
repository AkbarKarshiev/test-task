import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageLoaderService {
  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$ = this._isLoading$.asObservable();

    public startLoading(): void {
        this._isLoading$.next(true);
    }

    public stopLoading(): void {
        this._isLoading$.next(false);
    }
}
