import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Droplets,
  Sparkles,
  Wind,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import SwatchRequestSection from '@/components/SwatchRequestSection';
import { PRODUCT_COLORS } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Công Nghệ Chất Liệu Vải Chống Cào & Trượt Nước',
  description:
    'Tìm hiểu 4 dòng chất liệu độc quyền của Perfa: Vải Bouclé chống mèo cào PerfaWeave™, Nhung Tuyết trượt nước AquaShield™, Vải Lanh kháng khuẩn BioLinen™ và Da vi sợi EcoPaws™.',
};

const MATERIALS_DATA = [
  {
    name: 'Vải Bouclé chống cào PerfaWeave™',
    tag: 'Lựa chọn số 1 cho nhà nuôi mèo',
    martindale: '55.000 vòng ma sát',
    waterproof: 'Trượt nước bề mặt 10 phút',
    washable: 'Tháo rời vỏ giặt máy (Chế độ nhẹ 30°C)',
    description:
      'Sử dụng kỹ thuật dệt đan chéo 3 chiều không để lộ vòng sợi hở. Khi mèo hoặc cún cào móng lên mặt ghế, đầu móng sẽ trượt đi trên bề mặt mà không thể móc vào sợi vải để kéo rút hay làm xù lông.',
    benefits: [
      'Chống cào xước và rút sợi bởi móng mèo, móng chó',
      'Cảm giác chạm mềm mại, ấm áp vào mùa đông nhưng không bí lưng mùa hè',
      'Che giấu vết bẩn nhỏ cực tốt nhờ hiệu ứng dệt hạt Bouclé tinh tế',
    ],
    filterLink: '/san-pham?material=Vải+Bouclé+chống+cào+PerfaWeave™',
  },
  {
    name: 'Vải Nhung Tuyết trượt nước AquaShield™',
    tag: 'Hoàn hảo cho gia đình có bé nhỏ hay đổ sữa',
    martindale: '50.000 vòng ma sát',
    waterproof: 'Hiệu ứng lá sen ngăn thấm 15 phút',
    washable: 'Lau sạch bằng khăn ẩm hoặc tháo giặt máy',
    description:
      'Mỗi sợi vải được bao bọc bởi lớp màng sinh học phân tử nano an toàn tuyệt đối cho trẻ nhỏ. Khi sữa, nước cam, socola hay trà đổ lên mặt ghế, chất lỏng sẽ đọng thành giọt tròn trên bề mặt để bạn kịp dùng khăn giấy thấm sạch.',
    benefits: [
      'Không bám lông thú cưng: chỉ cần vuốt nhẹ bằng tay hoặc cây lăn bụi là sạch',
      'Lau sạch dễ dàng vết cháo ăn dặm, sữa trớ, màu nước của bé',
      'Bề mặt mịn màng như nhung lụa, nâng niu làn da nhạy cảm của em bé',
    ],
    filterLink: '/san-pham?material=Vải+Nhung+Tuyết+trượt+nước+AquaShield™',
  },
  {
    name: 'Vải Linen kháng khuẩn BioLinen™',
    tag: 'Khắc tinh của mùa nồm ẩm Hà Nội',
    martindale: '45.000 vòng ma sát',
    waterproof: 'Thoát ẩm nhanh gấp 3 lần vải thường',
    washable: 'Tháo rời 100% vỏ áo sofa giặt máy',
    description:
      'Được kết hợp từ sợi lanh tự nhiên và sợi tổng hợp kháng khuẩn ion bạc. Dòng vải này được thiết kế chuyên biệt cho khí hậu nhiệt đới gió mùa và những đợt nồm ẩm tháng 2–tháng 4 tại Hà Nội, ngăn ngừa nấm mốc và mùi hôi.',
    benefits: [
      'Kháng khuẩn tự nhiên, bảo vệ hệ hô hấp của trẻ sơ sinh và trẻ nhỏ',
      'Tháo rời toàn bộ vỏ tựa lưng, đệm ngồi và khung áo chỉ trong 5 phút',
      'Nhanh khô sau khi giặt, giữ phom phẳng phiu không cần là ủi',
    ],
    filterLink: '/san-pham?material=Vải+Linen+kháng+khuẩn+BioLinen™',
  },
  {
    name: 'Da vi sợi chống xước EcoPaws™',
    tag: 'Chống thấm 100% & Lau sạch bút sáp màu',
    martindale: '65.000 vòng ma sát',
    waterproof: 'Chống thấm tuyệt đối 100%',
    washable: 'Lau sạch trong 5 giây bằng khăn ấm',
    description:
      'Cấu trúc vi sợi 3D mô phỏng da bò thật nhưng có độ bền cơ học vượt trội và hoàn toàn thân thiện với động vật. Không bị nổ da hay bong tróc trong điều kiện thời tiết hanh khô hoặc ẩm ướt của miền Bắc.',
    benefits: [
      'Chống thấm nước 100%: không lo bé tè dầm hay cún làm đổ bát nước',
      'Chống trầy xước khi thú cưng nhảy lên ghế, lau sạch ngay vết bút sáp màu',
      'Không lưu mùi thức ăn hay mùi cơ thể vật nuôi',
    ],
    filterLink: '/san-pham?material=Da+vi+sợi+chống+xước+EcoPaws™',
  },
];

export default function MaterialsPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Header Banner */}
      <section className="bg-[#52624f] text-[#f7f3ec] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#d5e0d3]">
            Khoa học vật liệu Perfa
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white max-w-3xl leading-tight">
            Chất liệu bền bỉ trước móng vuốt, dịu lành với làn da em bé
          </h1>
          <p className="text-sm sm:text-base text-[#e3dfd7] max-w-2xl leading-relaxed">
            Mỗi mét vải và tấm đệm tại Perfa đều trải qua kiểm định khắt khe về độ bền ma sát, khả năng chống thấm bẩn và chứng chỉ an toàn sinh thái trước khi đưa vào sản xuất tại xưởng Hà Nội.
          </p>
        </div>
      </section>

      {/* 4 Signature Materials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2c352b]">
            4 Dòng chất liệu độc quyền tại Perfa
          </h2>
          <p className="text-sm text-[#586156]">
            Bạn có thể tùy chọn bất kỳ chất liệu và màu sắc nào cho mọi mẫu thiết kế sofa của Perfa mà không phát sinh chi phí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MATERIALS_DATA.map((mat) => (
            <div
              key={mat.name}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#52624f]/15 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#52624f]/12 text-[#52624f] text-xs font-bold">
                  {mat.tag}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2c352b]">
                  {mat.name}
                </h3>
                <p className="text-sm text-[#4e574c] leading-relaxed">
                  {mat.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-xl bg-[#f7f3ec] text-xs">
                    <div className="text-[#646e62] font-medium">Độ bền cào</div>
                    <div className="font-bold text-[#2c352b] mt-0.5">
                      {mat.martindale}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f7f3ec] text-xs">
                    <div className="text-[#646e62] font-medium">Kháng nước</div>
                    <div className="font-bold text-[#2c352b] mt-0.5">
                      {mat.waterproof}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f7f3ec] text-xs">
                    <div className="text-[#646e62] font-medium">Vệ sinh</div>
                    <div className="font-bold text-[#2c352b] mt-0.5">
                      {mat.washable}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 pt-2">
                  {mat.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#3c443a]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#52624f] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#52624f]/10">
                <Link
                  href={mat.filterLink}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#52624f] hover:text-[#3f4d3d]"
                >
                  <span>Xem các mẫu sofa dùng chất liệu này</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 Signature Colors Palette */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#52624f]/15 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#52624f]">
              Bảng màu thiên nhiên
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
              6 Gam màu ấm áp dễ phối nội thất căn hộ Hà Nội
            </h2>
            <p className="text-sm text-[#586156]">
              Sử dụng thuốc nhuộm hữu cơ bền màu cấp độ 4.5/5, không phai màu khi giặt máy hoặc đặt gần ban công nhiều nắng.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PRODUCT_COLORS.map((color) => (
              <Link
                key={color.name}
                href="/san-pham"
                className="group p-4 rounded-2xl bg-[#f7f3ec] border border-[#52624f]/15 hover:border-[#52624f] transition space-y-3"
              >
                <div
                  className="w-full aspect-square rounded-xl border border-black/15 shadow-inner group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <div className="font-serif font-bold text-sm text-[#2c352b]">
                    {color.name}
                  </div>
                  <div className="text-xs font-mono text-[#646e62] uppercase">
                    {color.hex}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Layer Cushion & Oak Frame Anatomy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#efe9de] rounded-3xl p-6 sm:p-10 border border-[#52624f]/20 space-y-8">
          <div className="flex items-center gap-3">
            <Layers className="w-6 h-6 text-[#52624f]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
              Cấu tạo 5 lớp bên trong mỗi chiếc Sofa Perfa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: 'Lớp 1',
                title: 'Vỏ bọc chống cào & trượt nước',
                desc: 'Khóa kéo YKK ẩn giúp tháo rời dễ dàng, ngăn chất lỏng và móng thú cưng.',
                icon: Droplets,
              },
              {
                step: 'Lớp 2',
                title: 'Vải lót chống thấm bảo vệ ruột',
                desc: 'Lớp màng thở 1 chiều ngăn bụi mịn, mạt bụi và nước thấm vào lõi mút.',
                icon: ShieldCheck,
              },
              {
                step: 'Lớp 3',
                title: 'Lông vũ nhân tạo Microfiber',
                desc: 'Tạo độ êm bồng bềnh ôm sát cơ thể ngay khi vừa ngồi xuống, kháng khuẩn.',
                icon: Sparkles,
              },
              {
                step: 'Lớp 4',
                title: 'Đệm mút lạnh K43 tỷ trọng cao',
                desc: 'Chống xẹp lún suốt 10 năm, nâng đỡ cột sống chuẩn công thái học.',
                icon: Wind,
              },
              {
                step: 'Lớp 5',
                title: 'Khung gỗ Sồi Nga & Lò xo túi',
                desc: 'Gỗ sồi tẩm sấy bo tròn góc cạnh, chịu lực nhún nhảy trên 500kg.',
                icon: Layers,
              },
            ].map((layer) => (
              <div
                key={layer.step}
                className="bg-white p-5 rounded-2xl border border-[#52624f]/12 space-y-2"
              >
                <span className="text-xs font-bold uppercase text-[#52624f]">
                  {layer.step}
                </span>
                <h3 className="font-serif text-base font-bold text-[#2c352b]">
                  {layer.title}
                </h3>
                <p className="text-xs text-[#586156] leading-relaxed">
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Swatch Box Request */}
      <SwatchRequestSection />
    </div>
  );
}
