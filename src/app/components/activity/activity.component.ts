import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ActivityStats {
  totalActivities: number;
  thisWeek: number;
  completed: number;
  completionRate: number;
  pending: number;
  averageScore: number;
  scoreImprovement: number;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'class' | 'assignment' | 'exam' | 'project' | 'other';
  status: 'completed' | 'pending' | 'in-progress' | 'overdue';
  subject: string;
  priority?: 'high' | 'medium' | 'low';
}

@Component({
  selector: 'app-activity',
  imports: [CommonModule, FormsModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  selectedFilter: string = 'all';
  selectedPeriod: string = 'week';
  currentPeriod = 'This Week';

  activityStats: ActivityStats = {
    totalActivities: 45,
    thisWeek: 8,
    completed: 38,
    completionRate: 84,
    pending: 7,
    averageScore: 8.5,
    scoreImprovement: 0.3
  };

  activities: Activity[] = [
    {
      id: '1',
      title: 'Attended Web Programming Class',
      description: 'Learned about React and Angular frameworks',
      date: new Date('2024-12-23T08:00:00'),
      type: 'class',
      status: 'completed',
      subject: 'Web Programming'
    },
    {
      id: '2',
      title: 'Submitted Database Systems Assignment',
      description: 'Designed database for student management system',
      date: new Date('2024-12-22T14:00:00'),
      type: 'assignment',
      status: 'completed',
      subject: 'Database Systems'
    },
    {
      id: '3',
      title: 'Computer Networks Final Exam',
      description: 'Test on TCP/IP and routing knowledge',
      date: new Date('2024-12-25T08:00:00'),
      type: 'exam',
      status: 'pending',
      subject: 'Computer Networks',
      priority: 'high'
    },
    {
      id: '4',
      title: 'AI Project Report',
      description: 'Presented research results on Machine Learning',
      date: new Date('2024-12-28T10:00:00'),
      type: 'project',
      status: 'in-progress',
      subject: 'AI & Machine Learning',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Attended Tech Seminar',
      description: 'Listened to presentation on new technology trends',
      date: new Date('2024-12-20T15:00:00'),
      type: 'other',
      status: 'completed',
      subject: 'Information Technology'
    }
  ];

  recentActivities: Activity[] = this.activities.slice(0, 4);
  upcomingActivities: Activity[] = this.activities.filter(a => a.status === 'pending' || a.status === 'in-progress');

  get filteredActivities(): Activity[] {
    let filtered = this.activities;
    
    if (this.selectedFilter !== 'all') {
      filtered = filtered.filter(activity => activity.type === this.selectedFilter);
    }
    
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  onPeriodChange() {
    switch (this.selectedPeriod) {
      case 'week':
        this.currentPeriod = 'This Week';
        break;
      case 'month':
        this.currentPeriod = 'This Month';
        break;
      case 'semester':
        this.currentPeriod = 'This Semester';
        break;
      case 'all':
        this.currentPeriod = 'All Time';
        break;
    }
  }

  previousPeriod() {
    console.log('Previous period');
  }

  nextPeriod() {
    console.log('Next period');
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'class': return 'school';
      case 'assignment': return 'assignment';
      case 'exam': return 'quiz';
      case 'project': return 'work';
      case 'other': return 'more_horiz';
      default: return 'help';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'overdue': return 'Overdue';
      default: return 'Unknown';
    }
  }

  getPriorityText(priority?: string): string {
    switch (priority) {
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Medium';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  }
}
