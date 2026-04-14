import { motion } from "framer-motion";
import { TrendingUp, Activity as ActivityIcon, MapPin, Target, Calendar } from "lucide-react";

const CampaignInfo = () => {
  return (
    <div className="space-y-10">
      {/* 1. Mission Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl border border-primary/20"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[100px]" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-display font-black text-foreground uppercase tracking-[0.3em] text-xs">
            Sứ mệnh chiến dịch
          </h3>
        </div>

        <p className="text-[17px] text-foreground/90 leading-relaxed font-bold mb-10 border-l-4 border-primary pl-6 py-2">
          VietSeeds Run 2026 không chỉ là một giải chạy. Đây là hành trình kết
          nối những tâm hồn đồng điệu, lan tỏa năng lượng tích cực.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8 border-t border-border/30 text-center">
          <div className="flex items-center gap-3 bg-secondary/50 px-4 py-4 rounded-[1.5rem] border border-primary/10 overflow-hidden">
            {/* <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0">
              <Calendar className="h-5 w-5" />
            </div> */}
            <div className="min-w-0 flex-1 ">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1.5 truncate">
                NGÀY BẮT ĐẦU
              </div>
              <span className="text-muted-foreground">01</span>
              <span>/</span>
              <span className="text-muted-foreground">04</span>
              <span>/</span>
              <span className="text-primary">2026</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-secondary/50 px-4 py-1 rounded-[1.5rem] border border-primary/10 overflow-hidden">
            {/* <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0">
              <Calendar className="h-5 w-5" />
            </div> */}
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-wider mb-1.5 truncate">
                NGÀY KẾT THÚC
              </div>
              <span className="text-muted-foreground">30</span>
              <span>/</span>
              <span className="text-muted-foreground">04</span>
              <span>/</span>
              <span className="text-primary">2026</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Rules Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-[3rem] p-10 shadow-2xl border border-primary/20"
      >
        <h3 className="font-display font-black text-foreground mb-8 text-lg flex items-center gap-4">
          <TrendingUp className="h-6 w-6 text-primary" /> Tiêu chuẩn hợp lệ
        </h3>
        <ul className="space-y-6">
          {[
            {
              text: "Môn thể thao: Chạy bộ (Run)",
              icon: ActivityIcon,
              desc: "Tất cả các hoạt động phải thuộc phân loại Run trên Strava.",
            },
            {
              text: "Pace hợp lệ: 4:00 - 15:00 /km",
              icon: MapPin,
              desc: "Đảm bảo pace nằm trong giới hạn để được tính điểm.",
            },
            {
              text: "Khoảng cách tối thiểu: 1.0 km",
              icon: MapPin,
              desc: "Mỗi hoạt động cần đạt ít nhất 1km để được đồng bộ.",
            },
          ].map((rule, i) => (
            <li
              key={i}
              className="flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-xl border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <rule.icon className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <div className="text-[15px] font-black text-foreground tracking-tight uppercase italic">
                  {rule.text}
                </div>
                <p className="text-[13px] text-muted-foreground font-bold mt-1 leading-snug">
                  {rule.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default CampaignInfo;
