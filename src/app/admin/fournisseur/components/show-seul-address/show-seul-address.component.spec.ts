import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeulAddressComponent } from './show-seul-address.component';

describe('ShowSeulAddressComponent', () => {
  let component: ShowSeulAddressComponent;
  let fixture: ComponentFixture<ShowSeulAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeulAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeulAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
