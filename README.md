# TimeTableID - Hệ thống quản lý thời khóa biểu

Hệ thống quản lý thời khóa biểu với phân quyền người dùng (Sinh viên/Giảng viên) sử dụng Firebase Authentication.

## Tính năng chính

### 🔐 Xác thực người dùng
- Đăng nhập bằng Google Firebase Authentication
- Phân quyền tự động dựa trên đuôi email:
  - **Sinh viên**: `@student.hsu.edu.vn`
  - **Giảng viên**: `@teacher.hsu.edu.vn` hoặc `@hsu.edu.vn`

### 👨‍🎓 Dành cho Sinh viên
- **Dashboard**: Tổng quan điểm danh, khóa học, dự án
- **Timetable**: Xem lịch học
- **Attendance**: Theo dõi điểm danh
- **Activities**: Hoạt động và sự kiện
- **Projects**: Quản lý dự án

### 👨‍🏫 Dành cho Giảng viên
- **Dashboard**: Tổng quan sinh viên, lớp học, chấm điểm
- **Timetable**: Xem lịch dạy
- **Điểm danh**: Quản lý điểm danh sinh viên
- **Chấm điểm**: Chấm điểm và nhận xét bài tập
- **Activities**: Quản lý hoạt động

## Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js (phiên bản 18 trở lên)
- Angular CLI
- Firebase project

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd timetable-web

# Cài đặt dependencies
npm install

# Cấu hình Firebase
# Cập nhật thông tin Firebase trong src/app/app.config.ts
```

### Cấu hình Firebase
1. Tạo project Firebase tại [Firebase Console](https://console.firebase.google.com)
2. Bật Authentication và chọn Google provider
3. Cập nhật cấu hình trong `src/app/app.config.ts`:

```typescript
provideFirebaseApp(() => initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}))
```

### Chạy ứng dụng
```bash
# Development server
ng serve

# Mở trình duyệt tại http://localhost:4200
```

## Cấu trúc dự án

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Trang chủ
│   │   ├── timetable/          # Thời khóa biểu
│   │   ├── attendance/         # Điểm danh (sinh viên)
│   │   ├── attendance-teacher/ # Điểm danh (giảng viên)
│   │   ├── activity/           # Hoạt động
│   │   ├── project/            # Dự án
│   │   ├── grading/            # Chấm điểm (giảng viên)
│   │   ├── login/              # Đăng nhập
│   │   ├── header/             # Header
│   │   ├── sidebar/            # Sidebar
│   │   └── footer/             # Footer
│   ├── services/
│   │   └── auth.service.ts     # Service xác thực
│   ├── guards/
│   │   ├── auth.guard.ts       # Guard xác thực
│   │   └── teacher.guard.ts    # Guard giảng viên
│   └── app.config.ts           # Cấu hình ứng dụng
```

## Tính năng kỹ thuật

- **Angular 19**: Framework chính
- **Firebase Authentication**: Xác thực người dùng
- **TypeScript**: Ngôn ngữ lập trình
- **SCSS**: Styling
- **Responsive Design**: Giao diện thích ứng
- **Role-based Access Control**: Phân quyền dựa trên vai trò

## Hướng dẫn sử dụng

### Đăng nhập
1. Truy cập ứng dụng
2. Nhấn "Đăng nhập với Google"
3. Chọn tài khoản Google phù hợp với vai trò

### Sinh viên
- Xem lịch học và điểm danh
- Theo dõi tiến độ dự án
- Tham gia hoạt động

### Giảng viên
- Quản lý điểm danh lớp học
- Chấm điểm và nhận xét bài tập
- Theo dõi tiến độ sinh viên

## Phát triển

### Thêm component mới
```bash
ng generate component components/component-name
```

### Thêm service mới
```bash
ng generate service services/service-name
```

### Build production
```bash
ng build --configuration production
```

## Đóng góp

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License