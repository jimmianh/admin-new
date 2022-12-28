import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagementFormComponent } from './categories-management-form.component';

describe('CategoriesManagementFormComponent', () => {
  let component: CategoriesManagementFormComponent;
  let fixture: ComponentFixture<CategoriesManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesManagementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
