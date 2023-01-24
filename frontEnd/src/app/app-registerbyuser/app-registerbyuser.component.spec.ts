import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRegisterbyuserComponent } from './app-registerbyuser.component';

describe('AppRegisterbyuserComponent', () => {
  let component: AppRegisterbyuserComponent;
  let fixture: ComponentFixture<AppRegisterbyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRegisterbyuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRegisterbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
