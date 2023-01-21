import { TestBed } from '@angular/core/testing';

import { TraineeAuthGuard } from './trainee-auth.guard';

describe('TraineeAuthGuard', () => {
  let guard: TraineeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TraineeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
