import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexeDecesComponent } from './sexe-deces.component';

describe('SexeDecesComponent', () => {
  let component: SexeDecesComponent;
  let fixture: ComponentFixture<SexeDecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexeDecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexeDecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
