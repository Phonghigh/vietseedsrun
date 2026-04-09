import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Activity as ActivityIcon, 
  Clock, 
  TrendingUp, 
  Zap, 
  Loader2,
  Info,
  Calendar,
  CheckCircle2
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { getActivityDetail } from "@/api/activityService";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { decodePolyline } from "@/lib/polyline";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useMemo } from "react";

// Helper component to auto-fit map bounds
const MapBounds = ({ positions }: { positions: [number, number][] }) => {
  const map = useMap();
  useMemo(() => {
    if (positions.length > 0) {
      map.fitBounds(positions as any, { padding: [20, 20] });
    }
  }, [map, positions]);
  return null;
};

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["activity", id],
    queryFn: () => getActivityDetail(id || ""),
    enabled: !!id,
  });

  const chartData = useMemo(() => {
    if (!data?.streams) return [];
    
    // Transform streams to Recharts format
    const { distance, altitude, velocity_smooth, time } = data.streams;
    if (!distance || (!altitude && !velocity_smooth)) return [];

    return distance.map((d, i) => ({
      distance: (d / 1000).toFixed(2),
      altitude: altitude ? altitude[i] : 0,
      pace: velocity_smooth ? (velocity_smooth[i] > 0 ? (16.6667 / velocity_smooth[i]).toFixed(2) : 0) : 0,
      time: time ? time[i] : 0,
    }));
  }, [data]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-black uppercase tracking-widest">
            Đang tải chi tiết hành trình...
          </p>
        </div>
      </AppLayout>
    );
  }

  if (error || !data) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <p className="text-destructive font-black uppercase tracking-widest">
            Không thể tải dữ liệu hoạt động này.
          </p>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>
      </AppLayout>
    );
  }

  const { activity, streams, laps } = data;
  const polylinePoints = activity.map?.polyline ? decodePolyline(activity.map.polyline) : [];
  
  // If streams have latlng, it's more accurate than polyline
  const routePoints = (streams?.latlng as [number, number][]) || polylinePoints;

  const durationStr = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hrs > 0 ? `${hrs}h ${mins}m ${secs}s` : `${mins}m ${secs}s`;
  };

  const paceStr = (speed: number) => {
    if (!speed || speed === 0) return "0:00";
    const paceDecimal = 16.6667 / speed; // Speed is m/s, convert to min/km
    const mins = Math.floor(paceDecimal);
    const secs = Math.round((paceDecimal - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-12 pb-24">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="group text-muted-foreground hover:text-primary transition-all font-black uppercase text-xs tracking-widest px-0"
        >
          <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
          Quay lại danh sách
        </Button>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3.5rem] p-12 md:p-16 relative overflow-hidden shadow-2xl border border-border"
        >
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                   <ActivityIcon className="h-4 w-4 text-primary" />
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                     {activity.type || 'Chạy bộ'}
                   </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="uppercase tracking-[0.1em]">Hoạt động hợp lệ</span>
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-black text-foreground tracking-tight leading-none uppercase italic">
                {activity.name}
              </h1>
              <div className="flex items-center gap-6 text-muted-foreground font-black text-sm uppercase tracking-widest">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary/60" />
                  {format(new Date(activity.startDate), "dd MMMM yyyy 'lúc' HH:mm", { locale: vi })}
                </span>
                {activity.device_name && (
                  <>
                    <div className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="opacity-70">{activity.device_name}</span>
                  </>
                )}
              </div>
            </div>

            <div className="bg-secondary/50 p-8 rounded-[2.5rem] border border-border flex items-center gap-8 shadow-inner">
               <div className="text-right">
                  <div className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-70">Tổng quãng đường</div>
                  <div className="text-5xl font-display font-black text-primary italic">
                    {(activity.distance / 1000).toFixed(2)} <span className="text-xl">KM</span>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Thời gian", value: durationStr(activity.movingTime), icon: Clock, color: "text-blue-500" },
            { label: "Pace trung bình", value: paceStr(activity.averageSpeed || 0), icon: Zap, color: "text-accent" },
            { label: "Độ cao tích lũy", value: `${activity.totalElevationGain}m`, icon: TrendingUp, color: "text-primary" },
            { label: "Lượng calo", value: `${activity.calories || 0} kcal`, icon: Info, color: "text-orange-500" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 1.1 }}
              className="bg-white rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-xl border border-border group hover:border-primary/20 transition-all"
            >
              <div className={`p-4 rounded-2xl bg-secondary ${s.color} mb-4 transform group-hover:rotate-12 transition-transform shadow-inner`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-black text-foreground uppercase italic tabular-nums">
                {s.value}
              </div>
              <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content: Map & Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Map Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-10"
          >
            <div className="bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-border h-[600px] relative">
              <MapContainer
                center={routePoints[0] || [10.8231, 106.6297]}
                zoom={14}
                className="w-full h-full z-10"
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  attribution='&copy; CARTO'
                />
                <Polyline 
                  pathOptions={{ color: 'hsl(var(--primary))', weight: 4, lineCap: 'round', lineJoin: 'round' }} 
                  positions={routePoints} 
                />
                <MapBounds positions={routePoints} />
              </MapContainer>
              <div className="absolute top-8 left-8 z-20 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full border border-border shadow-2xl flex items-center gap-3">
                 <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-widest text-foreground">Hành trình chi tiết</span>
              </div>
            </div>

            {/* Charts Card */}
            <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-border space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-black text-foreground uppercase italic tracking-tight">
                  Phân tích thông số
                </h2>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/40" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase">Độ cao</span>
                  </div>
                </div>
              </div>

              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorAlt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="distance" 
                      hide 
                    />
                    <YAxis 
                      hide 
                      domain={['dataMin - 5', 'dataMax + 5']} 
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border-2 border-primary/20 p-4 rounded-2xl shadow-2xl">
                              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Khoảng cách: {payload[0].payload.distance} km</p>
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-xs font-black text-primary uppercase">Độ cao</p>
                                  <p className="text-lg font-black">{payload[0].value}m</p>
                                </div>
                                <div className="w-px h-8 bg-border" />
                                <div>
                                  <p className="text-xs font-black text-accent uppercase">Pace</p>
                                  <p className="text-lg font-black">{payload[0].payload.pace}/km</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="altitude" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorAlt)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Laps/Splits */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border border-border h-full flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-inner">
                   <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                   <h2 className="font-display text-xl font-black text-foreground uppercase italic tracking-tight">Chi tiết từng dặm</h2>
                   <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Splits & Laps</p>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {laps && laps.length > 0 ? (
                  laps.map((lap, i) => (
                    <div 
                      key={lap.id}
                      className="flex items-center justify-between p-6 bg-secondary/30 rounded-[1.5rem] border border-transparent hover:border-primary/20 hover:bg-white transition-all group shadow-sm hover:shadow-xl"
                    >
                      <div className="flex items-center gap-6">
                        <span className="font-display font-black text-foreground/20 text-xl group-hover:text-primary transition-colors italic tabular-nums">
                          {lap.split || i + 1}
                        </span>
                        <div>
                          <div className="text-sm font-black text-foreground uppercase italic tracking-widest">
                            {(lap.distance / 1000).toFixed(1)} <span className="text-[10px] text-muted-foreground not-italic">KM</span>
                          </div>
                          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">
                            Lượt chạy #{lap.split}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-primary italic tabular-nums leading-none">
                          {paceStr(lap.averageSpeed)}
                        </div>
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 italic">PACE</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                    <Info className="h-10 w-10 mb-4" />
                    <p className="font-black uppercase tracking-widest text-xs">Không có dữ liệu Lap</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ActivityDetail;
