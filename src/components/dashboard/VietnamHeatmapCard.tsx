import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Activity, ChevronRight, Globe, Info, Maximize2, Award, Zap } from "lucide-react";
import { MapContainer, TileLayer, GeoJSON, Tooltip, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { scaleThreshold } from "d3-scale";
import { useCampaignHeatmap } from "@/hooks/useCampaign";
import vietnamGeoData from "./vietnam-provinces.json";

// Fix Leaflet marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

/**
 * HIGH-CONTRAST COLOR SCALE
 * Level 0: #1a1a1a (Dark Gray/Inactive) - used for 0 or missing data
 * Level 1-10: Light variant
 * ...
 * Level 50+: Neon/Highlight variant
 */
const SCALE_RANGES = [0, 1, 10, 30, 50];
const MEMBER_COLORS = ["#1a1a1a", "#064e3b", "#10b981", "#059669", "#34d399"];
const ACTIVITY_COLORS = ["#1a1a1a", "#431407", "#f97316", "#ea580c", "#fb923c"];

const normalizeName = (name: string) => {
  if (!name) return "";
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/tp\.\s*/i, "")
    .replace(/thanh pho\s*/i, "")
    .replace(/tinh\s*/i, "")
    .replace(/city/i, "")
    .trim();
};

const VietnamHeatmapCard = () => {
  const [activeTab, setActiveTab] = useState<"members" | "activities">("members");
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const { data: heatmapData, isLoading } = useCampaignHeatmap();

  // Metrics calculation
  const totals = useMemo(() => {
    if (!heatmapData) return { members: 0, activities: 0 };
    return heatmapData.reduce(
      (acc, d) => ({
        members: acc.members + d.members,
        activities: acc.activities + d.activities,
      }),
      { members: 0, activities: 0 }
    );
  }, [heatmapData]);

  const colorScale = useMemo(() => {
    return scaleThreshold<number, string>()
      .domain(SCALE_RANGES)
      .range(activeTab === "members" ? MEMBER_COLORS : ACTIVITY_COLORS);
  }, [activeTab]);

  const displayData = useMemo(() => {
    if (!heatmapData) return [];
    return [...heatmapData].sort((a, b) => 
      activeTab === "members" ? b.members - a.members : b.activities - a.activities
    );
  }, [heatmapData, activeTab]);

  // Identify Top 3 for special map highlighting
  const topProvinces = useMemo(() => {
    return displayData.slice(0, 3).map(p => p.province);
  }, [displayData]);

  const getProvinceData = (provinceName: string) => {
    const normGeoName = normalizeName(provinceName);
    return heatmapData?.find(d => 
      normalizeName(d.province) === normGeoName || 
      d.province.toLowerCase().includes(normGeoName) ||
      normGeoName.includes(normalizeName(d.province))
    );
  };

  const getProvinceStyle = (feature: any) => {
    const provinceName = feature.properties.Name;
    const curData = getProvinceData(provinceName);
    const val = curData ? (activeTab === "members" ? curData.members : curData.activities) : 0;
    
    const isHovered = hoveredProvince === (curData?.province || provinceName);
    const isTop3 = topProvinces.includes(curData?.province || "");
    const rankIndex = curData ? displayData.findIndex(d => d.province === curData.province) : -1;

    return {
      fillColor: colorScale(val),
      weight: isHovered ? 2.5 : (isTop3 ? 1.5 : 0.8),
      opacity: isHovered ? 1 : 0.6,
      color: isHovered ? "white" : (isTop3 ? (activeTab === "members" ? "#10b981" : "#f97316") : "rgba(255,255,255,0.1)"),
      fillOpacity: isHovered ? 0.95 : (val === 0 ? 0.4 : 0.75),
      dashArray: isTop3 && !isHovered ? "3" : "",
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const provinceName = feature.properties.Name;
    const curData = getProvinceData(provinceName);
    const provinceFullName = curData?.province || provinceName;
    
    // Detailed stats for tooltip
    const val = curData ? (activeTab === "members" ? curData.members : curData.activities) : 0;
    const totalVal = activeTab === "members" ? totals.members : totals.activities;
    const percentage = totalVal > 0 ? ((val / totalVal) * 100).toFixed(1) : "0";
    const rank = curData ? displayData.findIndex(d => d.province === curData.province) + 1 : "---";

    layer.on({
      mouseover: (e: any) => {
        setHoveredProvince(provinceFullName);
        const l = e.target;
        l.setStyle({
          weight: 2.5,
          color: "white",
          fillOpacity: 0.95,
        });
        l.bringToFront();
      },
      mouseout: (e: any) => {
        setHoveredProvince(null);
        e.target.setStyle(getProvinceStyle(feature));
      },
    });

    layer.bindTooltip(`
      <div class="bg-[#0b0f19]/95 backdrop-blur-xl p-5 rounded-[2rem] border border-white/10 text-white min-w-[220px] shadow-2xl ring-1 ring-white/5">
        <div class="flex items-center justify-between gap-3 mb-4">
          <div class="text-[10px] font-black uppercase tracking-widest text-[#10b981]">${provinceFullName}</div>
          ${rank <= 3 ? `<div class="bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded-full text-[8px] font-black">TOP ${rank}</div>` : ""}
        </div>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-6">
            <span class="text-[11px] font-medium text-white/40 uppercase tracking-wider">Chỉ số ${activeTab === 'members' ? 'TV' : 'KM'}</span>
            <span class="text-base font-black text-white">${val.toLocaleString()}</span>
          </div>
          <div class="flex items-center justify-between gap-6 pb-2 border-b border-white/5">
            <span class="text-[11px] font-medium text-white/40 uppercase tracking-wider">Tỷ lệ toàn quốc</span>
            <span class="text-[11px] font-black text-[#10b981]">${percentage}%</span>
          </div>
          <div class="flex items-center justify-between gap-6 pt-1">
            <span class="text-[11px] font-medium text-white/40 uppercase tracking-wider">Thứ hạng</span>
            <span class="text-[11px] font-black text-white">#${rank}</span>
          </div>
        </div>
      </div>
    `, { sticky: true, opacity: 1, direction: "top", className: 'custom-leaflet-tooltip' });
  };

  return (
    <div className="glass-card rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-white/5 min-h-[900px] flex flex-col">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header with EXPLICIT MESSAGING */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative z-20">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <Globe className="h-4 w-4" /> Hệ thống bản đồ thực địa
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight leading-none uppercase mb-2">Phân bổ tham gia</h2>
          <p className="text-muted-foreground/60 text-sm font-medium tracking-wide uppercase">
            {activeTab === "members" 
              ? "Bản đồ mật độ thành viên đăng ký thành công theo 63 tỉnh thành" 
              : "Bản đồ nhiệt tổng hợp hoạt động thể thao (Km) trên toàn quốc"}
          </p>
        </div>

        <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-500 font-bold text-xs uppercase tracking-widest ${
              activeTab === "members" ? "bg-primary text-primary-foreground shadow-[0_0_30px_rgba(16,185,129,0.4)]" : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <Users className="h-4 w-4" /> Thành viên
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-500 font-bold text-xs uppercase tracking-widest ${
              activeTab === "activities" ? "bg-accent text-accent-foreground shadow-[0_0_30px_rgba(255,107,53,0.4)]" : "text-muted-foreground hover:bg-white/5"
            }`}
          >
            <Activity className="h-4 w-4" /> Hoạt động
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 flex-1 relative z-10">
        {/* Left: THE LEAFLET MAP */}
        <div className="lg:col-span-7 bg-black/20 rounded-[4rem] border border-white/5 relative overflow-hidden group/map flex flex-col pt-0 min-h-[650px]">
           <MapContainer 
              center={[16.0, 108.0]} 
              zoom={6} 
              zoomControl={false}
              className="w-full h-full z-10 rounded-[4rem]"
              style={{ background: '#0b0f19' }}
           >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <ZoomControl position="topright" />
              
              {/* Choropleth Layer */}
              {!isLoading && (
                <GeoJSON 
                  key={activeTab} // Force re-render on tab switch
                  data={vietnamGeoData as any} 
                  style={getProvinceStyle}
                  onEachFeature={onEachFeature}
                />
              )}

              {/* National Islands (Data Connected) */}
              <div className="leaflet-overlay-pane">
                 {/* Hoang Sa - Linked to Da Nang */}
                 <svg className="absolute" style={{ left: '65%', top: '35%' }}>
                    <circle r="8" fill={colorScale(heatmapData?.find(d => normalizeName(d.province) === 'da nang')?.members || 0)} fillOpacity="1" stroke="white" strokeWidth="2" />
                 </svg>
                 {/* Truong Sa - Linked to Khanh Hoa */}
                 <svg className="absolute" style={{ left: '75%', top: '75%' }}>
                    <circle r="8" fill={colorScale(heatmapData?.find(d => normalizeName(d.province) === 'khanh hoa')?.members || 0)} fillOpacity="1" stroke="white" strokeWidth="2" />
                 </svg>
              </div>
           </MapContainer>

           {/* LARGE, READABLE LEGEND */}
           <div className="absolute bottom-10 left-10 right-10 z-20 p-8 bg-black/60 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 flex items-center gap-2">
                     <Info className="h-3 w-3" /> Chú giải mật độ
                   </div>
                   <div className="text-xs font-bold text-white/60">
                      Mức độ {activeTab === "members" ? "thành viên (người)" : "hoạt động (km)"}
                   </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex flex-col items-center gap-2 mr-4">
                    <div className="w-10 h-3 rounded-md bg-[#1a1a1a] border border-white/10" />
                    <span className="text-[9px] font-black text-white/30 uppercase">0/N.A</span>
                  </div>
                  {SCALE_RANGES.filter(v => v > 0).map((val, i) => (
                    <div key={val} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-12 h-3 rounded-md shadow-inner transition-transform hover:scale-110" 
                        style={{ backgroundColor: (activeTab === "members" ? MEMBER_COLORS : ACTIVITY_COLORS)[i+1] }} 
                      />
                      <span className="text-[9px] font-black text-white/60">{val}{i === SCALE_RANGES.length - 2 ? '+' : `- ${SCALE_RANGES[i+2]-1}`}</span>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>

        {/* Right: Ranking Overview with Top 3 Accents */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center justify-between px-2">
             <div className="text-xs font-black text-muted-foreground/40 uppercase tracking-[0.4em]">Thứ hạng địa phương</div>
             <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[9px] font-black uppercase tracking-widest">
                    <Zap className="h-3 w-3" /> Live
                 </div>
                 <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-muted-foreground/40">
                    <Maximize2 className="h-4 w-4" />
                 </div>
             </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 rounded-[2.5rem] bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[650px] pb-10">
              {displayData.map((item, i) => (
                <motion.div
                  key={item.province}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onMouseEnter={() => setHoveredProvince(item.province)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  className={`group relative flex items-center gap-6 p-6 rounded-[2.5rem] border transition-all duration-500 cursor-pointer ${
                    hoveredProvince === item.province 
                      ? (activeTab === 'members' ? "bg-primary/20 border-primary shadow-2xl scale-[1.02] z-20" : "bg-accent/20 border-accent shadow-2xl scale-[1.02] z-20") 
                      : (i < 3 ? "bg-white/[0.05] border-white/10" : "bg-white/[0.02] border-white/5 hover:bg-white/5")
                  }`}
                >
                  {/* Rank Badge */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-lg ${
                    i < 3 
                      ? "bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground shadow-2xl relative" 
                      : "bg-muted/40 text-muted-foreground"
                  }`}>
                    {i < 3 && <Award className="absolute -top-1.5 -right-1.5 h-4 w-4 text-yellow-400 drop-shadow-md" />}
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-foreground group-hover:text-primary transition-colors text-lg uppercase tracking-tight leading-none mb-1">
                      {item.province}
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-widest">Việt Nam</div>
                       {item.members === 0 && <span className="text-[8px] font-black text-white/20 uppercase tracking-tighter">(Chưa có dữ liệu)</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-display font-black ${activeTab === "members" ? "text-primary" : "text-accent"} transition-all ${hoveredProvince === item.province ? "scale-110 origin-right" : ""}`}>
                       {(activeTab === "members" ? item.members : item.activities).toLocaleString()}
                    </div>
                    <div className="text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] leading-none mt-1">
                       {activeTab === "members" ? "Thành viên" : "Hoạt động (km)"}
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${hoveredProvince === item.province ? "translate-x-1 opacity-100" : "opacity-10 translate-x-0"}`} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .leaflet-container {
          background: #0b0f19 !important;
        }
        .custom-leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .custom-leaflet-tooltip::before {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default VietnamHeatmapCard;
