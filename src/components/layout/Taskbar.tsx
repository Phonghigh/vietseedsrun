import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, Users, Target, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "Challenges", url: "/challenges", icon: Target },
];

const Taskbar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative glass-liquid glass-floating-shadow rounded-[2.5rem] p-2 flex items-center gap-1 border border-white/40"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <Link key={item.url} to={item.url}>
              <motion.div
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "glass-active text-white shadow-lg shadow-green-500/20" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/20"
                }`}
              >
                <item.icon className={`h-6 w-6 ${isActive ? "animate-pulse-glow" : ""}`} />
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -bottom-1 w-1 h-1 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Tooltip on hover (desktop only) */}
                <span className="absolute -top-12 bg-foreground text-background text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest whitespace-nowrap hidden md:block">
                  {item.title}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default Taskbar;
