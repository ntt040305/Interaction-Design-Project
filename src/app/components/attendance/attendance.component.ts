import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService, AppUser } from '../../services/auth.service';
import { Subscription } from 'rxjs';

interface AttendanceStats {
  totalPresent: number;
  presentChange: number;
  lateCount: number;
  lateChange: number;
  leaveCount: number;
  absentCount: number;
  overallRate: number;
  totalClasses: number;
}

interface WeeklyData {
  week: number;
  rate: number;
}

interface SubjectAttendance {
  name: string;
  teacher: string;
  rate: number;
}

interface AttendanceRecord {
  date: Date;
  subject: string;
  time: string;
  room: string;
  status: 'present' | 'absent' | 'late' | 'excused';
}

interface Student {
  name: string;
  id: string;
  rate: number;
}

interface LeaveRequest {
  id: string;
  subject: string;
  classTime: string;
  leaveStartTime: string;
  leaveEndTime: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-attendance',
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit, OnDestroy {
  selectedPeriod: 'month' | 'semester' = 'month';
  currentMonth = 'December 2024';
  user: AppUser | null = null;
  private sub?: Subscription;
  showLeaveDialog = false;
  
  todayClasses: any[] = [];
  leaveRequests: LeaveRequest[] = [];
  
  newLeaveRequest: any = {
    subject: '',
    classTime: '',
    leaveStartTime: '',
    leaveEndTime: '',
    date: ''
  };

  attendanceStats: AttendanceStats = {
    totalPresent: 19,
    presentChange: 2,
    lateCount: 4,
    lateChange: 1,
    leaveCount: 7,
    absentCount: 3,
    overallRate: 95,
    totalClasses: 20
  };

  weeklyData: WeeklyData[] = [
    { week: 1, rate: 90 },
    { week: 2, rate: 85 },
    { week: 3, rate: 95 },
    { week: 4, rate: 100 }
  ];

  subjectAttendance: SubjectAttendance[] = [
    { name: 'Web Programming', teacher: 'Prof. John Smith', rate: 95 },
    { name: 'Database Systems', teacher: 'Dr. Jane Doe', rate: 90 },
    { name: 'Computer Networks', teacher: 'Prof. Mike Johnson', rate: 100 },
    { name: 'AI & Machine Learning', teacher: 'Dr. Sarah Wilson', rate: 85 }
  ];

  recentAttendance: AttendanceRecord[] = [
    { date: new Date('2024-12-23'), subject: 'Web Programming', time: '08:00', room: 'A101', status: 'present' },
    { date: new Date('2024-12-22'), subject: 'Database Systems', time: '10:00', room: 'B205', status: 'late' },
    { date: new Date('2024-12-21'), subject: 'Computer Networks', time: '14:00', room: 'C301', status: 'present' },
    { date: new Date('2024-12-20'), subject: 'AI & Machine Learning', time: '08:00', room: 'D401', status: 'absent' }
  ];

  topStudents: Student[] = [
    { name: 'John Doe', id: '21BCS7001', rate: 98 },
    { name: 'Jane Smith', id: '21BCS7002', rate: 96 },
    { name: 'Mike Johnson', id: '21BCS7003', rate: 94 },
    { name: 'Sarah Wilson', id: '21BCS7004', rate: 92 }
  ];

  setPeriod(period: 'month' | 'semester') {
    this.selectedPeriod = period;
  }

  previousMonth() {
    // Logic to go to previous month
    console.log('Previous month');
  }

  nextMonth() {
    // Logic to go to next month
    console.log('Next month');
  }

  getBarHeight(rate: number): string {
    return `${rate}px`;
  }

  getStatusClass(rate: number): string {
    if (rate >= 90) return 'excellent';
    if (rate >= 80) return 'good';
    if (rate >= 70) return 'average';
    return 'poor';
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'late': return 'Late';
      case 'excused': return 'Excused';
      default: return 'Unknown';
    }
  }

  getStatusTextByRate(rate: number): string {
    if (rate >= 90) return 'Excellent';
    if (rate >= 80) return 'Good';
    if (rate >= 70) return 'Average';
    return 'Needs Improvement';
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'present': return 'P';
      case 'absent': return 'A';
      case 'late': return 'L';
      case 'excused': return 'E';
      default: return '?';
    }
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.user$.subscribe(u => this.user = u);
    this.loadTodayClasses();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  isStudent(): boolean {
    return !!this.user && this.user.role === 'student';
  }

  loadTodayClasses() {
    // Get today's classes from timetable
    const today = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = dayNames[today.getDay()];
    
    // Mock data for today's classes - in real app, this would come from timetable service
    this.todayClasses = [
      { subject: 'Web Programming', time: '08:00 - 10:00', day: todayName },
      { subject: 'Database Systems', time: '10:00 - 12:00', day: todayName },
      { subject: 'Computer Networks', time: '14:00 - 16:00', day: todayName }
    ];
  }

  openLeaveDialog() {
    this.showLeaveDialog = true;
    const today = new Date().toISOString().split('T')[0];
    this.newLeaveRequest = {
      subject: '',
      classTime: '',
      leaveStartTime: '',
      leaveEndTime: '',
      date: today
    };
  }

  closeLeaveDialog() {
    this.showLeaveDialog = false;
  }

  submitLeaveRequest() {
    if (!this.newLeaveRequest.subject || !this.newLeaveRequest.classTime || 
        !this.newLeaveRequest.leaveStartTime || !this.newLeaveRequest.leaveEndTime || 
        !this.newLeaveRequest.date) {
      alert('Please fill in all required fields');
      return;
    }

    const newId = Date.now().toString();
    const newRequest: LeaveRequest = {
      id: newId,
      subject: this.newLeaveRequest.subject,
      classTime: this.newLeaveRequest.classTime,
      leaveStartTime: this.newLeaveRequest.leaveStartTime,
      leaveEndTime: this.newLeaveRequest.leaveEndTime,
      date: new Date(this.newLeaveRequest.date),
      status: 'pending'
    };

    this.leaveRequests.unshift(newRequest);
    this.attendanceStats.leaveCount = this.leaveRequests.length;
    this.closeLeaveDialog();
    alert('Leave request submitted successfully!');
  }

  getLeaveStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Pending';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      default: return 'Unknown';
    }
  }
}
