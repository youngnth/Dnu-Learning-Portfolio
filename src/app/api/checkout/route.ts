import { NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CheckoutRequestItem {
  id: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutRequestBody {
  items: CheckoutRequestItem[];
  customer: {
    fullName: string;
    phone: string;
    email: string;
    district: string;
    address: string;
    deliveryWindow: string;
    note?: string;
  };
  discountAmount?: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const { items, customer, discountAmount = 0 } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Giỏ hàng trống, không thể tạo phiên thanh toán.' },
        { status: 400 }
      );
    }

    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'http://localhost:3000';

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const hasRealStripeTestKey =
      Boolean(secretKey) &&
      secretKey!.startsWith('sk_test_') &&
      secretKey !== 'sk_test_your_secret_key_here';

    if (hasRealStripeTestKey && secretKey) {
      const stripe = new Stripe(secretKey);

      // VND is a zero-decimal currency in Stripe (max 99,999,999 VND per transaction)
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: customer.email || undefined,
        line_items: items.map((item) => ({
          price_data: {
            currency: 'vnd',
            product_data: {
              name: `${item.name} (Màu: ${item.color})`,
              images: item.image ? [item.image] : [],
            },
            unit_amount: Math.max(1000, item.price),
          },
          quantity: item.quantity,
        })),
        metadata: {
          customerName: customer.fullName,
          phone: customer.phone,
          district: customer.district,
          address: customer.address,
          deliveryWindow: customer.deliveryWindow,
          discountAmount: String(discountAmount),
        },
        success_url: `${origin}/thanh-toan/thanh-cong?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/thanh-toan?canceled=1`,
      });

      return NextResponse.json({
        url: session.url,
        mode: 'stripe-hosted-test',
      });
    }

    // Fallback Stripe Test Mode Sandbox when STRIPE_SECRET_KEY is not yet added in .env.local
    const mockSessionId = `cs_test_perfa_${Date.now()}`;
    return NextResponse.json({
      url: `${origin}/thanh-toan/thanh-cong?session_id=${mockSessionId}&district=${encodeURIComponent(
        customer.district
      )}`,
      mode: 'stripe-sandbox',
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      {
        error:
          'Không thể khởi tạo phiên thanh toán Stripe. Vui lòng kiểm tra cấu hình khóa thử nghiệm.',
      },
      { status: 500 }
    );
  }
}
