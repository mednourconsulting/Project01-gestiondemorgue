import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicolegalComponent } from './medicolegal.component';

describe('MedicolegalComponent', () => {
  let component: MedicolegalComponent;
  let fixture: ComponentFixture<MedicolegalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicolegalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicolegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
