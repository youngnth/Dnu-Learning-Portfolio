import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2c352b] text-[#f7f3ec] border-t border-[#52624f]/30">
      {/* Top Trust Badges */}
      <div className="border-b border-[#f7f3ec]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#52624f] text-[#f7f3ec] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base text-white">
                An toàn cho Bé &amp; Thú cưng
              </h3>
              <p className="text-xs text-[#d6d1c7] mt-1 leading-relaxed">
                Chứng nhận OEKO-TEX® không Formaldehyde, góc bo tròn, vải chống cào &amp; trượt nước.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#52624f] text-[#f7f3ec] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base text-white">
                Giao lắp miễn phí Hà Nội
              </h3>
              <p className="text-xs text-[#d6d1c7] mt-1 leading-relaxed">
                Đội ngũ kỹ thuật riêng giao tận căn hộ các quận nội thành Hà Nội, Ecopark &amp; Vinhomes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#52624f] text-[#f7f3ec] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base text-white">
                Gửi mẫu vải tận nhà miễn phí
              </h3>
              <p className="text-xs text-[#d6d1c7] mt-1 leading-relaxed">
                Trải nghiệm 8 mẫu vải chống cào &amp; thử đổ sữa/cà phê ngay tại phòng khách nhà bạn.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#52624f] text-[#f7f3ec] shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-base text-white">
                Bảo hành 5 năm tại Hà Nội
              </h3>
              <p className="text-xs text-[#d6d1c7] mt-1 leading-relaxed">
                Bảo hành khung gỗ sồi 5 năm, đệm mút 3 năm, tặng 1 lần Spa giặt sofa sinh học năm đầu.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#52624f] flex items-center justify-center text-[#f7f3ec] font-serif text-2xl font-bold">
              P
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-white block leading-none">
                Perfa
              </span>
              <span className="text-xs text-[#b5c2b2] tracking-wider uppercase">
                Nội thất cho Gia đình Trẻ &amp; Thú cưng
              </span>
            </div>
          </div>
          <p className="text-sm text-[#d6d1c7] leading-relaxed">
            Perfa ra đời tại Hà Nội với sứ mệnh tạo nên những chiếc sofa êm ái, bền bỉ để bố mẹ không còn phải lo lắng mỗi khi con làm đổ sữa hay mèo cưng mài móng mỗi ngày.
          </p>
          <div className="space-y-2 text-sm text-[#e3dfd7] pt-2">
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#8fa68b] shrink-0 mt-1" />
              <span>
                <strong>Showroom Tây Hồ:</strong> Số 68 Tô Ngọc Vân, Phường Quảng An, Quận Tây Hồ, Hà Nội
              </span>
            </p>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#8fa68b] shrink-0 mt-1" />
              <span>
                <strong>Xưởng sản xuất:</strong> Khu công nghiệp làng nghề Hữu Bằng, Thạch Thất, Hà Nội
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#8fa68b] shrink-0" />
              <a href="tel:02466889968" className="hover:underline">
                024 6688 9968 – Hotline Tư vấn: 0988 682 468
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#8fa68b] shrink-0" />
              <a href="mailto:xin-chao@perfa.vn" className="hover:underline">
                xin-chao@perfa.vn
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#8fa68b] shrink-0" />
              <span>Mở cửa: 09:00 – 21:00 (Thứ 2 – Chủ Nhật, chào đón thú cưng)</span>
            </p>
          </div>
        </div>

        {/* Product Categories */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-serif text-lg font-semibold text-white">
            Danh mục sản phẩm
          </h4>
          <ul className="space-y-2.5 text-sm text-[#d6d1c7]">
            <li>
              <Link
                href="/san-pham?type=Sofa+văng"
                className="hover:text-white transition"
              >
                Sofa văng cho chung cư Hà Nội
              </Link>
            </li>
            <li>
              <Link
                href="/san-pham?type=Sofa+góc+chữ+L"
                className="hover:text-white transition"
              >
                Sofa góc chữ L gia đình
              </Link>
            </li>
            <li>
              <Link
                href="/san-pham?type=Sofa+mô-đun+%26+Sofa+giường"
                className="hover:text-white transition"
              >
                Sofa mô-đun &amp; Sofa giường đa năng
              </Link>
            </li>
            <li>
              <Link
                href="/san-pham?type=Sofa+đơn+%26+Đôn+thư+giãn"
                className="hover:text-white transition"
              >
                Ghế bành mẹ &amp; bé, Đôn nhà mèo
              </Link>
            </li>
            <li>
              <Link href="/san-pham" className="hover:text-white transition">
                Xem toàn bộ 15 sản phẩm
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand & Services */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-serif text-lg font-semibold text-white">
            Về Perfa
          </h4>
          <ul className="space-y-2.5 text-sm text-[#d6d1c7]">
            <li>
              <Link href="/gioi-thieu" className="hover:text-white transition">
                Câu chuyện thương hiệu
              </Link>
            </li>
            <li>
              <Link href="/chat-lieu" className="hover:text-white transition">
                Công nghệ chất liệu
              </Link>
            </li>
            <li>
              <Link href="/dich-vu" className="hover:text-white transition">
                Dịch vụ đo đạc &amp; Spa sofa
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="hover:text-white transition">
                Đặt lịch hẹn Showroom
              </Link>
            </li>
            <li>
              <Link href="/gio-hang" className="hover:text-white transition">
                Giỏ hàng &amp; Thanh toán
              </Link>
            </li>
          </ul>
        </div>

        {/* Hanoi Delivery Area Info */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-serif text-lg font-semibold text-white">
            Khu vực phục vụ tại Hà Nội
          </h4>
          <p className="text-xs text-[#d6d1c7] leading-relaxed">
            Perfa hỗ trợ mang mẫu vải tận nhà và giao lắp miễn phí tại tất cả các quận nội thành &amp; khu đô thị lớn:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[
              'Tây Hồ',
              'Cầu Giấy',
              'Ba Đình',
              'Đống Đa',
              'Hai Bà Trưng',
              'Thanh Xuân',
              'Nam Từ Liêm',
              'Long Biên',
              'Vinhomes Smart City',
              'Vinhomes Ocean Park',
              'Times City',
              'Ciputra',
              'Starlake',
              'Ecopark',
            ].map((area) => (
              <span
                key={area}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[#f7f3ec]/10 text-[#e3dfd7]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#f7f3ec]/10 py-5 px-4 text-center text-xs text-[#b5b0a6]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Công ty TNHH Nội thất Gia đình Perfa Hà Nội. Bảo lưu mọi quyền.</p>
          <p>Thanh toán bảo mật qua Stripe (Chế độ thử nghiệm) &amp; COD tại Hà Nội.</p>
        </div>
      </div>
    </footer>
  );
}
