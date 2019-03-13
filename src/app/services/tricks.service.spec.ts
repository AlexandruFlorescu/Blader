import { TestBed } from '@angular/core/testing';

import { TricksService } from './tricks.service';

describe('TricksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TricksService = TestBed.get(TricksService);
    expect(service).toBeTruthy();
  });
});
