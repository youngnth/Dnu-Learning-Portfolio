'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Star,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Sparkles,
  Minus,
  Plus,
  Ruler,
  Layers,
  TreePine,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Product, ProductColor, formatVND } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0]
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, selectedColor, quantity);
    router.push('/thanh-toan');
  };

  const prevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-12">
      {/* Top Grid: Gallery + Purchase Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#52624f]/15 shadow-sm">
            <Image
              src={product.images[activeImageIndex]}
              alt={`${product.name} - Ảnh ${activeImageIndex + 1}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />

            {product.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#52624f] text-[#f7f3ec] text-xs font-semibold shadow-sm">
                {product.badge}
              </span>
            )}

            {product.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Ảnh trước"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#2c352b] flex items-center justify-center shadow-md transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Ảnh tiếp theo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#2c352b] flex items-center justify-center shadow-md transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {product.images.map((imgUrl, index) => (
              <button
                key={imgUrl + index}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition cursor-pointer ${
                  activeImageIndex === index
                    ? 'border-[#52624f] ring-2 ring-[#52624f]/30'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name} góc chụp ${index + 1}`}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info & Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#52624f]">
              <span className="px-3 py-1 rounded-full bg-[#52624f]/12">
                {product.type}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#efe9de] text-[#3c443a]">
                {product.material}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#2c352b] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <strong className="text-[#2c352b]">{product.rating}</strong>
              </div>
              <span className="text-[#646e62]">
                ({product.reviewCount} đánh giá từ khách hàng Hà Nội)
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#52624f]/15 flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#52624f]">
              {formatVND(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#8b9289] line-through">
                {formatVND(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full bg-[#52624f]/12 text-[#52624f]">
                Tiết kiệm {formatVND(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#4a5348] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Color Selector */}
          <div className="space-y-3 pt-2 border-t border-[#52624f]/15">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-[#2c352b]">
                Chọn màu sắc:{' '}
                <span className="text-[#52624f]">{selectedColor.name}</span>
              </span>
              <Link
                href="/chat-lieu"
                className="text-xs font-medium text-[#52624f] underline"
              >
                Xem bảng chất liệu
              </Link>
            </div>

            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor.name === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium transition cursor-pointer ${
                      isSelected
                        ? 'border-[#52624f] bg-[#52624f]/10 text-[#2c352b] ring-2 ring-[#52624f]/30 font-semibold'
                        : 'border-[#52624f]/20 bg-white text-[#4e574c] hover:border-[#52624f]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-[#2c352b]">
                Số lượng:
              </span>
              <div className="inline-flex items-center rounded-xl bg-white border border-[#52624f]/25 px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Giảm số lượng"
                  className="p-2 text-[#2c352b] hover:text-[#52624f] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#2c352b]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Tăng số lượng"
                  className="p-2 text-[#2c352b] hover:text-[#52624f] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="py-4 px-6 rounded-2xl bg-[#52624f] text-[#f7f3ec] font-semibold text-sm sm:text-base hover:bg-[#3f4d3d] transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Thêm vào giỏ hàng</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-2xl bg-[#2c352b] text-[#f7f3ec] font-semibold text-sm sm:text-base hover:bg-black transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Mua ngay (Giao Hà Nội)</span>
              </button>
            </div>
          </div>

          {/* Trust & Delivery Perks */}
          <div className="p-4 rounded-2xl bg-[#efe9de] border border-[#52624f]/15 space-y-2.5 text-xs sm:text-sm text-[#3c443a]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#52624f] shrink-0" />
              <span>
                <strong>Miễn phí giao hàng &amp; lắp đặt</strong> tại tất cả các quận Hà Nội
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#52624f] shrink-0" />
              <span>
                <strong>Bảo hành 5 năm khung gỗ sồi</strong>, 3 năm đệm mút chống xẹp lún
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#52624f] shrink-0" />
              <span>
                Tặng gói <strong>Spa giặt sofa sinh học tại nhà</strong> trong năm đầu tiên
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description & Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#52624f]/15">
        {/* Detailed Story & Highlights */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#52624f]/15 space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#2c352b]">
            Mô tả chi tiết &amp; Ưu điểm cho gia đình có Trẻ nhỏ và Thú cưng
          </h2>
          <p className="text-sm sm:text-base text-[#444d42] leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-[#2c352b]">
              Điểm nổi bật của {product.name}:
            </h3>
            <ul className="space-y-2.5">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-[#3c443a]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#52624f] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Specs Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#52624f]/15 space-y-5">
          <h2 className="font-serif text-2xl font-bold text-[#2c352b]">
            Thông số kỹ thuật
          </h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3 pb-3 border-b border-[#52624f]/10">
              <Ruler className="w-5 h-5 text-[#52624f] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#2c352b]">
                  Kích thước tiêu chuẩn
                </div>
                <div className="text-[#586156] mt-0.5">{product.dimensions}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-[#52624f]/10">
              <TreePine className="w-5 h-5 text-[#52624f] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#2c352b]">
                  Kết cấu khung xương
                </div>
                <div className="text-[#586156] mt-0.5">{product.frame}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 pb-3 border-b border-[#52624f]/10">
              <Layers className="w-5 h-5 text-[#52624f] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#2c352b]">
                  Cấu tạo đệm mút
                </div>
                <div className="text-[#586156] mt-0.5">{product.cushion}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#52624f] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#2c352b]">
                  Phù hợp nhất cho
                </div>
                <div className="text-[#586156] mt-0.5">{product.idealFor}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
