import { motion } from "framer-motion";
import { Users, Plus, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { teamMembers, currentUser } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import AppLayout from "@/components/layout/AppLayout";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--chart-blue))",
  "hsl(var(--chart-purple))",
  "hsl(var(--chart-orange))",
];

const contributionData = teamMembers.map((m) => ({ name: m.name, value: m.contribution }));
const teamTotal = teamMembers.reduce((s, m) => s + m.distance, 0);

const Teams = () => (
  <AppLayout>
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{currentUser.team}</h1>
          <p className="text-muted-foreground text-sm">Team Dashboard — {teamMembers.length} members</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-1" /> Invite Link
          </Button>
          <Button size="sm" className="gradient-hero border-0 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Create Team
          </Button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Distance", value: `${teamTotal} km` },
          { label: "Team Rank", value: `#${currentUser.teamRank}` },
          { label: "Members", value: teamMembers.length },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-xl p-5 text-center"
          >
            <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Member Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Members
          </h2>
          <div className="space-y-3">
            {teamMembers
              .sort((a, b) => b.distance - a.distance)
              .map((m, i) => (
                <div key={m.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {m.avatar}
                    </div>
                    <span className="text-sm font-medium text-foreground">{m.name}</span>
                  </div>
                  <span className="font-display font-semibold text-foreground text-sm">{m.distance} km</span>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Contribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Contribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={contributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}>
                {contributionData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {teamMembers.map((m, i) => (
              <div key={m.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {m.name.split(" ")[0]}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </AppLayout>
);

export default Teams;
