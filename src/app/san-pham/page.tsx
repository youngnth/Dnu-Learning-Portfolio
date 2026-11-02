import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import CatalogClient from '@/components/CatalogClient';

export const metadata: Metadata = {
  title: 'Danh Mục 15 Mẫu Sofa Chống Cào & Trượt Nước',
  description:
    'Khám phá trọn bộ 15 mẫu sofa văng, sofa góc chữ L, sofa mô-đun và ghế thư giãn Perfa tại Hà Nội. Lọc nhanh theo loại, mức giá, chất liệu chống cào và màu sắc.',
};

export default function CatalogPage() {
  const allProducts = getAllProducts();

  return (
    <div>
      {/* Page Banner */}
      <section className="bg-[#52624f] text-[#f7f3ec] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#d5e0d3] font-semibold">
            Bộ sưu tập Perfa Hà Nội
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Danh mục Sofa cho Gia đình có Trẻ nhỏ &amp; Thú cưng
          </h1>
          <p className="text-sm sm:text-base text-[#e3dfd7] max-w-2xl leading-relaxed">
            Tất cả 15 mẫu thiết kế đều sử dụng khung gỗ sồi tự nhiên bo tròn góc cạnh, đệm mút không chứa Formaldehyde và vải bọc chống cào móng thú cưng. Giao lắp miễn phí tại Hà Nội.
          </p>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-[#586156]">
            Đang tải danh mục sản phẩm Perfa...
          </div>
        }
      >
        <CatalogClient initialProducts={allProducts} />
      </Suspense>
    </div>
  );
}
