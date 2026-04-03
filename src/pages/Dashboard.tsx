import { motion } from "framer-motion";
import { Activity as ActivityIcon, MapPin, Users, Trophy, Target, Loader2, Star, ChevronRight, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import AppLayout from "@/components/layout/AppLayout";
import { useCampaignStats } from "@/hooks/useCampaign";
import { useIndividualLeaderboard } from "@/hooks/useLeaderboard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: campaignStats, isLoading: isCampaignLoading } = useCampaignStats();
  const { data: leaderboard, isLoading: isLeaderboardLoading } = useIndividualLeaderboard(1, 10);

  const currentKm = campaignStats?.currentKm || 0;
  const targetKm = campaignStats?.targetKm || 10000;
  const progress = Math.round((currentKm / targetKm) * 100);

  if (isCampaignLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-medium">Đang tải dữ liệu cộng đồng...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        {/* Community Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-4xl font-black text-white tracking-tight">Dashboard Cộng Đồng</h1>
            <p className="text-muted-foreground font-medium mt-1">Theo dõi nhịp đập của toàn thể runner VietSeeds</p>
          </div>

        </motion.div>

        {/* Global Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Tổng quãng đường", value: `${currentKm.toLocaleString()} km`, icon: MapPin, color: "text-primary", bg: "bg-primary/10" },
            { label: "Người tham gia", value: campaignStats?.totalRunners || 0, icon: Users, color: "text-accent", bg: "bg-accent/10" },
            { label: "Tổng hoạt động", value: campaignStats?.totalActivities || 0, icon: ActivityIcon, color: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "Mục tiêu chung", value: `${targetKm.toLocaleString()} km`, icon: Target, color: "text-purple-400", bg: "bg-purple-400/10" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-[2.5rem] p-8 hover:translate-y-[-4px] transition-all duration-300 group shadow-xl flex flex-col items-center text-center"
            >
              <div className={`p-4 rounded-2xl ${s.bg} ${s.color} shadow-sm group-hover:scale-110 transition-transform mb-6`}>
                <s.icon className="h-7 w-7" />
              </div>
              <div className="font-display text-3xl font-black text-white tracking-tighter mb-1">{s.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Community Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-[2.5rem] p-10 overflow-hidden relative border border-white/5 shadow-2xl"
        >
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="max-w-md">
              <h2 className="font-display text-2xl font-black text-white tracking-tight mb-2">Tiến độ chiến dịch</h2>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Mỗi bước chân của bạn đang góp phần vào mục tiêu chung <span className="text-primary font-bold">{targetKm.toLocaleString()} km</span> nhằm hỗ trợ sinh viên VietSeeds.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end">
                <div className="font-display text-7xl font-black text-primary leading-none tracking-tighter mb-2">{progress}%</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Hoàn thành</div>
            </div>
          </div>

          <div className="mt-10 relative z-10">
            <Progress value={progress} className="h-4 mb-4 bg-white/5 [&>div]:bg-primary rounded-full" />
            <div className="flex justify-between items-center text-xs font-bold tracking-wider">
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-primary" />
                 <span className="text-muted-foreground">Đã đạt: <span className="text-white">{currentKm.toLocaleString()} km</span></span>
              </div>
              <div className="text-muted-foreground/80 italic">Mục tiêu: {targetKm.toLocaleString()} km</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Runners Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 glass-card rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-xl font-black text-white tracking-tight">Bảng Vàng Cá Nhân</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground/80 hover:text-primary transition-colors hover:bg-transparent group" asChild>
                    <Link to="/leaderboard">Xem toàn bộ <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
                </Button>
            </div>
            
            <div className="space-y-3">
                {isLeaderboardLoading ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Đang cập nhật bảng xếp hạng...</span>
                    </div>
                ) : leaderboard?.slice(0, 5).map((player, idx) => (
                    <motion.div 
                        key={idx} 
                        whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.05)" }}
                        className="flex items-center justify-between p-4 rounded-2xl border border-white/5 transition-all duration-300 group/item"
                    >
                        <div className="flex items-center gap-5">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${idx === 0 ? 'border-accent/40 bg-accent/10 text-accent' : 'border-white/5 bg-black/20 text-white/30'}`}>
                                {idx + 1}
                            </div>
                            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/5 p-0.5 bg-background">
                                {player.avatar ? (
                                    <img src={player.avatar} className="w-full h-full object-cover rounded-xl" />
                                ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                        {player.name.substring(0,2).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{player.name}</div>
                                <div className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">{player.activities} hoạt động</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-display font-black text-primary leading-none">{player.distance}</div>
                            <div className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">km</div>
                        </div>
                    </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Campaign Info / Rules Sidebar */}
          <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px]" />
                <h3 className="font-display font-black text-white mb-4 uppercase tracking-[0.2em] text-[10px]">Sứ mệnh chiến dịch</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                    VietSeeds Run 2026 không chỉ là một giải chạy. Đây là hành trình kết nối những tâm hồn đồng điệu, lan tỏa năng lượng tích cực và xây dựng quỹ học bổng cho các sinh viên tài năng vượt khó.
                </p>
                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold tracking-wide">
                        <span className="text-muted-foreground/70 uppercase">Bắt đầu</span>
                        <span className="text-white bg-white/5 px-2 py-1 rounded-md">01/04/2026</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold tracking-wide">
                        <span className="text-muted-foreground/70 uppercase">Kết thúc</span>
                        <span className="text-white bg-white/5 px-2 py-1 rounded-md">30/04/2026</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-[2.5rem] p-8 shadow-xl"
            >
                <h3 className="font-display font-black text-white mb-6 text-sm flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-primary" /> Tiêu chuẩn hợp lệ
                </h3>
                <ul className="space-y-4">
                    {[
                        { text: "Môn thể thao: Chạy bộ (Run)", icon: ActivityIcon },
                        { text: "Pace hợp lệ: 4:00 - 15:00 /km", icon: Zap },
                        { text: "Khoảng cách tối thiểu: 1.0 km", icon: MapPin }
                    ].map((rule, i) => (
                        <li key={i} className="flex items-center gap-4 text-xs font-semibold text-muted-foreground/70">
                            <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-primary/40">
                              <rule.icon className="h-4 w-4" />
                            </div>
                            {rule.text}
                        </li>
                    ))}
                </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const Zap = ({ className }: { className?: string }) => (
  <img 
    src="/favicon.ico" 
    alt="Logo" 
    className={className} 
    style={{ filter: "brightness(0) invert(1)" }} 
  />
);

export default Dashboard;
