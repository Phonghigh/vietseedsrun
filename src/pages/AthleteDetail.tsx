import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Activity as ActivityIcon, 
  Trophy, 
  Calendar, 
  Zap, 
  Loader2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useAthleteDetail } from "@/hooks/useAthlete";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const AthleteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: detail, isLoading } = useAthleteDetail(id || "");

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-medium">Đang tải hành trình vận động viên...</p>
        </div>
      </AppLayout>
    );
  }

  const athlete = detail?.athlete;
  const stats = detail?.stats;
  const activities = detail?.activities || [];
  const fullName = athlete ? `${athlete.lastName} ${athlete.firstName}`.trim() : "Vận động viên";

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-10 pb-20">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="group text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại
        </Button>

        {/* Profile Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white/10 p-1 bg-background shadow-2xl">
              {athlete?.profile ? (
                <img 
                  src={athlete.profile} 
                  alt={fullName} 
                  className="w-full h-full object-cover rounded-[1.5rem]" 
                  onError={(e) => {
                    (e.target as any).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-3xl font-black text-primary">
                  {athlete?.firstName?.substring(0, 1).toUpperCase()}{athlete?.lastName?.substring(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="font-display text-4xl font-black text-white tracking-tight leading-none">{fullName}</h1>
                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full w-fit mx-auto md:mx-0">
                  <span className="text-[10px] font-black text-primary uppercase tracking-widest">{athlete?.teamName || "Chưa có đội"}</span>
                </div>
              </div>
              <p className="text-muted-foreground font-medium text-lg flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4 text-primary/60" /> {athlete?.location || "Việt Nam"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Tổng tích lũy", value: `${stats?.totalDistanceKm?.toFixed(1) || 0} km`, icon: MapPin, color: "text-primary" },
            { label: "Tổng số bài chạy", value: stats?.activityCount || 0, icon: ActivityIcon, color: "text-accent" },
            { label: "Vị trí bảng vàng", value: "ĐANG CẬP NHẬT", icon: Trophy, color: "text-blue-400" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card rounded-3xl p-6 flex flex-col items-center text-center shadow-xl border border-white/5"
            >
              <div className={`p-3 rounded-2xl bg-white/5 ${s.color} mb-4`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight uppercase">{s.value}</div>
              <div className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Activities List */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h2 className="font-display text-2xl font-black text-white tracking-tight">Dòng thời gian hoạt động</h2>
            <div className="h-[2px] flex-1 bg-white/5 rounded-full" />
          </div>

          <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            {activities.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground/20">
                    <ActivityIcon className="h-8 w-8" />
                </div>
                <p className="text-muted-foreground font-medium">Chưa ghi nhận hoạt động nào trong chiến dịch</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {activities.map((activity, idx) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors group"
                  >
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary border border-white/10 group-hover:scale-110 transition-transform">
                          <Zap className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{activity.name}</div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-white/30 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {format(new Date(activity.date), "dd MMMM yyyy", { locale: vi })}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-accent" /> {activity.location}</span>
                          </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-12">
                        <div className="text-right">
                          <div className="text-2xl font-black text-white leading-none mb-1">{activity.pace}</div>
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">phút/km</div>
                        </div>

                        <div className="text-right min-w-[4rem]">
                          <div className="text-2xl font-black text-primary leading-none mb-1">{activity.distanceKm.toFixed(2)}</div>
                          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">km</div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 text-accent bg-accent/10 px-3 py-1.5 rounded-xl border border-accent/20">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-wider">Hợp lệ</span>
                            </div>
                        </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AthleteDetail;
