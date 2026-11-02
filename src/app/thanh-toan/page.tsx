import React from 'react';
import type { Metadata } from 'next';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata: Metadata = {
  title: 'Thanh Toán Đơn Hàng (Stripe Chế Độ Thử)',
  description:
    'Thanh toán an toàn qua Stripe ở chế độ thử nghiệm và đặt lịch giao lắp sofa Perfa miễn phí tận căn hộ tại Hà Nội.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
