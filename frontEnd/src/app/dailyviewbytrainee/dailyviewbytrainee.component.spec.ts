import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyviewbytraineeComponent } from './dailyviewbytrainee.component';

describe('DailyviewbytraineeComponent', () => {
  let component: DailyviewbytraineeComponent;
  let fixture: ComponentFixture<DailyviewbytraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyviewbytraineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyviewbytraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
