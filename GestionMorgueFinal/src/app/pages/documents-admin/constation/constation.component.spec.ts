import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstationComponent } from './constation.component';

describe('ConstationComponent', () => {
  let component: ConstationComponent;
  let fixture: ComponentFixture<ConstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
