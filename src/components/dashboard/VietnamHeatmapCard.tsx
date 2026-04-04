import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Activity, ChevronRight, Globe, Info } from "lucide-react";
import { useCampaignHeatmap } from "@/hooks/useCampaign";

interface ProvinceData {
  province: string;
  members: number;
  activities: number;
  x: number;
  y: number;
}

const PROVINCE_COORDINATES: Record<string, { x: number; y: number }> = {
  "Hà Nội": { x: 135, y: 100 },
  "Hải Phòng": { x: 155, y: 115 },
  "Thanh Hóa": { x: 130, y: 145 },
  "Vinh": { x: 155, y: 175 },
  "Đà Nẵng": { x: 185, y: 260 },
  "Huế": { x: 175, y: 240 },
  "Bình Định": { x: 195, y: 320 },
  "Nha Trang": { x: 200, y: 350 },
  "Hồ Chí Minh": { x: 165, y: 440 },
  "Bình Dương": { x: 155, y: 425 },
  "Cần Thơ": { x: 140, y: 470 },
  "Đồng Nai": { x: 175, y: 430 },
};

const VietnamHeatmapCard = () => {
  const [activeTab, setActiveTab] = useState<"members" | "activities">("members");
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const { data: heatmapData, isLoading } = useCampaignHeatmap();

  // Integrated data with coordinates
  const displayData = useMemo(() => {
    if (!heatmapData) return [];
    return heatmapData.map(item => ({
      ...item,
      ...(PROVINCE_COORDINATES[item.province] || { x: 150, y: 250 }) // Fallback
    })).sort((a, b) => (activeTab === "members" ? b.members - a.members : b.activities - a.activities));
  }, [heatmapData, activeTab]);

  const maxVal = useMemo(() => {
    if (displayData.length === 0) return 1;
    return Math.max(...displayData.map(d => activeTab === "members" ? d.members : d.activities));
  }, [displayData, activeTab]);

  return (
    <div className="glass-card rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-white/5 min-h-[600px] flex flex-col">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header with Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3 flex items-center gap-2">
            <Globe className="h-4 w-4" /> Bản đồ nhiệt cộng đồng
          </div>
          <h2 className="font-display text-4xl font-black text-foreground tracking-tight">Sức nóng lan tỏa</h2>
        </div>

        <div className="flex bg-muted/20 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-500 font-bold text-xs uppercase tracking-widest ${
              activeTab === "members" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <Users className="h-4 w-4" /> Thành viên
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-500 font-bold text-xs uppercase tracking-widest ${
              activeTab === "activities" ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <Activity className="h-4 w-4" /> Hoạt động
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">
        {/* Left: Interactive Map */}
        <div className="lg:col-span-7 bg-muted/5 rounded-[3rem] p-8 border border-white/5 relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "30px 30px" }} />
           
           <svg viewBox="100 50 150 460" className="h-[450px] w-auto transition-transform duration-700 hover:scale-[1.02]">
             {/* Simplified Vietnam Outline */}
             <path 
                d="M135,80 L155,95 L165,115 L155,145 L145,170 L160,200 L175,230 L185,260 L195,300 L205,340 L200,380 L180,410 L160,440 L140,470 L130,480" 
                fill="none" 
                stroke="white" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
                opacity="0.1" 
             />
             
             {displayData.map((item, i) => {
               const val = activeTab === "members" ? item.members : item.activities;
               const intensity = Math.max(0.2, val / maxVal);
               const color = activeTab === "members" ? `hsla(var(--primary), ${intensity})` : `hsla(var(--accent), ${intensity})`;
               const isHovered = hoveredProvince === item.province;
               
               return (
                 <g key={item.province} className="group cursor-help" onMouseEnter={() => setHoveredProvince(item.province)} onMouseLeave={() => setHoveredProvince(null)}>
                   <motion.circle 
                     cx={item.x} cy={item.y} 
                     r={8} 
                     fill={color}
                     initial={{ scale: 0 }}
                     animate={{ scale: [1, 1.1, 1] }}
                     whileHover={{ scale: 1.5 }}
                     transition={{ repeat: Infinity, duration: 3, delay: i * 0.1 }}
                   />
                   <motion.circle 
                     cx={item.x} cy={item.y} 
                     r={intensity * 25 + 5} 
                     fill={color}
                     opacity="0.3"
                     className="blur-[8px]"
                   />
                   
                   {/* Tooltip Popup inside SVG */}
                   <AnimatePresence>
                    {isHovered && (
                      <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="pointer-events-none">
                        <foreignObject x={item.x - 40} y={item.y - 50} width="80" height="40">
                          <div className={`rounded-lg px-2 py-1 text-center shadow-2xl border border-white/10 backdrop-blur-md ${activeTab === 'members' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
                            <div className="text-[10px] font-black leading-none">{val.toLocaleString()}</div>
                            <div className="text-[6px] font-bold uppercase tracking-widest mt-1 opacity-70">
                              {activeTab === 'members' ? 'Thành viên' : 'Hoạt động'}
                            </div>
                          </div>
                        </foreignObject>
                      </motion.g>
                    )}
                   </AnimatePresence>
                   
                   {i < 3 && intensity > 0.5 && (
                     <text x={item.x + 12} y={item.y + 4} fill="white" fontSize="9" fontWeight="900" opacity="0.6" className="font-display tracking-widest uppercase italic">
                       {item.province}
                     </text>
                   )}
                 </g>
               );
             })}
           </svg>
           
           <div className="absolute bottom-8 right-8 bg-background/40 backdrop-blur-md p-4 rounded-2xl border border-white/5">
              <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                <Info className="h-3 w-3" /> Mức độ sôi động
              </div>
              <div className={`h-1.5 w-32 rounded-full bg-gradient-to-r ${activeTab === "members" ? "from-primary/10 to-primary" : "from-accent/10 to-accent"}`} />
           </div>
        </div>

        {/* Right: Ranked List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="text-xs font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-2">Thứ hạng theo địa phương</div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 rounded-2xl bg-muted/20 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[450px]">
              {displayData.map((item, i) => (
                <motion.div
                  key={item.province}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onMouseEnter={() => setHoveredProvince(item.province)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  transition={{ delay: i * 0.05 }}
                  className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                    hoveredProvince === item.province ? "bg-primary/10 border-primary/40 shadow-lg" : "bg-muted/10 border-white/5 hover:bg-primary/5 hover:border-primary/20"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm ${
                    i === 0 ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted/30 text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-foreground group-hover:text-primary transition-colors truncate uppercase tracking-tight">
                      {item.province}
                    </div>
                    <div className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest mt-0.5">
                      {((activeTab === "members" ? item.members : item.activities) / maxVal * 100).toFixed(0)}% sức nóng
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-display font-black ${activeTab === "members" ? "text-primary" : "text-accent"}`}>
                      {(activeTab === "members" ? item.members : item.activities).toLocaleString()}
                    </div>
                    <div className="text-[8px] font-bold text-muted-foreground/30 uppercase tracking-widest">
                      {activeTab === "members" ? "Thành viên" : "Hoạt động"}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VietnamHeatmapCard;
