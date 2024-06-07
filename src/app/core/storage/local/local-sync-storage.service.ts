import { Injectable } from '@angular/core';

import { AbstractSyncStorage } from '../common/storages/abstract-sync.storage';
import { storageAvailable } from '../common/utils/storage.utils';
import { MemoryStorageService } from '../memory/memory-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalSyncStorageService extends AbstractSyncStorage {

  constructor() {
    super(storageAvailable('localStorage') ? window.localStorage : new MemoryStorageService());
  }
}
