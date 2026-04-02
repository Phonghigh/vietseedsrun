import { Bell, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { notifications } from "@/lib/mockData";
import { getStravaAuthUrl, useAuth } from "@/hooks/useAuth";
import { useMyProfile } from "@/hooks/useUser";

const TopBar = () => {
  const [showNotifs, setShowNotifs] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;
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
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-hero text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {unread}
              </span>
            )}
          </Button>

          {showNotifs && (
            <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-lg z-50 p-2">
              <div className="font-display font-semibold text-sm px-3 py-2 text-foreground">Thông báo</div>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-3 py-2.5 rounded-lg text-sm ${!n.read ? "bg-primary/5" : ""} hover:bg-muted transition-colors`}
                >
                  <div className="text-foreground">{n.text}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {token ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-foreground">{user?.name}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{user?.teamName}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary overflow-hidden border border-primary/30">
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : user?.name.substring(0, 2).toUpperCase()}
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Đăng xuất">
              <LogOut className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        ) : (
          <Button 
            className="gradient-hero !h-8 text-xs font-bold rounded-full px-4 border-0" 
            onClick={handleLogin}
          >
            ĐĂNG NHẬP
          </Button>
        )}
      </div>
    </header>
  );
};

export default TopBar;
