import { motion } from "framer-motion";
import { Target, Clock, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import AppLayout from "@/components/layout/AppLayout";
import { useCampaignStats } from "@/hooks/useCampaign";

const milestones = [
  { pct: 25, label: "25%" },
  { pct: 50, label: "50%" },
  { pct: 75, label: "75%" },
  { pct: 100, label: "100%" },
];

const Challenges = () => {
  const { data: campaignStats } = useCampaignStats();
  
  const currentKm = campaignStats?.currentKm || 0;
  const targetKm = campaignStats?.targetKm || 10000;
  const progress = Math.round((currentKm / targetKm) * 100);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Thử Thách Cộng Đồng</h1>
          <p className="text-muted-foreground text-sm">Theo dõi tiến độ chung của VietSeeds Run 2026</p>
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
                <h2 className="font-display text-xl font-bold text-foreground">VietSeeds Run 2026</h2>
                <p className="text-sm text-muted-foreground">Chinh phục {targetKm.toLocaleString()} km trong 30 ngày</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              <Clock className="h-3.5 w-3.5" />
              Đang diễn ra
            </div>
          </div>

          <Progress value={progress} className="h-4 mb-6" />

          <div className="grid grid-cols-4 gap-3">
            {milestones.map((m) => {
              const milestoneKm = (targetKm * m.pct) / 100;
              const reached = currentKm >= milestoneKm;
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
                  <div className="text-xs text-muted-foreground">{milestoneKm.toLocaleString()} km</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Future Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
             <Target className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Danh hiệu & Nhiệm vụ</h2>
            <p className="max-w-xs text-sm text-muted-foreground mt-2">
                Hệ thống danh hiệu cá nhân đang được phát triển. Hãy tiếp tục chạy để nhận được những phần quà bất ngờ!
            </p>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Challenges;
