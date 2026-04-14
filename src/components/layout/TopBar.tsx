import { Bell, Search, LogOut, Facebook, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { getStravaAuthUrl, useAuth } from "@/hooks/useAuth";
import { useMyProfile } from "@/hooks/useUser";
import { motion } from "framer-motion";

const ZaloIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.373 0 0 4.672 0 10.435c0 3.328 1.837 6.273 4.707 8.163l-1.07 3.535 4.316-2.316c1.339.387 2.766.596 4.249.596 6.627 0 12-4.673 12-10.435C24 4.673 18.627 0 12 0zm5.345 11.233c-.235.485-.565.914-.98 1.272-.375.32-.782.55-1.205.676-.462.138-1.056.208-1.782.208h-2.18c-.28 0-.462-.187-.462-.486V8.65c0-.306.182-.486.462-.486h2.246c.725 0 1.25.07 1.666.207.416.136.78.36 1.08.665.318.322.54.71.656 1.15.117.44.175.92.175 1.44 0 .52-.06.998-.18 1.437zM8.14 8.164c.28 0 .462.187.462.486v4.247c0 .298-.182.486-.462.486H5.97c-.28 0-.462-.187-.462-.486V8.65c0-.306.182-.486.462-.486H8.14z" />
  </svg>
);

const TopBar = () => {
  const [showNotifs, setShowNotifs] = useState(false);
  const token = localStorage.getItem('accessToken');
  const { logout } = useAuth();
  const { data: user } = useMyProfile();

  const socialLinks = [
    { name: "FB", icon: Facebook, url: "https://www.facebook.com/profile.php?id=61578496514473", color: "hover:text-[#1877F2]" },
    { name: "Zalo", icon: ZaloIcon, url: "https://zalo.me/g/cmlszefn0z1aeodabrgc", color: "hover:text-[#0068FF]" },
    { name: "Strava", icon: Users, url: "https://strava.app.link/zWjox1bNO1b", color: "hover:text-primary" },
  ];

  const handleLogin = () => {
    window.location.href = getStravaAuthUrl();
  };

  return (
    <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-transparent text-sm outline-none w-48 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1.5 mr-4 p-1 rounded-full bg-muted/50 border border-border/50">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${social.color} hover:bg-background shadow-sm`}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="h-3.5 w-3.5" />
              <span className="opacity-70 group-hover:opacity-100">{social.name}</span>
            </motion.a>
          ))}
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifs(!showNotifs)}
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-lg z-50 p-2">
              <div className="font-display font-semibold text-sm px-3 py-2 text-foreground border-b border-border mb-2">Thông báo</div>
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
