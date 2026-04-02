import { motion } from "framer-motion";
import { Activity, MapPin, Flame, TrendingUp, ChevronUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { currentUser, challengeGoal, weeklyActivity, activityFeed } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import AppLayout from "@/components/layout/AppLayout";

const statCards = [
  { label: "Total Distance", value: `${currentUser.totalDistance} km`, icon: MapPin, color: "text-primary" },
  { label: "Activities", value: currentUser.totalActivities, icon: Activity, color: "text-accent" },
  { label: "Your Rank", value: `#${currentUser.rank}`, icon: TrendingUp, color: "text-chart-blue" },
  { label: "Team Rank", value: `#${currentUser.teamRank}`, icon: Flame, color: "text-chart-purple" },
];

const Dashboard = () => {
  const progress = Math.round((challengeGoal.currentKm / challengeGoal.targetKm) * 100);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Strava Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, {currentUser.name}</p>
          </div>
          <div className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-glow" />
            Strava synced {currentUser.lastSynced}
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
              <h2 className="font-display text-lg font-semibold text-foreground">{challengeGoal.name}</h2>
              <p className="text-sm text-muted-foreground">{challengeGoal.daysRemaining} days remaining</p>
            </div>
            <div className="font-display text-2xl font-bold text-primary">{progress}%</div>
          </div>
          <Progress value={progress} className="h-3 mb-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{challengeGoal.currentKm} km</span>
            <span>{challengeGoal.targetKm} km</span>
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
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Weekly Activity</h2>
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
          </motion.div>

          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Activity Feed</h2>
            <div className="space-y-3">
              {activityFeed.map((a) => (
                <div key={a.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    a.type === "milestone" ? "gradient-hero text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {a.type === "run" ? "🏃" : a.type === "ride" ? "🚴" : a.type === "milestone" ? "🏆" : "👋"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{a.user}</span>{" "}
                      {a.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
