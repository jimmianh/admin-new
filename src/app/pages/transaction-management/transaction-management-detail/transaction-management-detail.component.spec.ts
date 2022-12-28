import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionManagementDetailComponent } from './transaction-management-detail.component';

describe('TransactionManagementDetailComponent', () => {
  let component: TransactionManagementDetailComponent;
  let fixture: ComponentFixture<TransactionManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionManagementDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
