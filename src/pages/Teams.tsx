import { motion } from "framer-motion";
import { Users, Plus, Copy, Trophy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { useMyProfile } from "@/hooks/useUser";
import { useTeamLeaderboard } from "@/hooks/useLeaderboard";

const Teams = () => {
  const { data: user, isLoading: isUserLoading } = useMyProfile();
  const { data: teams, isLoading: isTeamsLoading } = useTeamLeaderboard();

  const myTeam = teams?.find(t => t.name === user?.teamName);

  if (isUserLoading || isTeamsLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Đang tải thông tin đội...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
                {user?.teamName || "Chưa gia nhập đội"}
            </h1>
            <p className="text-muted-foreground text-sm">
                Bảng điều khiển đội nhóm — {myTeam?.members || 0} thành viên
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-1" /> Link mời
            </Button>
            <Button size="sm" className="gradient-hero border-0 text-primary-foreground">
              <Plus className="h-4 w-4 mr-1" /> Tạo Đội
            </Button>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Tổng quãng đường", value: `${myTeam?.distance || 0} km`, icon: Trophy },
            { label: "Hạng của Đội", value: `#${myTeam?.rank || "--"}`, icon: Trophy },
            { label: "Thành viên", value: myTeam?.members || 0, icon: Users },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-xl p-5 text-center stat-glow"
            >
              <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Member List - Placeholder since API doesn't have it yet */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> Thành viên
            </h2>
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                    Tính năng xem chi tiết thành viên đội đang được phát triển.
                </p>
            </div>
          </motion.div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-6"
          >
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Thông tin đội nhóm</h2>
            <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border/50 bg-muted/10 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tên Đội:</span>
                        <span className="font-bold">{user?.teamName || "--"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Xếp hạng:</span>
                        <span className="font-bold">#{myTeam?.rank || "--"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Thành tích:</span>
                        <span className="font-bold text-primary">{myTeam?.distance || 0} km</span>
                    </div>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Thành tích của đội là tổng quãng đường hợp lệ của tất cả thành viên. Hãy khuyến khích đồng đội của bạn chạy đều đặn mỗi ngày!
                </p>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Teams;
