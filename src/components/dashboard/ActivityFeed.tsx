import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-[2.5rem] p-10 shadow-2xl border border-primary/20 h-full flex flex-col min-h-[700px]">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
          <ActivityIcon className="h-7 w-7" />
        </div>
        <div>
          <h3 className="font-display text-xl font-black text-foreground uppercase tracking-tight">Hoạt động trực tiếp</h3>
          <p className="text-[13px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1">Cập nhật thời gian thực từ cộng đồng</p>
        </div>
        <div className="ml-auto flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-black text-primary uppercase tracking-[0.15em]">LIVE</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 rounded-[2rem] bg-muted/20 animate-pulse border border-border/50" />
          ))}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar space-y-5">
          {activities.map((item, i) => (
            <Link to={`/athlete/${item.userId || item.id}`} key={item.id} className="block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-center gap-6 p-6 rounded-[2rem] border border-border/30 hover:border-primary/40 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer"
              >
              <div className="relative">
                <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden flex-shrink-0 bg-secondary border-2 border-white shadow-md ring-1 ring-primary/5">
                  {item.userAvatar ? (
                    <img 
                      src={item.userAvatar} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt="" 
                      onError={(e) => {
                        (e.target as any).src = `https://ui-avatars.com/api/?name=${item.userName}&background=random`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-black text-primary uppercase">
                      {item.userName.substring(0, 2)}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary border-4 border-white flex items-center justify-center shadow-lg">
                   <ActivityIcon className="h-3 w-3 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-[17px] font-black text-foreground group-hover:text-primary transition-colors truncate tracking-tight uppercase italic leading-none">
                      {item.userName}
                    </div>
                    <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest mt-1">Việt Nam • Đã hoàn thành</div>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="text-2xl font-display font-black text-primary whitespace-nowrap leading-none tabular-nums">
                      {item.distance.toLocaleString()} <span className="text-xs uppercase tracking-widest">km</span>
                    </div>
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">QUÃNG ĐƯỜNG</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-3 border-t border-border/20">
                  <div className="flex items-center gap-2 text-[13px] font-bold text-foreground/70">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] font-bold text-muted-foreground ml-auto">
                    <Clock className="h-4 w-4 text-primary/60" />
                    <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: vi })}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    )}
    </div>
  );
};

export default ActivityFeed;
