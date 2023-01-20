import { TestBed } from '@angular/core/testing';

import { NotiService } from './noti.service';

describe('NotiService', () => {
  let service: NotiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
