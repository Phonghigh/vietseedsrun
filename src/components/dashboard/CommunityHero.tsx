import { motion } from "framer-motion";
import { Users, Activity as ActivityIcon, Flame, Target } from "lucide-react";

interface CommunityHeroProps {
  currentKm: number;
  targetKm: number;
  totalRunners: number;
  totalActivities: number;
}

const getStoryline = (km: number): string => {
  if (km < 300) return "Hành trình vừa bắt đầu — mỗi bước chân đều có ý nghĩa.";
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
      className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-primary/10"
    >
      {/* Glow effects */}
      <div className="absolute top-[-40%] right-[-15%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
        >
          <Flame className="h-3 w-3" /> VietSeeds Run 2026 đang diễn ra
        </motion.div>

        {/* Big number + story */}
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10 mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-none"
            >
              {currentKm.toLocaleString()}
              <span className="text-primary text-4xl md:text-5xl ml-2">km</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground font-medium mt-3 text-sm md:text-base max-w-lg leading-relaxed"
            >
              Cộng đồng đã cùng nhau chạy{" "}
              <span className="text-foreground font-semibold">{currentKm.toLocaleString()} km</span> —{" "}
              {getStoryline(currentKm)}
            </motion.p>
          </div>

          {/* Progress ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-shrink-0 relative"
          >
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" opacity="0.3" />
              <motion.circle
                cx="60" cy="60" r="50"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - progress / 100) }}
                transition={{ duration: 2, ease: "easeOut" }}
                transform="rotate(-90 60 60)"
              />
              <text x="60" y="55" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="24" fontWeight="900" fontFamily="var(--font-display)">
                {progress}%
              </text>
              <text x="60" y="72" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="8" fontWeight="700" letterSpacing="0.1em">
                HOÀN THÀNH
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Stats row with storytelling */}
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              icon: Users,
              value: totalRunners,
              label: "runners đang cùng nhau tạo nên hành trình",
              color: "text-accent",
              bg: "bg-accent/10",
            },
            {
              icon: ActivityIcon,
              value: totalActivities,
              label: "hoạt động đã được ghi nhận",
              color: "text-blue-400",
              bg: "bg-blue-400/10",
            },
            {
              icon: Target,
              value: `${targetKm.toLocaleString()} km`,
              label: "mục tiêu chung của chiến dịch",
              color: "text-purple-400",
              bg: "bg-purple-400/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-muted/20 border border-border/30"
            >
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} flex-shrink-0`}>
                <stat.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display text-xl font-black text-foreground leading-none mb-1">
                  {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                </div>
                <div className="text-[10px] font-medium text-muted-foreground/70 leading-tight">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHero;
