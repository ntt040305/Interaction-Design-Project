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
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule, 
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit, OnDestroy {
  currentMonth = 'December, 2024';
  user: AppUser | null = null;
  private sub?: Subscription;
  showAddDialog = false;
  
  newProject: any = {
    title: '',
    description: '',
    subject: '',
    deadline: '',
    totalTasks: 0
  };

  projectStats: ProjectStats = {
    completed: 8,
    completedThisMonth: 2,
    inProgress: 3,
    pending: 2,
    completionRate: 85,
    improvement: 5
  };

  currentProjects: Project[] = [];

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.user$.subscribe(u => this.user = u);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  isStudent(): boolean {
    return !!this.user && this.user.role === 'student';
  }

  openAddProjectDialog() {
    this.showAddDialog = true;
    this.newProject = {
      title: '',
      description: '',
      subject: '',
      deadline: '',
      totalTasks: 0
    };
  }

  closeAddDialog() {
    this.showAddDialog = false;
  }

  addProject() {
    if (!this.newProject.title || !this.newProject.description || !this.newProject.subject || !this.newProject.deadline) {
      alert('Please fill in all required fields');
      return;
    }

    const newId = Date.now().toString();
    const newProjectItem: Project = {
      id: newId,
      title: this.newProject.title,
      description: this.newProject.description,
      subject: this.newProject.subject,
      status: 'pending',
      deadline: new Date(this.newProject.deadline),
      progress: 0,
      completedTasks: 0,
      totalTasks: parseInt(this.newProject.totalTasks) || 0
    };

    this.currentProjects.push(newProjectItem);
    this.updateProjectStats();
    this.closeAddDialog();
    alert('Project created successfully!');
  }

  updateProject(projectId: string) {
    const project = this.currentProjects.find(p => p.id === projectId);
    if (project) {
      const newProgress = prompt('Enter new progress (0-100):', project.progress.toString());
      if (newProgress !== null) {
        const progress = parseInt(newProgress);
        if (progress >= 0 && progress <= 100) {
          project.progress = progress;
          project.completedTasks = Math.floor((progress / 100) * project.totalTasks);
          if (progress === 100) {
            project.status = 'completed';
          } else if (progress > 0) {
            project.status = 'in-progress';
          }
          this.updateProjectStats();
          alert('Project updated successfully!');
        } else {
          alert('Progress must be between 0 and 100');
        }
      }
    }
  }

  finishProject(projectId: string) {
    const project = this.currentProjects.find(p => p.id === projectId);
    if (project) {
      project.status = 'completed';
      project.progress = 100;
      project.completedTasks = project.totalTasks;
      this.updateProjectStats();
      alert('Project marked as completed!');
    }
  }

  deleteProject(projectId: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.currentProjects = this.currentProjects.filter(p => p.id !== projectId);
      this.updateProjectStats();
      alert('Project deleted successfully!');
    }
  }

  updateProjectStats() {
    this.projectStats.completed = this.currentProjects.filter(p => p.status === 'completed').length;
    this.projectStats.inProgress = this.currentProjects.filter(p => p.status === 'in-progress').length;
    this.projectStats.pending = this.currentProjects.filter(p => p.status === 'pending').length;
    const total = this.currentProjects.length;
    this.projectStats.completionRate = total > 0 ? Math.round((this.projectStats.completed / total) * 100) : 0;
  }
}
