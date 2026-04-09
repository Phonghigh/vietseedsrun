import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, Users, Target, User, Activity } from "lucide-react";
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
        <div className="px-1 py-6 group-data-[state=expanded]:px-6 flex items-center gap-4 border-b border-sidebar-border mb-4 overflow-hidden transition-all duration-300">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-lg ring-2 ring-primary/20 ml-1 group-data-[state=expanded]:ml-0 p-2 animate-pulse-glow">
            <img 
              src="/favicon.ico" 
              alt="Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-display font-black text-2xl text-sidebar-foreground tracking-tighter uppercase italic whitespace-nowrap"
            >
              VietSeeds <span className="text-primary">Run</span>
            </motion.span>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-5 text-xs uppercase tracking-[0.3em] text-muted-foreground font-black mb-2">MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 gap-2">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <motion.div
                      whileHover={{ scale: 1.02, x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-sidebar-accent rounded-xl px-4 py-3 text-[15px] font-bold flex items-center group transition-colors duration-200"
                        activeClassName="bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                      >
                        <item.icon className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </motion.div>
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
