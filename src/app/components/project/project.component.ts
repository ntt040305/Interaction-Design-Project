import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  currentMonth = 'Tháng 12, 2024';

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
      title: 'Hệ thống quản lý sinh viên',
      description: 'Phát triển ứng dụng web quản lý thông tin sinh viên',
      subject: 'Lập trình Web',
      status: 'in-progress',
      deadline: new Date('2025-01-15'),
      progress: 75,
      completedTasks: 15,
      totalTasks: 20
    },
    {
      id: '2',
      title: 'Phân tích dữ liệu bán hàng',
      description: 'Sử dụng Python và Machine Learning để phân tích xu hướng bán hàng',
      subject: 'AI & Machine Learning',
      status: 'in-progress',
      deadline: new Date('2025-01-20'),
      progress: 60,
      completedTasks: 12,
      totalTasks: 20
    },
    {
      id: '3',
      title: 'Thiết kế mạng LAN',
      description: 'Thiết kế và triển khai mạng LAN cho công ty',
      subject: 'Mạng máy tính',
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
      title: 'Hoàn thành thiết kế UI',
      project: 'Hệ thống quản lý sinh viên',
      description: 'Thiết kế giao diện người dùng cho ứng dụng',
      date: new Date('2024-12-25'),
      status: 'pending'
    },
    {
      id: '2',
      title: 'Thu thập dữ liệu',
      project: 'Phân tích dữ liệu bán hàng',
      description: 'Thu thập và làm sạch dữ liệu từ các nguồn khác nhau',
      date: new Date('2024-12-20'),
      status: 'completed'
    },
    {
      id: '3',
      title: 'Triển khai mô hình ML',
      project: 'Phân tích dữ liệu bán hàng',
      description: 'Xây dựng và triển khai mô hình dự đoán',
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
    { id: '1', name: 'Nguyễn Văn A', role: 'Leader', status: 'online' },
    { id: '2', name: 'Trần Thị B', role: 'Developer', status: 'busy' },
    { id: '3', name: 'Lê Văn C', role: 'Designer', status: 'offline' },
    { id: '4', name: 'Phạm Thị D', role: 'Analyst', status: 'online' }
  ];

  recentActivities: ProjectActivity[] = [
    {
      id: '1',
      title: 'Cập nhật tiến độ dự án',
      project: 'Hệ thống quản lý sinh viên',
      date: new Date('2024-12-23T10:00:00'),
      type: 'update'
    },
    {
      id: '2',
      title: 'Thêm comment vào task',
      project: 'Phân tích dữ liệu bán hàng',
      date: new Date('2024-12-23T09:30:00'),
      type: 'comment'
    },
    {
      id: '3',
      title: 'Upload tài liệu thiết kế',
      project: 'Thiết kế mạng LAN',
      date: new Date('2024-12-22T16:00:00'),
      type: 'file'
    },
    {
      id: '4',
      title: 'Meeting review dự án',
      project: 'Hệ thống quản lý sinh viên',
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
      case 'completed': return 'Hoàn thành';
      case 'in-progress': return 'Đang thực hiện';
      case 'pending': return 'Chờ bắt đầu';
      case 'on-hold': return 'Tạm dừng';
      case 'overdue': return 'Quá hạn';
      case 'online': return 'Trực tuyến';
      case 'offline': return 'Ngoại tuyến';
      case 'busy': return 'Bận';
      default: return 'Không xác định';
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
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    }
  }
}
