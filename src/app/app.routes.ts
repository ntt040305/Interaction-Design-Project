import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ActivityComponent } from './components/activity/activity.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ProjectComponent } from './components/project/project.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'timetable', component: TimetableComponent },
  { path: 'project', component: ProjectComponent }
];
