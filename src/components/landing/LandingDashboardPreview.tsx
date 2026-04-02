import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity, MapPin, TrendingUp, Trophy, Users as UsersIcon, Target, User as UserIcon, Loader2, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useCampaignStats } from "@/hooks/useCampaign";
import { useIndividualLeaderboard } from "@/hooks/useLeaderboard";

export const LandingDashboardPreview = () => {
  const { data: campaignStats, isLoading: isCampaignLoading } = useCampaignStats();
  const { data: leaderboard, isLoading: isLeaderboardLoading } = useIndividualLeaderboard(1, 4);

  const progress = campaignStats ? Math.round((campaignStats.currentKm / campaignStats.targetKm) * 100) : 0;

  return (
    <div className="pt-32 pb-24 w-full flex-grow text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
            Thời gian thực
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Chiến dịch hiện tại</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-medium">Theo dõi nhịp đập và tiến độ bứt phá của gia đình VietSeeds</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Progress Goal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden relative"
          >
            {/* Soft decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shadow-inner">
                  <TargetIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl tracking-tight">Mục tiêu cộng đồng</h3>
                  <p className="text-sm text-muted-foreground font-medium">Cùng nhau chinh phục {campaignStats?.targetKm.toLocaleString() || "10,000"} km</p>
                </div>
              </div>

              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="text-5xl font-display font-black text-white tracking-tighter">
                    {isCampaignLoading ? (
                      <div className="h-12 w-32 bg-white/5 animate-pulse rounded-xl" />
                    ) : (
                      <>
                        {campaignStats?.currentKm.toLocaleString()}<span className="text-2xl text-white/30 ml-2 font-bold">km</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">Tiến độ</div>
                  <div className="text-2xl font-black text-primary/80">{progress}%</div>
                </div>
              </div>

              <Progress value={progress} className="h-4 mb-3 bg-white/5 [&>div]:bg-primary rounded-full overflow-hidden" />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-4">
                <span>0 km</span>
                <span>Mục tiêu {campaignStats?.targetKm.toLocaleString() || "10,000"} km</span>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <Link to="/dashboard" className="inline-flex items-center text-sm font-bold text-primary hover:text-white transition-colors group/link">
                Xem chi tiết Dashboard <ChevronRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Top Runners Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-[2.5rem] p-10 flex flex-col group overflow-hidden relative"
          >
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors duration-500" />

            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 text-accent flex items-center justify-center shadow-inner">
                  <Trophy className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight">Top Runner</h3>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground/40" />
            </div>

            <div className="space-y-4 relative z-10 flex-grow">
              {isLeaderboardLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10" />
                      <div className="h-4 w-24 bg-white/10 rounded" />
                    </div>
                    <div className="h-4 w-12 bg-white/10 rounded" />
                  </div>
                ))
              ) : (
                leaderboard?.map((user, index) => (
                  <motion.div 
                    key={user.name} 
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 group/item hover:border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${index === 0 ? 'border-accent/50 bg-accent/20 text-accent' : 'border-white/10 bg-black/40 text-white/50'}`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover/item:text-primary transition-colors">{user.name}</div>
                        <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">{user.activities} hoạt động</div>
                      </div>
                    </div>
                    <div className="font-display font-black text-primary text-xl">
                      {user.distance} <span className="text-[10px] text-white/20 ml-0.5">km</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
              <Link to="/leaderboard" className="inline-flex items-center text-sm font-bold text-accent hover:text-white transition-colors group/link">
                Xem Bảng Xếp Hạng <ChevronRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Feature Navigation Grid */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="mt-20 pt-10 border-t border-white/5"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Dashboard", desc: "Thống kê cộng đồng", icon: Activity, path: "/dashboard", color: "hsl(142, 45%, 50%)" },
              { title: "BXH", desc: "Top Runner", icon: Trophy, path: "/leaderboard", color: "hsl(25, 75%, 55%)" },
              { title: "Đội Nhóm", desc: "Gắn kết đồng đội", icon: UsersIcon, path: "/teams", color: "hsl(210, 55%, 55%)" },
              { title: "Thử Thách", desc: "Chinh phục nhiệm vụ", icon: Target, path: "/challenges", color: "hsl(0, 65%, 55%)" }
            ].map((link, i) => (
              <Link to={link.path} key={link.title} className="block group">
                <div className="glass-card p-6 rounded-3xl hover:bg-white/10 transition-all duration-500 relative overflow-hidden group-hover:-translate-y-2 border border-white/5 shadow-xl">
                  <div 
                    className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity"
                    style={{ background: link.color }}
                  />
                  <link.icon className="h-7 w-7 mb-4 relative z-10" style={{ color: link.color }} />
                  <div className="font-bold text-white text-base relative z-10 tracking-tight">{link.title}</div>
                  <div className="text-[10px] uppercase font-bold text-white/30 relative z-10 tracking-[0.15em]">{link.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const TargetIcon = ({ className }: { className?: string }) => (
  <img 
    src="/favicon.ico" 
    alt="Logo" 
    className={className} 
    style={{ filter: "brightness(0) invert(1)" }} 
  />
);
