import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatPersianNumber } from '../utils/persian';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart, setSelectedProduct } = useShop();

  const isWishlisted = wishlist.includes(product.id);

  const calculateDiscountPercent = () => {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const discountPercent = calculateDiscountPercent();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#EAE3DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F3EEE7] cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle Semi-Transparent Brand Watermark Mark (Discreet, bottom corner) */}
        <div className="absolute bottom-2 left-2 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity bg-black/20 backdrop-blur-[2px] px-2 py-0.5 rounded text-[10px] text-white tracking-widest font-light uppercase">
          نیلوفر • Niloofar
        </div>

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {product.isOnSale && discountPercent > 0 && (
            <span className="bg-[#701A23] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              %{formatPersianNumber(discountPercent)} تخفیف
            </span>
          )}
          {product.isNew && (
            <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              جدید
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm z-10 ${
            isWishlisted
              ? 'bg-[#701A23] text-white'
              : 'bg-white/80 text-[#1F1A1C] hover:bg-white hover:text-[#701A23]'
          }`}
          title={isWishlisted ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay Button on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="bg-white/90 hover:bg-white text-[#1F1A1C] text-xs font-bold py-2 px-4 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-[#701A23]" />
            <span>مشاهده جزئیات</span>
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#574E52] mb-1.5">
            <span className="font-medium text-[#701A23]/80">{product.categoryName}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{formatPersianNumber(product.rating)}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-bold text-sm text-[#1F1A1C] hover:text-[#701A23] transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Add To Cart Button */}
        <div className="pt-3 border-t border-[#F3EEE7] flex items-center justify-between mt-2">
          {/* Prices */}
          <div className="flex flex-col">
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] text-[#574E52] line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-extrabold text-[#701A23]">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Quick Add To Cart */}
          <button
            onClick={() => addToCart(product)}
            className="p-2.5 bg-[#F3EEE7] hover:bg-[#701A23] text-[#1F1A1C] hover:text-white rounded-xl transition-colors duration-200"
            title="افزودن به سبد خرید"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
