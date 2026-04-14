import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import { CountdownBar } from "@/components/landing/CountdownBar";
import { motion } from "framer-motion";
import { useCampaignStats } from "@/hooks/useCampaign";

const Landing = () => {
  // Pre-fetch data at top level so API calls happen immediately
  const { data: campaignStats } = useCampaignStats();

  return (
    <div className="min-h-screen gradient-dark relative flex flex-col font-body">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]" style={{ background: "hsl(142, 72%, 35%)" }} />
        <div className="absolute bottom-0 right-[-60px] w-[450px] h-[450px] rounded-full opacity-10 blur-[120px]" style={{ background: "hsl(25, 80%, 55%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-5 blur-[140px]" style={{ background: "hsl(160, 55%, 40%)" }} />
      </div>

      {/* Global top countdown */}
      <div className="relative z-[100] w-full font-display">
        <CountdownBar />
      </div>
      
      <div className="flex flex-col w-full flex-grow relative z-10 pt-24 md:pt-32">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "easeInOut" }}
        >
           <HeroSection stats={campaignStats} />
           <FeaturesSection />
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
