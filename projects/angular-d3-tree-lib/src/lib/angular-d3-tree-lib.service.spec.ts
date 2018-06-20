import { TestBed, inject } from '@angular/core/testing';

import { AngularD3TreeLibService } from './angular-d3-tree-lib.service';

describe('AngularD3TreeLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularD3TreeLibService]
    });
  });

  it('should be created', inject([AngularD3TreeLibService], (service: AngularD3TreeLibService) => {
    expect(service).toBeTruthy();
  }));
});
