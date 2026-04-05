import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Flag, Trophy, Zap } from "lucide-react";

interface City {
  name: string;
  km: number;
  x: number;
  y: number;
  icon: any;
}

const CITIES: City[] = [
  { name: "Cà Mau", km: 0, x: 145, y: 470, icon: null },
  { name: "TP.HCM", km: 300, x: 155, y: 400, icon: null },
  { name: "Nha Trang", km: 700, x: 190, y: 310, icon: null },
  { name: "Đà Nẵng", km: 1200, x: 175, y: 215, icon: null },
  { name: "Huế", km: 1400, x: 165, y: 175, icon: null },
  { name: "Vinh", km: 1800, x: 160, y: 115, icon: null },
  { name: "Hà Nội", km: 2200, x: 140, y: 60, icon: null },
];

const TOTAL_JOURNEY = 2200;
const JOURNEY_PATH = "M145,470 C150,450 155,420 155,400 C160,360 185,330 190,310 C182,280 178,245 175,215 C170,200 165,190 165,175 C162,155 160,135 160,115 C155,95 148,75 140,60";

interface VietnamJourneyProps {
  currentKm: number;
}

const VietnamJourney = ({ currentKm }: VietnamJourneyProps) => {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const journeyProgress = Math.min(currentKm / TOTAL_JOURNEY, 1);
  
  const currentCity = [...CITIES].reverse().find(c => currentKm >= c.km) || CITIES[0];
  const nextCity = CITIES.find(c => c.km > currentKm) || CITIES[CITIES.length - 1];
  
  const prevKm = currentCity.km;
  const nextKm = nextCity.km;
  const segmentKm = nextKm - prevKm;
  const segmentProgress = segmentKm > 0 
    ? Math.min(((currentKm - prevKm) / segmentKm) * 100, 100) 
    : 100;
  
  const remaining = Math.max(nextKm - currentKm, 0);

  return (
    <div className="glass-card rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden flex flex-col">
      <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Header (Title + Journey Narrative) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 relative z-10 font-bold">
        <div className="max-w-3xl">
          <div className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><MapPin className="h-6 w-6" /></motion.div>
            Hành trình xuyên Việt
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.05] mb-8 uppercase italic">
            Cộng đồng đang ở <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pr-4">{currentCity.name}</span>
          </h2>
          <p className="text-foreground font-black leading-relaxed text-xl md:text-2xl max-w-3xl border-l-[6px] border-primary pl-8 py-2 italic">
            {currentKm.toLocaleString()} km đã được chinh phục - tương đương hành trình từ <span className="text-primary font-black underline decoration-primary/30 decoration-4 underline-offset-8">Cà Mau</span> đến <span className="text-primary font-black underline decoration-primary/30 decoration-4 underline-offset-8">{currentCity.name}</span>.
          </p>
        </div>

        {/* Big Progress Statistics */}
        <div className="flex-1 lg:flex-none flex items-center gap-6 bg-secondary p-8 rounded-[3rem] border border-primary/20 shadow-2xl relative overflow-hidden group min-w-0">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="flex-1 flex items-center gap-5 relative z-10">
             <motion.div 
               animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
               className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/30 shadow-xl flex-shrink-0"
             >
               <Trophy className="h-8 w-8" />
             </motion.div>
             <div className="min-w-0">
               <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Tiến độ tổng</div>
               <div className="font-display text-5xl lg:text-6xl font-black bg-gradient-to-t from-primary to-primary bg-clip-text text-transparent leading-none tabular-nums tracking-tighter">{(journeyProgress * 100).toFixed(0)}%</div>
             </div>
          </div>
          <div className="w-px h-20 bg-primary/20 relative z-10" />
          <div className="flex-1 flex items-center gap-5 relative z-10 overflow-visible">
             <motion.div 
               animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
               className="w-16 h-16 rounded-[1.5rem] bg-accent/10 flex items-center justify-center text-accent ring-2 ring-accent/30 shadow-xl flex-shrink-0"
             >
               <Flag className="h-8 w-8" />
             </motion.div>
             <div className="min-w-0">
                <div className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">Mục tiêu</div>
                 <div className="font-display text-5xl lg:text-6xl font-black text-foreground leading-none tabular-nums uppercase italic flex items-baseline gap-2 tracking-tighter">
                   {remaining.toLocaleString()} 
                   <span className="text-xs text-primary font-black not-italic opacity-70">KM</span>
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Layout (Map & Milestone details) */}
      <div className="flex flex-col lg:flex-row gap-20 items-stretch min-h-[800px]">
        {/* Left: THE MAP */}
        <div className="flex-1 bg-gradient-to-b from-secondary to-background rounded-[4.5rem] p-10 md:p-14 border border-primary/20 overflow-hidden flex items-center justify-center relative group">
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)", backgroundSize: "60px 60px" }} />
          
          <svg viewBox="40 -80 240 600" className="h-[800px] w-auto transition-all duration-1000 hover:scale-[1.02]" style={{ filter: "drop-shadow(0 0 20px rgba(16,185,129,0.1))" }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
    
            <path d={JOURNEY_PATH} fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.1" />

            <motion.path 
              d={JOURNEY_PATH} 
              fill="none" 
              stroke="url(#pathGradient)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              opacity="0.4"
              initial={{ pathLength: 0 }} 
              animate={{ pathLength: journeyProgress }} 
              transition={{ duration: 3, ease: "easeOut" }} 
            />
            
            {CITIES.map((city, i) => {
              const reached = currentKm >= city.km;
              const isHovered = hoveredCity?.name === city.name;

              return (
                <g 
                  key={city.name} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {(isHovered || city.name === nextCity.name) && (
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={30}
                      fill={city.name === nextCity.name ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: [0, 0.4, 0], scale: [0.5, 3, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <motion.g
                    initial={{ scale: 0 }} 
                    animate={{ 
                      scale: isHovered ? 1.1 : 1,
                    }} 
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <circle 
                      cx={city.x} 
                      cy={city.y} 
                      r={city.name === "TP.HCM" ? 14 : (["Hà Nội", "Cà Mau"].includes(city.name) ? 10 : 7)} 
                      fill={reached ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"} 
                      opacity={city.name === "TP.HCM" ? 1 : (["Hà Nội", "Cà Mau"].includes(city.name) ? 0.7 : 0.35)} 
                      style={{ filter: reached ? "drop-shadow(0 0 12px rgba(16,185,129,0.3))" : "none" }}
                    />
                  </motion.g>
                  
                  <text 
                    x={city.x + (city.x > 165 ? -75 : 28)} 
                    y={city.y + 5} 
                    fill="hsl(var(--foreground))" 
                    fontSize="13" 
                    className={`font-display pointer-events-none transition-all duration-300 font-medium ${isHovered || city.name === currentCity.name ? 'opacity-100' : 'opacity-70'}`}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
            
            <motion.g 
              animate={{ 
                x: [0, 1.5, -1.5, 0],
                y: [0, -2, 2, 0]
              }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <circle cx={currentCity.x} cy={currentCity.y} r={12} fill="hsl(var(--primary))" className="shadow-2xl" />
              <circle cx={currentCity.x} cy={currentCity.y} r={7} fill="white" />
              <motion.circle 
                cx={currentCity.x} cy={currentCity.y} r={18} 
                fill="none" stroke="hsl(var(--primary))" strokeWidth="2" 
                animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.8, 1] }} 
                transition={{ repeat: Infinity, duration: 3 }} 
              />
            </motion.g>

            {/* Tooltip Overlay Layer */}
            <AnimatePresence>
              {hoveredCity && (
                <motion.g 
                  key={`tooltip-${hoveredCity.name}`}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="pointer-events-none"
                >
                  <foreignObject x={hoveredCity.x - 90} y={hoveredCity.y - 100} width="180" height="100">
                    <div className="bg-white border-2 border-primary/30 rounded-2xl px-5 py-4 text-center shadow-2xl flex flex-col justify-center min-h-[85px]">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight mb-2">Khoảng cách còn lại</div>
                      <div className="text-xl font-display font-black text-foreground">
                        {Math.max(hoveredCity.km - currentKm, 0).toLocaleString()} <span className="text-xs font-bold text-primary">KM</span>
                      </div>
                    </div>
                  </foreignObject>
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>

        {/* Right: THE MILESTONE CARD */}
        <div className="w-full lg:w-[460px] flex flex-col gap-10 relative z-10">
          <div className="bg-secondary border border-primary/30 rounded-[3.5rem] p-10 flex-1 flex flex-col justify-center relative overflow-hidden group/card hover:border-primary/50 transition-all duration-700 shadow-2xl">
            <div className="absolute -top-10 -right-10 w-full h-full bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="text-center mb-12 relative flex flex-col items-center">
              <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white mb-8 transform group-hover/card:scale-110 transition-all duration-700 shadow-xl ring-4 ring-white">
                <Trophy className="h-12 w-12" />
              </div>
              <div className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">Chặng đường vinh quang</div>
              <div className="font-display text-5xl font-black text-foreground tracking-tighter leading-none mb-8 italic uppercase border-b-8 border-primary/10 pb-6">{nextCity.name}</div>
              <div className="inline-flex items-center bg-white border-2 border-primary/20 px-10 py-5 rounded-full text-3xl font-black text-primary shadow-2xl ring-4 ring-primary/5 tabular-nums">
                {nextCity.km.toLocaleString()} <span className="text-xs ml-3 text-muted-foreground uppercase tracking-widest font-black">KM</span>
              </div>
            </div>

            <div className="space-y-12 relative">
              <div className="pt-2">
                <div className="relative h-12 mb-6 font-black">
                   <div className="absolute inset-0 bg-primary/10 rounded-full ring-2 ring-primary/20 shadow-inner" />
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${segmentProgress}%` }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-yellow-400 rounded-full shadow-2xl border-r-4 border-white/50" 
                   >
                     {segmentProgress > 20 && (
                       <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-white font-black drop-shadow-md">
                         {segmentProgress.toFixed(0)}%
                       </span>
                     )}
                   </motion.div>
                </div>
                <div className="flex justify-between text-xs font-black uppercase tracking-[0.3em] px-4 italic">
                  <span className="text-primary">{currentCity.name}</span>
                  <span className="text-accent">{nextCity.name}</span>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                className="bg-white border-2 border-primary/20 rounded-[2.5rem] p-10 text-center shadow-2xl group/zap relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
                <div className="flex items-center justify-center gap-6 text-primary mb-5 relative">
                  <motion.div animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <Zap className="h-12 w-12 text-yellow-500 drop-shadow-md" />
                  </motion.div>
                  <span className="font-display text-5xl font-black tracking-tight text-foreground tabular-nums">{remaining.toLocaleString()} <span className="text-lg text-primary font-black">KM</span></span>
                </div>
                <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] relative leading-none">Đoạn đường cuối đến {nextCity.name}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer Milestones */}
      <div className="w-full mt-12 pt-12 border-t border-border/20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {CITIES.map((city, i) => {
            const reached = currentKm >= city.km;
            return (
              <div
                key={city.name}
                className={`rounded-[1.5rem] p-6 border text-center transition-all duration-500 relative overflow-hidden group ${
                  reached
                    ? "border-primary/30 bg-primary/5 text-primary shadow-lg"
                    : "border-border/50 bg-secondary/40 text-muted-foreground"
                }`}
              >
                 <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-xs font-black transition-all ${
                   reached ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20" : "bg-muted text-muted-foreground shadow-inner"
                 }`}>
                   {i + 1}
                 </div>
                 <div className="text-[11px] font-black uppercase tracking-[0.15em] truncate mb-1 italic">{city.name}</div>
                 <div className={`text-base font-display font-black tabular-nums ${reached ? "text-primary" : "text-foreground/40"}`}>
                   {city.km.toLocaleString()} <span className="text-[10px] ml-1 opacity-60">KM</span>
                 </div>
                 {reached ? (
                   <div className="text-[9px] font-black mt-3 text-primary tracking-[0.2em] bg-white px-2 py-0.5 rounded-full border border-primary/20 shadow-sm">XONG ✓</div>
                 ) : (
                   <div className="text-[9px] font-black mt-3 text-muted-foreground/30 tracking-[0.2em] uppercase">Đang đợi</div>
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
