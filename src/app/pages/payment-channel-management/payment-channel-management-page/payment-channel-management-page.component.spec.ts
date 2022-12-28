import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChannelManagementPageComponent } from './payment-channel-management-page.component';

describe('PaymentChannelManagementPageComponent', () => {
  let component: PaymentChannelManagementPageComponent;
  let fixture: ComponentFixture<PaymentChannelManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentChannelManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentChannelManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
