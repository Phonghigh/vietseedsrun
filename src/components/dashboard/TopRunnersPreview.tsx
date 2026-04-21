import { motion } from "framer-motion";
import { Trophy, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { LeaderboardUser } from "@/api/leaderboardService";

interface TopRunnersPreviewProps {
  runners: LeaderboardUser[];
  isLoading: boolean;
}

const TopRunnersPreview = ({ runners, isLoading }: TopRunnersPreviewProps) => {
  const top5 = (Array.isArray(runners) ? runners : []).slice(0, 5);

  return (
    <div className="glass-card rounded-[2.5rem] p-5 md:p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
            <Trophy className="h-5 w-5 md:h-6 md:w-6" />
          </div>
          <h2 className="font-display text-base md:text-xl font-black text-foreground tracking-tight">Bảng Vàng Cá Nhân</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-[10px] md:text-xs font-bold text-muted-foreground/80 hover:text-primary transition-colors hover:bg-transparent group" asChild>
          <Link to="/leaderboard" className="flex items-center gap-1">
            <span className="hidden sm:inline">Xem toàn bộ</span>
            <span className="sm:hidden">Tất cả</span>
            <ChevronRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <div className="space-y-2 md:space-y-3">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Đang cập nhật...</span>
          </div>
        ) : top5.map((player, idx) => (
          <Link to={`/athlete/${player.userId || player._id || player.id}`} key={player.userId || player._id || idx} className="block">
            <motion.div
              whileHover={{ scale: 1.02, y: -2, zIndex: 10 }}
              className="flex items-center justify-between p-2 md:p-4 rounded-xl md:rounded-2xl border border-border/50 bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group/item cursor-pointer"
            >
              <div className="flex items-center gap-2 md:gap-5 min-w-0">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black text-[10px] md:text-sm border flex-shrink-0 ${idx === 0 ? 'border-primary/40 bg-primary/10 text-primary' : idx < 3 ? 'border-primary/20 bg-primary/5 text-primary/60' : 'border-border/30 bg-muted/20 text-slate-500'}`}>
                  {idx + 1}
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-2xl overflow-hidden border border-border shadow-sm bg-secondary relative flex-shrink-0">
                  {player.avatar ? (
                    <img 
                      src={player.avatar} 
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-md md:rounded-xl" 
                      onError={(e) => {
                        (e.target as any).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-[8px] md:text-xs font-black text-primary">
                      {player.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] sm:text-xs md:text-sm font-black text-foreground group-hover/item:text-primary transition-colors uppercase tracking-tight leading-tight mb-0.5 md:mb-1 italic md:whitespace-normal">{player.name}</div>
                  <div className="text-[7px] md:text-[10px] font-black text-muted-foreground uppercase tracking-[0.1em]">{player.activities} HOẠT ĐỘNG</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div className="text-base md:text-xl font-display font-black text-primary leading-none tabular-nums">{player.distance.toLocaleString()}</div>
                <div className="text-[7px] md:text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-0.5 md:mt-1 italic">km</div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRunnersPreview;
