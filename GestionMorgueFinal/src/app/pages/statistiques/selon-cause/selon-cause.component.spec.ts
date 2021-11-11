import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelonCauseComponent } from './selon-cause.component';

describe('SelonCauseComponent', () => {
  let component: SelonCauseComponent;
  let fixture: ComponentFixture<SelonCauseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelonCauseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelonCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
