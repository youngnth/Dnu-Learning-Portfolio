'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Menu,
  X,
  Phone,
  MapPin,
  ShieldCheck,
  Search,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/san-pham', label: 'Sản phẩm' },
  { href: '/chat-lieu', label: 'Chất liệu' },
  { href: '/dich-vu', label: 'Dịch vụ' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
  { href: '/lien-he', label: 'Liên hệ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f7f3ec]/95 backdrop-blur-md border-b border-[#52624f]/15">
      {/* Top Announcement Bar */}
      <div className="bg-[#52624f] text-[#f7f3ec] text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d5e0d3] shrink-0" />
            <span>
              Sofa chống cào thú cưng &amp; trượt nước cho gia đình có trẻ nhỏ
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[#e6ebe5]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Showroom: 68 Tô Ngọc Vân, Tây Hồ, Hà Nội
            </span>
            <a
              href="tel:02466889968"
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5" />
              024 6688 9968 (Giao lắp miễn phí Hà Nội)
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#52624f] flex items-center justify-center text-[#f7f3ec] font-serif text-2xl font-bold tracking-tight group-hover:bg-[#3f4d3d] transition">
            P
          </div>
          <div>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2c352b] block leading-none">
              Perfa
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#52624f] font-medium block mt-0.5">
              Tổ ấm Hà Nội • Bé &amp; Pet
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-[#52624f] border-[#52624f] font-semibold'
                    : 'text-[#3a4238] border-transparent hover:text-[#52624f]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/san-pham"
            aria-label="Tìm kiếm sofa"
            className="p-2.5 rounded-full text-[#3a4238] hover:bg-[#52624f]/10 hover:text-[#52624f] transition"
            title="Tìm kiếm sản phẩm"
          >
            <Search className="w-5 h-5" />
          </Link>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Mở giỏ hàng"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#52624f] text-[#f7f3ec] hover:bg-[#3f4d3d] transition text-sm font-medium shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#f7f3ec] text-[#52624f] text-xs font-bold">
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu điện thoại"
            className="lg:hidden p-2.5 rounded-xl text-[#2c352b] hover:bg-[#52624f]/10 transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f7f3ec] border-b border-[#52624f]/20 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-1 gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-[#52624f] text-[#f7f3ec]'
                      : 'text-[#2c352b] hover:bg-[#52624f]/10'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-[#52624f]/15 flex flex-col gap-2 text-xs text-[#4a5448]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#52624f] shrink-0" />
              <span>Showroom: 68 Tô Ngọc Vân, Quảng An, Tây Hồ, Hà Nội</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#52624f] shrink-0" />
              <span>Mã ưu đãi khách Hà Nội: PERFAHANOI (Giảm 1.000.000₫)</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
