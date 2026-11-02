import productsData from '@/data/products.json';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  type: string;
  material: string;
  colors: ProductColor[];
  images: string[];
  shortDescription: string;
  description: string;
  dimensions: string;
  frame: string;
  cushion: string;
  highlights: string[];
  featured: boolean;
  badge?: string;
  rating: number;
  reviewCount: number;
  idealFor: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export const products: Product[] = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(currentId: string, type: string, limit = 3): Product[] {
  const sameType = products.filter((p) => p.id !== currentId && p.type === type);
  if (sameType.length >= limit) {
    return sameType.slice(0, limit);
  }
  const others = products.filter((p) => p.id !== currentId && p.type !== type);
  return [...sameType, ...others].slice(0, limit);
}

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const PRODUCT_TYPES = [
  'Tất cả',
  'Sofa văng',
  'Sofa góc chữ L',
  'Sofa mô-đun & Sofa giường',
  'Sofa đơn & Đôn thư giãn',
];

export const PRODUCT_MATERIALS = [
  'Tất cả',
  'Vải Bouclé chống cào PerfaWeave™',
  'Vải Nhung Tuyết trượt nước AquaShield™',
  'Vải Linen kháng khuẩn BioLinen™',
  'Da vi sợi chống xước EcoPaws™',
];

export const PRODUCT_COLORS: ProductColor[] = [
  { name: 'Xanh rêu Perfa', hex: '#52624f' },
  { name: 'Kem sữa Yến mạch', hex: '#e8dfd1' },
  { name: 'Xám khói Đá cuội', hex: '#9ca09c' },
  { name: 'Nâu Caramel ấm', hex: '#a46b47' },
  { name: 'Cam đất Terracotta', hex: '#b8634a' },
  { name: 'Xanh Navy trầm', hex: '#354656' },
];

export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGES: PriceRange[] = [
  { id: 'all', label: 'Mọi mức giá', min: 0, max: Infinity },
  { id: 'under-15m', label: 'Dưới 15 triệu', min: 0, max: 15000000 },
  { id: '15m-25m', label: 'Từ 15 – 25 triệu', min: 15000000, max: 25000000 },
  { id: 'over-25m', label: 'Trên 25 triệu', min: 25000000, max: Infinity },
];
