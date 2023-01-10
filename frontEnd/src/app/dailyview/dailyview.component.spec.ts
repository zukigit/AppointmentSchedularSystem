import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyviewComponent } from './dailyview.component';

describe('DailyviewComponent', () => {
  let component: DailyviewComponent;
  let fixture: ComponentFixture<DailyviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
