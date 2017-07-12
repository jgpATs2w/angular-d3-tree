import { TestBed, inject } from '@angular/core/testing';

import { TreeService } from './tree.service';

describe('TreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeService]
    });
  });

  it('should be created', inject([TreeService], (service: TreeService) => {
    expect(service).toBeTruthy();
  }));
});
