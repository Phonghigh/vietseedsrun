import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, Activity, ChevronRight, Globe, Info, Maximize2, Award, Zap } from "lucide-react";
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from "react-leaflet";
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

const SCALE_RANGES = [0, 1, 10, 30, 50];
const MEMBER_COLORS = ["#f8fafc", "#10b981", "#059669", "#047857", "#064e3b"];
const ACTIVITY_COLORS = ["#f8fafc", "#f97316", "#ea580c", "#c2410c", "#9a3412"];

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
    
    return {
      fillColor: colorScale(val),
      weight: isHovered ? 3 : 1,
      opacity: 1,
      color: isHovered ? "var(--primary)" : "white",
      fillOpacity: isHovered ? 0.95 : 0.85,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const provinceName = feature.properties.Name;
    const curData = getProvinceData(provinceName);
    const val = curData ? (activeTab === "members" ? curData.members : curData.activities) : 0;
    const rank = curData ? displayData.findIndex(d => d.province === curData.province) + 1 : null;
    const percentage = totals[activeTab] > 0 ? ((val / totals[activeTab]) * 100).toFixed(1) : 0;

    layer.on({
      mouseover: (e: any) => {
        setHoveredProvince(curData?.province || provinceName);
        e.target.setStyle({ weight: 3, color: "var(--primary)", fillOpacity: 0.95 });
      },
      mouseout: (e: any) => {
        setHoveredProvince(null);
        e.target.setStyle({ weight: 1, color: "white", fillOpacity: 0.85 });
      }
    });

    layer.bindTooltip(`
      <div class="bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl p-5 shadow-2xl min-w-[220px]">
        <div class="flex items-center gap-3 mb-3 pb-3 border-b border-primary/20">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-xs">
             ${provinceName.substring(0, 2)}
          </div>
          <div class="font-display font-black text-foreground uppercase tracking-tight text-base">${provinceName}</div>
        </div>
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-6">
            <span class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">${activeTab === 'members' ? 'Thành viên' : 'Hoạt động'}</span>
            <span class="text-base font-black text-primary">${val.toLocaleString()} ${activeTab === 'members' ? 'người' : 'km'}</span>
          </div>
          <div class="flex items-center justify-between gap-6 pb-2 border-b border-primary/10">
            <span class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Tỷ lệ toàn quốc</span>
            <span class="text-sm font-black text-primary">${percentage}%</span>
          </div>
          <div class="flex items-center justify-between gap-6 pt-1">
            <span class="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Thứ hạng</span>
            <span class="text-sm font-black text-foreground">#${rank || '---'}</span>
          </div>
        </div>
      </div>
    `, { sticky: true, opacity: 1, direction: "top", className: 'custom-leaflet-tooltip' });
  };

  return (
    <div className="glass-card rounded-[3rem] p-10 shadow-2xl relative overflow-hidden border border-primary/20 min-h-[900px] flex flex-col mt-4">
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 relative z-20">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.4em] text-primary mb-4 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <Globe className="h-4 w-4" /> Hệ thống bản đồ thực địa
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight leading-none uppercase mb-2">Phân bổ tham gia</h2>
          <p className="text-muted-foreground text-sm font-bold tracking-wide uppercase">
            {activeTab === "members" 
              ? "Bản đồ mật độ thành viên đăng ký thành công theo 63 tỉnh thành" 
              : "Bản đồ nhiệt tổng hợp hoạt động thể thao (Km) trên toàn quốc"}
          </p>
        </div>

        <div className="flex bg-secondary p-2 rounded-[2rem] border border-primary/20 shadow-md overflow-hidden">
          <button
            onClick={() => setActiveTab("members")}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-500 font-bold text-xs uppercase tracking-widest ${
              activeTab === "members" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:bg-white/40"
            }`}
          >
            <Users className="h-4 w-4" /> Thành viên
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`flex items-center gap-3 px-8 py-3.5 rounded-full transition-all duration-500 font-bold text-xs uppercase tracking-widest ${
              activeTab === "activities" ? "bg-accent text-accent-foreground shadow-lg" : "text-muted-foreground hover:bg-white/40"
            }`}
          >
            <Activity className="h-4 w-4" /> Hoạt động
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 flex-1 relative z-10">
        <div className="lg:col-span-7 bg-white rounded-[4rem] border border-primary/20 relative overflow-hidden group/map flex flex-col pt-0 min-h-[650px] shadow-inner">
           <MapContainer 
              center={[16.0, 108.0]} 
              zoom={6} 
              zoomControl={false}
              className="w-full h-full z-10 rounded-[4rem]"
              style={{ background: '#ffffff' }}
           >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <ZoomControl position="topright" />
              
              {!isLoading && (
                <GeoJSON 
                  key={activeTab} // Force re-render on tab switch
                  data={vietnamGeoData as any} 
                  style={getProvinceStyle}
                  onEachFeature={onEachFeature}
                />
              )}
 
              <div className="leaflet-overlay-pane">
                 <svg className="absolute" style={{ left: '65%', top: '35%' }}>
                    <circle r="8" fill={colorScale(heatmapData?.find(d => normalizeName(d.province) === 'da nang')?.members || 0)} fillOpacity="1" stroke="var(--primary)" strokeWidth="2" />
                 </svg>
                 <svg className="absolute" style={{ left: '75%', top: '75%' }}>
                    <circle r="8" fill={colorScale(heatmapData?.find(d => normalizeName(d.province) === 'khanh hoa')?.members || 0)} fillOpacity="1" stroke="var(--primary)" strokeWidth="2" />
                 </svg>
              </div>
           </MapContainer>

           <div className="absolute bottom-10 left-10 right-10 z-20 p-8 bg-white/95 border border-primary/20 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                   <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 flex items-center gap-2">
                     <Info className="h-3 w-3" /> Chú giải mật độ
                   </div>
                   <div className="text-xs font-bold text-foreground">
                      Mức độ {activeTab === "members" ? "thành viên (người)" : "hoạt động (km)"}
                   </div>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex flex-col items-center gap-2 mr-4">
                    <div className="w-10 h-3 rounded-md bg-[#f8fafc] border border-primary/20" />
                    <span className="text-[9px] font-black text-muted-foreground uppercase">0/N.A</span>
                  </div>
                  {SCALE_RANGES.filter(v => v > 0).map((val, i) => (
                    <div key={val} className="flex flex-col items-center gap-2">
                      <div 
                        className="w-12 h-3 rounded-md shadow-inner transition-transform hover:scale-110" 
                        style={{ backgroundColor: (activeTab === "members" ? MEMBER_COLORS : ACTIVITY_COLORS)[i+1] }} 
                      />
                      <span className="text-[9px] font-black text-muted-foreground">{val}{i === SCALE_RANGES.length - 2 ? '+' : `- ${SCALE_RANGES[i+2]-1}`}</span>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center justify-between px-2">
             <div className="text-xs font-black text-muted-foreground uppercase tracking-[0.4em]">Thứ hạng địa phương</div>
             <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[9px] font-black uppercase tracking-widest">
                    <Zap className="h-3 w-3" /> Live
                 </div>
                 <div className="p-2 rounded-xl bg-white border border-border text-muted-foreground shadow-sm">
                    <Maximize2 className="h-4 w-4" />
                 </div>
             </div>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 rounded-[2.5rem] bg-white border border-border animate-pulse" />
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
                      ? (activeTab === 'members' ? "bg-primary/5 border-primary shadow-xl scale-[1.02] z-20" : "bg-accent/5 border-accent shadow-xl scale-[1.02] z-20") 
                      : (i < 3 ? "bg-secondary border-primary/20 shadow-sm" : "bg-white border-border hover:bg-secondary/50 shadow-sm")
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-display font-black text-lg ${
                    i < 3 
                      ? "bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground shadow-xl relative" 
                      : "bg-muted/30 text-muted-foreground"
                  }`}>
                    {i < 3 && <Award className="absolute -top-1.5 -right-1.5 h-4 w-4 text-yellow-400 drop-shadow-md" />}
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-foreground group-hover:text-primary transition-colors text-lg uppercase tracking-tight leading-none mb-1">
                      {item.province}
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Việt Nam</div>
                       {item.members === 0 && <span className="text-[8px] font-black text-primary/40 uppercase tracking-tighter">(Chưa có dữ liệu)</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-display font-black ${activeTab === "members" ? "text-primary" : "text-accent"} transition-all ${hoveredProvince === item.province ? "scale-110 origin-right" : ""}`}>
                       {(activeTab === "members" ? item.members : item.activities).toLocaleString()}
                    </div>
                    <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] leading-none mt-1">
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
          background: #ffffff !important;
        }
        .custom-leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          z-index: 1000 !important;
        }
        .custom-leaflet-tooltip::before {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default VietnamHeatmapCard;
