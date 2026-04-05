import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import { CountdownBar } from "@/components/landing/CountdownBar";
import { LandingDashboardPreview } from "@/components/landing/LandingDashboardPreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useCampaignStats } from "@/hooks/useCampaign";
import { useIndividualLeaderboard } from "@/hooks/useLeaderboard";

const Landing = () => {
  // Pre-fetch data at top level so API calls happen immediately
  const { data: campaignStats } = useCampaignStats();
  const { data: leaderboard } = useIndividualLeaderboard(1, 4);

  return (
    <div className="min-h-screen gradient-dark relative overflow-hidden flex flex-col font-body">
      {/* Background elements that span across tabs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(142, 72%, 35%)" }} />
        <div className="absolute bottom-0 right-[-60px] w-[450px] h-[450px] rounded-full opacity-10 blur-[120px]" style={{ background: "hsl(25, 80%, 55%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-5 blur-[140px]" style={{ background: "hsl(160, 55%, 40%)" }} />
      </div>

      {/* Global top countdown that is part of the full screen visual */}
      <div className="relative z-10 w-full">
        <CountdownBar />
      </div>
      
      <div className="flex flex-col w-full flex-grow relative z-10">
        <Tabs defaultValue="intro" className="w-full h-full flex flex-col items-center">
          {/* The Tabs bar is overlaid on top of the hero section so it flows seamlessly */}
          <div className="absolute top-6 flex justify-center z-50 w-full">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              <TabsList className="grid w-[420px] grid-cols-2 bg-white/60 backdrop-blur-xl p-1.5 rounded-full border border-primary/10 shadow-2xl shadow-primary/5">
                <TabsTrigger 
                  value="intro" 
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/60 hover:text-foreground font-bold transition-all duration-300 uppercase tracking-tight italic"
                >
                  Giới thiệu
                </TabsTrigger>
                <TabsTrigger 
                  value="dashboard"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground/60 hover:text-foreground font-bold transition-all duration-300 uppercase tracking-tight italic"
                >
                  Cộng đồng & Tracking
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>

          <div className="relative flex-grow">
            <TabsContent value="intro" className="m-0 focus-visible:outline-none focus-visible:ring-0 w-full h-full">
              <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                 <HeroSection stats={campaignStats} />
                 <FeaturesSection />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="dashboard" className="m-0 focus-visible:outline-none focus-visible:ring-0 w-full h-full">
              <motion.div
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <LandingDashboardPreview />
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Landing;
