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
      className="bg-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden border border-border shadow-2xl group"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/10 transition-all duration-1000" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Total Distance - The Big One */}
        <div className="flex items-center gap-8 pr-12 h-full">
           <div className="w-16 h-16 rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary shadow-inner border border-primary/10 ring-4 ring-primary/5 group-hover:scale-110 transition-transform">
             <Flame className="h-8 w-8" />
           </div>
           <div>
             <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 leading-none">Tổng khoảng cách</div>
             <div className="font-display text-5xl font-black text-foreground tracking-tighter leading-none tabular-nums italic">
               {currentKm.toLocaleString()}
               <span className="text-primary text-xl ml-2 not-italic font-black opacity-70 uppercase tracking-widest">km</span>
             </div>
           </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-16 bg-border/50" />

        {/* Stats Grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              icon: Users,
              value: totalRunners,
              label: "VẬN ĐỘNG VIÊN",
              color: "text-accent",
              bg: "bg-accent/10"
            },
            {
              icon: ActivityIcon,
              value: totalActivities,
              label: "HOẠT ĐỘNG",
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            },
            {
              icon: Target,
              value: `${progress}%`,
              label: "HOÀN THÀNH",
              color: "text-purple-500",
              bg: "bg-purple-500/10"
            },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color} shadow-sm ring-1 ring-inset ring-black/5 flex-shrink-0`}>
                   <stat.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none whitespace-nowrap">{stat.label}</span>
              </div>
              <div className="font-display text-2xl font-black text-foreground tabular-nums leading-none">
                {stat.value.toString()}
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-16 bg-border/50" />

        {/* Mini progress bar on the far right */}
        <div className="w-full md:w-72 bg-secondary rounded-2xl p-4 flex items-center gap-4 border border-border shadow-inner relative overflow-hidden group/progress">
          <div className="flex-1 h-3 bg-white rounded-full overflow-hidden border border-border/50 shadow-sm relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-primary rounded-full shadow-lg"
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ minWidth: progress > 0 ? '8px' : '0px' }}
            />
          </div>
          <div className="flex flex-col items-end">
             <span className="text-lg font-display font-black text-primary leading-none tabular-nums">{progress}%</span>
             <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">Tiến độ</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHero;
