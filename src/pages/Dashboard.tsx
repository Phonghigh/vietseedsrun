import { motion } from "framer-motion";
import { Activity as ActivityIcon, MapPin, Flame, TrendingUp, ChevronUp, Loader2, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import AppLayout from "@/components/layout/AppLayout";
import { useMyProfile } from "@/hooks/useUser";
import { useMyActivities, useSyncActivities } from "@/hooks/useActivities";
import { useCampaignStats } from "@/hooks/useCampaign";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { data: user, isLoading: isUserLoading } = useMyProfile();
  const { data: activitiesData, isLoading: isActLoading } = useMyActivities(1, 5);
  const { data: campaignStats } = useCampaignStats();
  const { mutate: sync, isPending: isSyncing } = useSyncActivities();

  const currentKm = user?.totalDistance || 0;
  const targetKm = campaignStats?.targetKm || 10000;
  const progress = Math.round((currentKm / targetKm) * 100);
  
  // No weekly data from API yet
  const weeklyActivity: any[] = [];

  const statCards = [
    { label: "Quãng đường", value: `${currentKm.toLocaleString()} km`, icon: MapPin, color: "text-primary" },
    { label: "Hoạt động", value: user?.totalActivities || 0, icon: ActivityIcon, color: "text-accent" },
    { label: "Hạng cá nhân", value: `#${user?.rank || "--"}`, icon: TrendingUp, color: "text-chart-blue" },
    { label: "Hạng đội nhóm", value: `#${user?.teamRank || "--"}`, icon: Flame, color: "text-chart-purple" },
  ];

  if (isUserLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Đang tải dashboard của bạn...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Strava Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Chào mừng trở lại, {user?.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => sync()} 
              disabled={isSyncing}
              className="rounded-full gap-2 border-primary/20 hover:border-primary/50"
            >
              <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ Strava'}
            </Button>
            <div className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
              Team: {user?.teamName || "Chưa có đội"}
            </div>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-5 stat-glow"
            >
              <div className="flex items-center justify-between mb-3">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <ChevronUp className="h-4 w-4 text-accent" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Challenge Progress */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Tiến độ cá nhân</h2>
              <p className="text-sm text-muted-foreground">VietSeeds Run 2026</p>
            </div>
            <div className="font-display text-2xl font-bold text-primary">{progress}%</div>
          </div>
          <Progress value={progress} className="h-3 mb-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{currentKm.toLocaleString()} km</span>
            <span>Mục tiêu: {targetKm.toLocaleString()} km</span>
          </div>
          <div className="flex gap-2 mt-4">
            {[25, 50, 75, 100].map((m) => (
              <div
                key={m}
                className={`flex-1 h-1.5 rounded-full ${progress >= m ? "gradient-hero" : "bg-muted"}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Hoạt động trong tuần</h2>
            {weeklyActivity.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyActivity}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                  <YAxis axisLine={false} tickLine={false} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      fontSize: "0.875rem",
                    }}
                  />
                  <Bar dataKey="km" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center border border-dashed border-border rounded-lg">
                <p className="text-sm text-muted-foreground italic">Dữ liệu biểu đồ đang được cập nhật...</p>
              </div>
            )}
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Lịch sử hoạt động gần đây</h2>
            <div className="space-y-3">
              {isActLoading ? (
                <div className="flex flex-col items-center py-10 gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : activitiesData?.data.length === 0 ? (
                <p className="text-center py-10 text-muted-foreground text-sm">Chưa có hoạt động nào được ghi nhận.</p>
              ) : (
                activitiesData?.data.map((a) => (
                  <div key={a.activityId} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 bg-muted/50 border border-white/5`}>
                      🏃
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground truncate">{a.name}</p>
                        <p className="text-xs font-bold text-primary">{a.distance} km</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">Pace: {a.pace} min/km</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.isValid ? 'bg-primary/20 text-primary-foreground' : 'bg-destructive/20 text-destructive'}`}>
                          {a.isValid ? 'Hợp lệ' : 'Không hợp lệ'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {activitiesData && activitiesData.data.length > 0 && (
              <Button variant="ghost" size="sm" className="w-full mt-4 text-muted-foreground hover:text-foreground text-xs" asChild>
                <a href="/profile">Xem tất cả lịch sử</a>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
