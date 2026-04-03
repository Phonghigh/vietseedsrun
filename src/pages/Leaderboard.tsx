import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus, Medal, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/components/layout/AppLayout";
import { useIndividualLeaderboard, useTeamLeaderboard } from "@/hooks/useLeaderboard";

const TrendIcon = ({ trend }: { trend: string }) => {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-accent" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const medalColors = ["gradient-hero", "bg-muted-foreground/60", "bg-chart-orange/60"];

const Leaderboard = () => {
  const [filter, setFilter] = useState("all");
  const { data: leaderboardIndividual, isLoading: isIndLoading } = useIndividualLeaderboard(1, 50);
  const { data: leaderboardTeams, isLoading: isTeamLoading } = useTeamLeaderboard(1, 50);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Bảng Xếp Hạng</h1>
          <p className="text-muted-foreground text-sm">Theo dõi thành tích của các vận động viên</p>
        </div>

        <Tabs defaultValue="individual" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="individual">Cá nhân</TabsTrigger>
              <TabsTrigger value="team">Đội nhóm</TabsTrigger>
            </TabsList>
            <div className="flex gap-1">
              {["all", "week", "month"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                    filter === f ? "gradient-hero text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {f === "all" ? "Tất cả" : f === "week" ? "Tuần này" : "Tháng này"}
                </button>
              ))}
            </div>
          </div>

          <TabsContent value="individual" className="space-y-4">
            {isIndLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Đang tải bảng xếp hạng cá nhân...</p>
              </div>
            ) : (
              <>
                {/* Top 3 */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {leaderboardIndividual?.slice(0, 3).map((u, i) => (
                    <motion.div
                      key={u.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`glass-card rounded-xl p-5 text-center stat-glow ${i === 0 ? "ring-2 ring-primary/30" : ""}`}
                    >
                      <div className={`w-12 h-12 rounded-full ${medalColors[i]} flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold text-sm`}>
                        {i === 0 ? <Trophy className="h-5 w-5" /> : <Medal className="h-5 w-5" />}
                      </div>
                      <div className="font-display font-semibold text-foreground truncate">{u.name}</div>
                      <div className="text-primary font-display font-bold text-xl mt-1">{u.distance} km</div>
                      <div className="text-xs text-muted-foreground">{u.activities} hoạt động</div>
                    </motion.div>
                  ))}
                </div>

                {/* Table */}
                <div className="glass-card rounded-xl overflow-hidden">
                  {leaderboardIndividual?.map((u, i) => (
                    <motion.div
                      key={u.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-display font-bold text-muted-foreground w-6 text-right">
                          {u.rank}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground overflow-hidden">
                          {u.avatar ? (
                            <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" onError={(e) => {
                              (e.target as any).src = `https://ui-avatars.com/api/?name=${u.name}&background=random`;
                            }} />
                          ) : (
                            u.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <span className="font-medium text-foreground">{u.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-display font-semibold text-foreground">{u.distance} km</span>
                        <TrendIcon trend={u.trend} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            {isTeamLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Đang tải bảng xếp hạng đội...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {leaderboardTeams?.filter(t => t.name !== "No Team").slice(0, 3).map((t, i) => (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`glass-card rounded-xl p-5 text-center stat-glow ${i === 0 ? "ring-2 ring-primary/30" : ""}`}
                    >
                      <div className={`w-12 h-12 rounded-full ${medalColors[i]} flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold text-sm`}>
                        {t.avatar ? <span className="uppercase text-lg">{t.avatar}</span> : <Trophy className="h-5 w-5" />}
                      </div>
                      <div className="font-display font-semibold text-foreground truncate">{t.name}</div>
                      <div className="text-primary font-display font-bold text-xl mt-1">{t.totalDistance?.toFixed(1) || 0} km</div>
                      <div className="text-xs text-muted-foreground">{t.memberCount} thành viên</div>
                    </motion.div>
                  ))}
                </div>

                <div className="glass-card rounded-xl overflow-hidden">
                  {leaderboardTeams?.filter(t => t.name !== "No Team").map((t, i) => (
                    <div
                      key={t.name}
                      className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-display font-bold text-muted-foreground w-6 text-right">{t.rank}</span>
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {t.avatar || t.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{t.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{t.memberCount} thành viên</span>
                        </div>
                      </div>
                      <span className="font-display font-semibold text-foreground">{t.totalDistance?.toFixed(1) || 0} km</span>
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
