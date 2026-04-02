import { motion } from "framer-motion";
import { MapPin, Activity, Trophy, TrendingUp, Calendar, Loader2 } from "lucide-react";
import { achievements, weeklyActivity } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import AppLayout from "@/components/layout/AppLayout";
import { useMyProfile } from "@/hooks/useUser";
import { useMyActivities } from "@/hooks/useActivities";

const Profile = () => {
  const { data: user, isLoading: isUserLoading } = useMyProfile();
  const { data: activitiesData, isLoading: isActLoading } = useMyActivities(1, 10);

  if (isUserLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Đang tải hồ sơ của bạn...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6 flex items-center gap-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary font-display overflow-hidden border border-primary/30">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user?.name.substring(0, 2).toUpperCase()
            )}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-foreground">{user?.name}</h1>
            <p className="text-muted-foreground text-sm">Đội: {user?.teamName || "Chưa tham gia"} • Hạng: #{user?.rank || "--"}</p>
            <div className="flex gap-4 mt-3">
              {[
                { icon: MapPin, value: `${(user?.totalDistance || 0).toLocaleString()} km` },
                { icon: Activity, value: `${user?.totalActivities || 0} hoạt động` },
                { icon: Trophy, value: `Hạng #${user?.rank || "--"}` },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <s.icon className="h-4 w-4 text-primary" />
                  {s.value}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Activity Trend */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Xu hướng hoạt động
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={weeklyActivity}>
                <defs>
                  <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="km" stroke="hsl(var(--primary))" fill="url(#colorKm)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Danh hiệu</h2>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className={`rounded-lg p-3 text-center ${a.unlocked ? "bg-primary/5" : "bg-muted/50 opacity-40"}`}
                >
                  <div className="text-2xl mb-1">{a.icon}</div>
                  <div className="text-xs font-medium text-foreground">{a.name}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Activity History */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" /> Lịch sử hoạt động gần đây
          </h2>
          <div className="space-y-2">
            {isActLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : activitiesData?.data.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground text-sm">Chưa có hoạt động nào.</p>
            ) : (
                activitiesData?.data.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">🏃</div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{a.name} — {a.distance} km</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(a.date).toLocaleDateString('vi-VN')} • Pace: {a.pace} min/km
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.isValid ? 'bg-primary/20 text-primary-foreground' : 'bg-destructive/20 text-destructive'}`}>
                      {a.isValid ? 'Hợp lệ' : 'Không hợp lệ'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Profile;
