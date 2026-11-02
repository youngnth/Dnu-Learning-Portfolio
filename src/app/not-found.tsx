import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
      <div className="font-serif text-6xl font-bold text-[#52624f]">404</div>
      <h1 className="font-serif text-3xl font-bold text-[#2c352b]">
        Không tìm thấy trang bạn yêu cầu
      </h1>
      <p className="text-sm sm:text-base text-[#586156] max-w-md mx-auto">
        Đường dẫn có thể đã thay đổi hoặc sản phẩm không còn tồn tại. Mời bạn quay lại trang danh mục 15 mẫu sofa Perfa.
      </p>
      <Link
        href="/san-pham"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#52624f] text-[#f7f3ec] text-sm font-semibold hover:bg-[#3f4d3d] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Xem danh mục sản phẩm Perfa</span>
      </Link>
    </div>
  );
}
