import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { useIndividualLeaderboard, useTeamLeaderboard } from "@/hooks/useLeaderboard";

import { Link } from "react-router-dom";

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-accent" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const medalColors = ["gradient-hero", "bg-muted-foreground/60", "bg-chart-orange/60"];

const Leaderboard = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  
  const { data: leaderboardIndividual, isLoading: isIndLoading } = useIndividualLeaderboard(page, limit === -1 ? 1000 : limit);
  const { data: leaderboardTeams, isLoading: isTeamLoading } = useTeamLeaderboard(page, limit === -1 ? 1000 : limit);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-black text-white tracking-tight">Bảng Xếp Hạng</h1>
            <p className="text-muted-foreground font-medium mt-1">Hành trình bứt phá giới hạn của các runners</p>
          </div>
          <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
            {["all", "week", "month"].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                className={`px-4 py-1.5 text-xs rounded-lg font-bold transition-all uppercase tracking-wider ${
                  filter === f ? "bg-primary text-white shadow-lg" : "text-muted-foreground/60 hover:text-white"
                }`}
              >
                {f === "all" ? "Tất cả" : f === "week" ? "Tuần" : "Tháng"}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="individual" className="space-y-6" onValueChange={() => setPage(1)}>
          <TabsList className="bg-white/5 border border-white/10 p-1 h-12 rounded-2xl w-fit">
            <TabsTrigger value="individual" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Cá nhân</TabsTrigger>
            <TabsTrigger value="team" className="rounded-xl px-8 font-bold data-[state=active]:bg-primary data-[state=active]:text-white">Đội nhóm</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-4 outline-none">
            {isIndLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Đang tải bảng xếp hạng cá nhân...</p>
              </div>
            ) : (
              <>
                {/* Top 3 */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {(Array.isArray(leaderboardIndividual) ? leaderboardIndividual : []).slice(0, 3).map((u, i) => (
                    <Link to={`/athlete/${u.userId || u._id || u.id}`} key={u.userId || u._id || u.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass-card rounded-3xl p-6 text-center border border-white/5 shadow-2xl relative overflow-hidden group h-full ${i === 0 ? "ring-2 ring-primary/40" : ""}`}
                      >
                        <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${i === 0 ? 'bg-primary' : 'bg-white'}`} />
                        <div className={`w-14 h-14 rounded-2xl ${medalColors[i]} flex items-center justify-center mx-auto mb-4 text-white shadow-lg relative z-10`}>
                          {i === 0 ? <Trophy className="h-6 w-6" /> : <Medal className="h-6 w-6" />}
                        </div>
                        <div className="font-display font-bold text-white truncate relative z-10">{u.name}</div>
                        <div className="text-primary font-display text-2xl font-black mt-1 relative z-10">{u.distance} <span className="text-[10px] text-white/30 uppercase">km</span></div>
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1 relative z-10">{u.activities} hoạt động</div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Pagination above Individual Table */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Hiển thị:</span>
                    <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                      {[5, 10, 20, 50, -1].map((l) => (
                        <button
                          key={l}
                          onClick={() => handleLimitChange(l)}
                          className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                            limit === l ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {l === -1 ? "TẤT CẢ" : l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                    >
                      TRƯỚC
                    </button>
                    <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary min-w-[2.5rem] text-center">
                      {page}
                    </div>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={(Array.isArray(leaderboardIndividual) ? leaderboardIndividual : []).length < (limit === -1 ? 1000 : limit)}
                      className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                    >
                      TIẾP THEO
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                  {(Array.isArray(leaderboardIndividual) ? leaderboardIndividual : []).length === 0 ? (
                    <div className="py-20 text-center text-muted-foreground font-medium">Chưa có dữ liệu vận động viên</div>
                  ) : leaderboardIndividual?.map((u, i) => (
                    <Link to={`/athlete/${u.userId || u._id || u.id}`} key={u.userId || u._id || u.id} className="block">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center justify-between px-8 py-5 border-b border-white/5 hover:bg-white/[0.03] transition-all group"
                      >
                        <div className="flex items-center gap-6">
                          <span className="font-display font-black text-white/20 w-8 text-right text-lg group-hover:text-primary transition-colors">
                            {u.rank}
                          </span>
                          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xs font-bold text-white/40 overflow-hidden border border-white/10 p-0.5">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="w-full h-full object-cover rounded-xl" onError={(e) => {
                                (e.target as any).src = `https://ui-avatars.com/api/?name=${u.name}&background=random`;
                              }} />
                            ) : (
                              u.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white group-hover:text-primary transition-colors">{u.name}</div>
                            <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none mt-1">{u.activities} hoạt động</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <div className="font-display font-black text-white text-xl leading-none">{u.distance}</div>
                            <div className="text-[10px] font-bold text-white/20 uppercase tracking-tighter mt-1 text-right">km</div>
                          </div>
                          <div className="w-10 flex justify-center">
                            <TrendIcon trend={u.trend} />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-4 outline-none">
            {isTeamLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Đang tải bảng xếp hạng đội...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {(Array.isArray(leaderboardTeams) ? leaderboardTeams : []).filter(t => t.name !== "No Team").slice(0, 3).map((t, i) => (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`glass-card rounded-3xl p-6 text-center border border-white/5 shadow-2xl relative overflow-hidden group ${i === 0 ? "ring-2 ring-primary/40" : ""}`}
                    >
                      <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity ${i === 0 ? 'bg-primary' : 'bg-white'}`} />
                      <div className={`w-14 h-14 rounded-2xl ${medalColors[i]} flex items-center justify-center mx-auto mb-4 text-white shadow-lg relative z-10`}>
                        {t.avatar ? <span className="uppercase text-lg font-black">{t.avatar}</span> : <Trophy className="h-6 w-6" />}
                      </div>
                      <div className="font-display font-bold text-white truncate relative z-10">{t.name}</div>
                      <div className="text-primary font-display text-2xl font-black mt-1 relative z-10">{t.totalDistance?.toFixed(1) || 0} <span className="text-[10px] text-white/30 uppercase">km</span></div>
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1 relative z-10">{t.memberCount} thành viên</div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination above Team Table */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">Hiển thị:</span>
                    <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
                      {[5, 10, 20, 50, -1].map((l) => (
                        <button
                          key={l}
                          onClick={() => handleLimitChange(l)}
                          className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${
                            limit === l ? "bg-primary text-white shadow-lg" : "text-white/40 hover:text-white"
                          }`}
                        >
                          {l === -1 ? "TẤT CẢ" : l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                    >
                      TRƯỚC
                    </button>
                    <div className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black text-primary min-w-[2.5rem] text-center">
                      {page}
                    </div>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={(Array.isArray(leaderboardTeams) ? leaderboardTeams : []).length < (limit === -1 ? 1000 : limit)}
                      className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                    >
                      TIẾP THEO
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                  {(Array.isArray(leaderboardTeams) ? leaderboardTeams : []).filter(t => t.name !== "No Team").length === 0 ? (
                    <div className="py-20 text-center text-muted-foreground font-medium">Chưa có dữ liệu đội nhóm</div>
                  ) : leaderboardTeams?.filter(t => t.name !== "No Team").map((t, i) => (
                    <div
                      key={t.name}
                      className="flex items-center justify-between px-8 py-5 border-b border-white/5 hover:bg-white/[0.03] transition-all group"
                    >
                      <div className="flex items-center gap-6">
                        <span className="font-display font-black text-white/20 w-8 text-right text-lg group-hover:text-primary transition-colors">{t.rank}</span>
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-sm font-black text-white/40 border border-white/10 uppercase">
                          {t.avatar || t.name.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-white group-hover:text-primary transition-colors">{t.name}</div>
                          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none mt-1">{t.memberCount} thành viên</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-black text-white text-xl leading-none">{t.totalDistance?.toFixed(1) || 0}</div>
                        <div className="text-[10px] font-bold text-white/20 uppercase tracking-tighter mt-1 text-right">km</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Leaderboard;
