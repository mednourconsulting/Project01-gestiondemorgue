import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureDecesComponent } from './nature-deces.component';

describe('NatureDecesComponent', () => {
  let component: NatureDecesComponent;
  let fixture: ComponentFixture<NatureDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
