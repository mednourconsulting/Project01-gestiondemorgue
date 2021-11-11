import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterrementComponent } from './enterrement.component';

describe('EnterrementComponent', () => {
  let component: EnterrementComponent;
  let fixture: ComponentFixture<EnterrementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterrementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
