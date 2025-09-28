import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-attendance',
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  selectedPeriod: 'month' | 'semester' = 'month';
  currentMonth = 'December 2024';

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
}
