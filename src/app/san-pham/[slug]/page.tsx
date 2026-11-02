import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/products';
import ProductDetailClient from '@/components/ProductDetailClient';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
    };
  }

  return {
    title: `${product.name} – ${product.material}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Perfa Sofa Hà Nội`,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, product.type, 3);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Perfa',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: product.price,
      availability: 'https://schema.org/InStock',
      areaServed: 'Hà Nội',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#586156]"
      >
        <Link href="/" className="hover:text-[#52624f]">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/san-pham" className="hover:text-[#52624f]">
          Sản phẩm
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/san-pham?type=${encodeURIComponent(product.type)}`}
          className="hover:text-[#52624f]"
        >
          {product.type}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#2c352b] font-semibold">{product.name}</span>
      </nav>

      {/* Main Product Detail Interactive Component */}
      <ProductDetailClient product={product} />

      {/* Related Products */}
      <section className="pt-8 border-t border-[#52624f]/15 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2c352b]">
            Sản phẩm cùng dòng có thể bạn quan tâm
          </h2>
          <Link
            href="/san-pham"
            className="text-sm font-semibold text-[#52624f] hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
