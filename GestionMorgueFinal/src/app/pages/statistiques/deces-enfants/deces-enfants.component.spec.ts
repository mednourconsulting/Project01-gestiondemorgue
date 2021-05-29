import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecesEnfantsComponent } from './deces-enfants.component';

describe('DecesEnfantsComponent', () => {
  let component: DecesEnfantsComponent;
  let fixture: ComponentFixture<DecesEnfantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecesEnfantsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecesEnfantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
