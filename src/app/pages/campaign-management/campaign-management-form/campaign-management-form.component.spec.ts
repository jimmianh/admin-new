import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignManagementFormComponent } from './campaign-management-form.component';

describe('CampaignManagementFormComponent', () => {
  let component: CampaignManagementFormComponent;
  let fixture: ComponentFixture<CampaignManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignManagementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
