# Danh Sách API Yêu Cầu Cho VietSeeds Run 2026 (Backend Requirements)

Tài liệu này liệt kê chi tiết các RESTful API mà đội ngũ Backend (BE) cần phát triển và cung cấp cho phía Frontend (FE) để vận hành ứng dụng VietSeeds Run. Các API được phân loại theo từng tính năng chính.

Tất cả các API yêu cầu xác thực cần phải nhận header: `Authorization: Bearer <token>`.

---

## 1. Authentication & Authorization (Xác thực)
Dự án sử dụng hình thức đăng nhập thông qua Strava OAuth.

### 1.1 Trao đổi mã Strava Code lấy Token hệ thống
- **Endpoint:** `POST /api/v1/auth/strava/exchange`
- **Mô tả:** Sau khi user đăng nhập Strava trên FE, FE sẽ nhận được một `code`. FE gửi `code` này cho BE. BE gọi lên Strava để lấy `access_token` của Strava, đồng thời lưu user vào DB và trả về Access Token của hệ thống VietSeeds.
- **Request Body (JSON):**
  ```json
  { "code": "strava_authorization_code_here" }
  ```
- **Response (200 OK):**
  ```json
  {
    "token": "vietseeds_jwt_token",
    "user": {
      "id": "123",
      "stravaId": "456789",
      "name": "Nguyễn Văn A",
      "avatar": "https://..."
    }
  }
  ```

### 1.2 Lấy thông tin user hiện tại (Me)
- **Endpoint:** `GET /api/v1/auth/me`
- **Mô tả:** Lấy toàn bộ thông tin cá nhân của user đang đăng nhập (bao gồm tổng quãng đường, trạng thái hoàn thành).
- **Header:** `Authorization: Bearer <token>`

---

## 2. Thống Kê & Chiến Dịch (Campaign Stats)
Cung cấp số liệu tổng quan hiển thị ở Landing Page và Dashboard.

### 2.1 Lấy thông số tổng quan của toàn bộ giải chạy
- **Endpoint:** `GET /api/v1/campaign/stats`
- **Mô tả:** Trả về tiến độ chung của cộng đồng để vẽ thanh Progress.
- **Response (200 OK):**
  ```json
  {
    "targetKm": 10000,
    "currentKm": 4500.5,
    "totalRunners": 1500,
    "totalActivities": 450
  }
  ```

### 2.2 Lấy dữ liệu biểu đồ xu hướng hoạt động (Trend)
- **Endpoint:** `GET /api/v1/campaign/trend`
- **Mô tả:** Trả về danh sách quãng đường đã chạy theo từng ngày từ khi bắt đầu chiến dịch đến hiện tại.
- **Response (200 OK):**
  ```json
  [
    { "date": "01/04", "km": 45.2 },
    { "date": "02/04", "km": 82.1 },
    { "date": "03/04", "km": 156.4 }
  ]
  ```

---

## 3. Hoạt Động Chạy (Activities)
Quản lý các bản ghi chạy bộ đồng bộ từ Strava.

### 3.1 Nhận Webhook từ Strava (S2S - Server to Server)
- **Endpoint:** `POST /api/v1/webhooks/strava`
- **Mô tả:** Strava sẽ gọi API này bất cứ khi nào user (đã cấp quyền) vừa hoàn thành một cuốc chạy. BE xử lý kiểm tra (pace từ 4' - 15'/km, ngày tháng) và cộng dồn vào quãng đường của user.
- *(API này FE không gọi, mà Strava sẽ gọi).*

### 3.2 Lịch sử chạy bộ của cá nhân (Pagination)
- **Endpoint:** `GET /api/v1/activities/me?page=1&limit=10`
- **Mô tả:** Lấy danh sách các tracklogs (bản ghi chạy) để hiển thị trong mục Lịch sử trên ứng dụng.
- **Response (200 OK):**
  ```json
  {
    "data": [
      {
        "activityId": "strava_123",
        "name": "Cố lên mỗi ngày",
        "distance": 5.2,
        "movingTime": 1800,
        "pace": "5:45",
        "date": "2026-04-02T10:00:00Z",
        "isValid": true
      }
    ],
    "meta": {
      "total": 50,
      "currentPage": 1,
      "totalPages": 5
    }
  }
  ```

### 3.3 Đồng bộ thủ công (Manual Sync)
- **Endpoint:** `POST /api/v1/activities/sync`
- **Mô tả:** Cho phép user bấm nút "Đồng bộ" trên Dashboard nếu hệ thống webhook bị trễ. BE sẽ fetch API Strava của user để lấy dữ liệu mới nhất trong khung giờ giới hạn.

---

## 4. Bảng Xếp Hạng (Leaderboard)

### 4.1 Bảng Xếp Hạng Cá Nhân
- **Endpoint:** `GET /api/v1/leaderboard/individuals`
- **Query Params:** `?gender=male|female` (Tuỳ chọn), `?page=1&limit=50`
- **Response (200 OK):**
  ```json
  [
    {
      "rank": 1,
      "userId": "123",
      "name": "Nguyên B",
      "avatar": "url",
      "distance": 150.5,
      "activitiesCount": 10
    }
  ]
  ```

### 4.2 Bảng Xếp Hạng Đội Nhóm
- **Endpoint:** `GET /api/v1/leaderboard/teams`
- **Query Params:** `?page=1&limit=20`
- **Mô tả:** Sắp xếp các Team dựa trên tổng quãng đường của các thành viên.

---

## 5. Quản Lý Đội Nhóm (Teams)

### 5.1 Danh sách Đội nhóm
- **Endpoint:** `GET /api/v1/teams`
- **Mô tả:** Lấy thông tin các team có sẵn để user lựa chọn (nếu chương trình cho chọn team).

### 5.3 Chi tiết Đội nhóm
- **Endpoint:** `GET /api/v1/teams/:teamId`
- **Mô tả:** Lấy thông tin nội bộ team (Số lượng thành viên, danh sách member xếp hạng theo quãng đường, tổng km của team do ai đóng góp).
- **Response (200 OK):**
  ```json
  {
    "team": {
      "id": "team_123",
      "name": "Team Chiến Binh",
      "avatar": "⚔️",
      "totalDistance": 1250.5,
      "memberCount": 15,
      "rank": 3
    },
    "members": [
      {
        "userId": "user_456",
        "name": "Lê Văn A",
        "avatar": "https://...",
        "distance": 120.5,
        "activitiesCount": 15,
        "rankInTeam": 1
      }
    ]
  }
  ```

---

### 2.3 Lấy dữ liệu Heatmap theo địa phương
- **Endpoint:** `GET /api/v1/campaign/heatmap`
- **Mô tả:** Trả về danh sách thống kê số lượng thành viên và số lượng hoạt động theo từng tỉnh/thành phố để vẽ bản đồ nhiệt.
- **Response (200 OK):**
  ```json
  [
    { "province": "Hồ Chí Minh", "members": 500, "activities": 1200 },
    { "province": "Hà Nội", "members": 350, "activities": 850 },
    { "province": "Đà Nẵng", "members": 120, "activities": 300 }
  ]
  ```

---

### 3.4 Lấy danh sách hoạt động mới nhất (Live Feed)
- **Endpoint:** `GET /api/v1/activities/recent?limit=20`
- **Mô tả:** Trả về các hoạt động vừa mới diễn ra của toàn bộ cộng đồng để hiển thị trong Live Feed.
- **Response (200 OK):**
  ```json
  [
    {
      "id": "act_1",
      "userName": "Đỗ Thanh Huyền",
      "userAvatar": "https://...",
      "distance": 37.49,
      "location": "Hà Nội",
      "createdAt": "2026-04-04T10:00:00Z"
    }
  ]
  ```

---

## 6. Chứng Nhận (E-Certificate)

### 6.1 Kiểm tra & Sinh chứng nhận điện tử
- **Endpoint:** `GET /api/v1/certificates/me`
- **Mô tả:** Cấp đường link ảnh chứng nhận (hoặc PDF) nếu user đã vượt mốc >= 30km.
- **Response (200 OK):**
  ```json
  {
    "isEligible": true,
    "certificateUrl": "https://s3.../cert/user_123.jpg",
    "shareUrl": "https://vietseedsrun.vn/cert/123"
  }
  ```
