import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Flag, Trophy, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface City {
  name: string;
  km: number;
  x: number;
  y: number;
}

const CITIES: City[] = [
  { name: "Cà Mau", km: 0, x: 145, y: 470 },
  { name: "TP.HCM", km: 300, x: 155, y: 400 },
  { name: "Nha Trang", km: 700, x: 190, y: 310 },
  { name: "Đà Nẵng", km: 1200, x: 175, y: 220 },
  { name: "Huế", km: 1400, x: 165, y: 195 },
  { name: "Vinh", km: 1800, x: 160, y: 145 },
  { name: "Hà Nội", km: 2200, x: 140, y: 90 },
];

const TOTAL_JOURNEY = 2200;
const JOURNEY_PATH = "M145,470 C150,450 155,420 155,400 C160,370 180,340 190,310 C185,280 178,250 175,220 C170,210 165,200 165,195 C162,175 160,160 160,145 C155,125 148,105 140,90";

interface VietnamJourneyProps {
  currentKm: number;
}

const VietnamJourney = ({ currentKm }: VietnamJourneyProps) => {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const journeyProgress = Math.min(currentKm / TOTAL_JOURNEY, 1);
  
  // City-to-city progress logic
  const currentCity = [...CITIES].reverse().find(c => currentKm >= c.km) || CITIES[0];
  const nextCity = CITIES.find(c => c.km > currentKm) || CITIES[CITIES.length - 1];
  
  // Segment progress: from currentCity to nextCity
  const prevKm = currentCity.km;
  const nextKm = nextCity.km;
  const segmentKm = nextKm - prevKm;
  const segmentProgress = segmentKm > 0 
    ? Math.min(((currentKm - prevKm) / segmentKm) * 100, 100) 
    : 100;
  
  const remaining = Math.max(nextKm - currentKm, 0);

  return (
    <div className="glass-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Header (Title + Journey Narrative) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 relative z-10 font-light">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-400 mb-4 flex items-center gap-3">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><MapPin className="h-4 w-4" /></motion.div>
            Hành trình xuyên Việt
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black text-foreground tracking-tight leading-[1.1]">
            Cộng đồng đang ở <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{currentCity.name}</span>
          </h2>
          <p className="text-muted-foreground font-medium mt-6 leading-relaxed text-lg max-w-2xl border-l-2 border-primary/20 pl-6">
            {currentKm.toLocaleString()} km đã được chinh phục — tương đương hành trình từ <span className="text-emerald-400 font-semibold">Cà Mau</span> đến <span className="text-emerald-400 font-semibold">{currentCity.name}</span>.
          </p>
        </div>

        {/* Big Progress Statistics */}
        <div className="flex items-center gap-10 bg-gradient-to-br from-muted/20 to-primary/5 p-10 rounded-[3rem] border border-white/5 shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="text-right relative z-10">
            <div className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest mb-2">Tiến độ tổng</div>
            <div className="font-display text-7xl font-black bg-gradient-to-t from-primary to-primary-light bg-clip-text text-transparent leading-none">{(journeyProgress * 100).toFixed(0)}%</div>
          </div>
          <div className="w-px h-20 bg-white/10 relative z-10" />
          <div className="flex items-center gap-6 relative z-10">
             <motion.div 
               animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
               className="w-16 h-16 rounded-[1.5rem] bg-accent/20 flex items-center justify-center text-accent ring-1 ring-accent/30 shadow-[0_0_30px_rgba(255,107,53,0.3)]"
             >
               <Flag className="h-8 w-8" />
             </motion.div>
             <div>
                <div className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest mb-1">Mục tiêu {nextCity.name}</div>
                <div className="text-2xl font-display font-black text-foreground leading-none">Còn {remaining.toLocaleString()} <span className="text-sm text-cyan-400/70">km</span></div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Layout (Map & Milestone details) */}
      <div className="flex flex-col lg:flex-row gap-16 items-stretch min-h-[700px]">
        {/* Left: THE MAP (Pushed to the left) */}
        <div className="flex-1 bg-gradient-to-b from-muted/5 to-primary/2 rounded-[4rem] p-16 border border-white/5 overflow-hidden flex items-center justify-center relative group">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--border)) 1px, transparent 0)", backgroundSize: "60px 60px" }} />
          
          {/* Neon background blobs */}
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

          <svg viewBox="40 50 220 460" className="h-[650px] w-auto transition-all duration-1000 hover:scale-[1.03]" style={{ filter: "drop-shadow(0 0 50px rgba(16,185,129,0.1))" }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            <path d={JOURNEY_PATH} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeDasharray="6 6" opacity="0.1" />
            <motion.path 
              d={JOURNEY_PATH} 
              fill="none" 
              stroke="url(#pathGradient)" 
              strokeWidth="6" 
              strokeLinecap="round" 
              initial={{ pathLength: 0 }} 
              animate={{ pathLength: journeyProgress }} 
              transition={{ duration: 3, ease: "easeOut" }} 
            />
            
            {CITIES.map((city, i) => {
              const reached = currentKm >= city.km;
              const isHovered = hoveredCity?.name === city.name;
              const cityRemaining = Math.max(city.km - currentKm, 0);

              return (
                <g 
                  key={city.name} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {/* Pulse Effect for hovered/next city */}
                  {(isHovered || city.name === nextCity.name) && (
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={24}
                      fill={city.name === nextCity.name ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 0.3, 0], scale: [0.5, 2.5, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <motion.circle 
                    cx={city.x} 
                    cy={city.y} 
                    r={reached || isHovered ? (isHovered ? 10 : 8) : 4} 
                    fill={reached ? (isHovered ? "hsl(var(--accent))" : "hsl(var(--primary))") : "hsl(var(--muted-foreground))"} 
                    opacity={reached || isHovered ? 1 : 0.2} 
                    initial={{ scale: 0 }} 
                    animate={{ 
                      scale: isHovered ? 1.4 : 1,
                      fill: isHovered ? "white" : (reached ? (city.name === nextCity.name ? "hsl(var(--accent))" : "hsl(var(--primary))") : "hsl(var(--muted-foreground))")
                    }} 
                    transition={{ delay: 0.5 + i * 0.1 }} 
                    style={{ filter: reached ? "drop-shadow(0 0 10px rgba(16,185,129,0.5))" : "none" }}
                  />
                  
                  <text 
                    x={city.x + (city.x > 160 ? -55 : 15)} 
                    y={city.y + 4} 
                    fill={reached || isHovered ? "white" : "hsl(var(--muted-foreground))"} 
                    fontSize={isHovered ? "13" : "11"} 
                    fontWeight={isHovered ? "900" : (reached ? "800" : "500")} 
                    opacity={reached || isHovered ? 1 : 0.3} 
                    className="font-display tracking-tight pointer-events-none transition-all duration-300"
                  >
                    {city.name}
                  </text>

                  {/* Tooltip Popup */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="pointer-events-none">
                        <foreignObject x={city.x - 70} y={city.y - 85} width="140" height="75">
                          <div className="bg-gradient-to-br from-primary to-accent p-[1px] rounded-2xl shadow-[0_0_30px_rgba(255,107,53,0.4)]">
                            <div className="bg-background rounded-[15px] px-4 py-3 text-center">
                              <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">CÒN LẠI</div>
                              <div className="text-lg font-display font-black text-foreground underline decoration-primary decoration-4">
                                {cityRemaining.toLocaleString()} <span className="text-[10px] font-bold text-primary">km</span>
                              </div>
                            </div>
                            <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-accent" />
                          </div>
                        </foreignObject>
                      </motion.g>
                    )}
                  </AnimatePresence>
                </g>
              );
            })}
            
            {/* Animated Runner Indicator (Avatar-like) */}
            <motion.g 
              animate={{ 
                x: [0, 2, -2, 0],
                y: [0, -3, 3, 0]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <circle cx={currentCity.x} cy={currentCity.y} r={14} fill="white" className="shadow-2xl" />
              <circle cx={currentCity.x} cy={currentCity.y} r={10} fill="hsl(var(--primary))" />
              <motion.circle 
                cx={currentCity.x} cy={currentCity.y} r={20} 
                fill="none" stroke="hsl(var(--primary))" strokeWidth="2" 
                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.5, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }} 
              />
            </motion.g>
          </svg>
        </div>

        {/* Right: THE MILESTONE CARD (Rainbow Theme) */}
        <div className="w-full lg:w-[480px] flex flex-col gap-10 relative z-10">
          <div className="bg-gradient-to-tr from-muted/20 via-primary/5 to-accent/5 border border-white/10 rounded-[3.5rem] p-12 flex-1 flex flex-col justify-center relative overflow-hidden group/card hover:border-primary/40 transition-all duration-700 shadow-2xl">
            <div className="absolute -top-10 -right-10 w-[350px] h-[350px] bg-accent/20 rounded-full blur-[120px] group-hover/card:bg-accent/30 transition-all duration-1000" />
            <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[120px] group-hover/card:bg-primary/30 transition-all duration-1000" />

            <div className="text-center mb-12 relative flex flex-col items-center">
              <div className="w-28 h-28 rounded-[2.8rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-8 transform group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-700 shadow-[0_0_50px_rgba(255,107,53,0.5)] ring-4 ring-white/10">
                <Trophy className="h-12 w-12" />
              </div>
              <div className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em] mb-4 drop-shadow-sm">Chặng đường vinh quang</div>
              <div className="font-display text-6xl font-black text-foreground tracking-tighter leading-none mb-6 drop-shadow-xl">{nextCity.name}</div>
              <div className="inline-flex items-center bg-white/5 border border-white/20 px-8 py-3 rounded-full text-2xl font-black text-primary shadow-2xl backdrop-blur-md">
                {nextCity.km.toLocaleString()} <span className="text-sm ml-2 text-muted-foreground uppercase tracking-widest">km</span>
              </div>
            </div>

            <div className="space-y-12 relative">
              <div>
                <div className="relative h-8 mb-6">
                   <div className="absolute inset-0 bg-white/5 rounded-full ring-1 ring-white/10" />
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${segmentProgress}%` }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-yellow-400 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                   />
                </div>
                <div className="flex justify-between text-xs font-black text-muted-foreground uppercase tracking-[0.3em] px-2 italic">
                  <span className="text-emerald-400 font-black">{currentCity.name}</span>
                  <span className="text-accent font-black">{nextCity.name}</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[3rem] p-10 text-center shadow-3xl backdrop-blur-3xl group/zap relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover/zap:opacity-100 transition-opacity duration-700" />
                <div className="flex items-center justify-center gap-5 text-primary mb-4 relative">
                  <motion.div animate={{ scale: [1, 1.5, 1], rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <Zap className="h-10 w-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
                  </motion.div>
                  <span className="font-display text-5xl font-black tracking-tight text-white">{remaining.toLocaleString()} <span className="text-lg text-primary">km</span></span>
                </div>
                <p className="text-xs font-bold text-muted-foreground/80 uppercase tracking-[0.25em] relative">Đoạn đường cuối để chạm {nextCity.name}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer Milestones (Restore from image) */}
      <div className="w-full mt-12 pt-12 border-t border-border/10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {CITIES.map((city, i) => {
            const reached = currentKm >= city.km;
            return (
              <div
                key={city.name}
                className={`rounded-[1.5rem] p-5 border text-center transition-all duration-500 relative overflow-hidden group ${
                  reached
                    ? "border-primary/20 bg-primary/5 text-primary"
                    : "border-border/10 bg-muted/5 text-muted-foreground/30"
                }`}
              >
                 {reached && (
                   <motion.div
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10"
                   />
                 )}
                 <div className={`w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center text-xs font-black transition-all ${
                   reached ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground/20"
                 }`}>
                   {i + 1}
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-[0.15em] truncate mb-1">{city.name}</div>
                 <div className={`text-sm font-display font-black ${reached ? "text-primary" : "text-muted-foreground/20"}`}>
                   {city.km.toLocaleString()} <span className="text-[10px]">km</span>
                 </div>
                 {reached ? (
                   <div className="text-[8px] font-black mt-2 text-primary tracking-widest opacity-60">CHINH PHỤC ✓</div>
                 ) : (
                   <div className="text-[8px] font-black mt-2 text-muted-foreground/10 tracking-widest uppercase">Chờ...</div>
                 )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VietnamJourney;
