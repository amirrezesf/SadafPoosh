import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryId } from '../types';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { formatPrice, formatPersianNumber } from '../utils/persian';

export const ShopPage: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'newest'>('default');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(4000000);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  const categories: { id: CategoryId; name: string }[] = [
    { id: 'all', name: 'همه محصولات' },
    { id: 'manto-coat', name: 'مانتو و پالتو' },
    { id: 'scarf-shawl', name: 'شال و روسری' },
    { id: 'hoodie-sweatshirt', name: 'هودی و دورس' },
    { id: 'accessory-bag', name: 'اکسسوری و کیف' },
    { id: 'special-sets', name: 'ست‌های اختصاصی' }
  ];

  const resetFilters = () => {
    setSelectedCategory('all');
    setSortBy('default');
    setOnlyInStock(false);
    setOnlySale(false);
    setSelectedSizeFilter('all');
    setMaxPriceFilter(4000000);
  };

  // Filter logic
  let filtered = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (onlyInStock && !p.inStock) return false;
    if (onlySale && !p.isOnSale) return false;
    if (selectedSizeFilter !== 'all' && !p.sizes.includes(selectedSizeFilter)) return false;
    if (p.price > maxPriceFilter) return false;
    return true;
  });

  // Sorting logic
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#F3EEE7] rounded-3xl p-8 border border-[#EAE3DA] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-right space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1A1C]">فروشگاه و کالکشن پوشاک نیلوفر</h1>
          <p className="text-xs text-[#574E52]">
            نمایش {formatPersianNumber(filtered.length)} محصول با تضمین کیفیت پارچه و اصالت دوخت
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden bg-white border border-[#EAE3DA] p-3 rounded-2xl text-xs font-bold text-[#1F1A1C] flex items-center gap-2 shadow-sm"
        >
          <Filter className="w-4 h-4 text-[#701A23]" />
          <span>فیلترها و مرتب‌سازی</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <div className={`space-y-6 bg-white p-6 rounded-3xl border border-[#EAE3DA] shadow-sm ${
          showMobileFilters ? 'block' : 'hidden lg:block'
        }`}>
          
          <div className="flex items-center justify-between border-b border-[#EAE3DA] pb-3">
            <h3 className="font-extrabold text-sm text-[#1F1A1C] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#701A23]" />
              <span>فیلتر محصولات</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-[#701A23] hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>بازنشانی</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1F1A1C] block">دسته‌بندی‌ها:</label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-right px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                    selectedCategory === cat.id
                      ? 'bg-[#701A23] text-white font-bold'
                      : 'text-[#574E52] hover:bg-[#F3EEE7]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-70">
                    ({formatPersianNumber(PRODUCTS.filter((p) => cat.id === 'all' || p.category === cat.id).length)})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter Slider */}
          <div className="space-y-2 border-t border-[#EAE3DA] pt-4">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#1F1A1C]">حداکثر قیمت:</label>
              <span className="font-bold text-[#701A23]">{formatPrice(maxPriceFilter)}</span>
            </div>
            <input
              type="range"
              min={500000}
              max={4000000}
              step={100000}
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-full accent-[#701A23]"
            />
          </div>

          {/* Availability Toggles */}
          <div className="space-y-2.5 border-t border-[#EAE3DA] pt-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-[#1F1A1C] font-semibold">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded accent-[#701A23] w-4 h-4"
              />
              <span>فقط کالاهای موجود در انبار</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-[#1F1A1C] font-semibold">
              <input
                type="checkbox"
                checked={onlySale}
                onChange={(e) => setOnlySale(e.target.checked)}
                className="rounded accent-[#701A23] w-4 h-4"
              />
              <span>فقط کالاهای تخفیف‌دار</span>
            </label>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 border-t border-[#EAE3DA] pt-4">
            <label className="text-xs font-bold text-[#1F1A1C] block">فیلتر سایز:</label>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'S', 'M', 'L', 'XL', 'فری سایز'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSizeFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedSizeFilter === s
                      ? 'bg-[#701A23] text-white'
                      : 'bg-[#F3EEE7] text-[#1F1A1C] hover:bg-[#EAE3DA]'
                  }`}
                >
                  {s === 'all' ? 'همه' : s}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Sort Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#EAE3DA] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-[#574E52] font-semibold">
              نمایش {formatPersianNumber(filtered.length)} از {formatPersianNumber(PRODUCTS.length)} محصول
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#574E52] font-bold">مرتب‌سازی براساس:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F3EEE7] border border-[#EAE3DA] rounded-xl px-3 py-2 font-bold text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
              >
                <option value="default">پیش‌فرض (محبوب‌ترین)</option>
                <option value="price-low">ارزان‌ترین به گران‌ترین</option>
                <option value="price-high">گران‌ترین به ارزان‌ترین</option>
                <option value="newest">جدیدترین‌ها</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE3DA] space-y-3">
              <h3 className="font-bold text-base text-[#1F1A1C]">محصولی با فیلترهای انتخابی یافت نشد</h3>
              <p className="text-xs text-[#574E52]">لطفا فیلترها را تغییر دهید یا دکمه بازنشانی را فشار دهید.</p>
              <button
                onClick={resetFilters}
                className="bg-[#701A23] text-white font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                بازنشانی همه فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
