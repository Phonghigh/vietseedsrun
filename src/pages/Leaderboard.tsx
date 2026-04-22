import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Loader2, Users, Search, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import AppLayout from "@/components/layout/AppLayout";
import { useIndividualLeaderboard, useTeamLeaderboard } from "@/hooks/useLeaderboard";
import { useDebounce } from "@/hooks/useDebounce";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const TrendIcon = ({ trend }: { trend: number }) => {
  if (trend > 0) {
    return (
      <div className="flex items-center gap-1.5 text-[11px] font-black text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
        <TrendingUp className="h-3 w-3" />
        <span>+{trend.toFixed(1)}</span>
      </div>
    );
  }
  return <Minus className="h-4 w-4 text-muted-foreground/30" />;
};

const medalColors = ["bg-primary", "bg-slate-400", "bg-orange-400"];

const Leaderboard = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamRegion, setTeamRegion] = useState("all");
  
  const debouncedSearch = useDebounce(searchQuery, 500);
  
  const { data: leaderboardIndividual, isLoading: isIndLoading } = useIndividualLeaderboard(page, limit === -1 ? 1000 : limit, filter, debouncedSearch);
  const { data: leaderboardTeams, isLoading: isTeamLoading } = useTeamLeaderboard(page, limit === -1 ? 1000 : limit, filter);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); 
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-10 pb-24">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b border-border/50 pb-6 md:pb-8 px-4 md:px-0">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-none uppercase italic">
              Bảng <span className="text-primary">Xếp Hạng</span>
            </h1>
            <p className="text-muted-foreground font-bold mt-2 md:mt-3 text-[10px] md:text-sm uppercase tracking-wide">Những đôi chân không biết mỏi - Vinh danh những nỗ lực không ngừng</p>
          </div>
          
          <div className="flex gap-2 bg-secondary p-1 rounded-xl md:rounded-2xl border border-border/50 shadow-sm overflow-x-auto no-scrollbar md:overflow-visible">
            {["all", "week", "month"].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setPage(1); }}
                className={`px-4 md:px-6 py-2 md:py-2.5 text-[10px] md:text-xs rounded-lg md:rounded-xl font-black transition-all uppercase tracking-widest whitespace-nowrap flex-1 md:flex-none ${
                  filter === f ? "bg-primary text-white shadow-xl scale-105" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "Tất cả" : f === "week" ? "Tuần" : "Tháng"}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="individual" className="space-y-10" onValueChange={() => setPage(1)}>
          <div className="flex items-center justify-center md:justify-between px-4 md:px-0">
            <TabsList className="bg-secondary border border-border/50 p-1 md:p-1.5 h-12 md:h-14 rounded-xl md:rounded-2xl w-full md:w-fit">
              <TabsTrigger value="individual" className="flex-1 md:flex-none rounded-lg md:rounded-xl px-4 md:px-10 h-full font-black uppercase text-[10px] md:text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm transition-all italic">
                Cá nhân
              </TabsTrigger>
              <TabsTrigger value="team" className="flex-1 md:flex-none rounded-lg md:rounded-xl px-4 md:px-10 h-full font-black uppercase text-[10px] md:text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white shadow-sm transition-all italic">
                Đội nhóm
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="individual" className="space-y-10 outline-none">
            {isIndLoading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-6">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-black uppercase tracking-widest animate-pulse">Đang nạp dữ liệu cá nhân...</p>
              </div>
            ) : (
              <>
                {/* Individual Top 3 Podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {(Array.isArray(leaderboardIndividual) ? leaderboardIndividual : []).slice(0, 3).map((u, i) => (
                    <Link to={`/athlete/${u.userId || u._id || u.id}`} key={u.userId || u._id || u.id} className="h-full px-4 md:px-0">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 text-center border transition-all duration-500 relative overflow-hidden group h-full shadow-2xl ${
                          i === 0 ? "border-primary/30 ring-4 ring-primary/5 md:scale-105 z-10" : "border-border hover:border-primary/20"
                        }`}
                      >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity bg-primary`} />
                        <div className={`w-16 h-16 rounded-[2rem] ${medalColors[i]} flex items-center justify-center mx-auto mb-6 text-white shadow-xl relative z-10 transform group-hover:rotate-12 transition-transform duration-500`}>
                          {i === 0 ? <Trophy className="h-8 w-8" /> : <Medal className="h-8 w-8" />}
                        </div>
                        <div className="font-display font-black text-foreground group-hover:text-primary transition-colors text-xl uppercase tracking-tight italic relative z-10 mb-2 px-3 overflow-hidden text-ellipsis whitespace-nowrap">
                          {u.name.replace(/-/g, ' ').replace(/\s+/g, ' ').trim()}
                        </div>
                        <div className="text-primary font-display text-4xl font-black relative z-10 mb-4 tabular-nums">
                          {u.distance.toLocaleString()} <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">km</span>
                        </div>
                        <div className="flex items-center justify-center gap-4 relative z-10 pt-6 border-t border-border/50">
                          <div className="text-center">
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Hoạt động</div>
                            <div className="text-sm font-black text-foreground">{u.activities || 0}</div>
                          </div>
                          <div className="w-px h-8 bg-border" />
                          <div className="text-center">
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Pace tb</div>
                            <div className="text-sm font-black text-accent">{u.pace || "0:00"}</div>
                          </div>
                        </div>
                        {i === 0 && <div className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Nhà vô địch</div>}
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Individual Control Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 md:px-0">
                  <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                    <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-start">
                      <span className="text-[10px] md:text-[12px] uppercase font-black text-foreground/40 tracking-wider md:tracking-[0.2em]">Hiển thị:</span>
                      <div className="flex bg-secondary rounded-lg md:rounded-xl p-1 border border-border/50 shadow-inner overflow-x-auto no-scrollbar">
                        {[5, 10, 20, 50, -1].map((l) => (
                          <button
                            key={l}
                            onClick={() => handleLimitChange(l)}
                            className={`px-4 py-1.5 text-[11px] font-black rounded-lg transition-all ${
                              limit === l ? "bg-primary text-white shadow-xl" : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {l === -1 ? "TẤT CẢ" : l}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative flex items-center w-full sm:w-auto">
                      <AnimatePresence>
                        {isSearchOpen ? (
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            style={{ minWidth: isSearchOpen ? (typeof window !== 'undefined' && window.innerWidth < 640 ? '100%' : '300px') : '0' }}
                            exit={{ width: 0, opacity: 0 }}
                            className="relative flex-1 sm:flex-none"
                          >
                            <Input
                              autoFocus
                              placeholder="Tìm tên..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="glass-premium h-10 md:h-11 pl-9 pr-9 rounded-xl border-white/40 shadow-glass font-bold text-xs md:text-sm tracking-wide"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-primary" />
                            <button 
                              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                              <X className="h-3.5 w-3.5 text-muted-foreground" />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsSearchOpen(true)}
                            className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-sm w-full sm:w-10 md:w-11"
                          >
                            <Search className="h-4 w-4 md:h-5 md:w-5" />
                            <span className="ml-2 text-xs font-black uppercase tracking-widest sm:hidden">Tìm kiếm</span>
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-center">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-xl bg-white border border-border shadow-sm text-[10px] md:text-[12px] font-black text-foreground hover:bg-secondary disabled:opacity-20 transition-all uppercase tracking-widest"
                    >
                      Trước
                    </button>
                    <div className="px-4 md:px-5 py-2 rounded-xl bg-primary text-white text-[10px] md:text-[12px] font-black min-w-[2.5rem] md:min-w-[3rem] text-center shadow-xl ring-2 ring-primary/5 tabular-nums">
                      {page}
                    </div>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={(Array.isArray(leaderboardIndividual) ? leaderboardIndividual : []).length < (limit === -1 ? 1000 : limit)}
                      className="flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-xl bg-white border border-border shadow-sm text-[10px] md:text-[12px] font-black text-foreground hover:bg-secondary disabled:opacity-20 transition-all uppercase tracking-widest"
                    >
                      Sau
                    </button>
                  </div>
                </div>

                {/* Individual Ranking Table */}
                <div className="space-y-4">
                  {(Array.isArray(leaderboardIndividual) ? leaderboardIndividual : []).length === 0 ? (
                    <div className="bg-white rounded-[3rem] py-24 text-center text-muted-foreground font-black uppercase tracking-[0.2em] border border-border shadow-xl">Chưa có dữ liệu vận động viên</div>
                  ) : (
                    <>
                      {leaderboardIndividual?.map((u, i) => (
                        <Link to={`/athlete/${u.userId || u._id || u.id}`} key={u.userId || u._id || u.id} className="block px-4 md:px-0">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.01, y: -2, zIndex: 10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 md:p-6 lg:px-10 lg:py-6 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-border shadow-md cursor-pointer group hover:shadow-2xl hover:border-primary/30 transition-all duration-300 gap-4 lg:gap-0"
                          >
                            <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                              <span className="font-display font-black text-foreground/20 w-6 md:w-8 text-right text-base md:text-xl group-hover:text-primary transition-colors italic tabular-nums flex-shrink-0">
                                {u.rank}
                              </span>
                              <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-secondary flex items-center justify-center text-xs md:text-sm font-black text-primary border-2 border-white shadow-md overflow-hidden relative flex-shrink-0">
                                {u.avatar ? (
                                  <img 
                                    src={u.avatar} 
                                    alt="" 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover" 
                                    onError={(e) => {
                                      (e.target as any).src = `https://ui-avatars.com/api/?name=${u.name}&background=random`;
                                    }} 
                                  />
                                ) : (
                                  u.name.substring(0, 2).toUpperCase()
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-black text-foreground group-hover:text-primary transition-colors text-sm md:text-lg uppercase italic tracking-tight mb-0.5 md:mb-1 truncate pr-2">
                                  {u.name.replace(/-/g, ' ').replace(/\s+/g, ' ').trim()}
                                </div>
                                <div className="text-[9px] md:text-[11px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 truncate opacity-70">
                                   VietSeeds Runner
                                </div>
                              </div>
                              <div className="lg:hidden flex items-center gap-2 ml-auto">
                                <TrendIcon trend={u.trend} />
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 bg-secondary/40 md:bg-secondary/80 px-4 py-3 md:px-6 md:py-5 rounded-xl md:rounded-[2rem] border border-border/50 lg:w-[32rem] flex-shrink-0 transition-all group-hover:bg-white group-hover:shadow-xl">
                              <div className="text-center flex-1 lg:min-w-[6rem]">
                                <div className="text-xs md:text-lg font-black text-foreground tabular-nums">{u.activities || 0}</div>
                                <div className="text-[7px] md:text-[9px] font-black text-muted-foreground uppercase tracking-wider md:tracking-[0.2em] mt-0.5">Hoạt động</div>
                              </div>
                              <div className="w-px h-4 md:h-6 bg-border" />
                              <div className="text-center flex-1 lg:min-w-[5rem]">
                                <div className="font-display font-black text-foreground text-sm md:text-2xl tabular-nums leading-none">{u.distance.toLocaleString()}</div>
                                <div className="text-[7px] md:text-[9px] font-black text-primary uppercase tracking-wider md:tracking-[0.2em] mt-0.5 italic">KM</div>
                              </div>
                              <div className="w-px h-4 md:h-6 bg-border" />
                              <div className="text-center flex-1 lg:min-w-[5rem]">
                                <div className="font-display font-black text-accent text-sm md:text-2xl tabular-nums leading-none">{u.pace || "0:00"}</div>
                                <div className="text-[7px] md:text-[9px] font-black text-muted-foreground uppercase tracking-wider md:tracking-[0.2em] mt-0.5 italic">PACE</div>
                              </div>
                              <div className="hidden lg:flex w-px h-6 bg-border" />
                              <div className="hidden lg:flex text-center min-w-[6rem] flex flex-col items-center">
                                <TrendIcon trend={u.trend} />
                                <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 pr-2">H.Trình 24h</div>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-10 outline-none">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
              <div className="flex items-center gap-6">
                <span className="text-[12px] uppercase font-black text-foreground/40 tracking-[0.2em]">Khu vực:</span>
                <div className="flex bg-secondary rounded-xl p-1.5 border border-border/50 shadow-inner">
                  {[
                    { id: "all", label: "TẤT CẢ" },
                    { id: "bac", label: "MIỀN BẮC" },
                    { id: "trung", label: "MIỀN TRUNG" },
                    { id: "nam", label: "MIỀN NAM" }
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setTeamRegion(r.id)}
                      className={`px-4 py-1.5 text-[11px] font-black rounded-lg transition-all ${
                        teamRegion === r.id ? "bg-primary text-white shadow-xl" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isTeamLoading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-6">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-black uppercase tracking-widest animate-pulse">Đang nạp dữ liệu đội nhóm...</p>
              </div>
            ) : (
              <>
                {/* Team Podium */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {(Array.isArray(leaderboardTeams) ? leaderboardTeams : []).filter(t => t.name !== "No Team").slice(0, 3).map((t, i) => (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`bg-white rounded-[3rem] p-10 text-center border transition-all duration-500 relative overflow-hidden group h-full shadow-2xl ${
                        i === 0 ? "border-primary/30 ring-4 ring-primary/5 scale-105 z-10" : "border-border hover:border-primary/20"
                      }`}
                    >
                      <div className={`absolute inset-0 opacity-[0.02] bg-primary`} />
                      <div className={`w-16 h-16 rounded-[2rem] ${medalColors[i]} flex items-center justify-center mx-auto mb-6 text-white shadow-xl relative z-10`}>
                        <Users className="h-8 w-8" />
                      </div>
                      <div className="font-display font-black text-foreground group-hover:text-primary transition-colors text-xl uppercase tracking-tight italic truncate relative z-10 mb-2">
                        {t.name}
                      </div>
                      <div className="text-primary font-display text-4xl font-black relative z-10 mb-4 tabular-nums">
                        {t.totalDistance?.toFixed(1) || 0} <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">km</span>
                      </div>
                      <div className="text-sm font-black text-foreground bg-secondary py-2 px-6 rounded-full inline-block relative z-10 border border-border shadow-sm uppercase tracking-widest">
                        {t.memberCount} Thành viên
                      </div>
                      {i === 0 && <div className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Đội xuất sắc</div>}
                    </motion.div>
                  ))}
                </div>

                {/* Team Ranking Table */}
                <div className="space-y-5">
                  {(Array.isArray(leaderboardTeams) ? leaderboardTeams : []).filter(t => t.name !== "No Team").length === 0 ? (
                    <div className="bg-white rounded-[3rem] py-24 text-center text-muted-foreground font-black uppercase tracking-[0.2em] border border-border shadow-xl">Chưa có dữ liệu đội nhóm</div>
                  ) : (
                    <>
                      {(Array.isArray(leaderboardTeams) ? leaderboardTeams : [])
                    .filter(t => t.name !== "No Team")
                    .filter(t => {
                      if (teamRegion === "all") return true;
                      const name = t.name.toLowerCase();
                      if (teamRegion === "bac") return name.includes("bac") || name.includes("hanoi") || name.includes("ha noi");
                      if (teamRegion === "trung") return name.includes("trung") || name.includes("da nang") || name.includes("hue");
                      if (teamRegion === "nam") return name.includes("nam") || name.includes("hcm") || name.includes("sai gon");
                      return true;
                    })
                    .map((t, i) => (
                        <motion.div
                          key={t.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02, y: -4, zIndex: 10 }}
                          className="flex items-center justify-between px-10 py-8 bg-white rounded-[2rem] border border-border shadow-md transition-all group cursor-pointer hover:shadow-2xl hover:border-primary/30 transform-gpu will-change-transform"
                        >
                          <div className="flex items-center gap-8">
                            <span className="font-display font-black text-foreground/20 w-10 text-right text-xl group-hover:text-primary transition-colors italic tabular-nums">
                              {t.rank}
                            </span>
                            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-lg font-black text-primary border-2 border-white shadow-md uppercase">
                              {t.name.substring(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-black text-foreground group-hover:text-primary transition-colors text-xl uppercase italic leading-none mb-2 truncate pr-2">
                                {t.name}
                              </div>
                              <div className="text-[12px] font-black text-muted-foreground uppercase tracking-widest italic opacity-60 truncate">
                                Nhóm runner công ty • {t.memberCount} thành viên
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-12">
                             <div className="flex flex-col items-end">
                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Thành viên</div>
                                <div className="text-sm font-black text-foreground">{t.memberCount}</div>
                             </div>
                             <div className="w-px h-10 bg-border" />
                             <div className="text-right min-w-[8rem]">
                               <div className="font-display font-black text-primary text-3xl leading-none tabular-nums truncate max-w-[120px]">{t.totalDistance?.toFixed(1) || 0}</div>
                               <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-1 italic pr-1">TỔNG KM</div>
                             </div>
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
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
