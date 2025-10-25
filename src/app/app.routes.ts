import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ActivityComponent } from './components/activity/activity.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ProjectComponent } from './components/project/project.component';
import { GradingComponent } from './components/grading/grading.component';
import { AttendanceTeacherComponent } from './components/attendance-teacher/attendance-teacher.component';
import { AuthGuard } from './guards/auth.guard';
import { TeacherGuard } from './guards/teacher.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
  { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },
  { path: 'timetable', component: TimetableComponent, canActivate: [AuthGuard] },
  { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
  { path: 'grading', component: GradingComponent, canActivate: [AuthGuard, TeacherGuard] },
  { path: 'attendance-teacher', component: AttendanceTeacherComponent, canActivate: [AuthGuard, TeacherGuard] }
];
