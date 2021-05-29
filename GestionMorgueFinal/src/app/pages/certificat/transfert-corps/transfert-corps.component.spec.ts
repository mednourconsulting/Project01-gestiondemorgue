import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertCorpsComponent } from './transfert-corps.component';

describe('TransfertCorpsComponent', () => {
  let component: TransfertCorpsComponent;
  let fixture: ComponentFixture<TransfertCorpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransfertCorpsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertCorpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
