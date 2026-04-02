import { motion } from "framer-motion";
import { Activity, BarChart3, Trophy, Users, Zap, Shield } from "lucide-react";

const features = [
  { icon: Activity, title: "Strava Sync", desc: "Auto-sync your runs, rides, and activities in real-time" },
  { icon: Trophy, title: "Challenges", desc: "Compete in distance, elevation, and activity challenges" },
  { icon: BarChart3, title: "Live Rankings", desc: "Real-time leaderboards for individuals and teams" },
  { icon: Users, title: "Team Play", desc: "Create teams, invite friends, and crush goals together" },
  { icon: Zap, title: "Insights", desc: "Track trends, milestones, and personal bests" },
  { icon: Shield, title: "Achievements", desc: "Earn badges and unlock rewards as you progress" },
];

const FeaturesSection = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          Everything You Need to Compete
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Built for athletes who thrive on competition and community
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6 hover:stat-glow transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
