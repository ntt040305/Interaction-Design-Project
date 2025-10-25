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

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  totalPoints: number;
  submissions: Submission[];
}

interface Submission {
  studentId: string;
  studentName: string;
  submittedAt: Date;
  fileUrl?: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

@Component({
  selector: 'app-grading',
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
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.scss']
})
export class GradingComponent implements OnInit {
  students: Student[] = [
    { id: '1', name: 'Nguyen Van An', studentId: 'SV001', email: 'an.nguyen@student.hsu.edu.vn' },
    { id: '2', name: 'Tran Thi Binh', studentId: 'SV002', email: 'binh.tran@student.hsu.edu.vn' },
    { id: '3', name: 'Le Van Cuong', studentId: 'SV003', email: 'cuong.le@student.hsu.edu.vn' },
    { id: '4', name: 'Pham Thi Dung', studentId: 'SV004', email: 'dung.pham@student.hsu.edu.vn' },
    { id: '5', name: 'Hoang Van Em', studentId: 'SV005', email: 'em.hoang@student.hsu.edu.vn' }
  ];

  assignments: Assignment[] = [
    {
      id: '1',
      title: 'Web Programming Final Project',
      description: 'Build a timetable management website',
      dueDate: new Date('2024-01-15'),
      totalPoints: 100,
      submissions: [
        { studentId: '1', studentName: 'Nguyen Van An', submittedAt: new Date('2024-01-14'), grade: 85, feedback: 'Good, needs UI improvement', status: 'graded' },
        { studentId: '2', studentName: 'Tran Thi Binh', submittedAt: new Date('2024-01-15'), grade: 92, feedback: 'Excellent!', status: 'graded' },
        { studentId: '3', studentName: 'Le Van Cuong', submittedAt: new Date('2024-01-16'), grade: 78, feedback: 'Submitted late, needs improvement', status: 'late' },
        { studentId: '4', studentName: 'Pham Thi Dung', submittedAt: new Date('2024-01-14'), status: 'submitted' },
        { studentId: '5', studentName: 'Hoang Van Em', submittedAt: new Date('2024-01-15'), grade: 88, feedback: 'Good', status: 'graded' }
      ]
    },
    {
      id: '2',
      title: 'Group Presentation',
      description: 'Presentation on new technologies in web development',
      dueDate: new Date('2024-01-20'),
      totalPoints: 50,
      submissions: [
        { studentId: '1', studentName: 'Nguyen Van An', submittedAt: new Date('2024-01-19'), grade: 45, feedback: 'Good', status: 'graded' },
        { studentId: '2', studentName: 'Tran Thi Binh', submittedAt: new Date('2024-01-20'), grade: 48, feedback: 'Very good', status: 'graded' },
        { studentId: '3', studentName: 'Le Van Cuong', submittedAt: new Date('2024-01-20'), status: 'submitted' },
        { studentId: '4', studentName: 'Pham Thi Dung', submittedAt: new Date('2024-01-20'), grade: 42, feedback: 'Good', status: 'graded' },
        { studentId: '5', studentName: 'Hoang Van Em', submittedAt: new Date('2024-01-20'), status: 'submitted' }
      ]
    }
  ];

  selectedAssignment: Assignment | null = null;
  selectedStudent: Student | null = null;
  newGrade: number = 0;
  newFeedback: string = '';

  ngOnInit() {
    this.selectedAssignment = this.assignments[0];
  }

  selectAssignment(assignment: Assignment) {
    this.selectedAssignment = assignment;
    this.selectedStudent = null;
  }

  selectStudent(student: Student) {
    this.selectedStudent = student;
    const submission = this.selectedAssignment?.submissions.find(s => s.studentId === student.id);
    if (submission) {
      this.newGrade = submission.grade || 0;
      this.newFeedback = submission.feedback || '';
    } else {
      this.newGrade = 0;
      this.newFeedback = '';
    }
  }

  saveGrade() {
    if (!this.selectedAssignment || !this.selectedStudent) return;

    const submission = this.selectedAssignment.submissions.find(s => s.studentId === this.selectedStudent!.id);
    if (submission) {
      submission.grade = this.newGrade;
      submission.feedback = this.newFeedback;
      submission.status = 'graded';
    } else {
      this.selectedAssignment.submissions.push({
        studentId: this.selectedStudent.id,
        studentName: this.selectedStudent.name,
        submittedAt: new Date(),
        grade: this.newGrade,
        feedback: this.newFeedback,
        status: 'graded'
      });
    }
  }

  getSubmissionStatus(studentId: string): string {
    const submission = this.selectedAssignment?.submissions.find(s => s.studentId === studentId);
    if (!submission) return 'Not Submitted';
    return submission.status === 'graded' ? 'Graded' : 
           submission.status === 'late' ? 'Submitted Late' : 'Submitted';
  }

  getSubmissionGrade(studentId: string): number | null {
    const submission = this.selectedAssignment?.submissions.find(s => s.studentId === studentId);
    return submission?.grade || null;
  }

  getClassAverage(): number {
    if (!this.selectedAssignment) return 0;
    const gradedSubmissions = this.selectedAssignment.submissions.filter(s => s.grade !== undefined);
    if (gradedSubmissions.length === 0) return 0;
    const total = gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0);
    return Math.round(total / gradedSubmissions.length);
  }
}
