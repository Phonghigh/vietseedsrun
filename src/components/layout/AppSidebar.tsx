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
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-4 border-b border-sidebar-border mb-4">
          {!collapsed && (
            <span className="font-display font-black text-2xl text-sidebar-foreground tracking-tighter uppercase italic">
              VietSeeds <span className="text-primary">Run</span>
            </span>
          )}
          {collapsed && (
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center text-xs font-black text-white px-2 shadow-lg ring-2 ring-primary/20">VSR</div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-5 text-xs uppercase tracking-[0.3em] text-muted-foreground font-black mb-2">MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent rounded-xl px-4 py-3 text-[15px] font-bold transition-all flex items-center group"
                      activeClassName="bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]"
                    >
                      <item.icon className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
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
