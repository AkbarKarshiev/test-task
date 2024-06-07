import { Injectable } from '@angular/core';
import { AbstractAsyncStorage } from '../common/storages/abstract-async.storage';
import { LocalSyncStorageService } from './local-sync-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalAsyncStorageService extends AbstractAsyncStorage {
  constructor(private readonly localSyncStorageService: LocalSyncStorageService) {
    super(localSyncStorageService);
  }
}
