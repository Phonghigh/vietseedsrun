import { motion } from "framer-motion";
import { Activity as ActivityIcon } from "lucide-react";
import type { LeaderboardUser } from "@/api/leaderboardService";

interface ActivityFeedProps {
  runners: LeaderboardUser[];
  isLoading: boolean;
}

const ActivityFeed = ({ runners, isLoading }: ActivityFeedProps) => {
  // Derive "feed" from leaderboard — simulate recent activities
  const feedItems = runners.slice(0, 8).map((r, i) => ({
    id: r._id || r.userId || String(i),
    name: r.name,
    avatar: r.avatar,
    distance: r.distance,
    activities: r.activities,
  }));

  return (
    <div className="glass-card rounded-[2.5rem] p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center text-green-400">
          <ActivityIcon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-sm font-black text-foreground">Hoạt động gần đây</h3>
          <p className="text-[10px] text-muted-foreground/60 font-medium">Cập nhật từ cộng đồng</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-bold text-green-400/70 uppercase tracking-wider">Live</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {feedItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/20 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-muted/30">
                {item.avatar ? (
                  <img src={item.avatar} className="w-full h-full object-cover" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-primary">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground/90 truncate">
                  <span className="text-foreground font-bold">{item.name}</span>{" "}
                  <span className="text-muted-foreground">đã chạy</span>{" "}
                  <span className="text-primary font-bold">{item.distance} km</span>
                </p>
                <p className="text-[10px] text-muted-foreground/50">{item.activities} hoạt động trong chiến dịch</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
