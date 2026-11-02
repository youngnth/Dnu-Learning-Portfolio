import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShieldCheck,
  Droplets,
  Sparkles,
  Baby,
  Cat,
  MapPin,
  Star,
  CheckCircle2,
  Truck,
} from 'lucide-react';
import { getFeaturedProducts, getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import SwatchRequestSection from '@/components/SwatchRequestSection';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const totalProductsCount = getAllProducts().length;

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 lg:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#52624f]/12 text-[#52624f] text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Thương hiệu Sofa Gia đình &amp; Thú cưng tại Hà Nội</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-[#2c352b] leading-[1.15] tracking-tight">
                Chiếc sofa bình yên trước mọi vết sữa đổ và móng vuốt thú cưng.
              </h1>

              <p className="text-base sm:text-lg text-[#4e574c] leading-relaxed">
                Được chế tác riêng cho các tổ ấm trẻ tại Hà Nội: vải dệt{' '}
                <strong className="text-[#2c352b]">PerfaWeave™</strong> chống mèo cào xước, công nghệ trượt nước{' '}
                <strong className="text-[#2c352b]">AquaShield™</strong> lau sạch vết cháo sữa trong 10 giây, cùng khung gỗ sồi Nga bo tròn góc cạnh bảo vệ bé tập đi.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/san-pham"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm sm:text-base hover:bg-[#3f4d3d] transition shadow-md"
                >
                  <span>Khám phá {totalProductsCount} mẫu Sofa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/chat-lieu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border-2 border-[#52624f] text-[#52624f] font-semibold text-sm sm:text-base hover:bg-[#52624f]/8 transition"
                >
                  <span>Tìm hiểu công nghệ vải</span>
                </Link>
              </div>

              {/* Quick Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#52624f]/15">
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#52624f]">
                    55.000+
                  </div>
                  <div className="text-xs text-[#586156] mt-0.5">
                    Vòng ma sát chống cào móng mèo
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#52624f]">
                    100%
                  </div>
                  <div className="text-xs text-[#586156] mt-0.5">
                    Bo tròn góc &amp; chuẩn OEKO-TEX®
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#52624f]">
                    2.400+
                  </div>
                  <div className="text-xs text-[#586156] mt-0.5">
                    Gia đình tại Hà Nội tin chọn
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85"
                  alt="Sofa xanh rêu Perfa trong phòng khách ấm cúng tại Hà Nội"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#f7f3ec]/95 backdrop-blur-md p-4 rounded-2xl border border-[#52624f]/20 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#52624f]">
                      Mẫu bán chạy nhất tại Hà Nội
                    </span>
                    <p className="font-serif text-base sm:text-lg font-bold text-[#2c352b]">
                      Sofa Văng An Nhiên 3 Chỗ – Xanh Rêu Perfa
                    </p>
                  </div>
                  <Link
                    href="/san-pham/sofa-vang-an-nhien-3-cho"
                    className="px-4 py-2 rounded-xl bg-[#52624f] text-[#f7f3ec] text-xs font-semibold hover:bg-[#3f4d3d] transition shrink-0"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Perfa - 4 Core Pillars for Families with Kids & Pets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#52624f]">
            Giải pháp cho tổ ấm hiện đại
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2c352b]">
            Vì sao các gia đình có con nhỏ &amp; thú cưng tại Hà Nội chọn Perfa?
          </h2>
          <p className="text-sm sm:text-base text-[#586156]">
            Chúng tôi giải quyết triệt để 4 nỗi lo lớn nhất khi mua sofa sáng màu cho căn hộ có em bé và chó mèo.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#52624f]/12 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#52624f]/12 text-[#52624f] flex items-center justify-center">
              <Cat className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2c352b]">
              Chống cào móng thú cưng
            </h3>
            <p className="text-sm text-[#586156] leading-relaxed">
              Cấu trúc dệt sợi xoắn mật độ cao PerfaWeave™ không có vòng sợi hở, khiến móng mèo và cún trượt qua mà không thể móc rút sợi hay làm xù lông vải.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#52624f]/12 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#52624f]/12 text-[#52624f] flex items-center justify-center">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2c352b]">
              Trượt nước &amp; dễ lau sữa đổ
            </h3>
            <p className="text-sm text-[#586156] leading-relaxed">
              Màng bảo vệ sinh học AquaShield™ tạo hiệu ứng lá sen ngăn sữa, nước hoa quả, cháo hay nước tiểu thú cưng thấm xuống mút. Chỉ cần thấm nhẹ bằng khăn giấy.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#52624f]/12 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#52624f]/12 text-[#52624f] flex items-center justify-center">
              <Baby className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2c352b]">
              Bo tròn góc cạnh cho bé
            </h3>
            <p className="text-sm text-[#586156] leading-relaxed">
              100% khung gỗ sồi được vát tròn R35 và bọc đệm mút bảo vệ dày 4cm quanh viền. Không dùng keo chứa Formaldehyde, an toàn cho cả trẻ sơ sinh tập bò.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#52624f]/12 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#52624f]/12 text-[#52624f] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2c352b]">
              Chống ẩm mốc mùa nồm Hà Nội
            </h3>
            <p className="text-sm text-[#586156] leading-relaxed">
              Đệm mút cấu trúc lỗ thoáng khí kết hợp vỏ áo tháo rời giặt máy, giúp sofa luôn khô ráo, thơm tho ngay cả trong những tuần mưa phùn nồm ẩm miền Bắc.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#52624f]">
              Bộ sưu tập tiêu biểu
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2c352b]">
              Sản phẩm nổi bật được yêu thích nhất
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#52624f] hover:text-[#3f4d3d] group"
          >
            <span>Xem tất cả {totalProductsCount} sản phẩm</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Browse by Category / Space */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#52624f]/15 shadow-xs">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
              Chọn kiểu dáng theo không gian căn hộ Hà Nội
            </h2>
            <p className="text-sm text-[#586156]">
              Từ căn hộ 2 phòng ngủ ấm cúng tại Vinhomes Smart City đến biệt thự rộng rãi tại Ciputra hay Ecopark.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Sofa văng',
                subtitle: 'Gọn gàng cho chung cư 55m² – 95m²',
                href: '/san-pham?type=Sofa+văng',
                image:
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80',
              },
              {
                title: 'Sofa góc chữ L',
                subtitle: 'Rộng rãi cho cả gia đình quây quần',
                href: '/san-pham?type=Sofa+góc+chữ+L',
                image:
                  'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=700&q=80',
              },
              {
                title: 'Sofa mô-đun & Sofa giường',
                subtitle: 'Ghép linh hoạt, an toàn cho bé tập bò',
                href: '/san-pham?type=Sofa+mô-đun+%26+Sofa+giường',
                image:
                  'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80',
              },
              {
                title: 'Sofa đơn & Đôn thư giãn',
                subtitle: 'Ghế bành mẹ & bé, Đôn tích hợp ổ mèo',
                href: '/san-pham?type=Sofa+đơn+%26+Đôn+thư+giãn',
                image:
                  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80',
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] flex items-end p-5"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="relative z-10 text-white">
                  <h3 className="font-serif text-lg font-bold">{cat.title}</h3>
                  <p className="text-xs text-[#e6ebe5] mt-0.5">{cat.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Swatch Box Request */}
      <SwatchRequestSection />

      {/* Customer Stories in Hanoi */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#52624f]">
            Khách hàng thực tế tại Hà Nội
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2c352b]">
            Tổ ấm bình yên cùng sofa Perfa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Chị Nguyễn Minh Anh',
              location: 'Toà S2.05 Vinhomes Smart City, Nam Từ Liêm',
              family: 'Mẹ bé Bơ (2 tuổi) & nuôi 2 mèo Anh lông ngắn',
              product: 'Sofa Văng An Nhiên 3 Chỗ – Xanh rêu Perfa',
              quote:
                'Trước đây mình không dám mua sofa vải vì hai bạn mèo ở nhà cào rách hết góc ghế cũ. Từ ngày đổi sang dòng vải Bouclé PerfaWeave của Perfa đã hơn 1 năm mà mặt vải vẫn nguyên vẹn, bé Bơ làm đổ sữa hạt chỉ cần lấy khăn giấy thấm nhẹ là khô ráo.',
            },
            {
              name: 'Anh Hoàng Nam & Chị Thu Hà',
              location: 'Khu đô thị Ciputra, Quận Tây Hồ',
              family: 'Gia đình 2 bé trai (4 tuổi & 1 tuổi) + Cún Corgi',
              product: 'Sofa Mô-đun Tổ Ấm Kèm Đôn Bước Thú Cưng',
              quote:
                'Ấn tượng nhất là chiếc đôn bậc thấp đi kèm giúp bạn Corgi chân ngắn nhà mình leo lên ghế cực dễ mà không sợ đau khớp lưng. Chất da vi sợi EcoPaws lau vết bút màu sáp của hai cậu con trai siêu nhanh, dịch vụ giao lắp ở Tây Hồ rất chỉn chu.',
            },
            {
              name: 'Chị Trần Lan Hương',
              location: 'Park 7 Times City, Quận Hai Bà Trưng',
              family: 'Mẹ bầu & bé gái 3 tuổi',
              product: 'Sofa Góc Chữ L Mộc Lan & Ghế Bập Bênh Mẹ Bé',
              quote:
                'Mình đặt hộp mẫu vải miễn phí về ướm thử dưới ánh đèn phòng khách rồi mới chốt màu Kem sữa Yến mạch. Nhìn màu kem sáng nhưng cực kỳ sạch vì vỏ đệm tháo ra cho vào máy giặt rất nhẹ nhàng, mùa nồm Hà Nội vừa rồi ngồi vẫn thoáng mát.',
            },
          ].map((review) => (
            <div
              key={review.name}
              className="bg-white p-6 rounded-2xl border border-[#52624f]/15 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[#3c443a] leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
              <div className="pt-4 border-t border-[#52624f]/10 space-y-1">
                <div className="font-serif font-bold text-base text-[#2c352b]">
                  {review.name}
                </div>
                <div className="text-xs text-[#52624f] font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{review.location}</span>
                </div>
                <div className="text-xs text-[#6c756a]">{review.family}</div>
                <div className="text-[11px] font-semibold text-[#2c352b] pt-1">
                  Đã mua: {review.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showroom Invitation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#efe9de] rounded-3xl p-6 sm:p-10 border border-[#52624f]/20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#52624f]">
              <MapPin className="w-4 h-4" />
              Showroom Perfa Tây Hồ – Thân thiện với Trẻ nhỏ &amp; Thú cưng
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
              Mời gia đình bạn ghé ngồi thử sofa tại 68 Tô Ngọc Vân, Tây Hồ
            </h2>
            <p className="text-sm text-[#4e574c] leading-relaxed">
              Showroom Perfa có khu vui chơi gỗ an toàn cho các bé và chào đón bạn dắt theo cún/mèo cưng đến trải nghiệm trực tiếp độ êm cũng như thử khả năng chống cào của vải.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#2c352b]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#52624f] shrink-0" />
                <span>Chỗ đỗ xe ô tô miễn phí trước cửa showroom</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#52624f] shrink-0" />
                <span>Đo đạc căn hộ &amp; tư vấn phối màu miễn phí tại Hà Nội</span>
              </div>
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/lien-he"
                className="px-6 py-3 rounded-xl bg-[#52624f] text-[#f7f3ec] text-sm font-semibold hover:bg-[#3f4d3d] transition"
              >
                Đặt lịch hẹn trải nghiệm
              </Link>
              <Link
                href="/dich-vu"
                className="px-6 py-3 rounded-xl bg-white text-[#52624f] border border-[#52624f]/30 text-sm font-semibold hover:bg-[#52624f]/5 transition"
              >
                Xem dịch vụ đo đạc tại nhà
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
              alt="Không gian trưng bày sofa Perfa tại Tây Hồ, Hà Nội"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
