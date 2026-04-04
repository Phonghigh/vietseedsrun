import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

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

// SVG path roughly tracing Vietnam's coast
const JOURNEY_PATH = "M145,470 C150,450 155,420 155,400 C160,370 180,340 190,310 C185,280 178,250 175,220 C170,210 165,200 165,195 C162,175 160,160 160,145 C155,125 148,105 140,90";

interface VietnamJourneyProps {
  currentKm: number;
}

const VietnamJourney = ({ currentKm }: VietnamJourneyProps) => {
  const progress = Math.min(currentKm / TOTAL_JOURNEY, 1);

  // Find current position city
  const currentCity = [...CITIES].reverse().find(c => currentKm >= c.km) || CITIES[0];
  const nextCity = CITIES.find(c => c.km > currentKm);

  return (
    <div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-[-30%] left-[-10%] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Map SVG */}
        <div className="relative w-full max-w-[280px] flex-shrink-0">
          <svg viewBox="40 50 220 460" className="w-full h-auto" style={{ filter: "drop-shadow(0 0 20px rgba(255,107,53,0.15))" }}>
            {/* Background path (trail) */}
            <path
              d={JOURNEY_PATH}
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="3"
              strokeDasharray="6 6"
              opacity="0.15"
            />

            {/* Progress path */}
            <motion.path
              d={JOURNEY_PATH}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            />

            {/* City dots */}
            {CITIES.map((city, i) => {
              const reached = currentKm >= city.km;
              return (
                <g key={city.name}>
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={reached ? 6 : 4}
                    fill={reached ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                    opacity={reached ? 1 : 0.3}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  />
                  {reached && (
                    <motion.circle
                      cx={city.x}
                      cy={city.y}
                      r={10}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      opacity={0.3}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    />
                  )}
                  <text
                    x={city.x + (city.x > 160 ? -55 : 15)}
                    y={city.y + 4}
                    fill={reached ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                    fontSize="10"
                    fontWeight={reached ? "700" : "400"}
                    opacity={reached ? 0.9 : 0.4}
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}

            {/* Animated runner dot */}
            <motion.circle
              cx={currentCity.x}
              cy={currentCity.y}
              r={8}
              fill="hsl(var(--primary))"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </svg>
        </div>

        {/* Journey narrative */}
        <div className="flex-1 space-y-6 relative z-10">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70 mb-2 flex items-center gap-2">
              <MapPin className="h-3 w-3" /> Hành trình xuyên Việt
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight">
              Cộng đồng đang ở{" "}
              <span className="text-primary">{currentCity.name}</span>
            </h2>
            <p className="text-muted-foreground font-medium mt-2 leading-relaxed text-sm">
              {currentKm.toLocaleString()} km đã được chinh phục — tương đương hành trình từ{" "}
              <span className="text-foreground font-semibold">Cà Mau</span> đến{" "}
              <span className="text-foreground font-semibold">{currentCity.name}</span>.
              {nextCity && (
                <> Chỉ còn <span className="text-primary font-bold">{(nextCity.km - currentKm).toLocaleString()} km</span> nữa để đến{" "}
                <span className="text-foreground font-semibold">{nextCity.name}</span>.</>
              )}
            </p>
          </div>

          {/* Mini milestones */}
          <div className="grid grid-cols-2 gap-3">
            {CITIES.filter((_, i) => i > 0).slice(0, 4).map(city => {
              const reached = currentKm >= city.km;
              return (
                <div
                  key={city.name}
                  className={`rounded-xl px-3 py-2.5 border text-xs font-bold flex items-center gap-2 transition-colors ${
                    reached
                      ? "border-primary/20 bg-primary/5 text-primary"
                      : "border-border/30 bg-muted/30 text-muted-foreground/50"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${reached ? "bg-primary" : "bg-muted-foreground/30"}`} />
                  {city.name}
                  <span className="ml-auto text-[10px] opacity-60">{city.km.toLocaleString()} km</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VietnamJourney;
