import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ActivityComponent } from './components/activity/activity.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ProjectComponent } from './components/project/project.component';

export const appConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot([
        { path: '', component: DashboardComponent },
        { path: 'attendance', component: AttendanceComponent },
        { path: 'activity', component: ActivityComponent },
        { path: 'timetable', component: TimetableComponent },
        { path: 'project', component: ProjectComponent }
      ])
    )
  ]
};
