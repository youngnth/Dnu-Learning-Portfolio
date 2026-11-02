import React from 'react';
import type { Metadata } from 'next';
import CartPageClient from '@/components/CartPageClient';

export const metadata: Metadata = {
  title: 'Giỏ Hàng Sofa Gia Đình',
  description:
    'Xem lại các sản phẩm sofa Perfa đã chọn, áp dụng mã ưu đãi Hà Nội và tiến hành đặt giao lắp tận nhà.',
};

export default function CartPage() {
  return <CartPageClient />;
}
