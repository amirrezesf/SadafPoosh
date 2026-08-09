import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/persian';
import { X, Search, Sparkles, ChevronLeft } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, setSelectedProduct } = useShop();

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!searchQuery.trim()) return false;
    const q = searchQuery.trim().toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q)
    );
  });

  const popularTags = ['مانتو کتی', 'شال ابریشم', 'هودی', 'پالتو کشمیر', 'کالکشن جدید', 'کیف چرم'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-start justify-center p-4 sm:p-10 animate-in fade-in duration-200">
      <div className="bg-[#FCFAF7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EAE3DA] relative">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#EAE3DA] flex items-center gap-3">
          <Search className="w-6 h-6 text-[#701A23] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="نام محصول، جنس پارچه یا دسته‌بندی را بگردید..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1F1A1C] placeholder-[#574E52] focus:outline-none font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-gray-400 hover:text-[#701A23] text-xs font-bold"
            >
              پاک کردن
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#574E52] hover:text-[#701A23] rounded-full hover:bg-[#F3EEE7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="p-4 bg-[#F3EEE7] border-b border-[#EAE3DA] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="font-bold text-[#701A23] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            جستجوهای محبوب:
          </span>
          <div className="flex items-center gap-2">
            {popularTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(tag)}
                className="bg-white hover:bg-[#701A23] hover:text-white text-[#1F1A1C] px-3 py-1 rounded-full border border-[#EAE3DA] transition-all whitespace-nowrap text-[11px] font-semibold"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {!searchQuery.trim() ? (
            <div className="py-8 text-center text-xs text-[#574E52] space-y-2">
              <Search className="w-8 h-8 mx-auto text-[#701A23]/40" />
              <p>عبارت مورد نظر خود را تایپ کنید تا محصولات نیلوفر گالری جستجو شوند.</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#574E52] space-y-2">
              <p className="font-bold text-[#1F1A1C]">محصولی با مشخصات «{searchQuery}» پیدا نشد.</p>
              <p>عبارات دیگری مانند «مانتو»، «شال» یا «هودی» را امتحان کنید.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsSearchOpen(false);
                }}
                className="p-3 bg-white rounded-2xl border border-[#EAE3DA] hover:border-[#701A23] shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-14 h-16 object-cover rounded-xl bg-[#F3EEE7]"
                  />
                  <div className="text-right">
                    <span className="text-[10px] text-[#701A23] font-bold bg-[#701A23]/10 px-2 py-0.5 rounded-full">
                      {product.categoryName}
                    </span>
                    <h4 className="font-bold text-xs text-[#1F1A1C] group-hover:text-[#701A23] transition-colors mt-1">
                      {product.title}
                    </h4>
                    <span className="text-xs font-extrabold text-[#701A23] mt-0.5 block">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>

                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-[#701A23] group-hover:-translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
