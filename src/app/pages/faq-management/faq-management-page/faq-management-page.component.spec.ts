import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqManagementPageComponent } from './faq-management-page.component';

describe('FaqManagementPageComponent', () => {
  let component: FaqManagementPageComponent;
  let fixture: ComponentFixture<FaqManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
