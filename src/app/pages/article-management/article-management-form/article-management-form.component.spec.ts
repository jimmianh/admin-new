import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManagementFormComponent } from './article-management-form.component';

describe('ArticleManagementFormComponent', () => {
  let component: ArticleManagementFormComponent;
  let fixture: ComponentFixture<ArticleManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleManagementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
