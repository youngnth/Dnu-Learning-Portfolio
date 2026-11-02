'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  CreditCard,
  Lock,
  Truck,
  ShieldCheck,
  MapPin,
  Copy,
  Check,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/lib/products';

const HANOI_DISTRICTS = [
  'Quận Tây Hồ (Showroom Perfa / Ciputra)',
  'Quận Cầu Giấy',
  'Quận Ba Đình',
  'Quận Đống Đa',
  'Quận Hai Bà Trưng (Times City)',
  'Quận Thanh Xuân (Royal City)',
  'Quận Nam Từ Liêm (Vinhomes Smart City)',
  'Quận Bắc Từ Liêm (Ngoại Giao Đoàn / Starlake)',
  'Quận Long Biên (Vinhomes Riverside)',
  'Huyện Gia Lâm (Vinhomes Ocean Park / Ecopark)',
  'Quận Hoàng Mai',
  'Quận Hà Đông',
];

export default function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, discountAmount, finalTotal, couponCode, clearCart } =
    useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState(HANOI_DISTRICTS[0]);
  const [address, setAddress] = useState('');
  const [deliveryWindow, setDeliveryWindow] = useState(
    'Khung giờ sáng (09:00 - 11:30) - Tránh giờ ngủ trưa của bé'
  );
  const [note, setNote] = useState('');

  // Stripe Test Card inputs for interactive test mode experience
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('424');
  const [copiedCard, setCopiedCard] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCopyTestCard = () => {
    navigator.clipboard?.writeText('4242424242424242');
    setCardNumber('4242 4242 4242 4242');
    setCopiedCard(true);
    setTimeout(() => setCopiedCard(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg('Giỏ hàng của bạn đang trống.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            color: item.selectedColor.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images[0],
          })),
          customer: {
            fullName,
            phone,
            email,
            district,
            address,
            deliveryWindow,
            note,
          },
          discountAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Có lỗi xảy ra khi xử lý thanh toán.');
      }

      clearCart();
      if (data.url.startsWith('http')) {
        window.location.href = data.url;
      } else {
        router.push(data.url);
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Không thể kết nối cổng thanh toán Stripe.'
      );
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-5">
        <h1 className="font-serif text-3xl font-bold text-[#2c352b]">
          Chưa có sản phẩm để thanh toán
        </h1>
        <p className="text-sm text-[#586156]">
          Vui lòng chọn ít nhất một mẫu sofa vào giỏ hàng trước khi tiến hành thanh toán.
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#52624f] text-[#f7f3ec] text-sm font-semibold hover:bg-[#3f4d3d] transition"
        >
          Quay lại danh mục sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <Link
          href="/gio-hang"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#52624f] hover:underline mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại giỏ hàng</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c352b]">
          Thanh toán &amp; Đặt lịch giao lắp tại Hà Nội
        </h1>
        <p className="text-sm text-[#586156] mt-1">
          Tích hợp cổng thanh toán quốc tế <strong>Stripe (Chế độ thử - Test Mode)</strong> an toàn, bảo mật.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left: Delivery Info & Stripe Test Card */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer & Hanoi Address */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#52624f]/15 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-[#52624f]/10 pb-3">
              <MapPin className="w-5 h-5 text-[#52624f]" />
              <h2 className="font-serif text-xl font-bold text-[#2c352b]">
                1. Thông tin nhận hàng tại Hà Nội
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-semibold text-[#3c443a] mb-1.5"
                >
                  Họ và tên người nhận *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nguyễn Văn An"
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-semibold text-[#3c443a] mb-1.5"
                >
                  Số điện thoại liên hệ *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912 345 678"
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-semibold text-[#3c443a] mb-1.5"
                >
                  Email nhận biên lai điện tử Stripe *
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="gia-dinh@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-district"
                  className="block text-xs font-semibold text-[#3c443a] mb-1.5"
                >
                  Quận / Khu đô thị tại Hà Nội *
                </label>
                <select
                  id="checkout-district"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                >
                  {HANOI_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="checkout-address"
                className="block text-xs font-semibold text-[#3c443a] mb-1.5"
              >
                Địa chỉ chi tiết (Số nhà / Tòa chung cư, Số căn hộ) *
              </label>
              <input
                id="checkout-address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ví dụ: Căn 1806, Tòa S2.05 Vinhomes Smart City"
                className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
              />
            </div>

            <div>
              <label
                htmlFor="checkout-window"
                className="block text-xs font-semibold text-[#3c443a] mb-1.5"
              >
                Khung giờ hẹn giao lắp (Phù hợp lịch sinh hoạt của bé)
              </label>
              <select
                id="checkout-window"
                value={deliveryWindow}
                onChange={(e) => setDeliveryWindow(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
              >
                <option value="Khung giờ sáng (09:00 - 11:30) - Tránh giờ ngủ trưa của bé">
                  Khung giờ sáng (09:00 - 11:30) – Tránh giờ ngủ trưa của bé
                </option>
                <option value="Khung giờ chiều (14:30 - 17:30) - Sau giờ ngủ trưa">
                  Khung giờ chiều (14:30 - 17:30) – Sau giờ ngủ trưa
                </option>
                <option value="Cuối tuần (Thứ 7 / Chủ Nhật)">
                  Giao vào cuối tuần (Thứ 7 hoặc Chủ Nhật)
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="checkout-note"
                className="block text-xs font-semibold text-[#3c443a] mb-1.5"
              >
                Ghi chú thêm (Đăng ký thang hàng chung cư, nhà có em bé đang ngủ...)
              </label>
              <textarea
                id="checkout-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Khi đến vui lòng gọi điện trước, đừng bấm chuông cửa vì bé nhỏ đang ngủ."
                className="w-full px-4 py-2.5 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
              />
            </div>
          </div>

          {/* Stripe Test Mode Payment Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#52624f] shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#52624f]/15 pb-3">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-[#52624f]" />
                <h2 className="font-serif text-xl font-bold text-[#2c352b]">
                  2. Thanh toán qua Stripe (Chế độ thử - Test Mode)
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                STRIPE TEST MODE
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#f7f3ec] border border-[#52624f]/20 space-y-2 text-xs sm:text-sm text-[#3c443a]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#2c352b]">
                  Thẻ thử nghiệm tiêu chuẩn của Stripe:
                </span>
                <button
                  type="button"
                  onClick={handleCopyTestCard}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#52624f] hover:underline cursor-pointer"
                >
                  {copiedCard ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã điền</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Điền nhanh thẻ 4242</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#586156]">
                Số thẻ: <code className="font-mono font-bold">4242 4242 4242 4242</code> • Ngày hết hạn: Bất kỳ ngày tương lai • CVC: 3 số bất kỳ. Không trừ tiền thật. Khi cấu hình <code className="font-mono">STRIPE_SECRET_KEY</code> trên Vercel, hệ thống tự động mở cổng Stripe Hosted Checkout.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="stripe-card"
                  className="block text-xs font-semibold text-[#3c443a] mb-1.5"
                >
                  Số thẻ tín dụng / ghi nợ (Stripe Test)
                </label>
                <input
                  id="stripe-card"
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/25 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="stripe-exp"
                    className="block text-xs font-semibold text-[#3c443a] mb-1.5"
                  >
                    Ngày hết hạn (MM/YY)
                  </label>
                  <input
                    id="stripe-exp"
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/25 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="stripe-cvc"
                    className="block text-xs font-semibold text-[#3c443a] mb-1.5"
                  >
                    Mã bảo mật CVC
                  </label>
                  <input
                    id="stripe-cvc"
                    type="text"
                    required
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="424"
                    className="w-full px-4 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/25 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl bg-[#52624f] text-[#f7f3ec] font-semibold text-base hover:bg-[#3f4d3d] disabled:opacity-60 transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing
                  ? 'Đang kết nối Stripe Test Mode...'
                  : `Thanh toán thử nghiệm ${formatVND(finalTotal)}`}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#52624f]/15 shadow-xs space-y-5 sticky top-28">
            <h2 className="font-serif text-xl font-bold text-[#2c352b]">
              Đơn hàng của bạn ({items.reduce((s, i) => s + i.quantity, 0)} sản phẩm)
            </h2>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}`}
                  className="flex items-center gap-3.5 pb-3 border-b border-[#52624f]/10"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#efe9de] shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-sm text-[#2c352b] line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-[#586156]">
                      Màu: {item.selectedColor.name} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[#52624f] shrink-0">
                    {formatVND(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-sm pt-2">
              <div className="flex justify-between text-[#586156]">
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#52624f] font-medium">
                  <span>Mã ưu đãi ({couponCode})</span>
                  <span>-{formatVND(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#586156]">
                <span>Giao hàng &amp; lắp đặt tại Hà Nội</span>
                <span className="text-[#52624f] font-semibold">Miễn phí</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-[#2c352b] pt-3 border-t border-[#52624f]/15">
                <span>Tổng cộng</span>
                <span className="text-[#52624f]">{formatVND(finalTotal)}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#efe9de] space-y-2 text-xs text-[#3c443a]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#52624f] shrink-0" />
                <span>
                  Đội ngũ kỹ thuật Perfa lắp đặt hoàn chỉnh và dọn sạch bao bì trước khi bàn giao.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#52624f] shrink-0" />
                <span>
                  Đổi trả miễn phí trong 15 ngày nếu kích thước không vừa phòng khách.
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
