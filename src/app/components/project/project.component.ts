import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface ProjectStats {
  completed: number;
  completedThisMonth: number;
  inProgress: number;
  pending: number;
  completionRate: number;
  improvement: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  subject: string;
  status: 'completed' | 'in-progress' | 'pending' | 'on-hold';
  deadline: Date;
  progress: number;
  completedTasks: number;
  totalTasks: number;
}

interface ProjectMilestone {
  id: string;
  title: string;
  project: string;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'in-progress' | 'overdue';
}

interface TeamStats {
  totalMembers: number;
  activeDiscussions: number;
  sharedDocuments: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
}

interface ProjectActivity {
  id: string;
  title: string;
  project: string;
  date: Date;
  type: 'update' | 'comment' | 'file' | 'meeting';
}

@Component({
  selector: 'app-project',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  currentMonth = 'December, 2024';

  projectStats: ProjectStats = {
    completed: 8,
    completedThisMonth: 2,
    inProgress: 3,
    pending: 2,
    completionRate: 85,
    improvement: 5
  };

  currentProjects: Project[] = [
    {
      id: '1',
      title: 'Student Management System',
      description: 'Develop a web application for managing student information',
      subject: 'Web Programming',
      status: 'in-progress',
      deadline: new Date('2025-01-15'),
      progress: 75,
      completedTasks: 15,
      totalTasks: 20
    },
    {
      id: '2',
      title: 'Sales Data Analysis',
      description: 'Use Python and Machine Learning to analyze sales trends',
      subject: 'AI & Machine Learning',
      status: 'in-progress',
      deadline: new Date('2025-01-20'),
      progress: 60,
      completedTasks: 12,
      totalTasks: 20
    },
    {
      id: '3',
      title: 'LAN Network Design',
      description: 'Design and implement LAN network for company',
      subject: 'Computer Networks',
      status: 'pending',
      deadline: new Date('2025-02-01'),
      progress: 0,
      completedTasks: 0,
      totalTasks: 15
    }
  ];

  projectMilestones: ProjectMilestone[] = [
    {
      id: '1',
      title: 'Complete UI Design',
      project: 'Student Management System',
      description: 'Design user interface for the application',
      date: new Date('2024-12-25'),
      status: 'pending'
    },
    {
      id: '2',
      title: 'Data Collection',
      project: 'Sales Data Analysis',
      description: 'Collect and clean data from various sources',
      date: new Date('2024-12-20'),
      status: 'completed'
    },
    {
      id: '3',
      title: 'Deploy ML Model',
      project: 'Sales Data Analysis',
      description: 'Build and deploy prediction model',
      date: new Date('2025-01-10'),
      status: 'in-progress'
    }
  ];

  teamStats: TeamStats = {
    totalMembers: 4,
    activeDiscussions: 8,
    sharedDocuments: 12
  };

  teamMembers: TeamMember[] = [
    { id: '1', name: 'John Smith', role: 'Leader', status: 'online' },
    { id: '2', name: 'Sarah Johnson', role: 'Developer', status: 'busy' },
    { id: '3', name: 'Michael Brown', role: 'Designer', status: 'offline' },
    { id: '4', name: 'Emily Davis', role: 'Analyst', status: 'online' }
  ];

  recentActivities: ProjectActivity[] = [
    {
      id: '1',
      title: 'Updated project progress',
      project: 'Student Management System',
      date: new Date('2024-12-23T10:00:00'),
      type: 'update'
    },
    {
      id: '2',
      title: 'Added comment to task',
      project: 'Sales Data Analysis',
      date: new Date('2024-12-23T09:30:00'),
      type: 'comment'
    },
    {
      id: '3',
      title: 'Uploaded design document',
      project: 'LAN Network Design',
      date: new Date('2024-12-22T16:00:00'),
      type: 'file'
    },
    {
      id: '4',
      title: 'Project review meeting',
      project: 'Student Management System',
      date: new Date('2024-12-22T14:00:00'),
      type: 'meeting'
    }
  ];

  previousMonth() {
    console.log('Previous month');
  }

  nextMonth() {
    console.log('Next month');
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending';
      case 'on-hold': return 'On Hold';
      case 'overdue': return 'Overdue';
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'busy': return 'Busy';
      default: return 'Unknown';
    }
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'update': return 'edit';
      case 'comment': return 'chat';
      case 'file': return 'description';
      case 'meeting': return 'handshake';
      default: return 'push_pin';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  }
}
