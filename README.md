# 🏃‍♂️ VietSeeds Run 2026 - Run To Grow

[![VietSeeds Foundation](https://img.shields.io/badge/Organizer-VietSeeds_Foundation-green.svg)](https://vietseeds.org)
[![Tech Stack](https://img.shields.io/badge/Tech_Stack-React_|_TypeScript_|_Tailwind-blue.svg)](#-technology-stack)
[![Platform](https://img.shields.io/badge/Platform-Strava_Integrated-orange.svg)](#-strava-integration)

**VietSeeds Run 2026** is a premium community-driven virtual running platform designed for participants across Central Vietnam (Quảng Bình, Quảng Trị, Thừa Thiên Huế, Đà Nẵng). The application seamlessly integrates with Strava to track, validate, and celebrate the collective progress of runners towards a **10,000 km community goal**.

---

## ✨ Core Features

### 📊 Campaign Dashboard
- **Community Progress**: Real-time visualization of total distance vs. the 10,000 km target.
- **Dynamic Trends**: Interactive charts showing daily activity volume and cumulative progress.
- **Live Activity Feed**: A real-time stream of activities synced directly from Strava.

### 🏆 Advanced Leaderboards
- **Individual Rankings**: Filter by gender, region (4 provinces), and timeframe (Today, Week, Month, All-time).
- **Team Rankings**: Collective performance tracking for groups and clubs.
- **Search & Filter**: Find athletes or teams instantly by name or Strava ID.

### 🏃‍♂️ Athlete & Activity Profiles
- **Personal Dashboard**: Detailed stats for each runner including total distance, pace, and activity history.
- **Activity Details**: Deep-dive into specific runs with maps (Leaflet), split times, and heart rate data.

### 🎯 Challenges & Milestones
- **Virtual Milestones**: Track progress through specific event challenges.
- **E-Certificates**: Automated generation of digital certificates upon milestone completion.

---

## 🛠 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript |
| **Styling** | Tailwind CSS, Shadcn UI, Lucide Icons |
| **Animations** | Framer Motion (Fluid & Elastic Motion) |
| **State & Data** | TanStack Query (React Query), Axios |
| **Visualization** | Recharts (Charts), Leaflet (Maps) |
| **Testing** | Vitest, Playwright (E2E) |

---

## 🏗 Project Architecture

### Strava Integration Flow
1. **OAuth Authentication**: Users connect their Strava accounts via a secure OAuth2 flow.
2. **Activity Syncing**:
   - **Automated**: Background webhooks from Strava trigger updates on the server.
   - **Manual**: Users can trigger a "Force Sync" from their dashboard to fetch latest runs.
3. **Pace Validation**: The system automatically filters out invalid activities.
   - **Valid Sports**: Run, Walk, VirtualRun.
   - **Pace Limits**: Must be between **4:00 min/km** and **15:00 min/km**.

### Folder Structure
```text
src/
├── api/          # Service layer for Backend API communication
├── components/   # UI components (Dashboard, Landing, UI Primitives)
├── hooks/        # Custom React hooks for data fetching & UI logic
├── lib/          # Utilities and configurations (e.g., Axios client, tailwind-merge)
├── pages/        # Application views (Landing, Leaderboard, Dashboard, etc.)
└── types/        # TypeScript interfaces and type definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables:
   Create a `.env` file based on `.env.example`:
   ```bash
   VITE_API_URL=https://api.your-backend.com/api/v1
   VITE_STRAVA_CLIENT_ID=your_client_id
   ```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📡 API Integration Summary

The frontend communicates with a specialized Go/Node.js backend. Key endpoints include:

- `POST /auth/strava/exchange`: Exchange Strava code for system JWT.
- `GET /campaign/stats`: Retrieve aggregate community metrics.
- `GET /leaderboard/individuals`: Paginated and filtered rankings.
- `POST /activities/sync`: Trigger manual Strava data synchronization.

---

## 🎨 Design Philosophy
The application follows a **"Dynamic - Reliable - Modern"** identity:
- **Dark Mode Aesthetic**: High-contrast, premium feel using deep forest greens and coral accents.
- **Glassmorphism**: Elegant translucent card designs with backdrop blur effects.
- **Fluid Motion**: Spring-based animations for a responsive and "alive" user experience.

---

*Built with ❤️ for the VietSeeds community.*
