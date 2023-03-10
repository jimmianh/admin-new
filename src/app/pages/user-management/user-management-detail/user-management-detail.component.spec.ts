import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementDetailComponent } from './user-management-detail.component';

describe('CampaignManagementDetailComponent', () => {
  let component: UserManagementDetailComponent;
  let fixture: ComponentFixture<UserManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
