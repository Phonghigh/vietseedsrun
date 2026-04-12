import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Flag, Trophy, Zap } from "lucide-react";

interface City {
  name: string;
  km: number;
  x: number;
  y: number;
  image: string;
}

const CITIES: City[] = [
  { name: "Cà Mau", km: 0, x: 145, y: 564, image: "/images/Ca_Mau.jpg" },
  { name: "TP.HCM", km: 300, x: 155, y: 480, image: "/images/HCM.jpg" },
  { name: "Nha Trang", km: 700, x: 190, y: 372, image: "/images/nha_trang.webp" },
  { name: "Đà Nẵng", km: 1200, x: 175, y: 258, image: "/images/Da_Nang.jpeg" },
  { name: "Huế", km: 1400, x: 165, y: 210, image: "/images/hue.jpg" },
  { name: "Vinh", km: 1800, x: 160, y: 138, image: "/images/Nghe_An.webp" },
  { name: "Hà Nội", km: 2200, x: 140, y: 72, image: "/images/Ha_Noi.jpg" },
];

const TOTAL_JOURNEY = 2200;
const JOURNEY_PATH = "M145,564 C150,540 155,504 155,480 C160,432 185,396 190,372 C182,336 178,294 175,258 C170,240 165,228 165,210 C162,186 160,162 160,138 C155,114 148,90 140,72";

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
  
  const remaining = Math.round(Math.max(nextKm - currentKm, 0));

  return (
    <div className="relative w-full">
      <div className="glass-card rounded-[3rem] p-10 md:p-14 shadow-2xl relative flex flex-col min-h-[900px]">
        <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* 2. Header (Title + Journey Narrative) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-28 relative z-10 font-bold">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <MapPin className="h-6 w-6" />
              </motion.div>
              Hành trình xuyên Việt
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.15] mb-8 italic">
              <span className="block leading-[1.1]">Cộng đồng đang ở</span>
              <span className="block leading-[1.1] mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {currentCity.name}
              </span>
            </h2>
            <p className="text-foreground font-black leading-relaxed text-xl md:text-2xl max-w-3xl border-l-[6px] border-primary pl-8 py-2 italic">
              {Math.round(currentKm).toLocaleString()} km đã được chinh phục -
              tương đương hành trình từ{" "}
              <span className="text-primary font-black underline decoration-primary/30 decoration-4 underline-offset-8">
                Cà Mau
              </span>{" "}
              đến{" "}
              <span className="text-primary font-black underline decoration-primary/30 decoration-4 underline-offset-8">
                {currentCity.name}
              </span>
              .
            </p>
          </div>

          {/* Big Progress Statistics */}
          <div className="flex-1 lg:flex-none flex items-center gap-6 bg-secondary p-8 rounded-[3rem] border border-primary/20 shadow-2xl relative overflow-hidden group min-w-0">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="flex-1 flex items-center gap-5 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1], y: [0, -3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary ring-2 ring-primary/30 shadow-xl flex-shrink-0"
              >
                <Trophy className="h-8 w-8" />
              </motion.div>
              <div className="min-w-0">
                <div className="text-xs font-black text-muted-foreground text-center tracking-widest mb-2">
                  Tiến độ tổng
                </div>
                <div className="font-display text-5xl lg:text-6xl font-black bg-gradient-to-t from-primary to-primary bg-clip-text text-transparent leading-none tabular-nums tracking-tighter">
                  {(journeyProgress * 100).toFixed(0)}%
                </div>
              </div>
            </div>
            <div className="w-px h-20 bg-primary/20 relative z-10" />
            <div className="flex-1 flex items-center gap-5 relative z-10 overflow-visible">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="w-16 h-16 rounded-[1.5rem] bg-accent/10 flex items-center justify-center text-accent ring-2 ring-accent/30 shadow-xl flex-shrink-0"
              >
                <Flag className="h-8 w-8" />
              </motion.div>
              <div className="min-w-0">
                <div className="text-xs font-black text-muted-foreground text-center tracking-widest mb-2">
                  Mục tiêu
                </div>
                <div className="font-display text-5xl lg:text-6xl font-black text-foreground leading-none tabular-nums uppercase italic flex items-baseline gap-2 tracking-tighter">
                  {remaining.toLocaleString()}
                  <span className="text-xs text-primary font-black not-italic opacity-70">
                    KM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main 2-Column Layout (Map & Milestone details) */}
        <div className="flex flex-col lg:flex-row gap-28 items-stretch min-h-[900px]">
          {/* Left: THE MAP */}
          <div className="flex-1 bg-gradient-to-b from-secondary to-background rounded-[4.5rem] p-10 md:p-14 border border-primary/20 flex items-center justify-center relative group z-20">
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
                backgroundSize: "60px 60px",
              }}
            />

            <svg
              viewBox="-130 -40 600 680"
              className="h-[800px] w-auto transition-all duration-1000 hover:scale-[1.02] overflow-visible"
              style={{ filter: "drop-shadow(0 0 20px rgba(16,185,129,0.1))" }}
            >
              <defs>
                <linearGradient
                  id="pathGradient"
                  x1="0%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>

              <path
                d={JOURNEY_PATH}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                opacity="0.1"
              />

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
                        fill={
                          city.name === nextCity.name
                            ? "hsl(var(--accent))"
                            : "hsl(var(--primary))"
                        }
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0, 0.4, 0], scale: [0.5, 3, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    <g className="cursor-pointer font-bold">
                      {/* Ring/Glow for Current City - Separate from scaling image to stay stable */}
                      {city.name === currentCity.name && (
                        <circle
                          cx={city.x}
                          cy={city.y}
                          r={22}
                          fill="hsl(var(--primary))"
                          opacity="0.15"
                        />
                      )}

                      <foreignObject
                        x={city.x - 20}
                        y={city.y - 20}
                        width="40"
                        height="40"
                        className="overflow-visible"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <motion.div
                            animate={{
                              scale:
                                isHovered || city.name === currentCity.name
                                  ? 1.2
                                  : 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                            className={`w-7 h-7 rounded-full overflow-hidden border-2 shadow-sm transition-all duration-500 ${
                              reached
                                ? "border-primary grayscale-0 shadow-primary/20"
                                : "border-white/80 opacity-60 grayscale"
                            } ${city.name === currentCity.name ? "ring-2 ring-primary/40 p-[1px] bg-white" : ""}`}
                          >
                            <img
                              src={city.image}
                              alt={city.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        </div>
                      </foreignObject>
                    </g>

                    <text
                      x={city.x + (city.x > 165 ? -70 : 22)}
                      y={city.y + 4}
                      fill="hsl(var(--foreground))"
                      fontSize="11"
                      className={`font-display pointer-events-none transition-all duration-300 font-bold tracking-tight ${isHovered || city.name === currentCity.name ? "opacity-100" : "opacity-40"}`}
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}

              <motion.circle
                cx={currentCity.x}
                cy={currentCity.y}
                r={32}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                animate={{ opacity: [0.4, 0, 0.4], scale: [1, 1.5, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />

              {/* Tooltip Overlay Layer - Now inside SVG for perfect stability */}
              <foreignObject
                x={-130}
                y={-40}
                width="600"
                height="680"
                className="pointer-events-none overflow-visible"
              >
                <div className="w-full h-full relative">
                  <AnimatePresence mode="wait">
                    {hoveredCity && (
                      <motion.div
                        key={`tooltip-overlay-v2-${hoveredCity.name}`}
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        transition={{
                          type: "spring",
                          damping: 25,
                          stiffness: 350,
                        }}
                        className="absolute z-[999]"
                        style={{
                          left: `${((hoveredCity.x + 130) / 600) * 100}%`,
                          top: `${((hoveredCity.y + 40) / 680) * 100}%`,
                          // Positioning: If x < 155 (North), pop RIGHT. If x >= 155, pop LEFT.
                          transform: `translate(${hoveredCity.x < 155 ? "30px" : "-370px"}, -50%)`,
                        }}
                      >
                        <div className="bg-white/95 backdrop-blur-3xl border-2 border-emerald-100/50 rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.45)] flex items-stretch overflow-hidden ring-1 ring-black/5 w-max max-w-[340px] min-h-[160px] pointer-events-auto">
                          {/* Image Section */}
                          <div className="w-[140px] sm:w-[160px] relative flex-shrink-0">
                            <img
                              src={hoveredCity.image}
                              alt={hoveredCity.name}
                              className="absolute inset-0 w-full h-full object-cover scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-60" />
                          </div>

                          {/* Text Section */}
                          <div className="flex-1 flex flex-col justify-center py-10 px-10 bg-white/40 min-w-[160px]">
                            <div className="text-[20px] font-black text-slate-900 tracking-tighter leading-none mb-4">
                              {hoveredCity.name}
                            </div>
                            <div className="space-y-3">
                              <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] leading-none mb-1">
                                {Math.max(
                                  hoveredCity.km - currentKm,
                                  0,
                                ).toLocaleString()}{" "}
                                km
                              </div>
                              {/* <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] leading-none opacity-80">
                              CÒN LẠI ĐẾN ĐÍCH
                            </div> */}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </foreignObject>
            </svg>
          </div>

          {/* Right: THE MILESTONE CARD */}
          <div className="w-full lg:w-[460px] flex flex-col gap-10 relative z-10">
            <div className="bg-secondary border border-primary/30 rounded-[3.5rem] p-10 flex-1 flex flex-col justify-center relative overflow-hidden group/card hover:border-primary/50 transition-all duration-700 shadow-2xl">
              <div className="absolute -top-10 -right-10 w-full h-full bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

              <div className="text-center mb-12 relative flex flex-col items-center">
                <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden mb-8 transform group-hover/card:scale-110 transition-all duration-700 shadow-xl ring-4 ring-white">
                  <img
                    src={nextCity.image}
                    alt={nextCity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs font-black text-primary uppercase tracking-[0.4em] mb-4">
                  Chặng đường vinh quang
                </div>
                <div className="font-display text-5xl font-black text-foreground tracking-tighter leading-none mb-8 italic uppercase border-b-8 border-primary/10 pb-6">
                  {nextCity.name}
                </div>
                <div className="inline-flex items-baseline bg-white border-2 border-primary/20 px-10 py-5 rounded-full text-3xl font-black text-primary shadow-2xl ring-4 ring-primary/5 tabular-nums">
                  {nextCity.km.toLocaleString()}{" "}
                  <span className="text-xs text-primary font-black not-italic opacity-70">
                    KM
                  </span>
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
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-yellow-400 rounded-full"
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-white border-2 border-primary/20 rounded-[2.5rem] p-10 text-center shadow-2xl group/zap relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
                  <div className="flex items-center justify-center gap-6 text-primary mb-5 relative">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Zap className="h-12 w-12 text-yellow-500 drop-shadow-md" />
                    </motion.div>
                    <span className="font-display text-5xl font-black tracking-tight text-foreground tabular-nums">
                      {remaining.toLocaleString()}{" "}
                      <span className="text-xs text-primary font-black not-italic opacity-70">
                        KM
                      </span>
                    </span>
                  </div>
                  <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] relative leading-none">
                    Đoạn đường cuối đến {nextCity.name}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Footer Steps - Clean & Premium */}
        <div className="mt-20 flex justify-between items-center gap-8 relative z-10 px-4">
          {CITIES.map((city, i) => {
            const isReached = currentKm >= city.km;
            return (
              <div
                key={city.name}
                className="flex-1 flex flex-col items-center gap-4 group/step"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                    isReached
                      ? "bg-primary text-white scale-110 shadow-primary/30 ring-4 ring-primary/10"
                      : "bg-secondary text-muted-foreground border border-primary/10 grayscale opacity-60"
                  }`}
                >
                  {isReached ? (
                    <Trophy className="w-7 h-7" />
                  ) : (
                    <div className="text-xs font-black opacity-40">{i + 1}</div>
                  )}
                </div>
                <div className="text-center">
                  <div
                    className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-300 ${
                      isReached ? "text-primary" : "text-muted-foreground/60"
                    }`}
                  >
                    {city.name}
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground/40 mt-1">
                    {city.km} KM
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VietnamJourney;
