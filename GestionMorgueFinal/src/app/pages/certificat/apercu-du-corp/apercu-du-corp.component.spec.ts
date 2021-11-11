import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApercuDuCorpComponent } from './apercu-du-corp.component';

describe('ApercuDuCorpComponent', () => {
  let component: ApercuDuCorpComponent;
  let fixture: ComponentFixture<ApercuDuCorpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApercuDuCorpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApercuDuCorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
