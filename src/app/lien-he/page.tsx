import React from 'react';
import type { Metadata } from 'next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import ContactFormClient from '@/components/ContactFormClient';

export const metadata: Metadata = {
  title: 'Liên Hệ Showroom Perfa Tây Hồ Hà Nội',
  description:
    'Địa chỉ Showroom Perfa tại 68 Tô Ngọc Vân, Quảng An, Tây Hồ, Hà Nội và Xưởng sản xuất Hữu Bằng, Thạch Thất. Đặt lịch trải nghiệm sofa chống cào thú cưng.',
};

const FAQS = [
  {
    q: 'Gia đình mình có thể dẫn theo bé nhỏ và thú cưng đến Showroom Perfa không?',
    a: 'Hoàn toàn được! Showroom Perfa tại 68 Tô Ngọc Vân, Tây Hồ có góc đồ chơi gỗ an toàn cho các bé và luôn chào đón cún/mèo cưng đến nằm thử ghế để bạn kiểm chứng trực tiếp khả năng chống cào cũng như chống bám lông.',
  },
  {
    q: 'Mình ở chung cư Hà Nội sợ sofa cỡ lớn không vừa thang máy thì sao?',
    a: 'Đội ngũ kỹ thuật Perfa nắm rõ kích thước thang máy của hầu hết các khu đô thị tại Hà Nội (Vinhomes Smart City, Ocean Park, Times City, Ciputra, Ecopark...). Với các mẫu dài trên 2m4, chúng tôi thiết kế khớp nối mô-đun ngầm để vận chuyển qua thang máy dễ dàng và lắp ghép chắc chắn tại phòng khách.',
  },
  {
    q: 'Thời gian giao hàng tại Hà Nội mất bao lâu?',
    a: 'Với các mẫu và màu sắc có sẵn tại kho Hà Nội, Perfa giao lắp miễn phí trong 24 – 48 giờ. Với đơn đặt tùy chỉnh kích thước hoặc màu sắc riêng tại xưởng Thạch Thất, thời gian hoàn thiện là 5 – 7 ngày.',
  },
  {
    q: 'Vỏ đệm sofa tháo ra giặt máy ở chế độ nào để bền nhất?',
    a: 'Bạn chỉ cần kéo khóa YKK ẩn, lộn trái vỏ đệm cho vào túi giặt và chọn chế độ giặt nhẹ (Delicate/Hand wash) với nước mát dưới 30°C. Không dùng thuốc tẩy mạnh để bảo vệ lớp phủ trượt nước sinh học.',
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-[#52624f] text-[#f7f3ec] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d5e0d3]">
            Kết nối cùng Perfa Hà Nội
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Liên hệ &amp; Ghé thăm Showroom Tây Hồ
          </h1>
          <p className="text-sm sm:text-base text-[#e3dfd7] max-w-2xl leading-relaxed">
            Mời bạn ghé thưởng trà, ngồi thử trọn bộ 15 mẫu sofa gia đình và tự tay kiểm nghiệm các dòng vải chống cào thú cưng, trượt nước an toàn cho bé.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#52624f]/15 shadow-xs space-y-6">
              <h2 className="font-serif text-2xl font-bold text-[#2c352b]">
                Thông tin liên hệ trực tiếp
              </h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#52624f]/12 text-[#52624f] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2c352b]">
                      Showroom Trải Nghiệm (Tây Hồ)
                    </div>
                    <p className="text-[#586156] mt-0.5 leading-relaxed">
                      Số 68 Tô Ngọc Vân, Phường Quảng An, Quận Tây Hồ, Hà Nội (Có sân đỗ xe ô tô miễn phí)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#52624f]/12 text-[#52624f] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2c352b]">
                      Xưởng Sản Xuất &amp; Bảo Hành
                    </div>
                    <p className="text-[#586156] mt-0.5 leading-relaxed">
                      Lô B12, Khu công nghiệp làng nghề mộc Hữu Bằng, Huyện Thạch Thất, Hà Nội
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#52624f]/12 text-[#52624f] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2c352b]">
                      Điện thoại &amp; Zalo Tư Vấn
                    </div>
                    <p className="text-[#586156] mt-0.5">
                      Showroom: <strong>024 6688 9968</strong>
                      <br />
                      Hotline / Zalo 24/7: <strong>0988 682 468</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#52624f]/12 text-[#52624f] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2c352b]">Hộp thư điện tử</div>
                    <p className="text-[#586156] mt-0.5">
                      xin-chao@perfa.vn • cskh@perfa.vn
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#52624f]/12 text-[#52624f] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-[#2c352b]">
                      Giờ mở cửa Showroom
                    </div>
                    <p className="text-[#586156] mt-0.5">
                      09:00 – 21:00 (Tất cả các ngày từ Thứ 2 đến Chủ Nhật)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#efe9de] text-xs text-[#3c443a] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#52624f] shrink-0 mt-0.5" />
                <span>
                  Mẹo nhỏ: Hãy chụp trước 1–2 bức ảnh phòng khách hiện tại của bạn khi ghé showroom để kiến trúc sư Perfa tư vấn kích thước và phối màu chính xác nhất!
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Booking Form */}
          <div className="lg:col-span-7">
            <ContactFormClient />
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#52624f]">
            <HelpCircle className="w-4 h-4" />
            <span>Giải đáp nhanh</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
            Câu hỏi thường gặp từ khách hàng tại Hà Nội
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="bg-white p-6 rounded-2xl border border-[#52624f]/15 space-y-2.5"
            >
              <h3 className="font-serif text-lg font-bold text-[#2c352b]">
                {faq.q}
              </h3>
              <p className="text-sm text-[#586156] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
