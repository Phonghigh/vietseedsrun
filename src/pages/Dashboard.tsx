import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { useCampaignStats } from "@/hooks/useCampaign";
import { useIndividualLeaderboard } from "@/hooks/useLeaderboard";
import CommunityHero from "@/components/dashboard/CommunityHero";
import VietnamJourney from "@/components/dashboard/VietnamJourney";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import NextMilestone from "@/components/dashboard/NextMilestone";
import TopRunnersPreview from "@/components/dashboard/TopRunnersPreview";
import CampaignInfo from "@/components/dashboard/CampaignInfo";

const Dashboard = () => {
  const { data: campaignStats, isLoading: isCampaignLoading } = useCampaignStats();
  const { data: leaderboard, isLoading: isLeaderboardLoading } = useIndividualLeaderboard(1, 10);

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
      <div className="max-w-6xl mx-auto space-y-10 pb-20">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-black text-foreground tracking-tight">Dashboard Cộng Đồng</h1>
          <p className="text-muted-foreground font-medium mt-1">Theo dõi nhịp đập của toàn thể runner VietSeeds</p>
        </motion.div>

        {/* 1. Hero — storytelling stats */}
        <CommunityHero
          currentKm={currentKm}
          targetKm={targetKm}
          totalRunners={totalRunners}
          totalActivities={totalActivities}
        />

        {/* 2. Vietnam Journey Map */}
        <VietnamJourney currentKm={currentKm} />

        {/* 3. Bottom grid: Leaderboard + Feed + Milestone + Info */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Leaderboard */}
          <div className="lg:col-span-2">
            <TopRunnersPreview
              runners={leaderboard || []}
              isLoading={isLeaderboardLoading}
            />
          </div>

          {/* Right: Milestone + Feed + Info */}
          <div className="space-y-8">
            <NextMilestone currentKm={currentKm} />
            <ActivityFeed
              runners={leaderboard || []}
              isLoading={isLeaderboardLoading}
            />
            <CampaignInfo />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
