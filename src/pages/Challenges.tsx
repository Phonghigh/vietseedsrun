import { motion } from "framer-motion";
import { Target, Clock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { challengeGoal, achievements } from "@/lib/mockData";
import AppLayout from "@/components/layout/AppLayout";

const milestones = [
  { pct: 25, km: 250, label: "25%" },
  { pct: 50, km: 500, label: "50%" },
  { pct: 75, km: 750, label: "75%" },
  { pct: 100, km: 1000, label: "100%" },
];

const Challenges = () => {
  const progress = Math.round((challengeGoal.currentKm / challengeGoal.targetKm) * 100);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Challenges</h1>
          <p className="text-muted-foreground text-sm">Track your progress and earn achievements</p>
        </div>

        {/* Active Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6 stat-glow"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">{challengeGoal.name}</h2>
                <p className="text-sm text-muted-foreground">Run {challengeGoal.targetKm} km in {challengeGoal.totalDays} days</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <Clock className="h-3.5 w-3.5" />
              {challengeGoal.daysRemaining}d left
            </div>
          </div>

          <Progress value={progress} className="h-4 mb-6" />

          <div className="grid grid-cols-4 gap-3">
            {milestones.map((m) => {
              const reached = challengeGoal.currentKm >= m.km;
              return (
                <div
                  key={m.pct}
                  className={`rounded-lg p-3 text-center border ${
                    reached ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"
                  }`}
                >
                  {reached ? (
                    <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-1" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30 mx-auto mb-1" />
                  )}
                  <div className={`font-display font-bold text-sm ${reached ? "text-primary" : "text-muted-foreground"}`}>
                    {m.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{m.km} km</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl p-4 text-center border transition-all ${
                  a.unlocked
                    ? "border-primary/20 bg-primary/5 hover:stat-glow"
                    : "border-border bg-muted/30 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{a.icon}</div>
                <div className="font-display font-semibold text-sm text-foreground">{a.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {a.unlocked ? "Unlocked ✓" : "Locked"}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Challenges;
