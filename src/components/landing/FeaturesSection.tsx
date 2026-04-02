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
    desc: "Chạy với pace 4'–15'/km, GPS thực tế. Tích lũy đủ 30km trong tháng 4 để nhận E-Certificate.",
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
    link: "https://www.facebook.com/groups/833728424159423?locale=vi_VN",
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
  <div className="w-full text-foreground relative z-10">
    {/* How to join */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="text-sm font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(142, 72%, 55%)" }}
          >
            Hướng dẫn
          </div>
          <h2
            className="font-display text-3xl md:text-5xl font-bold mb-4"
            style={{ color: "hsl(0, 0%, 95%)" }}
          >
            Cách tham gia{" "}
            <span className="text-gradient-green">3 bước đơn giản</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(150, 14%, 60%)" }}>
            Bất kể bạn là runner chuyên nghiệp hay mới bắt đầu — VietSeeds Run chào đón tất cả!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-10 left-[17%] right-[17%] h-px"
            style={{ background: "linear-gradient(90deg, hsl(142,72%,35%,0.5), hsl(25,80%,55%,0.5))" }}
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
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, hsl(142, 72%, 35%) 0%, hsl(160, 60%, 40%) 100%)",
                  boxShadow: "0 0 30px hsl(142, 72%, 35%, 0.35)",
                }}
              >
                <s.icon className="h-8 w-8 text-white" />
              </div>

              <div
                className="font-display text-5xl font-bold absolute top-0 right-0 md:right-auto md:left-[calc(50%+2rem)] opacity-10"
                style={{ color: "hsl(142, 72%, 55%)" }}
              >
                {s.step}
              </div>

              <h3 className="font-display text-xl font-bold mb-3" style={{ color: "hsl(0, 0%, 92%)" }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(150, 14%, 58%)" }}>
                {s.desc}
              </p>
              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold hover:underline transition-colors"
                  style={{ color: "hsl(142, 72%, 55%)" }}
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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="text-sm font-semibold tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(25, 80%, 62%)" }}
          >
            Quyền lợi
          </div>
          <h2
            className="font-display text-3xl md:text-5xl font-bold mb-4"
            style={{ color: "hsl(0, 0%, 95%)" }}
          >
            Vì sao bạn nên{" "}
            <span className="text-gradient-warm">tham gia?</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(150, 14%, 60%)" }}>
            Run to Grow — Mỗi km bạn chạy là một thông điệp ý nghĩa lan tỏa khắp Việt Nam.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300 cursor-default"
              style={{
                background: "hsl(150, 25%, 10%)",
                border: "1px solid hsl(150, 20%, 16%)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${b.color}22`, border: `1px solid ${b.color}44` }}
              >
                <b.icon className="h-6 w-6" style={{ color: b.color }} />
              </div>
              <h3 className="font-display text-lg font-bold mb-2" style={{ color: "hsl(0, 0%, 90%)" }}>
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(150, 14%, 55%)" }}>
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
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: Community */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="text-sm font-semibold tracking-[0.3em] uppercase mb-3"
              style={{ color: "hsl(142, 72%, 55%)" }}
            >
              Cộng đồng
            </div>
            <h2
              className="font-display text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "hsl(0, 0%, 95%)" }}
            >
              Kết nối cùng{" "}
              <span className="text-gradient-green">cộng đồng</span>
            </h2>
            <p className="mb-8" style={{ color: "hsl(150, 14%, 60%)" }}>
              Tham gia vào hệ sinh thái VietSeeds Run trên Facebook và Zalo để chia sẻ thành tích, kết bạn đồng hành, và nhận thông báo sự kiện mới nhất.
            </p>
            <div className="flex flex-col gap-4">
              {community.map((c) => (
                <a
                  key={c.label}
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 group hover:scale-[1.02] transition-all duration-200"
                  style={{
                    background: "hsl(150, 25%, 10%)",
                    border: "1px solid hsl(150, 20%, 16%)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${c.color}20` }}
                  >
                    <c.icon className="h-6 w-6" style={{ color: c.color }} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "hsl(0, 0%, 88%)" }}>
                      {c.label}
                    </div>
                    <div className="text-xs" style={{ color: "hsl(150, 14%, 50%)" }}>
                      {c.sub}
                    </div>
                  </div>
                  <div className="ml-auto" style={{ color: "hsl(150, 14%, 40%)" }}>→</div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Final CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 md:p-10 text-center"
            style={{
              background: "linear-gradient(135deg, hsl(142, 60%, 14%) 0%, hsl(150, 40%, 10%) 100%)",
              border: "1px solid hsl(142, 50%, 22%)",
              boxShadow: "0 0 60px hsl(142, 72%, 25%, 0.25)",
            }}
          >
            <div className="text-5xl mb-4">🏃</div>
            <h3
              className="font-display text-2xl md:text-3xl font-bold mb-3"
              style={{ color: "hsl(0, 0%, 95%)" }}
            >
              Đừng chờ có động lực!
            </h3>
            <p className="mb-8 text-sm leading-relaxed" style={{ color: "hsl(150, 14%, 60%)" }}>
              Hãy đăng ký ngay và tạo động lực từ những bước chạy đầu tiên. Thử thách bắt đầu từ{" "}
              <span style={{ color: "hsl(142, 72%, 60%)" }} className="font-semibold">
                00:00 ngày 01/04/2026
              </span>{" "}
              đến{" "}
              <span style={{ color: "hsl(25, 80%, 62%)" }} className="font-semibold">
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
                className="w-full gradient-hero text-white font-display font-bold text-lg py-4 rounded-2xl hover:scale-105 transition-transform duration-200 green-glow"
              >
                ĐĂNG KÝ MIỄN PHÍ →
              </button>
            </a>
            <div className="mt-6 flex justify-center gap-6 text-xs" style={{ color: "hsl(150, 14%, 45%)" }}>
              <span>✓ Miễn phí 100%</span>
              <span>✓ Toàn quốc</span>
              <span>✓ Mọi trình độ</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </div>
);

export default FeaturesSection;
