import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Ruler,
  Truck,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dịch Vụ Đo Đạc Tận Nhà, Giao Lắp & Spa Sofa Tại Hà Nội',
  description:
    'Trọn gói dịch vụ chăm sóc khách hàng Perfa tại Hà Nội: Đo đạc căn hộ miễn phí, tùy chỉnh kích thước, giao lắp tận phòng khách và Spa giặt sofa sinh học an toàn cho bé.',
};

const SERVICES = [
  {
    icon: Ruler,
    badge: 'Miễn phí 100% tại Hà Nội',
    title: '1. Khảo sát, đo đạc & mang mẫu vải tận căn hộ',
    description:
      'Chuyên viên thiết kế của Perfa sẽ mang hộp 8 mẫu vải chống cào và bảng màu trực tiếp đến căn hộ của bạn tại Hà Nội để ướm thử dưới ánh sáng đèn thực tế, đo đạc diện tích phòng khách cũng như kích thước cửa thang máy.',
    points: [
      'Tư vấn kích thước sofa cân đối với diện tích phòng khách và lối đi của bé',
      'Kiểm tra kích thước thang máy chung cư để chia mô-đun hợp lý',
      'Hỗ trợ đặt lịch ngoài giờ hành chính hoặc cuối tuần',
    ],
  },
  {
    icon: RefreshCw,
    badge: 'Xưởng mộc Hữu Bằng – Hà Nội',
    title: '2. Cá nhân hóa kích thước & độ êm theo gia đình',
    description:
      'Vì sở hữu xưởng sản xuất trực tiếp tại Thạch Thất – Hà Nội, Perfa hỗ trợ điều chỉnh chiều dài (từng 5cm), đảo góc chữ L trái/phải và tùy chỉnh độ cứng/mềm của đệm mút theo thói quen ngồi của ông bà hay bố mẹ.',
    points: [
      'Hoàn thiện đơn đặt đóng riêng chỉ từ 5 – 7 ngày làm việc',
      'Tùy chọn chiều cao chân ghế (14cm – 16cm) vừa với loại robot hút bụi nhà bạn',
      'May thêm bộ vỏ áo sofa dự phòng để thay đổi màu sắc theo mùa',
    ],
  },
  {
    icon: Truck,
    badge: 'Đội ngũ giao lắp riêng',
    title: '3. Giao hàng & Lắp đặt êm ái theo lịch ngủ của bé',
    description:
      'Đội ngũ kỹ thuật viên Perfa giao hàng bằng xe tải chuyên dụng, bọc chống sốc 3 lớp và lắp đặt nhẹ nhàng, không gây tiếng ồn lớn ảnh hưởng đến giấc ngủ của em bé hay làm thú cưng hoảng sợ.',
    points: [
      'Miễn phí 100% tại toàn bộ các quận nội thành Hà Nội, Ecopark, Vinhomes',
      'Hỗ trợ đăng ký thủ tục vận chuyển thang hàng với Ban quản lý tòa nhà',
      'Hút bụi sạch sẽ và thu dọn toàn bộ vỏ thùng carton sau khi lắp xong',
    ],
  },
  {
    icon: Sparkles,
    badge: 'Dung dịch hữu cơ an toàn',
    title: '4. Dịch vụ Perfa Care – Spa giặt sofa sinh học tại nhà',
    description:
      'Mỗi khách hàng mua sofa tại Perfa đều được tặng 01 lần Spa vệ sinh sofa miễn phí trong năm đầu tiên. Chúng tôi sử dụng dung dịch enzyme thực vật nhập khẩu Đức, diệt khuẩn và khử mùi nước tiểu thú cưng mà không để lại hóa chất tồn dư.',
    points: [
      'An toàn tuyệt đối: bé có thể ngồi chơi ngay sau khi sofa khô 60 phút',
      'Loại bỏ 99% mạt bụi, lông mèo kẹt sâu và vết ố sữa lâu ngày',
      'Phủ lại lớp nano trượt nước AquaShield™ sau mỗi lần vệ sinh định kỳ',
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero */}
      <section className="bg-[#52624f] text-[#f7f3ec] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d5e0d3]">
            Đồng hành trọn đời cùng tổ ấm Hà Nội
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
            Dịch vụ tận tâm từ lúc đo đạc căn hộ đến những năm tháng sử dụng về sau
          </h1>
          <p className="text-sm sm:text-base text-[#e3dfd7] max-w-2xl leading-relaxed">
            Tại Perfa, bán một chiếc sofa mới chỉ là sự khởi đầu. Chúng tôi chăm sóc chiếc ghế của gia đình bạn suốt vòng đời sản phẩm ngay tại Hà Nội.
          </p>
        </div>
      </section>

      {/* 4 Core Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#52624f]/15 shadow-xs space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#52624f]/12 text-[#52624f] flex items-center justify-center">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#efe9de] text-[#52624f] text-xs font-bold">
                    {srv.badge}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#2c352b]">
                  {srv.title}
                </h2>

                <p className="text-sm text-[#4e574c] leading-relaxed">
                  {srv.description}
                </p>

                <ul className="space-y-2.5 pt-2 border-t border-[#52624f]/10">
                  {srv.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3c443a]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#52624f] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Warranty & After-sales Policy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#efe9de] rounded-3xl p-6 sm:p-10 border border-[#52624f]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#52624f]">
              <ShieldCheck className="w-4 h-4" />
              <span>Chính sách bảo hành minh bạch</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
              Bảo hành 5 năm khung gỗ sồi • Hỗ trợ kỹ thuật tại nhà trong 24 giờ
            </h2>
            <p className="text-sm text-[#4e574c] leading-relaxed">
              Mọi sản phẩm sofa Perfa đều được kích hoạt bảo hành điện tử theo số điện thoại của khách hàng. Khi cần kiểm tra, vệ sinh hay bọc mới vỏ đệm, kỹ thuật viên Perfa tại Hà Nội sẽ có mặt tại nhà bạn trong vòng 24 giờ làm việc.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-[#52624f]/12">
                <div className="font-serif font-bold text-lg text-[#52624f]">
                  5 Năm
                </div>
                <div className="text-xs text-[#586156]">
                  Bảo hành khung gỗ tự nhiên &amp; lò xo chịu lực
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#52624f]/12">
                <div className="font-serif font-bold text-lg text-[#52624f]">
                  3 Năm
                </div>
                <div className="text-xs text-[#586156]">
                  Bảo hành độ đàn hồi đệm mút K43 chống xẹp lún
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#52624f]/12">
                <div className="font-serif font-bold text-lg text-[#52624f]">
                  15 Ngày
                </div>
                <div className="text-xs text-[#586156]">
                  Đổi mẫu miễn phí nếu kích thước chưa vừa căn hộ
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#52624f]/15 space-y-4 text-center">
            <h3 className="font-serif text-xl font-bold text-[#2c352b]">
              Đặt lịch khảo sát tại Hà Nội
            </h3>
            <p className="text-xs text-[#586156] leading-relaxed">
              Liên hệ ngay để chuyên viên Perfa mang mẫu vải đến tư vấn tận căn hộ của bạn hoàn toàn miễn phí.
            </p>
            <Link
              href="/lien-he"
              className="w-full py-3.5 px-5 rounded-xl bg-[#52624f] text-[#f7f3ec] text-sm font-semibold hover:bg-[#3f4d3d] transition inline-flex items-center justify-center gap-2"
            >
              <span>Đặt lịch hẹn ngay</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:02466889968"
              className="w-full py-3 px-5 rounded-xl border border-[#52624f]/30 text-[#52624f] text-xs font-semibold hover:bg-[#52624f]/5 transition inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Gọi Hotline: 024 6688 9968</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
