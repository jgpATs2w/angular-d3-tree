import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularD3TreeLibComponent } from './angular-d3-tree-lib.component';

describe('AngularD3TreeLibComponent', () => {
  let component: AngularD3TreeLibComponent;
  let fixture: ComponentFixture<AngularD3TreeLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularD3TreeLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularD3TreeLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
