import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineenavbarComponent } from './traineenavbar.component';

describe('TraineenavbarComponent', () => {
  let component: TraineenavbarComponent;
  let fixture: ComponentFixture<TraineenavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineenavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineenavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
