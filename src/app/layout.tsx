import type { Metadata } from 'next';
import { Playfair_Display, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://perfa-sofa.vercel.app'
  ),
  title: {
    default:
      'Perfa | Sofa Thân Thiện Với Gia Đình Có Trẻ Nhỏ & Thú Cưng Tại Hà Nội',
    template: '%s | Perfa Nội Thất Gia Đình Hà Nội',
  },
  description:
    'Perfa chuyên thiết kế và sản xuất sofa chống cào móng thú cưng, trượt nước chống bám bẩn sữa/đồ ăn và bo góc an toàn cho trẻ nhỏ tại Hà Nội. Giao lắp miễn phí nội thành.',
  keywords: [
    'sofa Hà Nội',
    'sofa chống mèo cào',
    'sofa cho gia đình có trẻ nhỏ',
    'sofa trượt nước',
    'nội thất Perfa',
    'sofa chung cư Hà Nội',
    'sofa gỗ sồi Nga Hà Nội',
  ],
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Perfa - Nội thất cho Gia đình Trẻ & Thú cưng',
    title:
      'Perfa | Sofa Thân Thiện Với Gia Đình Có Trẻ Nhỏ & Thú Cưng Tại Hà Nội',
    description:
      'Vải chống cào PerfaWeave™, công nghệ trượt nước AquaShield™ và khung gỗ sồi bo góc an toàn. Trải nghiệm tại Showroom 68 Tô Ngọc Vân, Tây Hồ, Hà Nội.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: 'Perfa - Nội Thất Gia Đình & Thú Cưng Hà Nội',
    description:
      'Thương hiệu sofa và nội thất phòng khách thân thiện với gia đình có trẻ nhỏ và thú cưng tại Hà Nội.',
    url: 'https://perfa-sofa.vercel.app',
    telephone: '+84-24-6688-9968',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '68 Tô Ngọc Vân, Phường Quảng An, Quận Tây Hồ',
      addressLocality: 'Hà Nội',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 21.0685,
      longitude: 105.8235,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '21:00',
    },
    priceRange: '₫₫',
  };

  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#f7f3ec] text-[#2c352b] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
