'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, ShieldCheck } from 'lucide-react';
import { Product, ProductColor, formatVND } from '@/lib/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.colors[0]
  );

  return (
    <article className="group bg-white rounded-2xl border border-[#52624f]/12 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#efe9de]">
        <Link href={`/san-pham/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#52624f] text-[#f7f3ec] text-xs font-semibold shadow-xs">
            {product.badge}
          </span>
        )}

        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-[#2c352b] text-[11px] font-medium flex items-center gap-1 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#52624f]" />
          {product.material.split(' ')[0]} {product.material.split(' ')[1]}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-[#646e62]">
            <span className="font-medium text-[#52624f]">{product.type}</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <strong className="text-[#2c352b]">{product.rating}</strong> (
              {product.reviewCount})
            </span>
          </div>

          <Link href={`/san-pham/${product.slug}`}>
            <h3 className="font-serif text-lg font-bold text-[#2c352b] group-hover:text-[#52624f] transition line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#586156] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-3 pt-2 border-t border-[#52624f]/10">
          {/* Color Picker Preview */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#646e62]">
              Màu: <strong className="text-[#2c352b]">{selectedColor.name}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  title={color.name}
                  aria-label={`Chọn màu ${color.name}`}
                  className={`w-5 h-5 rounded-full border transition cursor-pointer ${
                    selectedColor.name === color.name
                      ? 'ring-2 ring-offset-1 ring-[#52624f] border-black/30 scale-110'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div>
              <div className="text-base sm:text-lg font-bold text-[#52624f]">
                {formatVND(product.price)}
              </div>
              {product.originalPrice && (
                <div className="text-xs text-[#8b9289] line-through">
                  {formatVND(product.originalPrice)}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => addItem(product, selectedColor, 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#52624f] text-[#f7f3ec] text-xs font-semibold hover:bg-[#3f4d3d] transition cursor-pointer shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Thêm vào giỏ</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
