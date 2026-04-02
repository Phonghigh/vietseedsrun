# VietSeeds Run 2026 - Run To Grow

## 📌 Tổng Quan Dự Án
**VietSeeds Run 2026** là một ứng dụng nền nền tảng web (Web Application) phục vụ cho giải chạy bộ cộng đồng "Run to Grow" do VietSeeds Foundation tổ chức. Ứng dụng giúp người tham gia theo dõi tiến độ, xem bảng xếp hạng, quản lý đội nhóm và kết nối cộng đồng thông qua việc tích hợp API từ hệ thống tracking (như Strava).

## 🛠 Công Nghệ Sử Dụng (Tech Stack)
- **Framework:** React + Vite
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS (kết hợp các biến CSS tùy chỉnh tạo theme riêng biệt)
- **UI Components:** Shadcn UI (dựa trên Radix UI Primitives)
- **Animations:** Framer Motion (hiệu ứng mượt mà, đàn hồi "spring", fluid motion)
- **Routing:** React Router DOM (Single Page Application - SPA)
- **Icons:** Lucide React

## 📂 Kiến Trúc & Cấu Trúc Các Trang
Ứng dụng được thiết kế theo mô hình SPA đa chức năng với giao diện tối (Dark mode / Dark gradient) kết hợp phong cách Kính mờ (Glassmorphism):

1. **Trang Chủ / App Hub (Landing Page - `/`)**
   - Đóng vai trò là cổng thông tin trung tâm.
   - Gồm thanh đếm ngược sự kiện ghim trên cùng (Sticky Countdown).
   - Chuyển đổi giữa 2 Tabs chính:
     - **Giới thiệu:** Hero Section màn hình rộng (Full-screen), cách thức tham dự, quyền lợi.
     - **Cộng đồng & Tracking (Dashboard Preview):** Cập nhật tổng quãng đường của cộng đồng, vinh danh Top Runners và chứa các "Lối Tắt Khám Phá" dẫn đến những chức năng sâu hơn.
2. **Dashboard (`/dashboard`)**
   - Bảng điều khiển cá nhân cho user: hiển thị quãng đường đã chạy, pace, thời gian, biểu đồ hoạt động.
3. **Bảng Xếp Hạng (`/leaderboard`)**
   - Nơi vinh danh cái nhân / tập thể trên toàn quốc.
4. **Đội Nhóm (`/teams`)**
   - Tính năng tạo / tìm kiếm / quản lý team chạy bộ.
5. **Thử Thách (`/challenges`)**
   - Danh sách các nhiệm vụ, cột mốc (milestones) người chạy cần hoàn thành để nhận E-Certificate hay quà tặng.
6. **Hồ Sơ (`/profile`)**
   - Thiết lập tài khoản cá nhân, lịch sử chạy, và chỉnh sửa thông tin chứng nhận.

## 🎨 Design System & UI/UX
- **Colors:**
  - *Màu chủ đạo (Primary):* Xanh lợt VietSeeds (Green/Forest variants) `hsl(142, 72%, 35%)`.
  - *Màu điểm nhấn (Accent):* Cam/San hô (Warm Coral) `hsl(20, 85%, 58%)`.
  - *Background:* Dark Green Gradient cho chiều sâu không gian.
- **Typography:**
  - *Tiêu đề (Display):* Cố định tính thể thao mạnh mẽ với **Space Grotesk** và **Bebas Neue**.
  - *Nội dung (Body text):* Dễ đọc với **Inter**.
- **Hiệu ứng nổi bật (VFX):**
  - Ambient glow blobs (điểm nhòe chiếu sáng nền).
  - Khối mờ phản quang (Glassmorphism borders + Backdrop Blur).
  - Fluid Layout (hiệu ứng giọt nước / spring) trên tất cả quá trình chuyển trang / đổi tab.

## 🚀 Hướng Chạy Cục Bộ (Local Deployment)

1. Cài đặt Dependencies:
```bash
npm install
```

2. Khởi chạy Server Môi Trường Develop:
```bash
npm run dev
```

3. Build cho Môi Trường Production:
```bash
npm run build
npm run preview
```
