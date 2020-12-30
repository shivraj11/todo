import { TestBed } from '@angular/core/testing';

import { RedirectedIfAuthenticatedGuard } from './redirected-if-authenticated.guard';

describe('RedirectedIfAuthenticatedGuard', () => {
  let guard: RedirectedIfAuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectedIfAuthenticatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
