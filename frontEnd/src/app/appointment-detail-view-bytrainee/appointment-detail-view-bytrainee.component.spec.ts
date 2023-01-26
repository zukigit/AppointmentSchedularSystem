import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailViewBytraineeComponent } from './appointment-detail-view-bytrainee.component';

describe('AppointmentDetailViewBytraineeComponent', () => {
  let component: AppointmentDetailViewBytraineeComponent;
  let fixture: ComponentFixture<AppointmentDetailViewBytraineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetailViewBytraineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailViewBytraineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
