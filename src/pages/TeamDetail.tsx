import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Users, 
  Trophy, 
  MapPin, 
  Activity as ActivityIcon, 
  TrendingUp,
  Loader2,
  ChevronRight,
  Star
} from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useTeamDetail } from "@/hooks/useLeaderboard";
import { Button } from "@/components/ui/button";

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: detail, isLoading } = useTeamDetail(id || "");

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-black uppercase tracking-widest">Đang tải sức mạnh đồng đội...</p>
        </div>
      </AppLayout>
    );
  }

  const team = detail?.team;
  const members = detail?.members || [];
  const teamName = team?.name || "Đội nhóm";

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
          Quay lại Bảng Đội Nhóm
        </Button>

        {/* Team Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3.5rem] p-12 md:p-16 relative overflow-hidden shadow-2xl border border-border"
        >
          <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-4 border-white p-1 bg-secondary shadow-2xl relative group">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-4xl font-black text-primary uppercase italic group-hover:scale-110 transition-transform duration-500">
                <img
                  src="/favicon.ico"
                  alt="Logo"
                  // className={className}
                  // style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]" />
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
                <h1 className="font-display text-5xl md:text-6xl font-black text-foreground tracking-tight leading-none uppercase italic">
                  {teamName}
                </h1>
                <div className="px-5 py-2 bg-accent/10 border border-accent/20 rounded-full w-fit mx-auto md:mx-0 shadow-sm ring-4 ring-accent/5 flex items-center gap-3">
                  <Star className="h-4 w-4 text-accent fill-accent" />
                  <span className="text-xs font-black text-accent uppercase tracking-widest leading-none">
                    Hạng {team?.rank || "-"}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-6">
                <p className="text-muted-foreground font-black text-sm flex items-center gap-2 uppercase tracking-widest">
                  <Users className="h-5 w-5 text-primary/60" />{" "}
                  {team?.memberCount || 0} Thành viên
                </p>
                <div className="w-2 h-2 rounded-full bg-border" />
                <p className="text-muted-foreground font-black text-sm flex items-center gap-2 uppercase tracking-widest">
                  <TrendingUp className="h-5 w-5 text-accent/60" />
                  Xếp hạng toàn đoàn
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              label: "Tổng tích lũy",
              value: `${team?.totalDistance?.toFixed(1) || 0} km`,
              icon: MapPin,
              color: "text-primary",
            },
            {
              label: "Số KM Trung bình",
              value: `${((team?.totalDistance || 0) / (team?.memberCount || 1)).toFixed(1)} km`,
              icon: ActivityIcon,
              color: "text-accent",
            },
            {
              label: "Vị trí hiện tại",
              value: `#${team?.rank || 0}`,
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

        {/* Members List */}
        <div className="space-y-8">
          <div className="flex items-center gap-6 px-4">
            <h2 className="font-display text-3xl font-black text-foreground tracking-tight uppercase italic">
              Bảng vàng thành viên
            </h2>
            <div className="h-[2px] flex-1 bg-border/50 rounded-full" />
          </div>

          <div className="space-y-4">
            {members.length === 0 ? (
              <div className="bg-white rounded-[3.5rem] py-24 text-center flex flex-col items-center gap-6 border border-border shadow-xl">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-muted-foreground/30 shadow-inner">
                  <Users className="h-10 w-10" />
                </div>
                <p className="text-muted-foreground font-black uppercase tracking-[0.2em]">
                  Chưa có thành viên nào
                </p>
              </div>
            ) : (
              <>
                {members.map((member, i) => (
                  <motion.div
                    key={member.userId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{
                      scale: 1.025,
                      y: -5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      },
                    }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/athlete/${member.userId}`)}
                    className="flex items-center justify-between px-10 py-6 bg-white rounded-[2rem] border border-border shadow-md cursor-pointer group hover:shadow-2xl hover:border-primary/30 transition-all transform-gpu will-change-transform"
                  >
                    {/* Left: Member Info */}
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <span className="font-display font-black text-foreground/20 w-8 text-right text-xl group-hover:text-primary transition-colors italic tabular-nums flex-shrink-0">
                        {member.rankInTeam}
                      </span>

                      <div className="w-16 h-16 rounded-2xl bg-secondary overflow-hidden border-2 border-white shadow-md relative flex-shrink-0">
                        {member.avatar ? (
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src =
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`;
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg font-black text-primary/40">
                            {member.name.substring(0, 1)}
                          </div>
                        )}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-black text-foreground group-hover:text-primary transition-colors text-lg uppercase italic tracking-tight mb-1 truncate">
                          {member.name}
                        </div>
                        {/* <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 opacity-70">
                            Thành viên chính thức
                        </div> */}
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex items-center gap-8 ml-auto">
                      <div className="text-right">
                        <div className="font-display font-black text-foreground text-2xl tabular-nums leading-none">
                          {member.distance.toFixed(1)}
                        </div>
                        <div className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1 italic">
                          KM
                        </div>
                      </div>

                      <div className="w-px h-8 bg-border/50" />

                      <div className="text-right min-w-[3rem]">
                        <div className="font-display font-black text-foreground text-2xl tabular-nums leading-none">
                          {member.activitiesCount}
                        </div>
                        <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 italic">
                          H.ĐỘNG
                        </div>
                      </div>

                      <div className="p-2 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
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

export default TeamDetail;
