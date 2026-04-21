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
import TopRunnersPreview from "@/components/dashboard/TopRunnersPreview";

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
      <div className="max-w-[1400px] mx-auto space-y-12 md:space-y-20 pb-32">
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
        <CommunityHero
          currentKm={currentKm}
          targetKm={targetKm}
          totalRunners={totalRunners}
          totalActivities={totalActivities}
        />

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
            <TopRunnersPreview runners={leaderboard || []} isLoading={isLeaderboardLoading} />
            
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
