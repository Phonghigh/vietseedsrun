import { motion } from "framer-motion";
import { Users, Activity as ActivityIcon, Flame, Target } from "lucide-react";

interface CommunityHeroProps {
  currentKm: number;
  targetKm: number;
  totalRunners: number;
  totalActivities: number;
}

const getStoryline = (km: number): string => {
  if (km < 300) return "Hành trình vừa bắt đầu - mỗi bước chân đều có ý nghĩa.";
  if (km < 700) return `tương đương từ TP.HCM đến Nha Trang!`;
  if (km < 1200) return `tương đương từ TP.HCM đến Đà Nẵng!`;
  if (km < 1800) return `tương đương từ TP.HCM đến Vinh!`;
  return `tương đương từ Cà Mau đến Hà Nội!`;
};

const CommunityHero = ({ currentKm, targetKm, totalRunners, totalActivities }: CommunityHeroProps) => {
  const progress = Math.min(Math.round((currentKm / targetKm) * 100), 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-[2rem] p-6 relative overflow-hidden border border-primary/10"
    >
      <div className="absolute top-0 right-0 w-64 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Total Distance - The Big One */}
        <div className="flex items-center gap-6 border-r border-border/30 pr-8 last:border-0 h-full">
           <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary-light flex-shrink-0">
             <Flame className="h-7 w-7" />
           </div>
           <div>
             <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">Tổng khoảng cách</div>
             <div className="font-display text-4xl font-black text-foreground tracking-tighter leading-none">
               {currentKm.toLocaleString()}
               <span className="text-primary text-xl ml-1">km</span>
             </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              value: totalRunners,
              label: "Runners",
              color: "text-accent",
            },
            {
              icon: ActivityIcon,
              value: totalActivities,
              label: "Hoạt động",
              color: "text-blue-400",
            },
            {
              icon: Target,
              value: `${progress}%`,
              label: "Hoàn thành",
              color: "text-purple-400",
            },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`h-3 w-3 ${stat.color} opacity-70`} />
                <span className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="font-display text-xl font-black text-foreground/90">
                {stat.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Mini progress bar on the far right */}
        <div className="w-full md:w-48 bg-muted/20 h-10 rounded-xl p-1.5 flex items-center gap-3 border border-border/20">
          <div className="flex-1 bg-background/50 h-full rounded-lg overflow-hidden flex items-center px-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-md"
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-[10px] font-black text-primary pr-2">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHero;
