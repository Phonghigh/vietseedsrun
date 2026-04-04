import { motion } from "framer-motion";
import { Trophy, Flag, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Milestone {
  label: string;
  km: number;
  emoji: string;
}

const MILESTONES: Milestone[] = [
  { label: "Khởi động", km: 100, emoji: "🏃" },
  { label: "Nha Trang", km: 500, emoji: "🏖️" },
  { label: "Đà Nẵng", km: 1000, emoji: "🌉" },
  { label: "Nửa chặng đường", km: 1500, emoji: "⚡" },
  { label: "Hà Nội", km: 2000, emoji: "🏛️" },
  { label: "Mục tiêu!", km: 2500, emoji: "🏆" },
];

interface NextMilestoneProps {
  currentKm: number;
}

const NextMilestone = ({ currentKm }: NextMilestoneProps) => {
  const nextMilestone = MILESTONES.find(m => m.km > currentKm) || MILESTONES[MILESTONES.length - 1];
  const prevMilestone = [...MILESTONES].reverse().find(m => m.km <= currentKm);
  const prevKm = prevMilestone?.km || 0;
  const segmentProgress = Math.min(((currentKm - prevKm) / (nextMilestone.km - prevKm)) * 100, 100);
  const remaining = Math.max(nextMilestone.km - currentKm, 0);

  return (
    <div className="glass-card rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-[200px] h-[200px] bg-accent/5 rounded-full blur-[60px] pointer-events-none" />



      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">{nextMilestone.emoji}</div>
          <div className="font-display text-lg font-black text-foreground">{nextMilestone.label}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {nextMilestone.km.toLocaleString()} km
          </div>
        </div>

        <Progress value={segmentProgress} className="h-3 mb-3 bg-muted/30 [&>div]:bg-accent rounded-full" />

        <div className="flex justify-between text-[10px] font-bold text-muted-foreground/60 mb-6">
          <span>{prevMilestone ? `${prevMilestone.emoji} ${prevMilestone.label}` : "Bắt đầu"}</span>
          <span>{nextMilestone.emoji} {nextMilestone.label}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-primary/5 border border-primary/15 rounded-2xl p-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-primary">
            <Zap className="h-4 w-4" />
            <span className="font-display text-sm font-black">Còn {remaining.toLocaleString()} km</span>
          </div>
          <p className="text-[10px] text-muted-foreground/70 mt-1">để mở khoá mốc tiếp theo</p>
        </motion.div>

        {/* Completed milestones */}
        <div className="mt-6 space-y-2">
          {MILESTONES.filter(m => m.km <= currentKm).map(m => (
            <div key={m.label} className="flex items-center gap-2 text-[10px] text-muted-foreground/50 font-medium">
              <Trophy className="h-3 w-3 text-accent/50" />
              <span>{m.emoji} {m.label}</span>
              <span className="ml-auto">{m.km.toLocaleString()} km ✓</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextMilestone;
