import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyviewbytraineeComponent } from './weeklyviewbytrainee.component';

describe('WeeklyviewbytraineeComponent', () => {
  let component: WeeklyviewbytraineeComponent;
  let fixture: ComponentFixture<WeeklyviewbytraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyviewbytraineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyviewbytraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
