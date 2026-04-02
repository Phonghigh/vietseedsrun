import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">Season 2 Challenge Live Now</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6"
            style={{ color: "hsl(0, 0%, 96%)" }}
          >
            Push Your Limits.{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              Together.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 max-w-xl"
            style={{ color: "hsl(220, 14%, 65%)" }}
          >
            Join fitness challenges, sync your Strava data, compete on leaderboards, and crush goals with your team.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="gradient-hero border-0 text-primary-foreground font-display font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate("/dashboard")}
            >
              <Trophy className="mr-2 h-5 w-5" />
              Join Challenge
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-display font-semibold text-lg px-8 py-6 rounded-xl border-2"
              style={{ borderColor: "hsl(220, 14%, 30%)", color: "hsl(220, 14%, 75%)" }}
              onClick={() => navigate("/teams")}
            >
              <Users className="mr-2 h-5 w-5" />
              Create Team
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex items-center gap-8"
          >
            {[
              { value: "12K+", label: "Athletes" },
              { value: "850+", label: "Teams" },
              { value: "2.4M", label: "KM Tracked" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm" style={{ color: "hsl(220, 14%, 50%)" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
