import { motion } from "framer-motion";
import { Users, Trophy, Loader2, Star, TrendingUp } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useTeamLeaderboard } from "@/hooks/useLeaderboard";

const Teams = () => {
  const { data: teamsData, isLoading: isTeamsLoading } = useTeamLeaderboard(1, 50);

  if (isTeamsLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-medium">Đang tải danh sách đội nhóm...</p>
        </div>
      </AppLayout>
    );
  }

  // Filter out "No Team" as requested
  const teams = teamsData?.filter(t => t.name !== "No Team") || [];

  const totalTeams = teams.length;

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-4xl font-black text-foreground tracking-tight">Bảng Vàng Đội Nhóm</h1>
            <p className="text-muted-foreground font-medium mt-1">Sức mạnh tập thể kiến tạo những bước chân hy vọng</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent/10 border border-accent/20">
             <Trophy className="h-4 w-4 text-accent" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{totalTeams} Đội tham gia</span>
          </div>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, idx) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="glass-card rounded-[2.5rem] p-8 hover:translate-y-[-6px] transition-all duration-300 relative overflow-hidden group shadow-xl"
            >
              {/* Rank Badge */}
              <div className={`absolute top-6 right-8 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 ${idx < 3 ? 'border-accent/40 bg-accent/10 text-accent' : 'border-black/5 bg-slate-100/50 text-slate-400'}`}>
                {idx + 1}
              </div>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-[2rem] gradient-hero p-1 shadow-lg group-hover:rotate-6 transition-transform duration-500">
                  <div className="w-full h-full bg-background rounded-[1.8rem] flex items-center justify-center overflow-hidden">
                    {team.avatar ? (
                      <span className="text-3xl uppercase font-black text-primary">{team.avatar}</span>
                    ) : (
                      <Users className="h-10 w-10 text-primary/40" />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-xl font-black text-foreground group-hover:text-primary transition-colors">{team.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Star className="h-3 w-3 text-accent" />
                    <span className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em]">{team.memberCount} thành viên</span>
                  </div>
                </div>

                <div className="w-full pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest mb-1">Quãng đường</div>
                    <div className="font-display font-black text-foreground">{team.totalDistance?.toFixed(1) || 0} <span className="text-[8px] text-muted-foreground ml-0.5">km</span></div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest mb-1">Xếp hạng</div>
                    <div className="font-display font-black text-foreground">#{idx + 1}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {totalTeams === 0 && (
          <div className="py-40 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <Users className="h-10 w-10 text-muted-foreground/20" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-foreground">Chưa có đội nhóm nào</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">Danh sách đội nhóm sẽ được cập nhật liên tục dựa trên dữ liệu từ cộng đồng.</p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Teams;
