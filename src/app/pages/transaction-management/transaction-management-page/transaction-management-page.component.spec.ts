import { ComponentFixture, TestBed } from '@angular/core/testing';

import {TransactionManagementPageComponent} from "./transaction-management-page.component";

describe('TransactionManagementPageComponentComponent', () => {
  let component: TransactionManagementPageComponent;
  let fixture: ComponentFixture<TransactionManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
