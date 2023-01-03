import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRegisterComponent } from './app-register.component';

describe('AppRegisterComponent', () => {
  let component: AppRegisterComponent;
  let fixture: ComponentFixture<AppRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRegisterComponent);
   
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
