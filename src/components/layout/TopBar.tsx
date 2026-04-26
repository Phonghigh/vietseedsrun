import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getStravaAuthUrl, useAuth } from "@/hooks/useAuth";
import { useMyProfile } from "@/hooks/useUser";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const TopBar = () => {
  const [showNotifs, setShowNotifs] = useState(false);
  const token = localStorage.getItem('accessToken');
  const { logout } = useAuth();
  const { data: user } = useMyProfile();

  const handleLogin = () => {
    window.location.href = getStravaAuthUrl();
  };

  return (
    <header className="h-24 flex items-center justify-between border-b border-border px-10 bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-5 group transition-all duration-300 hover:opacity-90"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-[2rem] gradient-hero flex items-center justify-center shadow-2xl shadow-primary/20 ring-4 ring-primary/10 p-4 animate-pulse-glow">
              <img
                src="/favicon.ico"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display font-black text-3xl text-foreground tracking-tighter uppercase italic whitespace-nowrap hidden sm:block">
              VietSeeds <span className="text-primary">Run</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <a
          href="https://zalo.me/g/cmlszefn0z1aeodabrgc"
          target="_blank"
          rel="noopener noreferrer"
          className="h-16 w-16 bg-white hover:bg-secondary rounded-2xl flex items-center justify-center transition-all shadow-sm hover:shadow-md border border-border/50 group"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
            alt="Zalo"
            className="w-8 h-8 group-hover:scale-110 transition-transform"
          />
        </a>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-16 w-16 hover:bg-secondary rounded-2xl transition-all shadow-sm hover:shadow-md"
            onClick={() => setShowNotifs(!showNotifs)}
          >
            <Bell className="h-8 w-8 text-muted-foreground" />
            <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full border-2 border-white animate-pulse" />
          </Button>

          {showNotifs && (
            <div className="absolute right-0 top-18 w-80 bg-card border border-border rounded-[2rem] shadow-2xl z-50 p-2 overflow-hidden animate-slide-up">
              <div className="font-display font-bold text-sm px-5 py-4 text-foreground border-b border-border mb-2 bg-muted/30">
                Thông báo
              </div>
              <div className="px-3 py-10 text-center text-xs text-muted-foreground italic">
                Bạn chưa có thông báo nào mới.
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
