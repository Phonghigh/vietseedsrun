import { motion } from "framer-motion";
import { MapPin, Activity, Trophy, TrendingUp, Calendar } from "lucide-react";
import { currentUser, achievements, weeklyActivity } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import AppLayout from "@/components/layout/AppLayout";

const recentActivities = [
  { date: "Today", type: "Run", distance: "12.5 km", pace: "5:12/km", calories: 820, time: "1h 05m" },
  { date: "Yesterday", type: "Run", distance: "8.1 km", pace: "5:30/km", calories: 540, time: "44m" },
  { date: "Mar 29", type: "Ride", distance: "35 km", pace: "28 km/h", calories: 950, time: "1h 15m" },
  { date: "Mar 28", type: "Run", distance: "5.2 km", pace: "5:45/km", calories: 340, time: "30m" },
];

const Profile = () => (
  <AppLayout>
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6 flex items-center gap-6"
      >
        <div className="w-20 h-20 rounded-2xl gradient-hero flex items-center justify-center text-2xl font-bold text-primary-foreground font-display">
          {currentUser.avatar}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-foreground">{currentUser.name}</h1>
          <p className="text-muted-foreground text-sm">Team: {currentUser.team} • Rank #{currentUser.rank}</p>
          <div className="flex gap-4 mt-3">
            {[
              { icon: MapPin, value: `${currentUser.totalDistance} km` },
              { icon: Activity, value: `${currentUser.totalActivities} activities` },
              { icon: Trophy, value: `Rank #${currentUser.rank}` },
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
            <TrendingUp className="h-5 w-5 text-primary" /> Activity Trend
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
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Badges</h2>
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
          <Calendar className="h-5 w-5 text-primary" /> Recent Activities
        </h2>
        <div className="space-y-2">
          {recentActivities.map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/30">
              <div className="flex items-center gap-3">
                <div className="text-lg">{a.type === "Run" ? "🏃" : "🚴"}</div>
                <div>
                  <div className="text-sm font-medium text-foreground">{a.type} — {a.distance}</div>
                  <div className="text-xs text-muted-foreground">{a.date} • {a.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{a.pace}</div>
                <div className="text-xs text-muted-foreground">{a.calories} cal</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </AppLayout>
);

export default Profile;
