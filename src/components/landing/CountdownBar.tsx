import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-04-30T23:59:59").getTime();

export const CountdownBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[hsl(142,55%,18%)] to-[hsl(142,60%,24%)] backdrop-blur-xl py-4 md:py-5 px-4 shadow-2xl border-b border-white/10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-white font-black tracking-tight">
        <div className="flex items-center gap-4 mb-4 sm:mb-0 transform hover:scale-[1.02] transition-transform duration-300">
          <span className="h-4 w-4 rounded-full bg-accent animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
          <span className="text-xl md:text-2xl uppercase italic tracking-wider">Thử thách kết thúc sau:</span>
        </div>
        
        <div className="flex items-center gap-6 md:gap-10 font-display font-black">
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl leading-none italic text-accent">{String(timeLeft.days).padStart(2, "0")}</span>
            <span className="text-[11px] uppercase font-bold mt-2 tracking-[0.2em] text-white/80">Ngày</span>
          </div>
          <span className="text-4xl md:text-5xl leading-none opacity-40 pb-6 text-accent">:</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl leading-none italic text-accent">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="text-[11px] uppercase font-bold mt-2 tracking-[0.2em] text-white/80">Giờ</span>
          </div>
          <span className="text-4xl md:text-5xl leading-none opacity-40 pb-6 text-accent">:</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl leading-none italic text-accent">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="text-[11px] uppercase font-bold mt-2 tracking-[0.2em] text-white/80">Phút</span>
          </div>
          <span className="text-4xl md:text-5xl leading-none opacity-40 pb-6 text-accent">:</span>
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl leading-none italic text-accent">{String(timeLeft.seconds).padStart(2, "0")}</span>
            <span className="text-[11px] uppercase font-bold mt-2 tracking-[0.2em] text-white/80">Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};
