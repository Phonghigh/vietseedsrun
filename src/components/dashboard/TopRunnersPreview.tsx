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
    <div className="glass-card rounded-[2.5rem] p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
            <Trophy className="h-6 w-6" />
          </div>
          <h2 className="font-display text-xl font-black text-foreground tracking-tight">Bảng Vàng Cá Nhân</h2>
        </div>
        <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground/80 hover:text-primary transition-colors hover:bg-transparent group" asChild>
          <Link to="/leaderboard">Xem toàn bộ <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" /></Link>
        </Button>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">Đang cập nhật...</span>
          </div>
        ) : top5.map((player, idx) => (
          <Link to={`/athlete/${player.userId || player._id || player.id}`} key={player.userId || player._id || idx} className="block">
            <motion.div
              whileHover={{ scale: 1.03, y: -2, zIndex: 10 }}
              className="flex items-center justify-between p-4 rounded-2xl border border-border/50 bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group/item cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${idx === 0 ? 'border-primary/40 bg-primary/10 text-primary' : idx < 3 ? 'border-primary/20 bg-primary/5 text-primary/60' : 'border-border/30 bg-muted/20 text-slate-500'}`}>
                  {idx + 1}
                </div>
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-md p-1 bg-secondary relative">
                  {player.avatar ? (
                    <img 
                      src={player.avatar} 
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl" 
                      onError={(e) => {
                        (e.target as any).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-xs font-black text-primary">
                      {player.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
                </div>
                <div>
                  <div className="text-sm font-black text-foreground group-hover/item:text-primary transition-colors uppercase tracking-tight leading-none mb-1 italic">{player.name}</div>
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.1em]">{player.activities} HOẠT ĐỘNG</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-display font-black text-primary leading-none tabular-nums">{player.distance.toLocaleString()}</div>
                <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mt-1 italic">km</div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopRunnersPreview;
