'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
  Check,
} from 'lucide-react';
import {
  Product,
  PRODUCT_TYPES,
  PRODUCT_MATERIALS,
  PRODUCT_COLORS,
  PRICE_RANGES,
} from '@/lib/products';
import ProductCard from '@/components/ProductCard';

interface CatalogClientProps {
  initialProducts: Product[];
}

export default function CatalogClient({ initialProducts }: CatalogClientProps) {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('Tất cả');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('Tất cả');
  const [selectedColor, setSelectedColor] = useState('Tất cả');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync initial URL query parameter if provided (e.g. ?type=Sofa+văng)
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && PRODUCT_TYPES.includes(typeParam)) {
      setSelectedType(typeParam);
    }
    const materialParam = searchParams.get('material');
    if (materialParam && PRODUCT_MATERIALS.includes(materialParam)) {
      setSelectedMaterial(materialParam);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const priceObj =
      PRICE_RANGES.find((r) => r.id === selectedPriceRange) || PRICE_RANGES[0];

    const list = initialProducts.filter((product) => {
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchShort = product.shortDescription.toLowerCase().includes(q);
        const matchType = product.type.toLowerCase().includes(q);
        const matchMaterial = product.material.toLowerCase().includes(q);
        if (
          !matchName &&
          !matchDesc &&
          !matchShort &&
          !matchType &&
          !matchMaterial
        ) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'Tất cả' && product.type !== selectedType) {
        return false;
      }

      // Price filter
      if (product.price < priceObj.min || product.price > priceObj.max) {
        return false;
      }

      // Material filter
      if (
        selectedMaterial !== 'Tất cả' &&
        product.material !== selectedMaterial
      ) {
        return false;
      }

      // Color filter
      if (
        selectedColor !== 'Tất cả' &&
        !product.colors.some((c) => c.name === selectedColor)
      ) {
        return false;
      }

      return true;
    });

    // Sort
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    initialProducts,
    searchQuery,
    selectedType,
    selectedPriceRange,
    selectedMaterial,
    selectedColor,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('Tất cả');
    setSelectedPriceRange('all');
    setSelectedMaterial('Tất cả');
    setSelectedColor('Tất cả');
    setSortBy('featured');
  };

  const activeFilterCount =
    (selectedType !== 'Tất cả' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    (selectedMaterial !== 'Tất cả' ? 1 : 0) +
    (selectedColor !== 'Tất cả' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Search & Sort Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#52624f]/15 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#646e62] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm sofa theo tên, chất liệu chống cào, kích thước (VD: 2m, chữ L, nhà mèo)..."
              aria-label="Tìm kiếm sản phẩm"
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm text-[#2c352b] placeholder:text-[#7a8278] focus:outline-none focus:ring-2 focus:ring-[#52624f]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Xóa từ khóa tìm kiếm"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#646e62] hover:text-[#2c352b] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Filter Button & Sort Select */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#52624f] text-[#f7f3ec] text-sm font-semibold cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Bộ lọc</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#f7f3ec] text-[#52624f] text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="flex items-center gap-2 flex-1 sm:flex-initial">
              <label
                htmlFor="sort-select"
                className="text-xs font-semibold text-[#586156] whitespace-nowrap hidden sm:inline"
              >
                Sắp xếp:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | 'featured'
                      | 'price-asc'
                      | 'price-desc'
                      | 'rating'
                  )
                }
                className="w-full sm:w-auto px-3.5 py-3 rounded-xl bg-[#f7f3ec] border border-[#52624f]/20 text-sm font-medium text-[#2c352b] focus:outline-none focus:ring-2 focus:ring-[#52624f]"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white p-5 rounded-2xl border border-[#52624f]/15 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#52624f]/10 pb-3">
              <h2 className="font-serif text-lg font-bold text-[#2c352b] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#52624f]" />
                <span>Bộ lọc sản phẩm</span>
              </h2>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-[#52624f] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại</span>
                </button>
              )}
            </div>

            {/* 1. Filter by Type */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#52624f]">
                Loại sản phẩm
              </h3>
              <div className="space-y-1.5">
                {PRODUCT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between cursor-pointer ${
                      selectedType === type
                        ? 'bg-[#52624f] text-[#f7f3ec] font-semibold'
                        : 'text-[#3c443a] hover:bg-[#52624f]/10'
                    }`}
                  >
                    <span>{type}</span>
                    {selectedType === type && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Filter by Price */}
            <div className="space-y-2.5 pt-4 border-t border-[#52624f]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#52624f]">
                Mức giá
              </h3>
              <div className="space-y-1.5">
                {PRICE_RANGES.map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between cursor-pointer ${
                      selectedPriceRange === range.id
                        ? 'bg-[#52624f] text-[#f7f3ec] font-semibold'
                        : 'text-[#3c443a] hover:bg-[#52624f]/10'
                    }`}
                  >
                    <span>{range.label}</span>
                    {selectedPriceRange === range.id && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Filter by Material */}
            <div className="space-y-2.5 pt-4 border-t border-[#52624f]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#52624f]">
                Chất liệu thân thiện Bé &amp; Pet
              </h3>
              <div className="space-y-1.5">
                {PRODUCT_MATERIALS.map((material) => (
                  <button
                    key={material}
                    type="button"
                    onClick={() => setSelectedMaterial(material)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm transition flex items-center justify-between gap-2 cursor-pointer ${
                      selectedMaterial === material
                        ? 'bg-[#52624f] text-[#f7f3ec] font-semibold'
                        : 'text-[#3c443a] hover:bg-[#52624f]/10'
                    }`}
                  >
                    <span className="line-clamp-1">{material}</span>
                    {selectedMaterial === material && (
                      <Check className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Filter by Color */}
            <div className="space-y-2.5 pt-4 border-t border-[#52624f]/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#52624f]">
                Màu sắc
              </h3>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedColor('Tất cả')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between cursor-pointer ${
                    selectedColor === 'Tất cả'
                      ? 'bg-[#52624f] text-[#f7f3ec] font-semibold'
                      : 'text-[#3c443a] hover:bg-[#52624f]/10'
                  }`}
                >
                  <span>Tất cả màu sắc</span>
                  {selectedColor === 'Tất cả' && <Check className="w-4 h-4" />}
                </button>

                {PRODUCT_COLORS.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between cursor-pointer ${
                      selectedColor === color.name
                        ? 'bg-[#52624f] text-[#f7f3ec] font-semibold'
                        : 'text-[#3c443a] hover:bg-[#52624f]/10'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full border border-black/25 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </span>
                    {selectedColor === color.name && (
                      <Check className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Products Grid */}
        <div className="lg:col-span-9 space-y-6">
          {/* Active filter summary bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#586156]">
            <div>
              Hiển thị{' '}
              <strong className="text-[#2c352b]">
                {filteredProducts.length}
              </strong>{' '}
              trên tổng số{' '}
              <strong className="text-[#2c352b]">
                {initialProducts.length}
              </strong>{' '}
              sản phẩm Perfa
            </div>

            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {selectedType !== 'Tất cả' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#52624f]/12 text-[#52624f] text-xs font-semibold">
                    {selectedType}
                    <button
                      type="button"
                      onClick={() => setSelectedType('Tất cả')}
                      aria-label="Bỏ lọc loại"
                      className="cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {selectedPriceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#52624f]/12 text-[#52624f] text-xs font-semibold">
                    {
                      PRICE_RANGES.find((r) => r.id === selectedPriceRange)
                        ?.label
                    }
                    <button
                      type="button"
                      onClick={() => setSelectedPriceRange('all')}
                      aria-label="Bỏ lọc giá"
                      className="cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {selectedMaterial !== 'Tất cả' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#52624f]/12 text-[#52624f] text-xs font-semibold">
                    {selectedMaterial}
                    <button
                      type="button"
                      onClick={() => setSelectedMaterial('Tất cả')}
                      aria-label="Bỏ lọc chất liệu"
                      className="cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
                {selectedColor !== 'Tất cả' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#52624f]/12 text-[#52624f] text-xs font-semibold">
                    Màu: {selectedColor}
                    <button
                      type="button"
                      onClick={() => setSelectedColor('Tất cả')}
                      aria-label="Bỏ lọc màu"
                      className="cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#52624f]/15 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#2c352b]">
                Không tìm thấy mẫu sofa phù hợp với bộ lọc hiện tại
              </h3>
              <p className="text-sm text-[#586156] max-w-md mx-auto">
                Bạn hãy thử xóa bớt tiêu chí lọc hoặc liên hệ xưởng Perfa tại Hà Nội để đặt đóng theo kích thước &amp; màu sắc riêng.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#52624f] text-[#f7f3ec] text-sm font-semibold hover:bg-[#3f4d3d] transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Xem lại toàn bộ 15 sản phẩm</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
