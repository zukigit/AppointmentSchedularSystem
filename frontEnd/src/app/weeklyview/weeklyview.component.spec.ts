import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyviewComponent } from './weeklyview.component';

describe('WeeklyviewComponent', () => {
  let component: WeeklyviewComponent;
  let fixture: ComponentFixture<WeeklyviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
