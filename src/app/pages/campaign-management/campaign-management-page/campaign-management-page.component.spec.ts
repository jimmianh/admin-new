import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignManagementPageComponent } from './campaign-management-page.component';

describe('CampaignManagementPageComponent', () => {
  let component: CampaignManagementPageComponent;
  let fixture: ComponentFixture<CampaignManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
