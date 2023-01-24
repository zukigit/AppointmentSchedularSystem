import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesidebarComponent } from './traineesidebar.component';

describe('TraineesidebarComponent', () => {
  let component: TraineesidebarComponent;
  let fixture: ComponentFixture<TraineesidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineesidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineesidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
