import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Loader2 } from "lucide-react";
import { useCampaignTrend } from "@/hooks/useCampaign";

const ActivityTrend = () => {
  const { data: trendData, isLoading } = useCampaignTrend();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-[2.5rem] p-8 shadow-2xl border border-primary/10 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary-light">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-lg font-black text-foreground">Xu hướng hoạt động</h3>
          <p className="text-[10px] text-muted-foreground/60 font-medium uppercase tracking-widest">Thống kê quãng đường theo ngày</p>
        </div>

        {isLoading && (
          <div className="ml-auto flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary/40" />
            <span className="text-[10px] font-bold text-slate-400 uppercase">Đang tải dữ liệu...</span>
          </div>
        )}
      </div>

      <div className="h-[350px] w-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-muted/5 rounded-3xl border border-border/10">
            <div className="flex flex-col items-center gap-3">
               <div className="flex gap-1 items-end h-12">
                 {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                   <motion.div
                     key={i}
                     initial={{ height: "20%" }}
                     animate={{ height: `${h * 100}%` }}
                     transition={{ repeat: Infinity, duration: 1, repeatType: "reverse", delay: i * 0.1 }}
                     className="w-2 bg-primary/20 rounded-full"
                   />
                 ))}
               </div>
               <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em]">Đang chuẩn bị biểu đồ</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="hsl(var(--border))" vertical={false} opacity={0.2} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '800',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  border: '1px solid hsl(var(--primary)/0.2)'
                }}
                labelStyle={{ color: 'hsl(var(--primary))', marginBottom: '4px' }}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, strokeDasharray: '5 5', opacity: 0.5 }}
                formatter={(value: number) => [`${value.toLocaleString()} km`, "Quãng đường"]}
              />
              <Area
                type="monotone"
                dataKey="km"
                stroke="hsl(var(--primary))"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorKm)"
                animationDuration={2500}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityTrend;
