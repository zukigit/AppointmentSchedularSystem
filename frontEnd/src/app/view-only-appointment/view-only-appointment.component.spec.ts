import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnlyAppointmentComponent } from './view-only-appointment.component';

describe('ViewOnlyAppointmentComponent', () => {
  let component: ViewOnlyAppointmentComponent;
  let fixture: ComponentFixture<ViewOnlyAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOnlyAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOnlyAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
