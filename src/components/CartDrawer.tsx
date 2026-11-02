'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatVND } from '@/lib/products';

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    isDrawerOpen,
    setIsDrawerOpen,
    toastMessage,
  } = useCart();

  return (
    <>
      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#2c352b] text-[#f7f3ec] px-4 py-3.5 rounded-2xl shadow-xl border border-[#52624f] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <CheckCircle2 className="w-5 h-5 text-[#9bc495] shrink-0" />
          <div className="text-xs sm:text-sm font-medium leading-snug">
            {toastMessage}
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="ml-2 text-xs font-semibold underline text-[#d5e0d3] shrink-0 cursor-pointer"
          >
            Xem giỏ
          </button>
        </div>
      )}

      {/* Slide-over Backdrop */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#f7f3ec] shadow-2xl flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#52624f]/15 flex items-center justify-between bg-white/60">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#52624f]" />
                  <h2 className="font-serif text-xl font-bold text-[#2c352b]">
                    Giỏ hàng của bạn ({totalItems})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Đóng giỏ hàng"
                  className="p-2 rounded-full hover:bg-[#52624f]/10 text-[#2c352b] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#52624f]/10 text-[#52624f] flex items-center justify-center mx-auto">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#2c352b]">
                      Giỏ hàng đang trống
                    </h3>
                    <p className="text-sm text-[#5c645a] max-w-xs mx-auto">
                      Hãy khám phá các mẫu sofa chống cào thú cưng và trượt nước an toàn cho bé của Perfa.
                    </p>
                    <Link
                      href="/san-pham"
                      onClick={() => setIsDrawerOpen(false)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#52624f] text-[#f7f3ec] text-sm font-medium hover:bg-[#3f4d3d] transition"
                    >
                      Khám phá sản phẩm
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor.name}`}
                      className="flex gap-3.5 p-3.5 rounded-2xl bg-white border border-[#52624f]/12 shadow-xs"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#efe9de]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/san-pham/${item.product.slug}`}
                          onClick={() => setIsDrawerOpen(false)}
                          className="font-serif font-semibold text-sm text-[#2c352b] hover:text-[#52624f] line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#5c645a]">
                          <span
                            className="w-3 h-3 rounded-full border border-black/15 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>Màu: {item.selectedColor.name}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-bold text-[#52624f]">
                            {formatVND(item.product.price * item.quantity)}
                          </span>
                          <div className="flex items-center gap-1 bg-[#f7f3ec] rounded-full px-2 py-0.5 border border-[#52624f]/20">
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
                              className="p-1 text-[#2c352b] hover:text-[#52624f] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-1.5">
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
                              className="p-1 text-[#2c352b] hover:text-[#52624f] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.product.id, item.selectedColor.name)
                        }
                        aria-label="Xóa sản phẩm"
                        className="text-[#8c948a] hover:text-red-600 self-start p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-5 bg-white border-t border-[#52624f]/15 space-y-4">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-[#5c645a]">
                      <span>Vận chuyển &amp; lắp đặt Hà Nội</span>
                      <span className="text-[#52624f] font-medium">Miễn phí</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#2c352b]">
                      <span>Tạm tính</span>
                      <span className="text-[#52624f]">{formatVND(subtotal)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/gio-hang"
                      onClick={() => setIsDrawerOpen(false)}
                      className="py-3 px-4 rounded-xl border border-[#52624f] text-[#52624f] font-semibold text-sm text-center hover:bg-[#52624f]/5 transition"
                    >
                      Xem giỏ hàng
                    </Link>
                    <Link
                      href="/thanh-toan"
                      onClick={() => setIsDrawerOpen(false)}
                      className="py-3 px-4 rounded-xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm text-center hover:bg-[#3f4d3d] transition"
                    >
                      Thanh toán
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
