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
  
  // Debug logging
  useMemo(() => {
    if (heatmapData) {
      console.log("[Heatmap Card] Received heatmapData:", heatmapData);
    }
  }, [heatmapData]);

  const totals = useMemo(() => {
    if (!heatmapData || !Array.isArray(heatmapData)) {
      if (heatmapData && !Array.isArray(heatmapData)) {
        console.error("[Heatmap Debug] heatmapData is not an array:", JSON.stringify(heatmapData, null, 2));
      }
      return { members: 0, activities: 0 };
    }
    return heatmapData.reduce(
      (acc, d) => ({
        members: acc.members + (d.members || 0),
        activities: acc.activities + (d.activities || 0),
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
    if (!heatmapData || !Array.isArray(heatmapData)) return [];
    return [...heatmapData].sort((a, b) => 
      activeTab === "members" ? b.members - a.members : b.activities - a.activities
    );
  }, [heatmapData, activeTab]);

  const topProvinces = useMemo(() => {
    return displayData.slice(0, 3).map(p => p.province);
  }, [displayData]);

  const getProvinceData = (provinceName: string) => {
    if (!heatmapData || !Array.isArray(heatmapData)) return undefined;
    const normGeoName = normalizeName(provinceName);
    return heatmapData.find(d => 
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
      fillColor: val === 0 ? "#ffffff" : colorScale(val),
      weight: isHovered ? 4 : 1,
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
        e.target.setStyle({ weight: 4, color: "var(--primary)", fillOpacity: 0.95 });
      },
      mouseout: (e: any) => {
        setHoveredProvince(null);
        e.target.setStyle({ weight: 1, color: "white", fillOpacity: 0.85 });
      }
    });

    layer.bindTooltip(`
      <div class="bg-white/95 backdrop-blur-md border border-primary/30 rounded-[2rem] p-6 shadow-2xl min-w-[260px]">
        <div class="flex items-center gap-4 mb-4 pb-4 border-b border-primary/20">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black uppercase text-sm">
             ${provinceName.substring(0, 2)}
          </div>
          <div class="font-display font-black text-foreground uppercase tracking-tight text-lg italic">${provinceName}</div>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-6">
            <span class="text-xs font-black text-muted-foreground uppercase tracking-widest">${activeTab === 'members' ? 'Thành viên' : 'Hoạt động'}</span>
            <span class="text-xl font-black text-primary tabular-nums">${val.toLocaleString()} ${activeTab === 'members' ? 'người' : 'km'}</span>
          </div>
          <div class="flex items-center justify-between gap-6 pb-3 border-b border-primary/10">
            <span class="text-xs font-black text-muted-foreground uppercase tracking-widest">Tỷ lệ toàn quốc</span>
            <span class="text-base font-black text-primary">${percentage}%</span>
          </div>
          <div class="flex items-center justify-between gap-6 pt-1">
            <span class="text-xs font-black text-muted-foreground uppercase tracking-widest">Thứ hạng</span>
            <span class="text-base font-black text-foreground italic"># ${rank || '---'}</span>
          </div>
        </div>
      </div>
    `, { sticky: true, opacity: 1, direction: "top", className: 'custom-leaflet-tooltip' });
  };

  return (
    <div className="glass-card rounded-[4rem] p-12 md:p-16 shadow-2xl relative overflow-hidden border border-primary/20 min-h-[1000px] flex flex-col mt-4">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 relative z-20">
        <div className="max-w-2xl">
          <div className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-4">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <Globe className="h-6 w-6" /> Hệ thống bản đồ thực địa
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-[1.1] uppercase italic mb-6">
            Toàn cảnh <br /> Phân bổ tham gia
          </h2>
          <p className="text-muted-foreground text-base font-bold tracking-wide uppercase border-l-4 border-primary/20 pl-6 py-2">
            {activeTab === "members"
              ? "Bản đồ tổng hợp thành viên đăng ký thành công trên toàn quốc"
              : "Bản đồ tổng hợp hoạt động thể thao (Km) trên toàn quốc"}
          </p>
        </div>

        <div className="flex bg-secondary p-2.5 rounded-[2.5rem] border border-primary/20 shadow-2xl overflow-hidden ring-4 ring-primary/5 min-w-[400px]">
          <button
            onClick={() => setActiveTab("members")}
            className={`flex-1 flex items-center justify-center gap-4 px-10 py-4.5 rounded-[2rem] transition-all duration-500 font-black text-sm uppercase tracking-widest whitespace-nowrap ${
              activeTab === "members"
                ? "bg-primary text-primary-foreground shadow-2xl ring-2 ring-white/20"
                : "text-muted-foreground hover:bg-white/40"
            }`}
          >
            <Users className="h-5 w-5" /> Thành viên
          </button>
          <button
            onClick={() => setActiveTab("activities")}
            className={`flex-1 flex items-center justify-center gap-4 px-10 py-4.5 rounded-[2rem] transition-all duration-500 font-black text-sm uppercase tracking-widest whitespace-nowrap ${
              activeTab === "activities"
                ? "bg-accent text-accent-foreground shadow-2xl ring-2 ring-white/20"
                : "text-muted-foreground hover:bg-white/40"
            }`}
          >
            <Activity className="h-5 w-5" /> Hoạt động
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 flex-1 relative z-10">
        <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-[5rem] border border-primary/20 relative overflow-hidden group/map flex flex-col pt-0 min-h-[750px] shadow-inner lg:shadow-2xl">
          <MapContainer
            center={[16.0, 108.0]}
            zoom={6}
            zoomControl={false}
            className="w-full h-full z-10 rounded-[5rem]"
            style={{ background: "#ffffff" }}
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
          </MapContainer>

          <div className="absolute bottom-12 left-12 right-12 z-20 p-10 bg-white/95 border border-primary/20 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="text-[11px] font-black text-primary uppercase tracking-[0.4em] mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" /> Chú giải mật độ
                </div>
                <div className="text-sm font-black text-foreground">
                  Mức độ{" "}
                  {activeTab === "members"
                    ? "thành viên (người)"
                    : "hoạt động (km)"}
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex flex-col items-center gap-3 mr-6">
                  <div className="w-14 h-4 rounded-full bg-[#f8fafc] border border-primary/20" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    0 / N.A
                  </span>
                </div>
                {SCALE_RANGES.filter((v) => v > 0).map((val, i) => (
                  <div key={val} className="flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-4 rounded-full shadow-2xl transition-all hover:scale-125 cursor-default ring-1 ring-white/50"
                      style={{
                        backgroundColor: (activeTab === "members"
                          ? MEMBER_COLORS
                          : ACTIVITY_COLORS)[i + 1],
                      }}
                    />
                    <span className="text-[10px] font-black text-muted-foreground tabular-nums">
                      {val}
                      {i === SCALE_RANGES.length - 2
                        ? "+"
                        : `- ${SCALE_RANGES[i + 2] - 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-10">
          <div className="flex items-center justify-between px-4">
            <div className="text-lg font-black text-muted-foreground uppercase">
              Bảng thống kê
            </div>
            <div className="flex items-center gap-4">
              {/* <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest shadow-sm">
                <Zap className="h-4 w-4" /> Live
              </div> */}
              {/* <div className="p-3 rounded-2xl bg-white border border-border text-muted-foreground shadow-2xl hover:text-primary transition-colors cursor-pointer">
                <Maximize2 className="h-5 w-5" />
              </div> */}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-28 rounded-[3rem] bg-white border border-border animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6 overflow-y-auto pr-4 custom-scrollbar max-h-[800px] pb-10">
              {displayData.map((item, i) => (
                <motion.div
                  key={item.province}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onMouseEnter={() => setHoveredProvince(item.province)}
                  onMouseLeave={() => setHoveredProvince(null)}
                  className={`group relative flex items-center gap-8 p-8 rounded-[3rem] border transition-all duration-500 cursor-pointer ${
                    hoveredProvince === item.province
                      ? activeTab === "members"
                        ? "bg-primary/5 border-primary shadow-2xl scale-[1.03] z-20"
                        : "bg-accent/5 border-accent shadow-2xl scale-[1.03] z-20"
                      : i < 3
                        ? "bg-secondary border-primary/30 shadow-xl"
                        : "bg-white border-border hover:bg-secondary/50 shadow-xl"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl ${
                      i < 3
                        ? "bg-gradient-to-br from-primary to-emerald-600 text-primary-foreground shadow-2xl relative ring-2 ring-white"
                        : "bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    {i < 3 && (
                      <Award className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 drop-shadow-xl" />
                    )}
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-display font-black text-foreground group-hover:text-primary transition-colors text-xl uppercase tracking-tighter leading-none mb-2 italic">
                      {item.province}
                    </div>
                  </div>

                  <div className="text-center">
                    <div
                      className={`text-3xl font-display font-black ${activeTab === "members" ? "text-primary" : "text-accent text-shadow-sm"} transition-all ${hoveredProvince === item.province ? "scale-110 origin-right" : ""} tabular-nums`}
                    >
                      {(activeTab === "members"
                        ? item.members
                        : item.activities
                      ).toLocaleString()}
                    </div>
                    <div className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.25em] leading-none mt-2">
                      {activeTab === "members"
                        ? "Thành viên"
                        : "Hoạt động (km)"}
                    </div>
                  </div>
                  {/* <ChevronRight
                    className={`h-6 w-6 transition-transform ${hoveredProvince === item.province ? "translate-x-2 opacity-100" : "opacity-10 translate-x-0"}`}
                  /> */}
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
        .text-shadow-sm {
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default VietnamHeatmapCard;
