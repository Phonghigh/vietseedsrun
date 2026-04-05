import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { useCampaignStats } from "@/hooks/useCampaign";
import { useIndividualLeaderboard } from "@/hooks/useLeaderboard";
import CommunityHero from "@/components/dashboard/CommunityHero";
import VietnamJourney from "@/components/dashboard/VietnamJourney";
import VietnamHeatmapCard from "@/components/dashboard/VietnamHeatmapCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import CampaignInfo from "@/components/dashboard/CampaignInfo";
import ActivityTrend from "@/components/dashboard/ActivityTrend";

const Dashboard = () => {
  const { data: campaignStats, isLoading: isCampaignLoading } = useCampaignStats();
  const { data: leaderboard, isLoading: isLeaderboardLoading } = useIndividualLeaderboard(1, 5);

  const currentKm = campaignStats?.currentKm || 0;
  const targetKm = campaignStats?.targetKm || 10000;
  const totalRunners = campaignStats?.totalRunners || 0;
  const totalActivities = campaignStats?.totalActivities || 0;

  if (isCampaignLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-medium">Đang tải dữ liệu cộng đồng...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-[1400px] mx-auto space-y-20 pb-24">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 xl:px-0"
        >
          <h1 className="font-display text-4xl font-black text-foreground tracking-tight lg:text-5xl">Dashboard Cộng Đồng</h1>
          <p className="text-muted-foreground font-medium mt-2 text-lg">Theo dõi nhịp đập của toàn thể runner VietSeeds</p>
        </motion.div>

        {/* 1. HERO - Stat Bar */}
        <div className="px-4 xl:px-0">
          <CommunityHero
            currentKm={currentKm}
            targetKm={targetKm}
            totalRunners={totalRunners}
            totalActivities={totalActivities}
          />
        </div>

        {/* 2. JOURNEY MAP (Progress Focus) */}
        <div className="px-4 xl:px-0">
          <VietnamJourney currentKm={currentKm} />
        </div>

        {/* 3. HEATMAP SECTION */}
        <div className="px-4 xl:px-0">
          <VietnamHeatmapCard />
        </div>

        {/* 4. ACTIVITY & LEADERBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 xl:px-0">
          {/* LEFT: Activity Feed (8/12) */}
          <div className="lg:col-span-8">
            <ActivityFeed />
          </div>

          {/* RIGHT: Compact Leaderboard (4/12) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card rounded-[2.5rem] p-8 border border-white/5 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-xl font-black text-foreground uppercase tracking-tight">Bảng Vàng Cá Nhân</h3>
                <Link to="/leaderboard" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                  Xem toàn bộ <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              
              {isLeaderboardLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-14 rounded-2xl bg-muted/20 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {leaderboard?.map((runner, i) => (
                    <Link to={`/athlete/${runner.userId || runner._id || runner.id}`} key={runner.userId || i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-8 font-display font-black text-muted-foreground/30 text-lg italic tracking-widest">#{i+1}</div>
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-secondary flex-shrink-0 border-2 border-white shadow-md relative">
                        <img 
                          src={runner.avatar} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                          onError={(e) => {
                            (e.target as any).src = `https://ui-avatars.com/api/?name=${runner.name}&background=random`;
                          }}
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-black truncate group-hover:text-primary transition-colors uppercase tracking-tight leading-none mb-1.5">{runner.name}</div>
                        <div className="text-lg font-display font-black text-foreground leading-none flex items-baseline gap-1 tabular-nums">
                          {runner.distance.toLocaleString()} <span className="text-[10px] text-primary uppercase tracking-widest font-black italic">km</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <CampaignInfo />
          </div>
        </div>

        {/* 5. TREND CHART */}
        <div className="px-4 xl:px-0">
          <ActivityTrend />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
