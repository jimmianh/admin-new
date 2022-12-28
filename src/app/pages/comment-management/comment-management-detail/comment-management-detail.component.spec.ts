import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentManagementDetailComponent } from './comment-management-detail.component';

describe('CommentManagementDetailComponent', () => {
  let component: CommentManagementDetailComponent;
  let fixture: ComponentFixture<CommentManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentManagementDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
