import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedcinsComponent } from './medcins.component';

describe('MedcinsComponent', () => {
  let component: MedcinsComponent;
  let fixture: ComponentFixture<MedcinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedcinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedcinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
