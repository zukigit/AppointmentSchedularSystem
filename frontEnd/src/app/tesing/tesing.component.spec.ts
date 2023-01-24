import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesingComponent } from './tesing.component';

describe('TesingComponent', () => {
  let component: TesingComponent;
  let fixture: ComponentFixture<TesingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
