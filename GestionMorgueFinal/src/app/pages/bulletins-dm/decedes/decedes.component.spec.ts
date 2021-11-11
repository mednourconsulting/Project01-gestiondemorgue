import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecedesComponent } from './decedes.component';

describe('DecedesComponent', () => {
  let component: DecedesComponent;
  let fixture: ComponentFixture<DecedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecedesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
