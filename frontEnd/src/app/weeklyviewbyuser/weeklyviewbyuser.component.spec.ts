import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyviewbyuserComponent } from './weeklyviewbyuser.component';

describe('WeeklyviewbyuserComponent', () => {
  let component: WeeklyviewbyuserComponent;
  let fixture: ComponentFixture<WeeklyviewbyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyviewbyuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyviewbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
