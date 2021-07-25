import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderViewComponent } from './user-order-view.component';

describe('UserOrderViewComponent', () => {
  let component: UserOrderViewComponent;
  let fixture: ComponentFixture<UserOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
