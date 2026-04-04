import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity as ActivityIcon, MapPin, Clock } from "lucide-react";
import { getRecentActivities, type RecentActivity } from "@/api/activityService";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const ActivityFeed = () => {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getRecentActivities(20);
        setActivities(data);
      } catch (error) {
        console.error("Failed to fetch recent activities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
    // Optional: add polling every 30s
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-[2.5rem] p-8 shadow-xl border border-primary/10 h-full flex flex-col min-h-[600px]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-green-400/10 flex items-center justify-center text-green-400">
          <ActivityIcon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-display text-lg font-black text-foreground uppercase tracking-tight">Hoạt động trực tiếp</h3>
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Cập nhật thời gian thực từ cộng đồng</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-400/10 border border-green-400/20">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">LIVE</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-muted/30 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {activities.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border/20 hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-muted/30 border border-border/30">
                  {item.userAvatar ? (
                    <img src={item.userAvatar} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-black text-primary">
                      {item.userName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-background flex items-center justify-center">
                   <ActivityIcon className="h-3 w-3 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground/90 leading-tight">
                  <span className="group-hover:text-primary transition-colors cursor-pointer">{item.userName}</span>{" "}
                  <span className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider mx-1 italic opacity-80">vừa chạy</span>{" "}
                  <span className="text-primary font-black text-lg whitespace-nowrap">{item.distance.toLocaleString()} <span className="text-[10px]">km</span></span>
                </p>
                <div className="flex items-center gap-4 mt-1.5 grayscale-[0.5]">
                  <div className="flex items-center gap-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <MapPin className="h-3 w-3 text-primary" />
                    {item.location}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <div className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: vi })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
