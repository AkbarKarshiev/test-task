import { TestBed } from '@angular/core/testing';

import { LocalSyncStorageService } from './local-sync-storage.service';

describe('LocalSyncStorageService', () => {
  let service: LocalSyncStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalSyncStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
