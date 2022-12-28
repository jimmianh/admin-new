import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentChannelManagementFormComponent } from './payment-channel-management-form.component';

describe('PaymentChannelManagementFormComponent', () => {
  let component: PaymentChannelManagementFormComponent;
  let fixture: ComponentFixture<PaymentChannelManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentChannelManagementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentChannelManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
