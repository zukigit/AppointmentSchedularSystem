import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAppByuserComponent } from './update-app-byuser.component';

describe('UpdateAppByuserComponent', () => {
  let component: UpdateAppByuserComponent;
  let fixture: ComponentFixture<UpdateAppByuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAppByuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAppByuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
