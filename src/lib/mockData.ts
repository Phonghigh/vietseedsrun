// Mock/fallback data for when API is unavailable
import type { CampaignStats, CampaignTrendItem, HeatmapItem } from '@/api/campaignService';
import type { LeaderboardUser } from '@/api/leaderboardService';
import type { RecentActivity } from '@/api/activityService';

export const MOCK_CAMPAIGN_STATS: CampaignStats = {
  targetKm: 10000,
  currentKm: 1458,
  totalRunners: 157,
  totalActivities: 842,
};

export const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Nguyễn Minh Tuấn", avatar: "https://ui-avatars.com/api/?name=Minh+Tuan&background=10b981&color=fff", distance: 87.3, activities: 12, pace: "5:30", trend: 5, userId: "mock-1" },
  { rank: 2, name: "Trần Thị Hương", avatar: "https://ui-avatars.com/api/?name=Thi+Huong&background=f97316&color=fff", distance: 72.1, activities: 9, pace: "6:10", trend: 2, userId: "mock-2" },
  { rank: 3, name: "Lê Văn Phong", avatar: "https://ui-avatars.com/api/?name=Van+Phong&background=3b82f6&color=fff", distance: 65.8, activities: 11, pace: "5:45", trend: -1, userId: "mock-3" },
  { rank: 4, name: "Phạm Quốc Anh", avatar: "https://ui-avatars.com/api/?name=Quoc+Anh&background=8b5cf6&color=fff", distance: 58.2, activities: 8, pace: "6:00", trend: 3, userId: "mock-4" },
  { rank: 5, name: "Hoàng Thị Lan", avatar: "https://ui-avatars.com/api/?name=Thi+Lan&background=ec4899&color=fff", distance: 52.6, activities: 7, pace: "6:30", trend: 0, userId: "mock-5" },
];

export const MOCK_RECENT_ACTIVITIES: RecentActivity[] = [
  { id: "a1", userName: "Nguyễn Minh Tuấn", userAvatar: "https://ui-avatars.com/api/?name=Minh+Tuan&background=10b981&color=fff", distance: 5.2, location: "Hồ Chí Minh", createdAt: new Date(Date.now() - 15 * 60000).toISOString(), userId: "mock-1" },
  { id: "a2", userName: "Trần Thị Hương", userAvatar: "https://ui-avatars.com/api/?name=Thi+Huong&background=f97316&color=fff", distance: 10.0, location: "Hà Nội", createdAt: new Date(Date.now() - 45 * 60000).toISOString(), userId: "mock-2" },
  { id: "a3", userName: "Lê Văn Phong", userAvatar: "https://ui-avatars.com/api/?name=Van+Phong&background=3b82f6&color=fff", distance: 3.8, location: "Đà Nẵng", createdAt: new Date(Date.now() - 90 * 60000).toISOString(), userId: "mock-3" },
  { id: "a4", userName: "Phạm Quốc Anh", userAvatar: "https://ui-avatars.com/api/?name=Quoc+Anh&background=8b5cf6&color=fff", distance: 7.5, location: "Hồ Chí Minh", createdAt: new Date(Date.now() - 2 * 3600000).toISOString(), userId: "mock-4" },
  { id: "a5", userName: "Hoàng Thị Lan", userAvatar: "https://ui-avatars.com/api/?name=Thi+Lan&background=ec4899&color=fff", distance: 4.1, location: "Nha Trang", createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), userId: "mock-5" },
  { id: "a6", userName: "Võ Đức Trí", userAvatar: "https://ui-avatars.com/api/?name=Duc+Tri&background=06b6d4&color=fff", distance: 8.3, location: "Huế", createdAt: new Date(Date.now() - 4 * 3600000).toISOString(), userId: "mock-6" },
  { id: "a7", userName: "Đặng Thanh Hà", userAvatar: "https://ui-avatars.com/api/?name=Thanh+Ha&background=eab308&color=fff", distance: 6.0, location: "Cần Thơ", createdAt: new Date(Date.now() - 5 * 3600000).toISOString(), userId: "mock-7" },
];

export const MOCK_TREND_DATA: CampaignTrendItem[] = Array.from({ length: 14 }, (_, i) => ({
  date: `${(i + 1).toString().padStart(2, '0')}/04`,
  km: Math.round(80 + Math.random() * 120),
}));

export const MOCK_HEATMAP_DATA: HeatmapItem[] = [
  { province: "Hồ Chí Minh", members: 52, activities: 320 },
  { province: "Hà Nội", members: 38, activities: 245 },
  { province: "Đà Nẵng", members: 15, activities: 88 },
  { province: "Nha Trang", members: 8, activities: 42 },
  { province: "Cần Thơ", members: 12, activities: 55 },
  { province: "Huế", members: 10, activities: 35 },
  { province: "Vinh", members: 6, activities: 22 },
  { province: "Đà Lạt", members: 5, activities: 18 },
  { province: "Hải Phòng", members: 4, activities: 10 },
  { province: "Bình Dương", members: 7, activities: 7 },
];
