import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyviewbyuserComponent } from './dailyviewbyuser.component';

describe('DailyviewbyuserComponent', () => {
  let component: DailyviewbyuserComponent;
  let fixture: ComponentFixture<DailyviewbyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyviewbyuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyviewbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
