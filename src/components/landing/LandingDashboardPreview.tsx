import { motion } from "framer-motion";
import { Activity, MapPin, TrendingUp, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { challengeGoal, leaderboardIndividual } from "@/lib/mockData";

export const LandingDashboardPreview = () => {
  const progress = Math.round((challengeGoal.currentKm / challengeGoal.targetKm) * 100);

  return (
    <div className="pt-28 pb-16 w-full flex-grow text-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold mb-4">Chiến dịch hiện tại</h2>
          <p className="text-white/60">Theo dõi tiến độ chung của cộng đồng VietSeeds Run</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Progress Goal */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4, delay: 0.1 }}
            className="border border-white/10 bg-black/20 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Water drop decoration inside card */}
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center">
                <TargetIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Mục tiêu cộng đồng</h3>
                <p className="text-sm text-muted-foreground">Chinh phục 10,000 km</p>
              </div>
            </div>

            <div className="mb-4 flex items-end justify-between">
              <div>
                <div className="text-4xl font-display font-bold text-white mb-1">
                  {challengeGoal.currentKm.toLocaleString()} <span className="text-lg text-white/50 font-medium">km</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/50 mb-1">Mục tiêu</div>
                <div className="font-semibold text-white/90">{challengeGoal.targetKm.toLocaleString()} km</div>
              </div>
            </div>

            <Progress value={progress} className="h-3 mb-3 bg-white/10 [&>div]:bg-primary rounded-full overflow-hidden" />
            <div className="flex justify-between text-xs text-white/50 font-medium font-body uppercase">
              <span>0%</span>
              <span>Đạt {progress}%</span>
            </div>
          </motion.div>

          {/* Top Runners Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.4, delay: 0.2 }}
            className="border border-white/10 bg-black/20 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-lg">Top Runners</h3>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-4 relative z-10">
              {leaderboardIndividual.slice(0, 4).map((user, index) => (
                <motion.div 
                  key={user.name} 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center font-bold text-sm border-2 border-primary/30 text-white shadow-inner">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-sm text-white/90">{user.name}</div>
                      <div className="text-xs text-white/40">{user.activities} hoạt động</div>
                    </div>
                  </div>
                  <div className="font-display font-bold text-primary text-lg tracking-wide">
                    {user.distance} km
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const TargetIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
