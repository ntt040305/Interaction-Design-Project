import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ActivityComponent } from './components/activity/activity.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { ProjectComponent } from './components/project/project.component';
import { GradingComponent } from './components/grading/grading.component';
import { AttendanceTeacherComponent } from './components/attendance-teacher/attendance-teacher.component';
import { AuthGuard } from './guards/auth.guard';
import { TeacherGuard } from './guards/teacher.guard';

export const appConfig = {
  providers: [
    // Firebase providers (keep as top-level providers)
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBEsjgGsvbZTgf7JDXoNvuBOP_rWRfzKvs",
      authDomain: "interactiondesign-bc5d6.firebaseapp.com",
      projectId: "interactiondesign-bc5d6",
      storageBucket: "interactiondesign-bc5d6.firebasestorage.app",
      messagingSenderId: "125619345579",
      appId: "1:125619345579:web:c4e076fd8a2471fd967fee",
      measurementId: "G-DY9656RCF3"
    })),
    provideAuth(() => getAuth()),
    AuthGuard,
    TeacherGuard,
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot([
        { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'attendance', component: AttendanceComponent, canActivate: [AuthGuard] },
        { path: 'activity', component: ActivityComponent, canActivate: [AuthGuard] },
        { path: 'timetable', component: TimetableComponent, canActivate: [AuthGuard] },
        { path: 'project', component: ProjectComponent, canActivate: [AuthGuard] },
        { path: 'grading', component: GradingComponent, canActivate: [AuthGuard, TeacherGuard] },
        { path: 'attendance-teacher', component: AttendanceTeacherComponent, canActivate: [AuthGuard, TeacherGuard] }
      ])
    )
  ]
};
