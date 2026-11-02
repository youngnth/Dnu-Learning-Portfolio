import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Đặt Hàng Thành Công',
  description: 'Cảm ơn gia đình bạn đã tin chọn sofa Perfa tại Hà Nội.',
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; district?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id || 'cs_test_perfa_verified';
  const district = params.district || 'Hà Nội';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#52624f]/20 shadow-md text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#52624f]/15 text-[#52624f] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-11 h-11" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full bg-[#52624f]/12 text-[#52624f] text-xs font-bold uppercase tracking-wider">
          Thanh toán Stripe (Test Mode) Thành Công
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c352b]">
          Cảm ơn gia đình bạn đã tin chọn Perfa!
        </h1>

        <p className="text-sm sm:text-base text-[#4e574c] max-w-xl mx-auto leading-relaxed">
          Đơn hàng của bạn đã được ghi nhận trên hệ thống của Perfa Hà Nội. Điều phối viên giao lắp sẽ liên hệ xác nhận khung giờ vận chuyển tới{' '}
          <strong>{district}</strong> để không ảnh hưởng tới giờ nghỉ của bé.
        </p>

        <div className="p-4 rounded-2xl bg-[#f7f3ec] border border-[#52624f]/15 text-xs sm:text-sm text-left max-w-md mx-auto space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#586156]">Mã giao dịch Stripe:</span>
            <code className="font-mono font-bold text-[#52624f]">
              {sessionId.slice(0, 28)}
            </code>
          </div>
          <div className="flex justify-between">
            <span className="text-[#586156]">Trạng thái:</span>
            <span className="font-semibold text-[#2c352b]">
              Đã xác nhận (Chế độ thử nghiệm)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#586156]">Quà tặng kèm:</span>
            <span className="font-semibold text-[#52624f]">
              01 Voucher Spa giặt sofa sinh học tại nhà
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/san-pham"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#52624f] text-[#f7f3ec] text-sm font-semibold hover:bg-[#3f4d3d] transition inline-flex items-center justify-center gap-2"
          >
            <span>Tiếp tục khám phá sản phẩm</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl border border-[#52624f] text-[#52624f] text-sm font-semibold hover:bg-[#52624f]/5 transition"
          >
            Về trang chủ Perfa
          </Link>
        </div>

        <div className="pt-4 border-t border-[#52624f]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#586156]">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#52624f]" />
            Hotline hỗ trợ: 024 6688 9968
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#52624f]" />
            Showroom: 68 Tô Ngọc Vân, Tây Hồ, Hà Nội
          </span>
        </div>
      </div>
    </div>
  );
}
