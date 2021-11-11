import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauxNesComponent } from './nouveaux-nes.component';

describe('NouveauxNesComponent', () => {
  let component: NouveauxNesComponent;
  let fixture: ComponentFixture<NouveauxNesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauxNesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauxNesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
