import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorManagementPageComponent } from './sponsor-management-page.component';

describe('SponsorManagementPageComponent', () => {
  let component: SponsorManagementPageComponent;
  let fixture: ComponentFixture<SponsorManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorManagementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
