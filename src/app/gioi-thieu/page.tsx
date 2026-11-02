import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShieldCheck,
  Award,
  TreePine,
  Baby,
  Cat,
  ArrowRight,
  MapPin,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Giới Thiệu Câu Chuyện Thương Hiệu Perfa Hà Nội',
  description:
    'Câu chuyện hình thành Perfa tại Hà Nội: từ nỗi trăn trở của những bậc phụ huynh có con nhỏ và nuôi thú cưng đến thương hiệu sofa an toàn chuẩn OEKO-TEX®.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero */}
      <section className="bg-[#52624f] text-[#f7f3ec] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d5e0d3]">
              Câu chuyện của Perfa (Từ 2019 tại Hà Nội)
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Khởi nguồn từ một vết sữa đổ và chú mèo thích mài móng mỗi sáng.
            </h1>
            <p className="text-sm sm:text-base text-[#e3dfd7] leading-relaxed">
              Perfa được sáng lập bởi một nhóm kiến trúc sư nội thất và các bậc cha mẹ trẻ tại quận Tây Hồ, Hà Nội. Chúng tôi tin rằng một phòng khách đẹp không phải là nơi con trẻ bị cấm chạy nhảy hay thú cưng bị đuổi xuống sàn, mà là nơi mọi thành viên đều được tự do tận hưởng sự êm ái.
            </p>
          </div>
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-[#f7f3ec]/20">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80"
              alt="Không gian phòng khách ấm cúng của Perfa tại Hà Nội"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Story & Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=900&q=80"
              alt="Gia đình quây quần trên chiếc sofa Perfa"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#52624f]">
              Triết lý thiết kế
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2c352b]">
              Thẩm mỹ Bắc Âu giao hòa cùng khí hậu và nếp sống gia đình Hà Nội
            </h2>
            <p className="text-sm sm:text-base text-[#4e574c] leading-relaxed">
              Khác với những mẫu sofa nhập khẩu đại trà có kích thước quá khổ hoặc dùng chất vải bí bách không hợp mùa hè nóng ẩm và mùa xuân nồm của miền Bắc, từng mẫu ghế Perfa được tính toán tỉ mỉ theo mặt bằng thực tế của các khu chung cư tại Hà Nội.
            </p>
            <p className="text-sm sm:text-base text-[#4e574c] leading-relaxed">
              Tại xưởng sản xuất rộng 2.500m² ở làng nghề mộc Hữu Bằng – Thạch Thất, những người thợ mộc lành nghề hơn 20 năm kinh nghiệm trực tiếp lựa chọn từng thanh gỗ Sồi Nga đã tẩm sấy đạt độ ẩm tiêu chuẩn 10–12%, mài nhẵn bo tròn toàn bộ góc cạnh và bọc đệm mút K43 không chứa chất độc hại.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-4 rounded-2xl bg-white border border-[#52624f]/15">
                <div className="font-serif text-2xl font-bold text-[#52624f]">
                  2.500m²
                </div>
                <div className="text-xs text-[#586156] mt-1">
                  Xưởng mộc tiêu chuẩn tại Thạch Thất, Hà Nội
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#52624f]/15">
                <div className="font-serif text-2xl font-bold text-[#52624f]">
                  0%
                </div>
                <div className="text-xs text-[#586156] mt-1">
                  Formaldehyde &amp; dung môi sơn công nghiệp độc hại
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#52624f]/15">
                <div className="font-serif text-2xl font-bold text-[#52624f]">
                  5 Năm
                </div>
                <div className="text-xs text-[#586156] mt-1">
                  Bảo hành tận nhà tại khắp các quận Hà Nội
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#52624f]/15 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#52624f]">
              Cam kết chất lượng
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2c352b]">
              4 Tiêu chuẩn vàng bảo vệ sức khỏe Trẻ nhỏ &amp; Thú cưng
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#f7f3ec] space-y-2.5">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#52624f]" />
                <h3 className="font-serif text-xl font-bold text-[#2c352b]">
                  Chứng nhận vải OEKO-TEX® Standard 100 (Hạng I)
                </h3>
              </div>
              <p className="text-sm text-[#4e574c] leading-relaxed">
                Toàn bộ vải bọc Perfa đạt phân hạng khắt khe nhất dành cho sản phẩm tiếp xúc trực tiếp với làn da nhạy cảm của trẻ sơ sinh dưới 36 tháng tuổi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f7f3ec] space-y-2.5">
              <div className="flex items-center gap-3">
                <TreePine className="w-6 h-6 text-[#52624f]" />
                <h3 className="font-serif text-xl font-bold text-[#2c352b]">
                  Dầu sáp ong thực vật đạt chuẩn EN71-3 Châu Âu
                </h3>
              </div>
              <p className="text-sm text-[#4e574c] leading-relaxed">
                Các chi tiết chân gỗ và tay vịn lộ vân được lau bằng dầu sáp ong tự nhiên đạt tiêu chuẩn an toàn đồ chơi trẻ em, không mùi hắc và an toàn ngay cả khi bé hay cún cưng gặm vào.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f7f3ec] space-y-2.5">
              <div className="flex items-center gap-3">
                <Baby className="w-6 h-6 text-[#52624f]" />
                <h3 className="font-serif text-xl font-bold text-[#2c352b]">
                  Thiết kế bo tròn R35 chống va đập
                </h3>
              </div>
              <p className="text-sm text-[#4e574c] leading-relaxed">
                Loại bỏ hoàn toàn các cạnh gỗ sắc nhọn. Toàn bộ khung viền sofa đều được bọc lót lớp mút bảo vệ dày tối thiểu 4cm để bé tập đi không bị đau khi vấp ngã.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#f7f3ec] space-y-2.5">
              <div className="flex items-center gap-3">
                <Cat className="w-6 h-6 text-[#52624f]" />
                <h3 className="font-serif text-xl font-bold text-[#2c352b]">
                  Kiểm định độ bền chống cào Martindale &gt;50.000 vòng
                </h3>
              </div>
              <p className="text-sm text-[#4e574c] leading-relaxed">
                Gấp 3 lần tiêu chuẩn vải nội thất thông thường, giúp bề mặt sofa giữ nguyên phom dáng suốt nhiều năm chung sống cùng mèo và cún cưng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-5">
        <Heart className="w-10 h-10 text-[#52624f] mx-auto" />
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
          Trải nghiệm trực tiếp sự êm ái của Perfa tại Tây Hồ, Hà Nội
        </h2>
        <p className="text-sm sm:text-base text-[#586156]">
          Ghé thăm Showroom Perfa tại 68 Tô Ngọc Vân hoặc khám phá ngay bộ sưu tập 15 mẫu sofa gia đình.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm hover:bg-[#3f4d3d] transition"
          >
            <span>Xem 15 mẫu Sofa Perfa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/lien-he"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border border-[#52624f] text-[#52624f] font-semibold text-sm hover:bg-[#52624f]/5 transition"
          >
            <MapPin className="w-4 h-4" />
            <span>Chỉ đường tới Showroom</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
