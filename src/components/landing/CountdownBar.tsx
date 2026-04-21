import { useState, useEffect } from "react";
import { Facebook, Users } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TARGET_DATE = new Date("2026-04-30T23:59:59").getTime();

const ZaloIcon = ({ className }: { className?: string }) => (
  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" 
      alt="Zalo" 
      className="w-full h-full object-contain" 
    />
  </div>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
      alt="Facebook"
      className="w-full h-full object-contain"
    />
  </div>
);

const StravaIcon = ({ className }: { className?: string }) => (
  <div className="flex items-center justify-center h-5 sm:h-6 px-1 flex-shrink-0">
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Strava_Logo.svg" 
      alt="Strava" 
      className="h-2.5 sm:h-3.5 w-auto object-contain" 
    />
  </div>
);

export const CountdownBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { scrollY } = useScroll();
  
  // Transition range
  const scrollRange = [0, 300];
  
  // Spring configuration for aggressive, high-performance tracking
  const springConfig = { stiffness: 500, damping: 50, mass: 1, restDelta: 0.001 };
  
  // Raw numeric transforms
  const borderRadiusRaw = useTransform(scrollY, scrollRange, [0, 60]);
  const marginTopRaw = useTransform(scrollY, scrollRange, [0, 16]);
  const widthRaw = useTransform(scrollY, scrollRange, [100, 95.5]);
  const maxWidthRaw = useTransform(scrollY, scrollRange, [3000, 1240]);
  const paddingYRaw = useTransform(scrollY, scrollRange, [18, 12]);
  const leftRaw = useTransform(scrollY, scrollRange, [0, 50]);
  const xRaw = useTransform(scrollY, scrollRange, [0, -50]);
  const opacityRaw = useTransform(scrollY, [0, 100], [1, 0.95]);
  
  // Smooth spring-based values
  const borderRadius = useSpring(borderRadiusRaw, springConfig);
  const marginTop = useSpring(marginTopRaw, springConfig);
  const width = useSpring(widthRaw, springConfig);
  const textOpacity = useTransform(scrollY, [0, 150], [1, 0]);
  const linkPaddingX = useTransform(scrollY, [0, 150], ["12px", "6px"]);
  const linkGap = useTransform(scrollY, [0, 150], ["8px", "0px"]);
  const textWidth = useTransform(textOpacity, [0, 1], ["0px", "auto"]);
  const textDisplay = useTransform(textOpacity, (v: number) => v === 0 ? "none" : "inline");

  // Detect mobile for explicit hiding
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const maxWidth = useSpring(maxWidthRaw, springConfig);
  const paddingY = useSpring(paddingYRaw, springConfig);
  const left = useSpring(leftRaw, springConfig);
  const x = useSpring(xRaw, springConfig);
  
  const backgroundColor = useTransform(scrollY, scrollRange, [
    "rgba(10, 48, 28, 1)", 
    "rgba(15, 60, 35, 0.95)"
  ]);
  
  const iconScale = useSpring(useTransform(scrollY, scrollRange, [1, 0.9]), springConfig);
  const timerScale = useSpring(useTransform(scrollY, scrollRange, [1, 0.85]), springConfig);

  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, url: "https://www.facebook.com/profile.php?id=61578496514473", color: "hover:text-[#1877F2]" },
    { name: "Zalo", icon: ZaloIcon, url: "https://zalo.me/g/cmlszefn0z1aeodabrgc", color: "hover:text-[#0068FF]" },
    { name: "Cộng đồng", icon: StravaIcon, url: "https://strava.app.link/zWjox1bNO1b", color: "hover:text-[#FC4C02]" },
  ];

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
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none">
      <motion.div 
        style={{
          width: useTransform(width, v => `${v}%`),
          maxWidth: useTransform(maxWidth, v => `${v}px`),
          marginTop: useTransform(marginTop, v => `${v}px`),
          borderRadius: useTransform(borderRadius, v => `${v}px`),
          paddingTop: useTransform(paddingY, v => `${v}px`),
          paddingBottom: useTransform(paddingY, v => `${v}px`),
          backgroundColor,
          left: useTransform(left, v => `${v}%`),
          x: useTransform(x, v => `${v}%`),
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
        }}
        className="pointer-events-auto absolute top-0 overflow-hidden backdrop-blur-3xl border-b border-white/10 group bg-gradient-to-r from-[hsl(142,55%,18%)] to-[hsl(142,60%,24%)] px-6"
      >
        <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-8 text-white font-black tracking-tight px-4 sm:px-0 h-full">
          
          {/* Left Slot: flex-1 to push timer to center */}
          <div className="hidden sm:flex flex-1 items-center justify-start">
            <motion.div 
              style={{ scale: iconScale }}
              className="flex items-center gap-2"
            >
              <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
              <span className="hidden sm:inline uppercase italic tracking-wider whitespace-nowrap text-sm md:text-base leading-none">
                Thử thách kết thúc sau:
              </span>
            </motion.div>
          </div>
          
          {/* Center Slot: Fixed center */}
          <motion.div 
            style={{ scale: timerScale }}
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 font-display font-black flex-shrink-0"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl xs:text-4xl md:text-5xl leading-none italic text-accent">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold mt-1 tracking-[0.2em] text-white/40">Ngày</span>
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl leading-none opacity-40 text-accent pb-4 sm:pb-5">:</span>
            
            <div className="flex flex-col items-center">
              <span className="text-3xl xs:text-4xl md:text-5xl leading-none italic text-accent">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold mt-1 tracking-[0.2em] text-white/40">Giờ</span>
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl leading-none opacity-40 text-accent pb-4 sm:pb-5">:</span>

            <div className="flex flex-col items-center">
              <span className="text-3xl xs:text-4xl md:text-5xl leading-none italic text-accent">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold mt-1 tracking-[0.2em] text-white/40">Phút</span>
            </div>
            <span className="text-2xl sm:text-3xl md:text-4xl leading-none opacity-40 text-accent pb-4 sm:pb-5">:</span>

            <div className="flex flex-col items-center">
              <span className="text-3xl xs:text-4xl md:text-5xl leading-none italic text-accent">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase font-bold mt-1 tracking-[0.2em] text-white/40">Giây</span>
            </div>
          </motion.div>

          {/* Right Slot: flex-1 to push timer to center */}
          <div className="flex flex-1 items-center justify-center sm:justify-end">
             <motion.div 
               style={{ scale: iconScale }}
               className="flex items-center gap-1 p-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10"
             >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center rounded-full transition-all duration-300 bg-white/5 border border-transparent ${social.color} hover:bg-white/15 hover:border-white/20 whitespace-nowrap`}
                  style={{ 
                    paddingLeft: linkPaddingX, 
                    paddingRight: linkPaddingX,
                    gap: linkGap 
                  }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon />
                  <motion.span 
                    style={{ 
                      opacity: isMobile ? 0 : textOpacity,
                      width: isMobile ? "0px" : textWidth,
                      display: isMobile ? "none" : textDisplay
                    }}
                    className="hidden xl:inline text-[8px] sm:text-[10px] uppercase tracking-[0.15em] font-black whitespace-nowrap overflow-hidden"
                  >
                    {social.name}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          style={{ opacity: useScroll().scrollY > 100 ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
