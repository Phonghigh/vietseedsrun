import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, MapPin, Users, Zap, Trophy, Activity, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CampaignStats } from "@/api/campaignService";

interface HeroSectionProps {
  stats?: CampaignStats;
}

const HeroSection = ({ stats }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Deep forest gradient background */}
      <div className="absolute inset-0 gradient-dark" />

      {/* Atmospheric refined glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "hsl(142, 45%, 32%)" }}
        />
        <div
          className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-10 blur-[130px]"
          style={{ background: "hsl(20, 65%, 55%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5 blur-[150px]"
          style={{ background: "hsl(160, 40%, 25%)" }}
        />
      </div>

      {/* Soft animated track lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${15 + i * 14}%`,
              background: "linear-gradient(90deg, transparent 0%, hsl(142,45%,50%) 50%, transparent 100%)",
              transform: `rotate(${-2 + i * 0.5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">

        {/* Refined Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8 backdrop-blur-md"
        >
          <span className="h-2 w-2 rounded-full animate-pulse-glow bg-primary" />
          <span className="text-sm font-medium tracking-wide text-primary-foreground/70">
            🏃 {stats ? `Đã có ${stats.totalRunners.toLocaleString()} người tham gia` : "Thử thách đang diễn ra"} · 01/04 – 30/04/2026
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4"
        >
          <div className="font-display text-sm md:text-base font-bold tracking-[0.4em] uppercase mb-4 text-accent/80">
            VietSeeds Foundation
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.85]">
            <span className="text-white/95">VIETSEEDS</span>
            <br />
            <span className="shimmer-text">RUN 2026</span>
          </h1>
          <div className="font-display text-lg md:text-xl font-bold tracking-[0.5em] uppercase mt-6 text-primary/80">
            — RUN TO GROW —
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mt-8 mb-12 leading-relaxed text-muted-foreground/90 font-medium"
        >
          Hành trình vạn dặm bắt đầu từ một bước chân. Chúng ta không chạy đua với nhau —{" "}
          <span className="text-primary/90 font-bold underline underline-offset-8 decoration-primary/30">
            chúng ta chạy cùng nhau
          </span>{" "}
          để phá vỡ giới hạn của chính mình!
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-5 mb-16"
        >
          <a
            href="https://forms.gle/CzRYgy8EbGUkR2WGA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              id="hero-register-btn"
              className="gradient-hero border-0 text-white font-display font-bold text-lg px-10 py-7 rounded-2xl shadow-2xl green-glow hover:scale-[1.03] transition-all duration-300 active:scale-95"
            >
              <Zap className="mr-2 h-5 w-5 fill-white" />
              ĐĂNG KÝ NGAY
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>

          <Button
            size="lg"
            className="font-display font-bold text-lg px-8 py-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white shadow-xl"
            onClick={() => navigate('/dashboard')}
          >
            <Activity className="mr-2 h-5 w-5 text-primary" />
            XEM DASHBOARD
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="font-display font-bold text-lg px-8 py-7 rounded-2xl border-white/5 bg-transparent hover:bg-white/5 transition-all duration-300 text-muted-foreground"
            onClick={() => navigate('/leaderboard')}
          >
            <Trophy className="mr-2 h-5 w-5 text-accent" />
            Bảng Xếp Hạng
          </Button>
        </motion.div>

        {/* Event info chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {[
            { icon: Calendar, text: "01/04 – 30/04/2026", color: "text-primary" },
            { icon: MapPin, text: "Toàn quốc", color: "text-accent" },
            { icon: Users, text: stats ? `${stats.totalRunners.toLocaleString()} Vận động viên` : "Tất cả mọi người", color: "text-blue-400" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm shadow-sm"
            >
              <item.icon className={`h-4 w-4 ${item.color}`} />
              <span className="text-sm font-semibold tracking-wide text-muted-foreground">
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 md:gap-16 w-full max-w-2xl mx-auto border-t border-white/5 pt-12"
        >
          {[
            { value: stats ? `${stats.currentKm.toLocaleString()} km` : "0 km", label: "Tổng quãng đường", icon: Activity },
            { value: "30 ngày", label: "Thời gian thử thách", icon: Star },
            { value: "4'–15'", label: "Pace hợp lệ /km", icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="font-display text-2xl md:text-4xl font-extrabold mb-2 text-white group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-muted-foreground/60 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Khám phá</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
