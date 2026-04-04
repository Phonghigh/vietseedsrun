import { LayoutDashboard, Trophy, Users, Target, User, Activity, Flame } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Teams", url: "/teams", icon: Users },
  { title: "Challenges", url: "/challenges", icon: Target },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* ... Logo Section ... */}
        <div className="p-5 flex items-center gap-3 border-b border-white/5 mb-2">
          {!collapsed && (
            <span className="font-display font-bold text-xl text-sidebar-foreground tracking-tight">VietSeeds Run</span>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center text-[10px] font-black text-white px-2">VSR</div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 rounded-lg px-3 py-2 text-sm transition-all"
                      activeClassName="bg-primary/20 text-primary font-bold shadow-sm"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
