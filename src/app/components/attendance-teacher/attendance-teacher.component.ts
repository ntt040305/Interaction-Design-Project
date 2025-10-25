import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  avatar?: string;
}

interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: Date;
  notes?: string;
}

interface ClassSession {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  attendance: AttendanceRecord[];
}

@Component({
  selector: 'app-attendance-teacher',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './attendance-teacher.component.html',
  styleUrls: ['./attendance-teacher.component.scss']
})
export class AttendanceTeacherComponent implements OnInit {
  students: Student[] = [
    { id: '1', name: 'Nguyen Van An', studentId: 'SV001', email: 'an.nguyen@student.hsu.edu.vn' },
    { id: '2', name: 'Tran Thi Binh', studentId: 'SV002', email: 'binh.tran@student.hsu.edu.vn' },
    { id: '3', name: 'Le Van Cuong', studentId: 'SV003', email: 'cuong.le@student.hsu.edu.vn' },
    { id: '4', name: 'Pham Thi Dung', studentId: 'SV004', email: 'dung.pham@student.hsu.edu.vn' },
    { id: '5', name: 'Hoang Van Em', studentId: 'SV005', email: 'em.hoang@student.hsu.edu.vn' },
    { id: '6', name: 'Vo Thi Phuong', studentId: 'SV006', email: 'phuong.vo@student.hsu.edu.vn' },
    { id: '7', name: 'Dang Van Quang', studentId: 'SV007', email: 'quang.dang@student.hsu.edu.vn' },
    { id: '8', name: 'Bui Thi Hoa', studentId: 'SV008', email: 'hoa.bui@student.hsu.edu.vn' }
  ];

  classSessions: ClassSession[] = [
    {
      id: '1',
      title: 'Web Programming - Session 1',
      date: new Date('2024-01-15'),
      startTime: '08:00',
      endTime: '10:00',
      subject: 'Web Programming',
      room: 'A101',
      attendance: [
        { studentId: '1', studentName: 'Nguyen Van An', status: 'present', checkInTime: new Date('2024-01-15T08:05:00') },
        { studentId: '2', studentName: 'Tran Thi Binh', status: 'present', checkInTime: new Date('2024-01-15T08:02:00') },
        { studentId: '3', studentName: 'Le Van Cuong', status: 'late', checkInTime: new Date('2024-01-15T08:15:00') },
        { studentId: '4', studentName: 'Pham Thi Dung', status: 'present', checkInTime: new Date('2024-01-15T08:00:00') },
        { studentId: '5', studentName: 'Hoang Van Em', status: 'absent' },
        { studentId: '6', studentName: 'Vo Thi Phuong', status: 'present', checkInTime: new Date('2024-01-15T08:03:00') },
        { studentId: '7', studentName: 'Dang Van Quang', status: 'excused', notes: 'Excused' },
        { studentId: '8', studentName: 'Bui Thi Hoa', status: 'present', checkInTime: new Date('2024-01-15T08:01:00') }
      ]
    },
    {
      id: '2',
      title: 'Web Programming - Session 2',
      date: new Date('2024-01-17'),
      startTime: '08:00',
      endTime: '10:00',
      subject: 'Web Programming',
      room: 'A101',
      attendance: [
        { studentId: '1', studentName: 'Nguyen Van An', status: 'present', checkInTime: new Date('2024-01-17T08:00:00') },
        { studentId: '2', studentName: 'Tran Thi Binh', status: 'present', checkInTime: new Date('2024-01-17T08:01:00') },
        { studentId: '3', studentName: 'Le Van Cuong', status: 'present', checkInTime: new Date('2024-01-17T08:02:00') },
        { studentId: '4', studentName: 'Pham Thi Dung', status: 'late', checkInTime: new Date('2024-01-17T08:20:00') },
        { studentId: '5', studentName: 'Hoang Van Em', status: 'present', checkInTime: new Date('2024-01-17T08:00:00') },
        { studentId: '6', studentName: 'Vo Thi Phuong', status: 'absent' },
        { studentId: '7', studentName: 'Dang Van Quang', status: 'present', checkInTime: new Date('2024-01-17T08:03:00') },
        { studentId: '8', studentName: 'Bui Thi Hoa', status: 'present', checkInTime: new Date('2024-01-17T08:01:00') }
      ]
    }
  ];

  selectedSession: ClassSession | null = null;
  newSession: ClassSession = {
    id: '',
    title: '',
    date: new Date(),
    startTime: '08:00',
    endTime: '10:00',
    subject: '',
    room: '',
    attendance: []
  };

  isCreatingNewSession = false;
  attendanceFilter = 'all';

  ngOnInit() {
    this.selectedSession = this.classSessions[0];
  }

  selectSession(session: ClassSession) {
    this.selectedSession = session;
    this.isCreatingNewSession = false;
  }

  startNewSession() {
    this.isCreatingNewSession = true;
    this.selectedSession = null;
    this.newSession = {
      id: '',
      title: '',
      date: new Date(),
      startTime: '08:00',
      endTime: '10:00',
      subject: '',
      room: '',
      attendance: []
    };
  }

  createSession() {
    if (!this.newSession.title || !this.newSession.subject || !this.newSession.room) {
      alert('Please fill in all information');
      return;
    }

    this.newSession.id = Date.now().toString();
    this.newSession.attendance = this.students.map(student => ({
      studentId: student.id,
      studentName: student.name,
      status: 'absent'
    }));

    this.classSessions.unshift({ ...this.newSession });
    this.selectedSession = this.classSessions[0];
    this.isCreatingNewSession = false;
  }

  updateAttendance(studentId: string, status: 'present' | 'absent' | 'late' | 'excused') {
    if (!this.selectedSession) return;

    const attendance = this.selectedSession.attendance.find(a => a.studentId === studentId);
    if (attendance) {
      attendance.status = status;
      if (status === 'present' || status === 'late') {
        attendance.checkInTime = new Date();
      } else {
        attendance.checkInTime = undefined;
      }
    }
  }

  updateNotes(studentId: string, notes: string) {
    if (!this.selectedSession) return;

    const attendance = this.selectedSession.attendance.find(a => a.studentId === studentId);
    if (attendance) {
      attendance.notes = notes;
    }
  }

  getAttendanceStats() {
    if (!this.selectedSession) return { present: 0, absent: 0, late: 0, excused: 0, total: 0 };

    const stats = this.selectedSession.attendance.reduce((acc, record) => {
      acc[record.status]++;
      acc.total++;
      return acc;
    }, { present: 0, absent: 0, late: 0, excused: 0, total: 0 });

    return stats;
  }

  getAttendancePercentage(): number {
    const stats = this.getAttendanceStats();
    if (stats.total === 0) return 0;
    return Math.round(((stats.present + stats.late + stats.excused) / stats.total) * 100);
  }

  getFilteredAttendance() {
    if (!this.selectedSession) return [];

    if (this.attendanceFilter === 'all') {
      return this.selectedSession.attendance;
    }

    return this.selectedSession.attendance.filter(record => record.status === this.attendanceFilter);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      case 'excused': return 'status-excused';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'late': return 'Late';
      case 'excused': return 'Excused';
      default: return '';
    }
  }
}
