import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressInactiveComponent } from './address-inactive.component';

describe('AddressInactiveComponent', () => {
  let component: AddressInactiveComponent;
  let fixture: ComponentFixture<AddressInactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressInactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
