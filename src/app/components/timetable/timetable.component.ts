import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent {
  today = new Date();
  currentWeekStart = new Date();
  currentWeekRange = '';

  timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  weekDays = [
    { name: 'Monday', date: '23/12' },
    { name: 'Tuesday', date: '24/12' },
    { name: 'Wednesday', date: '25/12' },
    { name: 'Thursday', date: '26/12' },
    { name: 'Friday', date: '27/12' },
    { name: 'Saturday', date: '28/12' },
    { name: 'Sunday', date: '29/12' }
  ];

  classes: ClassSchedule[] = [
    {
      subject: 'Web Programming',
      room: 'A101',
      teacher: 'Prof. John Smith',
      startTime: '08:00',
      endTime: '09:30',
      day: 'Monday',
      type: 'lecture'
    },
    {
      subject: 'Database Systems',
      room: 'B205',
      teacher: 'Dr. Jane Doe',
      startTime: '10:00',
      endTime: '11:30',
      day: 'Monday',
      type: 'lab'
    },
    {
      subject: 'Computer Networks',
      room: 'C301',
      teacher: 'Prof. Mike Johnson',
      startTime: '14:00',
      endTime: '15:30',
      day: 'Monday',
      type: 'lecture'
    },
    {
      subject: 'AI & Machine Learning',
      room: 'D401',
      teacher: 'Dr. Sarah Wilson',
      startTime: '08:00',
      endTime: '09:30',
      day: 'Tuesday',
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

  constructor() {
    this.updateWeekRange();
  }

  updateWeekRange() {
    const start = new Date(this.currentWeekStart);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    this.currentWeekRange = `${start.getDate()}/${start.getMonth() + 1} - ${end.getDate()}/${end.getMonth() + 1}`;
  }

  previousWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.updateWeekRange();
  }

  nextWeek() {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.updateWeekRange();
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
