import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqManagementFormComponent } from './faq-management-form.component';

describe('FaqManagementFormComponent', () => {
  let component: FaqManagementFormComponent;
  let fixture: ComponentFixture<FaqManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqManagementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
