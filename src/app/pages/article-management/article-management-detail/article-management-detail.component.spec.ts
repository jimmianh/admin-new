import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManagementDetailComponent } from './article-management-detail.component';

describe('CampaignManagementDetailComponent', () => {
  let component: ArticleManagementDetailComponent;
  let fixture: ComponentFixture<ArticleManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleManagementDetailComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ArticleManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
