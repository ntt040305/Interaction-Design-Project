import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTeacherComponent } from './attendance-teacher.component';

describe('AttendanceTeacherComponent', () => {
  let component: AttendanceTeacherComponent;
  let fixture: ComponentFixture<AttendanceTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
