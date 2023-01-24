import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailViewComponent } from './appointment-detail-view.component';

describe('AppointmentDetailViewComponent', () => {
  let component: AppointmentDetailViewComponent;
  let fixture: ComponentFixture<AppointmentDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
