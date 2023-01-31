import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorViewDetailComponent } from './sponsor-view-detail.component';

describe('SponsorViewDetailComponent', () => {
  let component: SponsorViewDetailComponent;
  let fixture: ComponentFixture<SponsorViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorViewDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
