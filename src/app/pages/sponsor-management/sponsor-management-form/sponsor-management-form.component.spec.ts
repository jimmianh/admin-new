import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorManagementFormComponent } from './sponsor-management-form.component';

describe('SponsorManagementFormComponent', () => {
  let component: SponsorManagementFormComponent;
  let fixture: ComponentFixture<SponsorManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorManagementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
