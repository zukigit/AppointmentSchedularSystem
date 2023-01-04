import { TestBed } from '@angular/core/testing';

import { LoginAuthGuard } from './login-auth.guard';

describe('LoginAuthGuard', () => {
  let guard: LoginAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
