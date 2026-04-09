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
  CheckCircle2
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
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-black uppercase tracking-widest">Đang kết nối hành trình...</p>
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
      <div className="max-w-5xl mx-auto space-y-12 pb-24">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="group text-muted-foreground hover:text-primary transition-all font-black uppercase text-xs tracking-widest px-0"
        >
          <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" />
          Quay lại Bảng Xếp Hạng
        </Button>

        {/* Profile Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3.5rem] p-12 md:p-16 relative overflow-hidden shadow-2xl border border-border"
        >
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-white p-1 bg-secondary shadow-2xl relative">
              {athlete?.profile ? (
                <img
                  src={athlete.profile}
                  alt={fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[2rem]"
                  onError={(e) => {
                    (e.target as any).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-4xl font-black text-primary uppercase italic">
                  {athlete?.firstName?.substring(0, 1)}
                  {athlete?.lastName?.substring(0, 1)}
                </div>
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]" />
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
                <h1 className="font-display text-5xl md:text-6xl font-black text-foreground tracking-tight leading-none uppercase italic">
                  {fullName}
                </h1>
                <div className="px-5 py-2 bg-primary/10 border border-primary/20 rounded-full w-fit mx-auto md:mx-0 shadow-sm ring-4 ring-primary/5 flex items-center gap-3">
                  <span className="text-xs font-black text-primary uppercase tracking-widest leading-none">
                    {athlete?.teamName || "Chưa có đội"}
                  </span>
                  {athlete?.teamName && athlete?.teamName !== "No Team" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                  )}
                  {athlete?.teamName && athlete?.teamName !== "No Team" && (
                    <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest leading-none bg-primary/5 px-2 py-0.5 rounded-md">
                      Team số 5
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-6">
                <p className="text-muted-foreground font-black text-sm flex items-center gap-2 uppercase tracking-widest">
                  <MapPin className="h-5 w-5 text-primary/60" />{" "}
                  {athlete?.location || "Việt Nam"}
                </p>
                {/* <div className="w-2 h-2 rounded-full bg-border" /> */}
                {/* <p className="text-muted-foreground font-black text-sm flex items-center gap-2 uppercase tracking-widest">
                  <Zap className="h-5 w-5 text-accent/60" /> Cấp độ{" "}
                  {Math.floor((stats?.totalDistanceKm || 0) / 10) + 1}
                </p> */}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              label: "Tổng tích lũy",
              value: `${stats?.totalDistanceKm?.toFixed(1) || 0} km`,
              icon: MapPin,
              color: "text-primary",
            },
            {
              label: "Tổng hoạt động",
              value: stats?.activityCount || 0,
              icon: ActivityIcon,
              color: "text-accent",
            },
            {
              label: "Vị trí bảng vàng",
              value: stats?.rank || 0,
              icon: Trophy,
              color: "text-blue-500",
            },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-[3rem] p-10 flex flex-col items-center text-center shadow-2xl border border-border group hover:border-primary/20 transition-all"
            >
              <div
                className={`p-4 rounded-2xl bg-secondary ${s.color} mb-6 shadow-inner transform group-hover:rotate-12 transition-transform`}
              >
                <s.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-black text-foreground tracking-tight uppercase italic tabular-nums">
                {s.value}
              </div>
              <div className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-3">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activities List */}
        <div className="space-y-8">
          <div className="flex items-center gap-6 px-4">
            <h2 className="font-display text-3xl font-black text-foreground tracking-tight uppercase italic">
              Dòng thời gian hoạt động
            </h2>
            <div className="h-[2px] flex-1 bg-border/50 rounded-full" />
          </div>

          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="bg-white rounded-[3.5rem] py-24 text-center flex flex-col items-center gap-6 border border-border shadow-xl">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-muted-foreground/30 shadow-inner">
                  <ActivityIcon className="h-10 w-10" />
                </div>
                <p className="text-muted-foreground font-black uppercase tracking-[0.2em]">
                  Chưa ghi nhận hoạt động nào
                </p>
              </div>
            ) : (
              <>
                {activities.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.025, 
                      y: -5,
                      transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/activity/${activity.id}`)}
                    className="flex items-center justify-between px-10 py-6 bg-white rounded-[2rem] border border-border shadow-md cursor-pointer group hover:shadow-2xl hover:border-primary/30 transition-all transform-gpu will-change-transform"
                  >
                    {/* Left: Info Section */}
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <span className="font-display font-black text-foreground/20 w-8 text-right text-xl group-hover:text-primary transition-colors italic tabular-nums flex-shrink-0">
                        {activities.length - i}
                      </span>
                      
                      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-sm font-black text-primary border-2 border-white shadow-md overflow-hidden relative flex-shrink-0">
                        <ActivityIcon className="h-8 w-8 relative z-10" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <div className="font-black text-foreground group-hover:text-primary transition-colors text-lg uppercase italic tracking-tight mb-1 truncate pr-2">
                          {activity.name}
                        </div>
                        <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 truncate opacity-70">
                            <span className="flex items-center gap-1.5 shrink-0">
                                <Calendar className="h-3.5 w-3.5 text-primary/60" />
                                {format(new Date(activity.date), "dd/MM/yyyy", { locale: vi })}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-border" />
                            <span className="flex items-center gap-1.5 min-w-0 truncate">
                                <MapPin className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                                <span className="truncate">{activity.location || "Việt Nam"}</span>
                            </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats Section */}
                    <div className="flex items-center gap-4 bg-secondary/80 px-6 py-5 rounded-[2rem] border border-border/50 w-[24rem] lg:w-[28rem] xl:w-[32rem] flex-shrink-0 justify-between transition-all group-hover:bg-white group-hover:shadow-2xl group-hover:border-primary/10 ml-auto shadow-inner">
                      {/* TYPE (RUN) */}
                      <div className="text-center min-w-[6rem]">
                        <div className="text-lg font-black text-foreground uppercase italic tracking-tighter">
                          RUN
                        </div>
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 pr-1">
                          Hình thức
                        </div>
                      </div>

                      <div className="w-px h-6 bg-border" />

                      {/* DISTANCE */}
                      <div className="text-center min-w-[5rem]">
                        <div className="font-display font-black text-foreground text-2xl tabular-nums leading-none">
                          {activity.distanceKm.toFixed(1)}
                        </div>
                        <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1 italic pr-1">
                          KM
                        </div>
                      </div>

                      <div className="w-px h-6 bg-border" />

                      {/* PACE */}
                      <div className="text-center min-w-[5rem]">
                        <div className="font-display font-black text-accent text-2xl tabular-nums leading-none">
                          {activity.pace ? activity.pace.replace(' /km', '') : "0:00"}
                        </div>
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 italic pr-1">
                          PACE
                        </div>
                      </div>

                      <div className="w-px h-6 bg-border" />

                      {/* STATUS (Valid) */}
                      <div className="text-center min-w-[6rem] flex flex-col items-center">
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span className="uppercase tracking-[0.05em] whitespace-nowrap">Hợp lệ</span>
                        </div>
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 pr-2">
                           Trạng thái
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AthleteDetail;
