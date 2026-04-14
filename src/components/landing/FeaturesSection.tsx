import { motion } from "framer-motion";
import { Award, CheckCircle, Facebook, Gift, MapPin, MessageCircle, Shield, Smartphone, Users } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: CheckCircle,
    title: "Đăng ký tham gia",
    desc: "Điền form đăng ký hoàn toàn miễn phí. Mở cho tất cả mọi người, không phân biệt trình độ.",
    link: "https://forms.gle/CzRYgy8EbGUkR2WGA",
    linkLabel: "Đăng ký ngay →",
  },
  {
    step: "02",
    icon: Smartphone,
    title: "Tải Strava & Join Group",
    desc: "Tải app Strava (iOS/Android), tham gia Group VietSeeds Run để ghi nhận thành tích tự động.",
    link: "https://strava.app.link/zWjox1bNO1b",
    linkLabel: "Tham gia Group →",
  },
  {
    step: "03",
    icon: MapPin,
    title: "Chạy & Ghi nhận",
    desc: "Chạy với pace 4'-15'/km, GPS thực tế. Tích lũy đủ 30km trong tháng 4 để nhận E-Certificate.",
    link: null,
    linkLabel: null,
  },
];

const benefits = [
  {
    icon: Gift,
    title: "Hoàn toàn miễn phí",
    desc: "Không mất bất kỳ chi phí nào. VietSeeds Run là sân chơi mở cho cộng đồng.",
    color: "hsl(142, 72%, 35%)",
  },
  {
    icon: Award,
    title: "E-Certificate",
    desc: "Nhận chứng chỉ điện tử khi đạt tối thiểu 30km trong suốt thời gian thử thách.",
    color: "hsl(25, 80%, 55%)",
  },
  {
    icon: Users,
    title: "Cộng đồng toàn quốc",
    desc: "Kết nối với hàng trăm runners từ Bắc đến Nam, cùng nhau tạo nên phong trào chạy bộ.",
    color: "hsl(210, 80%, 55%)",
  },
  {
    icon: Gift,
    title: "Quà tặng độc quyền",
    desc: "Cơ hội nhận bộ quà tặng đặc biệt dành cho những cá nhân/tập thể xuất sắc nhất.",
    color: "hsl(270, 60%, 60%)",
  },
  {
    icon: Shield,
    title: "Minh bạch & Công bằng",
    desc: "Kết quả GPS thực tế. Không chấp nhận hoạt động thủ công hoặc có dấu hiệu gian lận.",
    color: "hsl(160, 60%, 42%)",
  },
  {
    icon: MessageCircle,
    title: "Cộng đồng sôi động",
    desc: "Tham gia Facebook Group & Zalo Community để chia sẻ hành trình và kết nối bạn đồng hành.",
    color: "hsl(35, 90%, 55%)",
  },
];

const community = [
  {
    icon: Facebook,
    label: "Facebook Group",
    sub: "VietSeeds Run",
    link: "https://www.facebook.com/profile.php?id=61578496514473",
    color: "hsl(215, 75%, 55%)",
  },
  {
    icon: MessageCircle,
    label: "Zalo Community",
    sub: "VietSeeds Run",
    link: "https://zalo.me/g/cmlszefn0z1aeodabrgc",
    color: "hsl(200, 80%, 48%)",
  },
];

const FeaturesSection = () => (
  <div className="w-full text-foreground relative z-10 pb-20">
    {/* How to join */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-sm font-black tracking-[0.4em] uppercase mb-4 text-primary">
            Hướng dẫn
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-6 text-foreground uppercase italic tracking-tighter">
            Cách tham gia <br />
            <span className="text-gradient-green uppercase text-5xl md:text-7xl pr-4">3 bước đơn giản</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-800 font-bold italic">
            Bất kể bạn là runner chuyên nghiệp hay mới bắt đầu - VietSeeds Run chào đón tất cả!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-12 left-[17%] right-[17%] h-px bg-primary/20"
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step circle */}
              <div
                className="w-24 h-24 rounded-[2rem] flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500 bg-white border-2 border-primary shadow-xl shadow-primary/10"
              >
                <s.icon className="h-10 w-10 text-primary" />
              </div>

              <div className="font-display text-8xl font-black absolute top-0 right-[-1rem] md:right-auto md:left-[calc(50%+2.5rem)] opacity-[0.2] text-primary-dark italic">
                {s.step}
              </div>

              <h3 className="font-display text-2xl font-black mb-4 text-foreground uppercase italic tracking-tight">
                {s.title}
              </h3>
              <p className="text-[15px] leading-relaxed mb-6 text-slate-700 font-bold px-4">
                {s.desc}
              </p>
              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-black uppercase tracking-widest text-primary hover:underline underline-offset-8 decoration-2 transition-all"
                >
                  {s.linkLabel}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-sm font-black tracking-[0.4em] uppercase mb-4 text-accent">
            Quyền lợi
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black mb-6 text-foreground uppercase italic tracking-tighter">
            Vì sao bạn nên <br />
            <span className="text-gradient-warm uppercase text-5xl md:text-7xl pr-4">tham gia?</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-800 font-bold italic">
            Run to Grow - Mỗi km bạn chạy là một thông điệp ý nghĩa lan tỏa khắp Việt Nam.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-[2.5rem] p-10 group hover:scale-[1.03] transition-all duration-500 cursor-default bg-white border border-slate-200 shadow-lg hover:border-primary/30 hover:shadow-xl"
            >
              <div
                className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner"
                style={{ background: `${b.color}15`, border: `1px solid ${b.color}30` }}
              >
                <b.icon className="h-8 w-8" style={{ color: b.color }} />
              </div>
              <h3 className="font-display text-2xl font-black mb-4 text-foreground uppercase italic tracking-tight">
                {b.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-slate-700 font-bold">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Community + CTA */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          {/* Left: Community */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-sm font-black tracking-[0.4em] uppercase mb-4 text-primary">
              Cộng đồng
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-8 text-foreground uppercase italic tracking-tighter">
              Kết nối cùng <br />
              <span className="text-gradient-green uppercase pr-4">cộng đồng</span>
            </h2>
            <p className="mb-10 text-lg text-slate-800 font-bold italic border-l-4 border-primary pl-6">
              Tham gia vào hệ sinh thái VietSeeds Run trên Facebook và Zalo để chia sẻ thành tích, kết bạn đồng hành, và nhận thông báo sự kiện mới nhất.
            </p>
            <div className="flex flex-col gap-6">
              {community.map((c) => (
                <a
                  key={c.label}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 rounded-[2rem] px-8 py-6 group hover:scale-[1.02] transition-all duration-300 bg-white border border-slate-200 shadow-md hover:border-primary/20 hover:shadow-lg"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner"
                    style={{ background: `${c.color}12` }}
                  >
                    <c.icon className="h-7 w-7" style={{ color: c.color }} />
                  </div>
                  <div>
                    <div className="font-black text-lg text-foreground uppercase italic tracking-tight">
                      {c.label}
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">
                      {c.sub}
                    </div>
                  </div>
                  <div className="ml-auto text-primary font-black group-hover:translate-x-2 transition-transform duration-300">→</div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Final CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[3.5rem] p-12 md:p-16 text-center relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(142, 60%, 15%) 0%, hsl(142, 50%, 8%) 100%)",
              boxShadow: "0 40px 100px -20px hsla(142, 72%, 25%, 0.3)",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.2),transparent_70%)] pointer-events-none" />
            <div className="text-7xl mb-8 transform hover:scale-110 transition-transform duration-500">🏃</div>
            <h3 className="font-display text-3xl md:text-4xl font-black mb-6 text-white uppercase italic tracking-tight">
              Đừng chờ có động lực!
            </h3>
            <p className="mb-10 text-[15px] leading-relaxed text-white/90 font-medium italic">
              Hãy đăng ký ngay và tạo động lực từ những bước chạy đầu tiên. Thử thách bắt đầu từ{" "}
              <span className="text-primary font-black">
                00:00 ngày 01/04/2026
              </span>{" "}
              đến{" "}
              <span className="text-accent font-black">
                23:59 ngày 30/04/2026
              </span>.
            </p>
            <a
              href="https://forms.gle/CzRYgy8EbGUkR2WGA"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button
                id="features-register-btn"
                className="w-full gradient-hero text-white font-display font-black text-xl py-6 rounded-2xl hover:scale-[1.03] transition-all duration-300 shadow-2xl green-glow uppercase italic"
              >
                Đăng ký miễn phí →
              </button>
            </a>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-[11px] font-black uppercase tracking-widest text-white/70">
              <span className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-primary" /> Miễn phí 100%</span>
              <span className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-primary" /> Toàn quốc</span>
              <span className="flex items-center gap-2"><CheckCircle className="h-3 w-3 text-primary" /> Mọi trình độ</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default FeaturesSection;
