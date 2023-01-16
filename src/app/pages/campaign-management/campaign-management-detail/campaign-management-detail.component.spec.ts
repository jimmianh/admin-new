import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignManagementDetailComponent } from './campaign-management-detail.component';

describe('CampaignManagementDetailComponent', () => {
  let component: CampaignManagementDetailComponent;
  let fixture: ComponentFixture<CampaignManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignManagementDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
