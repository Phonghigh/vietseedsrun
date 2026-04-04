import { motion } from "framer-motion";
import { TrendingUp, Activity as ActivityIcon, MapPin } from "lucide-react";

const CampaignInfo = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden group shadow-xl"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[80px]" />
        <h3 className="font-display font-black text-foreground mb-4 uppercase tracking-[0.2em] text-[10px]">Sứ mệnh chiến dịch</h3>
        <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
          VietSeeds Run 2026 không chỉ là một giải chạy. Đây là hành trình kết nối những tâm hồn đồng điệu, lan tỏa năng lượng tích cực và xây dựng quỹ học bổng cho các sinh viên tài năng vượt khó.
        </p>
        <div className="mt-8 pt-8 border-t border-border/30 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold tracking-wide">
            <span className="text-muted-foreground/70 uppercase">Bắt đầu</span>
            <span className="text-foreground bg-muted/30 px-2 py-1 rounded-md">01/04/2026</span>
          </div>
          <div className="flex justify-between items-center text-xs font-bold tracking-wide">
            <span className="text-muted-foreground/70 uppercase">Kết thúc</span>
            <span className="text-foreground bg-muted/30 px-2 py-1 rounded-md">30/04/2026</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-[2.5rem] p-8 shadow-xl"
      >
        <h3 className="font-display font-black text-foreground mb-6 text-sm flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-primary" /> Tiêu chuẩn hợp lệ
        </h3>
        <ul className="space-y-4">
          {[
            { text: "Môn thể thao: Chạy bộ (Run)", icon: ActivityIcon },
            { text: "Pace hợp lệ: 4:00 - 15:00 /km", icon: MapPin },
            { text: "Khoảng cách tối thiểu: 1.0 km", icon: MapPin }
          ].map((rule, i) => (
            <li key={i} className="flex items-center gap-4 text-xs font-semibold text-muted-foreground/70">
              <div className="w-8 h-8 rounded-xl bg-muted/30 flex items-center justify-center text-primary/40">
                <rule.icon className="h-4 w-4" />
              </div>
              {rule.text}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default CampaignInfo;
