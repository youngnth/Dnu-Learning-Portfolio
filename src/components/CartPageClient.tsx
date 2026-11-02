'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/lib/products';

export default function CartPageClient() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    couponCode,
    discountAmount,
    finalTotal,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const result = applyCoupon(inputCode);
    setCouponMessage(result);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#52624f]/12 text-[#52624f] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#2c352b]">
          Giỏ hàng của bạn đang trống
        </h1>
        <p className="text-sm sm:text-base text-[#586156] max-w-md mx-auto leading-relaxed">
          Bạn chưa thêm mẫu sofa nào vào giỏ hàng. Hãy khám phá bộ sưu tập 15 mẫu sofa thân thiện với trẻ nhỏ và thú cưng của Perfa tại Hà Nội.
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm sm:text-base hover:bg-[#3f4d3d] transition"
        >
          <span>Khám phá sản phẩm ngay</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2c352b]">
            Giỏ hàng của bạn
          </h1>
          <p className="text-sm text-[#586156] mt-1">
            Miễn phí giao hàng và lắp đặt tận căn hộ tại nội thành Hà Nội.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-[#6e776c] hover:text-red-600 self-start sm:self-auto cursor-pointer"
        >
          Xóa toàn bộ giỏ hàng
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor.name}`}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#52624f]/15 shadow-xs flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <div className="relative w-full sm:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-[#efe9de] shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 128px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/san-pham/${item.product.slug}`}
                    className="font-serif text-lg font-bold text-[#2c352b] hover:text-[#52624f] transition"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.product.id, item.selectedColor.name)
                    }
                    aria-label="Xóa khỏi giỏ hàng"
                    className="p-1.5 text-[#8a9288] hover:text-red-600 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-[#586156]">
                  Chất liệu: {item.product.material}
                </p>

                <div className="flex items-center gap-2 text-xs text-[#2c352b]">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: item.selectedColor.hex }}
                  />
                  <span>
                    Màu sắc: <strong>{item.selectedColor.name}</strong>
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 px-2 py-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor.name,
                          item.quantity - 1
                        )
                      }
                      aria-label="Giảm số lượng"
                      className="p-1.5 text-[#2c352b] hover:text-[#52624f] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor.name,
                          item.quantity + 1
                        )
                      }
                      aria-label="Tăng số lượng"
                      className="p-1.5 text-[#2c352b] hover:text-[#52624f] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold text-[#52624f]">
                      {formatVND(item.product.price * item.quantity)}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-xs text-[#6e776c]">
                        {formatVND(item.product.price)} / chiếc
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#52624f]/15 shadow-xs space-y-5">
            <h2 className="font-serif text-xl font-bold text-[#2c352b]">
              Tóm tắt đơn hàng
            </h2>

            {/* Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label
                htmlFor="coupon-input"
                className="block text-xs font-semibold text-[#586156]"
              >
                Mã ưu đãi khách Hà Nội (Thử: PERFAHANOI hoặc GIADINH)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#646e62] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="coupon-input"
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="PERFAHANOI"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-xs sm:text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#52624f]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#52624f] text-[#f7f3ec] text-xs font-semibold hover:bg-[#3f4d3d] transition cursor-pointer shrink-0"
                >
                  Áp dụng
                </button>
              </div>
              {couponMessage && (
                <p
                  className={`text-xs ${
                    couponMessage.success ? 'text-[#52624f]' : 'text-red-600'
                  }`}
                >
                  {couponMessage.message}
                </p>
              )}
              {couponCode && (
                <div className="flex items-center justify-between bg-[#52624f]/10 px-3 py-2 rounded-xl text-xs">
                  <span className="font-semibold text-[#52624f] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đang dùng mã: {couponCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      removeCoupon();
                      setCouponMessage(null);
                    }}
                    className="text-red-600 font-semibold hover:underline cursor-pointer"
                  >
                    Gỡ
                  </button>
                </div>
              )}
            </form>

            {/* Totals Breakdown */}
            <div className="space-y-3 pt-4 border-t border-[#52624f]/12 text-sm">
              <div className="flex justify-between text-[#586156]">
                <span>Tạm tính</span>
                <span className="font-medium text-[#2c352b]">
                  {formatVND(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#52624f]">
                  <span>Ưu đãi ({couponCode})</span>
                  <span className="font-semibold">
                    -{formatVND(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#586156]">
                <span>Giao hàng &amp; Lắp đặt Hà Nội</span>
                <span className="font-semibold text-[#52624f]">Miễn phí</span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#2c352b] pt-3 border-t border-[#52624f]/12">
                <span>Tổng thanh toán</span>
                <span className="text-[#52624f]">{formatVND(finalTotal)}</span>
              </div>
            </div>

            <Link
              href="/thanh-toan"
              className="w-full py-4 px-6 rounded-2xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm sm:text-base hover:bg-[#3f4d3d] transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>Tiến hành thanh toán</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="space-y-2 pt-2 text-xs text-[#586156]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#52624f] shrink-0" />
                <span>Hỗ trợ hẹn giờ giao hàng theo lịch sinh hoạt của bé</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#52624f] shrink-0" />
                <span>Thanh toán bảo mật qua Stripe (Chế độ thử)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
