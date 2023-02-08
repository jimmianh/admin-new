import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralityComponent } from './generality.component';

describe('GeneralityComponent', () => {
  let component: GeneralityComponent;
  let fixture: ComponentFixture<GeneralityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
