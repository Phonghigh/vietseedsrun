import { motion } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, MapPin, Users, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Dark green background */}
      <div className="absolute inset-0 gradient-dark" />

      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "hsl(142, 72%, 35%)" }}
        />
        <div
          className="absolute bottom-0 right-[-60px] w-[450px] h-[450px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "hsl(25, 80%, 55%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-8 blur-[140px]"
          style={{ background: "hsl(160, 55%, 40%)" }}
        />
      </div>

      {/* Animated track lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${15 + i * 14}%`,
              background: "linear-gradient(90deg, transparent 0%, hsl(142,72%,50%) 50%, transparent 100%)",
              transform: `rotate(${-2 + i * 0.5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-8"
          style={{
            borderColor: "hsl(142, 72%, 35%, 0.4)",
            background: "hsl(142, 72%, 35%, 0.12)",
          }}
        >
          <span className="h-2 w-2 rounded-full animate-pulse-glow" style={{ background: "hsl(142, 72%, 50%)" }} />
          <span className="text-sm font-semibold tracking-wide" style={{ color: "hsl(142, 72%, 65%)" }}>
            🏃 Thử thách đang diễn ra · 01/04 – 30/04/2026
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4"
        >
          <div
            className="font-display text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(25, 80%, 65%)" }}
          >
            VietSeeds Foundation
          </div>
          <h1
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none"
            style={{ color: "hsl(0, 0%, 96%)" }}
          >
            VIETSEEDS
            <br />
            <span className="shimmer-text">RUN 2026</span>
          </h1>
          <div
            className="font-display text-xl md:text-2xl font-semibold tracking-widest uppercase mt-4"
            style={{ color: "hsl(142, 72%, 60%)" }}
          >
            — RUN TO GROW —
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mt-6 mb-10 leading-relaxed"
          style={{ color: "hsl(150, 14%, 70%)" }}
        >
          Hành trình vạn dặm bắt đầu từ một bước chân. Chúng ta không chạy đua với nhau —{" "}
          <span style={{ color: "hsl(142, 72%, 62%)" }} className="font-semibold">
            chúng ta chạy cùng nhau
          </span>{" "}
          để phá vỡ giới hạn của chính mình!
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href="https://forms.gle/CzRYgy8EbGUkR2WGA"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              id="hero-register-btn"
              className="gradient-hero border-0 text-white font-display font-bold text-lg px-10 py-6 rounded-2xl shadow-lg green-glow hover:scale-105 transition-transform duration-200"
            >
              <Zap className="mr-2 h-5 w-5" />
              ĐĂNG KÝ NGAY · MIỄN PHÍ
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://strava.app.link/zWjox1bNO1b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              id="hero-strava-btn"
              variant="outline"
              className="font-display font-semibold text-lg px-8 py-6 rounded-2xl border-2 hover:scale-105 transition-transform duration-200"
              style={{
                borderColor: "hsl(142, 72%, 35%, 0.5)",
                color: "hsl(142, 72%, 65%)",
                background: "hsl(142, 72%, 35%, 0.08)",
              }}
            >
              <Users className="mr-2 h-5 w-5" />
              Tham gia Group Strava
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            className="font-display font-semibold text-lg px-8 py-6 rounded-2xl border-2 hover:scale-105 transition-transform duration-200"
            style={{
              borderColor: "hsl(25, 80%, 55%, 0.5)",
              color: "hsl(25, 80%, 65%)",
              background: "hsl(25, 80%, 55%, 0.08)",
            }}
            onClick={() => navigate('/leaderboard')}
          >
            <Trophy className="mr-2 h-5 w-5" />
            Bảng Xếp Hạng
          </Button>
        </motion.div>

        {/* Event info chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {[
            { icon: Calendar, text: "01/04 – 30/04/2026" },
            { icon: MapPin, text: "Toàn quốc" },
            { icon: Users, text: "Tất cả mọi người" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "hsl(150, 30%, 12%)",
                border: "1px solid hsl(142, 30%, 22%)",
              }}
            >
              <item.icon className="h-4 w-4" style={{ color: "hsl(142, 72%, 55%)" }} />
              <span className="text-sm font-medium" style={{ color: "hsl(150, 14%, 75%)" }}>
                {item.text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 md:gap-16 w-full max-w-lg mx-auto"
        >
          {[
            { value: "30 km", label: "Tối thiểu để nhận E-Certificate" },
            { value: "30 ngày", label: "Thời gian thử thách" },
            { value: "4'–15'", label: "Pace hợp lệ /km" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display text-2xl md:text-3xl font-bold mb-1"
                style={{ color: "hsl(142, 72%, 55%)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs md:text-sm leading-tight" style={{ color: "hsl(150, 14%, 50%)" }}>
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
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "hsl(150, 14%, 40%)" }}
      >
        <span className="text-xs tracking-widest uppercase">Khám phá</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
