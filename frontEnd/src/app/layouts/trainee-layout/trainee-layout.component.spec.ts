import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeLayoutComponent } from './trainee-layout.component';

describe('TraineeLayoutComponent', () => {
  let component: TraineeLayoutComponent;
  let fixture: ComponentFixture<TraineeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
