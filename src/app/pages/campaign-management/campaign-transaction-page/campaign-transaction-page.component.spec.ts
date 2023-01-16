import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTransactionPageComponent } from './campaign-transaction-page.component';

describe('CampaignTransactionPageComponent', () => {
  let component: CampaignTransactionPageComponent;
  let fixture: ComponentFixture<CampaignTransactionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignTransactionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignTransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
