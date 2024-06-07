import { TestBed } from '@angular/core/testing';

import { LocalAsyncStorageService } from './local-async-storage.service';

describe('LocalAsyncStorageService', () => {
  let service: LocalAsyncStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalAsyncStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
