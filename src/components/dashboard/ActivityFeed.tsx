import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity as ActivityIcon, MapPin, Clock } from "lucide-react";
import { getRecentActivities, type RecentActivity } from "@/api/activityService";
import { MOCK_RECENT_ACTIVITIES } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const ActivityFeed = () => {
  const [activities, setActivities] = useState<RecentActivity[]>(MOCK_RECENT_ACTIVITIES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getRecentActivities(20);
        if (data && data.length > 0) {
          setActivities(data);
        }
      } catch (error) {
        console.warn("Using fallback activity data");
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-border/50 h-full flex flex-col min-h-[600px]">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <ActivityIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-black text-foreground tracking-tight">Hoạt động gần đây</h3>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">Cập nhật từ cộng đồng</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">LIVE</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {activities.map((item, i) => (
          <Link to={`/athlete/${item.userId || item.id}`} key={item.id} className="block">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="group flex items-center gap-4 p-4 rounded-2xl border border-border/30 hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary border border-border">
                  {item.userAvatar ? (
                    <img 
                      src={item.userAvatar} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                      alt="" 
                      onError={(e) => {
                        (e.target as any).src = `https://ui-avatars.com/api/?name=${item.userName}&background=random`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold text-primary">
                      {item.userName.substring(0, 2)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {item.userName}
                  </span>
                  <span className="text-lg font-display font-black text-primary whitespace-nowrap tabular-nums">
                    {item.distance.toLocaleString()} <span className="text-[10px] font-bold">km</span>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1 ml-auto whitespace-nowrap">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: vi })}
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
