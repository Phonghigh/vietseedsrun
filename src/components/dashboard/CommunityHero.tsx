import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Users, Activity as ActivityIcon, Flame, Target } from "lucide-react";
import { useRef, useState } from "react";

interface CommunityHeroProps {
  currentKm: number;
  targetKm: number;
  totalRunners: number;
  totalActivities: number;
}

const CommunityHero = ({ currentKm, targetKm, totalRunners, totalActivities }: CommunityHeroProps) => {
  const progress = Math.min(Math.round((currentKm / targetKm) * 100), 100);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for interactive liquid glass effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth out the mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="sticky top-24 z-40 w-full max-w-[1400px] mx-auto overflow-hidden border border-border/50 shadow-2xl group glass-liquid glass-floating-shadow rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-10 transition-all duration-300"
    >
      {/* Interactive Liquid Spot - Follows Mouse */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(16, 185, 129, 0.15), transparent 350px)`
          )
        }}
      />

      {/* White background - removed fading */}
      <div className="absolute inset-0 bg-white/10 z-[1]" />
      
      <div className="flex items-center justify-between relative z-10 w-full gap-6 md:gap-10">
          {/* Total Distance - The Big One */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] md:rounded-[1.5rem] bg-secondary flex items-center justify-center text-primary shadow-inner border border-primary/10 ring-4 ring-primary/5 group-hover:scale-110 transition-transform flex-shrink-0">
               <Flame className="h-6 w-6 md:h-8 md:w-8" />
             </div>
             <div className="flex flex-col min-w-0">
                <div className="text-[9px] md:text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1 leading-none">
                  Tổng KM
                </div>
               <div className="font-display text-xl md:text-5xl font-black text-foreground tracking-tighter leading-none tabular-nums italic">
                 {currentKm.toLocaleString()}
                 <span className="text-primary text-[10px] md:text-xl ml-1 not-italic font-black opacity-70 uppercase tracking-widest">km</span>
               </div>
             </div>
          </div>

          {/* Stats Grid - Fixed visibility */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-10">
            {[
              { icon: Users, value: totalRunners, label: "VẬN ĐỘNG VIÊN", color: "text-accent", bg: "bg-accent/10" },
              { icon: ActivityIcon, value: totalActivities, label: "HOẠT ĐỘNG", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Target, value: `${progress}%`, label: "HOÀN THÀNH", color: "text-purple-500", bg: "bg-purple-500/10" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center gap-2 text-center whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-md ${stat.bg} ${stat.color} shadow-sm ring-1 ring-inset ring-black/5`}>
                     <stat.icon className="h-3 w-3" />
                  </div>
                  <span className="text-[11px] font-black text-muted-foreground uppercase tracking-widest leading-none">{stat.label}</span>
                </div>
                <div className="font-display text-2xl font-black text-foreground tabular-nums leading-none">
                  {stat.value.toString()}
                </div>
              </div>
            ))}
          </div>

          {/* Mini progress bar on the far right */}
          <div className="w-24 md:w-64 bg-secondary/50 rounded-xl md:rounded-2xl p-1.5 md:p-3 flex items-center gap-2 md:gap-4 border border-border/30 shadow-inner relative overflow-hidden group/progress flex-shrink-0">
            <div className="flex-1 h-2 md:h-2.5 bg-white/50 rounded-full overflow-hidden border border-border/20 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary rounded-full shadow-lg"
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ minWidth: progress > 0 ? '4px' : '0px' }}
              />
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
               <span className="text-sm md:text-lg font-display font-black text-primary leading-none tabular-nums">{progress}%</span>
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                 Tiến độ
               </span>
            </div>
          </div>
        </div>
        
        {/* Background glow - fixed opacity */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-50" />
    </motion.div>
  );
};

export default CommunityHero;
