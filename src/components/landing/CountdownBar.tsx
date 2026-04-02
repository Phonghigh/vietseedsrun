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
    <div className="sticky top-0 z-50 w-full gradient-hero py-4 px-4 shadow-xl green-glow border-b border-white/20">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between text-white font-medium">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="h-4 w-4 rounded-full bg-white animate-pulse" />
          <span className="text-xl md:text-2xl font-bold tracking-wide uppercase">Thử thách kết thúc sau:</span>
        </div>
        
        <div className="flex items-center gap-6 font-display font-bold">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl leading-none">{String(timeLeft.days).padStart(2, "0")}</span>
            <span className="text-sm uppercase opacity-90 mt-1 font-semibold">Ngày</span>
          </div>
          <span className="text-3xl md:text-4xl leading-none opacity-50 pb-6">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl leading-none">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="text-sm uppercase opacity-90 mt-1 font-semibold">Giờ</span>
          </div>
          <span className="text-3xl md:text-4xl leading-none opacity-50 pb-6">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl leading-none">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="text-sm uppercase opacity-90 mt-1 font-semibold">Phút</span>
          </div>
          <span className="text-3xl md:text-4xl leading-none opacity-50 pb-6">:</span>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl leading-none">{String(timeLeft.seconds).padStart(2, "0")}</span>
            <span className="text-sm uppercase opacity-90 mt-1 font-semibold">Giây</span>
          </div>
        </div>
      </div>
    </div>
  );
};
