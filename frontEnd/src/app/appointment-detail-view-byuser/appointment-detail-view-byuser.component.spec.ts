import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailViewByuserComponent } from './appointment-detail-view-byuser.component';

describe('AppointmentDetailViewByuserComponent', () => {
  let component: AppointmentDetailViewByuserComponent;
  let fixture: ComponentFixture<AppointmentDetailViewByuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetailViewByuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailViewByuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
