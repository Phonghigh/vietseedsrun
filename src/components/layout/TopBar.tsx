import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { getStravaAuthUrl, useAuth } from "@/hooks/useAuth";
import { useMyProfile } from "@/hooks/useUser";

const TopBar = () => {
  const [showNotifs, setShowNotifs] = useState(false);
  const token = localStorage.getItem('accessToken');
  const { logout } = useAuth();
  const { data: user } = useMyProfile();

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
