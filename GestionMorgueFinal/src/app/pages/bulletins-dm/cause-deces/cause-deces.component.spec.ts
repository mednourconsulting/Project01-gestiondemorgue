import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CauseDecesComponent } from './cause-deces.component';

describe('CauseDecesComponent', () => {
  let component: CauseDecesComponent;
  let fixture: ComponentFixture<CauseDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauseDecesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauseDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
