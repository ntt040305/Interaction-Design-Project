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

interface ClassSchedule {
  subject: string;
  room: string;
  teacher: string;
  startTime: string;
  endTime: string;
  day: string;
  type: 'lecture' | 'lab' | 'seminar' | 'exam';
}

interface Event {
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'seminar' | 'exam' | 'event' | 'meeting';
}

@Component({
  selector: 'app-timetable',
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent implements OnInit, OnDestroy {
  today = new Date();
  currentWeekStart = new Date();
  currentWeekRange = '';
  user: AppUser | null = null;
  private sub?: Subscription;
  showAddDialog = false;
  newClass: ClassSchedule = {
    subject: '',
    room: '',
    teacher: '',
    startTime: '08:00',
    endTime: '10:00',
    day: 'Monday',
    type: 'lecture'
  };

  timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  weekDays: { name: string, date: string, fullDate: Date }[] = [];
  
  // Original classes (for students)
  allClasses: ClassSchedule[] = [];

  classes: ClassSchedule[] = [
    // Monday
    {
      subject: 'Web Programming',
      room: 'A101',
      teacher: 'Prof. John Smith',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Monday',
      type: 'lecture'
    },
    {
      subject: 'Database Systems',
      room: 'B205',
      teacher: 'Dr. Jane Doe',
      startTime: '10:00',
      endTime: '12:00',
      day: 'Monday',
      type: 'lab'
    },
    {
      subject: 'Computer Networks',
      room: 'C301',
      teacher: 'Prof. Mike Johnson',
      startTime: '13:00',
      endTime: '15:00',
      day: 'Monday',
      type: 'lecture'
    },
    {
      subject: 'Software Engineering',
      room: 'D102',
      teacher: 'Dr. Emily Brown',
      startTime: '15:00',
      endTime: '17:00',
      day: 'Monday',
      type: 'lecture'
    },
    // Tuesday
    {
      subject: 'AI & Machine Learning',
      room: 'D401',
      teacher: 'Dr. Sarah Wilson',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Tuesday',
      type: 'lecture'
    },
    {
      subject: 'Data Structures',
      room: 'A203',
      teacher: 'Prof. David Lee',
      startTime: '10:00',
      endTime: '12:00',
      day: 'Tuesday',
      type: 'lecture'
    },
    {
      subject: 'Mobile Development',
      room: 'B301',
      teacher: 'Dr. Lisa Chen',
      startTime: '13:00',
      endTime: '15:00',
      day: 'Tuesday',
      type: 'lab'
    },
    {
      subject: 'Cloud Computing',
      room: 'C105',
      teacher: 'Prof. Robert Taylor',
      startTime: '15:00',
      endTime: '17:00',
      day: 'Tuesday',
      type: 'lecture'
    },
    // Wednesday
    {
      subject: 'Web Programming Lab',
      room: 'A101',
      teacher: 'Prof. John Smith',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Wednesday',
      type: 'lab'
    },
    {
      subject: 'Algorithms',
      room: 'B402',
      teacher: 'Dr. Michael Wong',
      startTime: '10:00',
      endTime: '12:00',
      day: 'Wednesday',
      type: 'lecture'
    },
    {
      subject: 'System Design',
      room: 'C201',
      teacher: 'Prof. Anna Martinez',
      startTime: '14:00',
      endTime: '16:00',
      day: 'Wednesday',
      type: 'seminar'
    },
    // Thursday
    {
      subject: 'Database Systems Lab',
      room: 'B205',
      teacher: 'Dr. Jane Doe',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Thursday',
      type: 'lab'
    },
    {
      subject: 'Operating Systems',
      room: 'A304',
      teacher: 'Prof. James Wilson',
      startTime: '10:00',
      endTime: '12:00',
      day: 'Thursday',
      type: 'lecture'
    },
    {
      subject: 'UI/UX Design',
      room: 'D203',
      teacher: 'Dr. Sophie Anderson',
      startTime: '13:00',
      endTime: '15:00',
      day: 'Thursday',
      type: 'lecture'
    },
    {
      subject: 'Cybersecurity',
      room: 'C401',
      teacher: 'Prof. Mark Johnson',
      startTime: '15:00',
      endTime: '17:00',
      day: 'Thursday',
      type: 'lecture'
    },
    // Friday
    {
      subject: 'AI Lab',
      room: 'D401',
      teacher: 'Dr. Sarah Wilson',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Friday',
      type: 'lab'
    },
    {
      subject: 'Computer Networks Lab',
      room: 'C301',
      teacher: 'Prof. Mike Johnson',
      startTime: '10:00',
      endTime: '12:00',
      day: 'Friday',
      type: 'lab'
    },
    {
      subject: 'Project Work',
      room: 'Various',
      teacher: 'Multiple Supervisors',
      startTime: '13:00',
      endTime: '15:00',
      day: 'Friday',
      type: 'seminar'
    },
    // Saturday
    {
      subject: 'English Communication',
      room: 'E101',
      teacher: 'Ms. Rachel Green',
      startTime: '09:00',
      endTime: '11:00',
      day: 'Saturday',
      type: 'lecture'
    },
    {
      subject: 'Professional Skills',
      room: 'E202',
      teacher: 'Dr. Thomas White',
      startTime: '13:00',
      endTime: '15:00',
      day: 'Saturday',
      type: 'seminar'
    }
  ];

  upcomingEvents: Event[] = [
    {
      title: 'Tech Seminar',
      date: new Date('2024-12-30'),
      time: '09:00 - 12:00',
      location: 'Hall A',
      type: 'seminar'
    },
    {
      title: 'Final Exam',
      date: new Date('2025-01-05'),
      time: '08:00 - 10:00',
      location: 'Exam Room A101',
      type: 'exam'
    },
    {
      title: 'Project Exhibition',
      date: new Date('2025-01-10'),
      time: '14:00 - 17:00',
      location: 'Main Hall',
      type: 'event'
    }
  ];

  constructor(private authService: AuthService) {
    this.initializeWeek();
    this.updateWeekRange();
  }

  ngOnInit() {
    // Store original classes
    this.allClasses = [...this.classes];
    
    this.sub = this.authService.user$.subscribe(u => {
      this.user = u;
      if (this.isTeacher()) {
        this.setupTeacherClasses();
      } else {
        // For students, restore original classes
        this.classes = [...this.allClasses];
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isTeacher(): boolean {
    return !!this.user && this.user.role === 'teacher';
  }

  initializeWeek() {
    // Set to Monday of current week
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    this.currentWeekStart = new Date(today);
    this.currentWeekStart.setDate(today.getDate() + diff);
    this.currentWeekStart.setHours(0, 0, 0, 0);
  }

  updateWeekRange() {
    const start = new Date(this.currentWeekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    this.currentWeekRange = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    this.updateWeekDays();
  }

  formatDate(date: Date): string {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  }

  updateWeekDays() {
    this.weekDays = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentWeekStart);
      date.setDate(this.currentWeekStart.getDate() + i);
      
      this.weekDays.push({
        name: dayNames[date.getDay()],
        date: this.formatDate(date),
        fullDate: new Date(date)
      });
    }
  }

  previousWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.updateWeekRange();
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.updateWeekRange();
  }

  isToday(day: { name: string, date: string, fullDate: Date }): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day.fullDate.getTime() === today.getTime();
  }

  openAddClassDialog() {
    this.showAddDialog = true;
    this.resetNewClass();
  }

  closeAddClassDialog() {
    this.showAddDialog = false;
  }

  resetNewClass() {
    this.newClass = {
      subject: '',
      room: '',
      teacher: '',
      startTime: '08:00',
      endTime: '10:00',
      day: 'Monday',
      type: 'lecture'
    };
  }

  addClass() {
    if (!this.newClass.subject || !this.newClass.room || !this.newClass.teacher) {
      alert('Please fill in all required fields');
      return;
    }

    this.classes.push({ ...this.newClass });
    this.closeAddClassDialog();
    alert('Class added successfully!');
  }

  setupTeacherClasses(): void {
    // Reduce the number of classes for teacher view
    // Only show some classes with teacher's name
    const teacherName = this.user?.displayName || 'Teacher';
    
    // Create a reduced set of classes for teachers
    this.classes = [
      // Monday - 2 classes
      {
        subject: 'Web Programming',
        room: 'A101',
        teacher: teacherName,
        startTime: '08:00',
        endTime: '10:00',
        day: 'Monday',
        type: 'lecture'
      },
      {
        subject: 'Database Systems',
        room: 'B205',
        teacher: teacherName,
        startTime: '13:00',
        endTime: '15:00',
        day: 'Monday',
        type: 'lab'
      },
      // Tuesday - 2 classes
      {
        subject: 'AI & Machine Learning',
        room: 'D401',
        teacher: teacherName,
        startTime: '08:00',
        endTime: '10:00',
        day: 'Tuesday',
        type: 'lecture'
      },
      {
        subject: 'Data Structures',
        room: 'A203',
        teacher: teacherName,
        startTime: '14:00',
        endTime: '16:00',
        day: 'Tuesday',
        type: 'lecture'
      },
      // Wednesday - 1 class
      {
        subject: 'Algorithms',
        room: 'B402',
        teacher: teacherName,
        startTime: '10:00',
        endTime: '12:00',
        day: 'Wednesday',
        type: 'lecture'
      },
      // Thursday - 1 class
      {
        subject: 'Operating Systems',
        room: 'A304',
        teacher: teacherName,
        startTime: '10:00',
        endTime: '12:00',
        day: 'Thursday',
        type: 'lecture'
      },
      // Friday - 1 class
      {
        subject: 'Computer Networks Lab',
        room: 'C301',
        teacher: teacherName,
        startTime: '08:00',
        endTime: '10:00',
        day: 'Friday',
        type: 'lab'
      }
    ];
  }

  getClassesForDay(dayName: string): ClassSchedule[] {
    return this.classes.filter(cls => cls.day === dayName);
  }

  getTodayClasses(): ClassSchedule[] {
    const todayName = this.getTodayName();
    return this.getClassesForDay(todayName);
  }

  getTodayName(): string {
    const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return days[this.today.getDay()];
  }

  getSlotPosition(startTime: string): string {
    const timeIndex = this.timeSlots.indexOf(startTime);
    return `${timeIndex * 60}px`;
  }

  getSlotHeight(startTime: string, endTime: string): string {
    const startIndex = this.timeSlots.indexOf(startTime);
    const endIndex = this.timeSlots.indexOf(endTime);
    const height = (endIndex - startIndex) * 60;
    return `${height}px`;
  }

  isClassActive(classItem: ClassSchedule): boolean {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    return currentTime >= classItem.startTime && currentTime <= classItem.endTime;
  }

  isClassUpcoming(classItem: ClassSchedule): boolean {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    return currentTime < classItem.startTime;
  }
}
