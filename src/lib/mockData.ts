export const currentUser = {
  id: "u1",
  name: "Alex Runner",
  avatar: "AR",
  totalDistance: 652,
  totalActivities: 48,
  rank: 7,
  teamRank: 3,
  team: "Trail Blazers",
  stravaConnected: true,
  lastSynced: "5 min ago",
};

export const challengeGoal = {
  name: "Summer Sprint 2026",
  targetKm: 1000,
  currentKm: 652,
  daysRemaining: 14,
  totalDays: 30,
};

export const weeklyActivity = [
  { day: "Mon", km: 8.2 },
  { day: "Tue", km: 5.1 },
  { day: "Wed", km: 0 },
  { day: "Thu", km: 12.5 },
  { day: "Fri", km: 6.8 },
  { day: "Sat", km: 15.2 },
  { day: "Sun", km: 10.3 },
];

export const activityFeed = [
  { id: 1, user: "Alex Runner", action: "ran 12.5 km", time: "2h ago", type: "run" as const },
  { id: 2, user: "Trail Blazers", action: "reached 2,500 km total", time: "3h ago", type: "milestone" as const },
  { id: 3, user: "Sam Cyclist", action: "rode 45 km", time: "4h ago", type: "ride" as const },
  { id: 4, user: "Mia Sprint", action: "ran 8.1 km — new PB!", time: "5h ago", type: "run" as const },
  { id: 5, user: "Jordan Pace", action: "joined the challenge", time: "6h ago", type: "join" as const },
];

export const leaderboardIndividual = [
  { rank: 1, name: "Elena Swift", distance: 892, activities: 62, avatar: "ES", trend: "up" as const },
  { rank: 2, name: "Marcus Trail", distance: 845, activities: 58, avatar: "MT", trend: "up" as const },
  { rank: 3, name: "Sophie Run", distance: 810, activities: 55, avatar: "SR", trend: "down" as const },
  { rank: 4, name: "Jake Endure", distance: 780, activities: 51, avatar: "JE", trend: "up" as const },
  { rank: 5, name: "Nina Peak", distance: 745, activities: 49, avatar: "NP", trend: "same" as const },
  { rank: 6, name: "Chris Stride", distance: 700, activities: 47, avatar: "CS", trend: "down" as const },
  { rank: 7, name: "Alex Runner", distance: 652, activities: 48, avatar: "AR", trend: "up" as const },
  { rank: 8, name: "Lena Dash", distance: 620, activities: 44, avatar: "LD", trend: "up" as const },
  { rank: 9, name: "Omar Miles", distance: 595, activities: 40, avatar: "OM", trend: "down" as const },
  { rank: 10, name: "Ava Tempo", distance: 570, activities: 38, avatar: "AT", trend: "same" as const },
];

export const leaderboardTeams = [
  { rank: 1, name: "Speed Demons", distance: 4200, members: 6, avatar: "SD" },
  { rank: 2, name: "Road Warriors", distance: 3950, members: 5, avatar: "RW" },
  { rank: 3, name: "Trail Blazers", distance: 3600, members: 5, avatar: "TB" },
  { rank: 4, name: "Urban Runners", distance: 3200, members: 4, avatar: "UR" },
  { rank: 5, name: "Peak Chasers", distance: 2900, members: 5, avatar: "PC" },
];

export const teamMembers = [
  { name: "Alex Runner", distance: 652, contribution: 18, avatar: "AR" },
  { name: "Dana Flow", distance: 820, contribution: 23, avatar: "DF" },
  { name: "Kevin Rush", distance: 710, contribution: 20, avatar: "KR" },
  { name: "Lisa Trek", distance: 780, contribution: 22, avatar: "LT" },
  { name: "Oscar Pace", distance: 638, contribution: 17, avatar: "OP" },
];

export const achievements = [
  { id: 1, name: "First 100km", icon: "🏃", unlocked: true },
  { id: 2, name: "Week Warrior", icon: "🔥", unlocked: true },
  { id: 3, name: "500km Club", icon: "⭐", unlocked: true },
  { id: 4, name: "Top 10", icon: "🏆", unlocked: true },
  { id: 5, name: "1000km Legend", icon: "👑", unlocked: false },
  { id: 6, name: "Team MVP", icon: "💪", unlocked: false },
];

export const notifications = [
  { id: 1, text: "Your run was synced: 12.5 km", time: "2h ago", read: false },
  { id: 2, text: "You moved up to rank #7!", time: "3h ago", read: false },
  { id: 3, text: "Trail Blazers reached 3,600 km!", time: "5h ago", read: true },
  { id: 4, text: "New milestone: 650 km!", time: "1d ago", read: true },
];
