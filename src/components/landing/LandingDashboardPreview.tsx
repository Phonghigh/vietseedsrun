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
    <div className="pt-32 pb-24 w-full flex-grow text-foreground">
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
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-foreground">Chiến dịch hiện tại</h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-medium">Theo dõi nhịp đập và tiến độ bứt phá của gia đình VietSeeds</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Progress Goal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden relative border-primary/10"
          >
            {/* Soft decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
                  <TargetIcon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl tracking-tight text-foreground">Mục tiêu cộng đồng</h3>
                  <p className="text-sm text-muted-foreground font-medium">Cùng nhau chinh phục {campaignStats?.targetKm.toLocaleString() || "10,000"} km</p>
                </div>
              </div>

              <div className="mb-6 flex items-end justify-between">
                <div>
                  <div className="text-5xl font-display font-black text-foreground tracking-tighter italic">
                    {isCampaignLoading ? (
                      <div className="h-12 w-32 bg-secondary animate-pulse rounded-xl" />
                    ) : (
                      <>
                        {campaignStats?.currentKm.toLocaleString()}<span className="text-primary text-xl ml-2 not-italic font-black opacity-70 uppercase tracking-widest">km</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">Tiến độ</div>
                  <div className="text-2xl font-black text-primary/80">{progress}%</div>
                </div>
              </div>

              <Progress value={progress} className="h-4 mb-3 bg-secondary rounded-full overflow-hidden border border-border/50" />
              <div className="flex justify-between text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest mt-4">
                <span>0 km</span>
                <span>Mục tiêu {campaignStats?.targetKm.toLocaleString() || "10,000"} km</span>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border/50">
              <Link to="/dashboard" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/70 transition-colors group/link">
                Xem chi tiết Dashboard <ChevronRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Top Runners Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-[2.5rem] p-10 flex flex-col group overflow-hidden relative border-primary/10"
          >
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px] group-hover:bg-accent/10 transition-colors duration-500" />

            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shadow-inner border border-accent/20">
                  <Trophy className="h-7 w-7" />
                </div>
                <h3 className="font-display font-bold text-xl tracking-tight text-foreground">Top Runner</h3>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground/30" />
            </div>

            <div className="space-y-4 relative z-10 flex-grow">
              {isLeaderboardLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-secondary border border-border/50 animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted" />
                      <div className="h-4 w-24 bg-muted rounded" />
                    </div>
                    <div className="h-4 w-12 bg-muted rounded" />
                  </div>
                ))
              ) : (
                leaderboard?.map((user, idx) => (
                  <motion.div 
                    key={user.name} 
                    whileHover={{ scale: 1.04, y: -4, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 border border-border/50 hover:bg-secondary/70 hover:border-primary/20 transition-all duration-300 group/item hover:shadow-xl cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${idx === 0 ? 'border-primary/40 bg-primary/10 text-primary' : idx < 3 ? 'border-primary/20 bg-primary/5 text-primary/40' : 'border-border/30 bg-muted/20 text-muted-foreground/40'}`}>
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-foreground group-hover/item:text-primary transition-colors truncate">{user.name}</div>
                        <div className="text-[10px] uppercase font-bold text-muted-foreground/40 tracking-widest leading-none">{user.activities} hoạt động</div>
                      </div>
                    </div>
                    <div className="text-2xl font-display font-black text-foreground leading-none tabular-nums uppercase italic">{user.distance} <span className="text-xs text-primary font-black ml-1 not-italic opacity-70">KM</span></div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-border/50 relative z-10">
              <Link to="/leaderboard" className="inline-flex items-center text-sm font-bold text-accent hover:text-accent/70 transition-colors group/link">
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
           className="mt-20 pt-10 border-t border-border/50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Dashboard", desc: "Thống kê cộng đồng", icon: Activity, path: "/dashboard", color: "hsl(142, 45%, 50%)" },
              { title: "BXH", desc: "Top Runner", icon: Trophy, path: "/leaderboard", color: "hsl(25, 75%, 55%)" },
              { title: "Đội Nhóm", desc: "Gắn kết đồng đội", icon: UsersIcon, path: "/teams", color: "hsl(210, 55%, 55%)" },
              { title: "Thử Thách", desc: "Chinh phục nhiệm vụ", icon: Target, path: "/challenges", color: "hsl(0, 65%, 55%)" }
            ].map((link, i) => (
              <Link to={link.path} key={link.title} className="block group">
                <div className="glass-card p-6 rounded-3xl hover:bg-secondary/50 transition-all duration-500 relative overflow-hidden group-hover:-translate-y-2 border border-border/50 hover:border-primary/20 shadow-xl shadow-primary/[0.03]">
                  <div 
                    className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity"
                    style={{ background: link.color }}
                  />
                  <link.icon className="h-7 w-7 mb-4 relative z-10" style={{ color: link.color }} />
                  <div className="font-bold text-foreground text-base relative z-10 tracking-tight">{link.title}</div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground/40 relative z-10 tracking-[0.15em]">{link.desc}</div>
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
    // style={{ filter: "brightness(0) invert(1)" }} 
  />
);
