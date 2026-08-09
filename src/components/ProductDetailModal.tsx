import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatPersianNumber } from '../utils/persian';
import { X, Star, ShoppingBag, Heart, Check, Truck, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';
import { MOCK_REVIEWS } from '../data/products';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, wishlist, toggleWishlist } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'size' | 'reviews'>('desc');

  // Review Form State
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [localReviews, setLocalReviews] = useState(MOCK_REVIEWS);
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);

  if (!selectedProduct) return null;

  const currentSize = selectedSize || selectedProduct.sizes[0] || 'فری سایز';
  const currentColor = selectedColor || selectedProduct.colors[0] || { name: 'اصلی', hex: '#701A23' };
  const isWishlisted = wishlist.includes(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentSize, currentColor, quantity);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewText) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      date: 'هم‌اکنون',
      rating: reviewRating,
      comment: reviewText,
      verifiedPurchase: true
    };

    setLocalReviews([newRev, ...localReviews]);
    setReviewName('');
    setReviewText('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FCFAF7] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#EAE3DA] relative max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#1F1A1C] shadow-md transition-all"
          title="بستن"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-[#F3EEE7] rounded-2xl overflow-hidden border border-[#EAE3DA]">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Subtle Watermark */}
                <div className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-[2px] px-2.5 py-1 rounded text-[10px] text-white tracking-widest font-light">
                  نیلوفر • NILOOFAR BOUTIQUE
                </div>
              </div>

              {/* Thumbnail Selectors */}
              {selectedProduct.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-[#701A23] ring-2 ring-[#701A23]/20' : 'border-[#EAE3DA] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta Column */}
            <div className="space-y-6 text-right">
              <div>
                <span className="text-xs font-bold text-[#701A23] bg-[#701A23]/10 px-3 py-1 rounded-full">
                  {selectedProduct.categoryName}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F1A1C] mt-2 leading-snug">
                  {selectedProduct.title}
                </h1>
                
                <div className="flex items-center gap-3 mt-3 text-xs text-[#574E52]">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{formatPersianNumber(selectedProduct.rating)}</span>
                  </div>
                  <span>•</span>
                  <span>({formatPersianNumber(selectedProduct.reviewCount)} نظر خریداران)</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    موجود در انبار استودیو
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="p-4 bg-[#F3EEE7] rounded-2xl flex items-center justify-between border border-[#EAE3DA]">
                <span className="text-xs text-[#574E52] font-medium">قیمت محصول:</span>
                <div className="flex flex-col text-left">
                  {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="text-xs text-[#574E52] line-through">
                      {formatPrice(selectedProduct.originalPrice)}
                    </span>
                  )}
                  <span className="text-xl font-extrabold text-[#701A23]">
                    {formatPrice(selectedProduct.price)}
                  </span>
                </div>
              </div>

              {/* Color Selector */}
              {selectedProduct.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1F1A1C] block">
                    انتخاب رنگ: <span className="text-[#701A23]">{currentColor.name}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {selectedProduct.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          currentColor.name === c.name
                            ? 'border-[#701A23] ring-2 ring-[#701A23]/30 scale-110'
                            : 'border-white shadow'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {currentColor.name === c.name && (
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {selectedProduct.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1F1A1C] block">
                    انتخاب سایز: <span className="text-[#701A23]">{currentSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          currentSize === s
                            ? 'bg-[#701A23] text-white shadow-md'
                            : 'bg-white text-[#1F1A1C] border border-[#EAE3DA] hover:border-[#701A23]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#EAE3DA] rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center font-bold text-[#1F1A1C] hover:bg-[#F3EEE7] rounded-lg"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#701A23]">
                      {formatPersianNumber(quantity)}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold text-[#1F1A1C] hover:bg-[#F3EEE7] rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-grow bg-[#701A23] hover:bg-[#58141B] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>افزودن به سبد خرید</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isWishlisted
                        ? 'bg-[#701A23] text-white border-[#701A23]'
                        : 'bg-white text-[#1F1A1C] border-[#EAE3DA] hover:text-[#701A23]'
                    }`}
                    title="افزودن به علاقه‌مندی"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Fast Features */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EAE3DA] text-[11px] text-[#574E52]">
                <div className="flex items-center gap-1.5 justify-center p-2 bg-white rounded-xl border border-[#EAE3DA]">
                  <Truck className="w-4 h-4 text-[#701A23]" />
                  <span>پست پیشتاز فوری</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center p-2 bg-white rounded-xl border border-[#EAE3DA]">
                  <RefreshCw className="w-4 h-4 text-[#701A23]" />
                  <span>۷ روز تعویض سایز</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center p-2 bg-white rounded-xl border border-[#EAE3DA]">
                  <ShieldCheck className="w-4 h-4 text-[#701A23]" />
                  <span>تضمین اصالت دوخت</span>
                </div>
              </div>

            </div>
          </div>

          {/* Tabbed Information Sections */}
          <div className="border-t border-[#EAE3DA] pt-6">
            <div className="flex items-center gap-2 border-b border-[#EAE3DA] pb-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('desc')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'desc' ? 'bg-[#701A23] text-white' : 'text-[#574E52] hover:bg-[#F3EEE7]'
                }`}
              >
                توضیحات محصول
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'specs' ? 'bg-[#701A23] text-white' : 'text-[#574E52] hover:bg-[#F3EEE7]'
                }`}
              >
                جنس پارچه و جزئیات
              </button>
              <button
                onClick={() => setActiveTab('size')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'size' ? 'bg-[#701A23] text-white' : 'text-[#574E52] hover:bg-[#F3EEE7]'
                }`}
              >
                راهنمای سایز
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'reviews' ? 'bg-[#701A23] text-white' : 'text-[#574E52] hover:bg-[#F3EEE7]'
                }`}
              >
                نظرات خریداران ({formatPersianNumber(localReviews.length)})
              </button>
            </div>

            <div className="py-6 text-sm text-[#1F1A1C] leading-relaxed">
              {activeTab === 'desc' && (
                <div className="space-y-3">
                  <p>{selectedProduct.description}</p>
                  {selectedProduct.features.length > 0 && (
                    <div className="pt-2">
                      <h4 className="font-bold text-xs text-[#701A23] mb-2">ویژگی‌های برجسته محصول:</h4>
                      <ul className="list-disc list-inside space-y-1 text-xs text-[#574E52]">
                        {selectedProduct.features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#EAE3DA]">
                    <span className="font-bold text-[#701A23] block mb-1">جنس پارچه:</span>
                    <span>{selectedProduct.fabric}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EAE3DA]">
                    <span className="font-bold text-[#701A23] block mb-1">دسته‌بندی:</span>
                    <span>{selectedProduct.categoryName}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EAE3DA]">
                    <span className="font-bold text-[#701A23] block mb-1">نحوه شستشو:</span>
                    <span>شستشو با آب ۳۰ درجه و شوینده ملایم بدون چنگ زدن شدید</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-[#EAE3DA]">
                    <span className="font-bold text-[#701A23] block mb-1">کشور مبدأ پارچه:</span>
                    <span>پارچه وارداتی با دوخت سفارشی شو روم نیلوفر تهران</span>
                  </div>
                </div>
              )}

              {activeTab === 'size' && (
                <div className="space-y-4 text-xs">
                  <p className="text-[#574E52]">جدول استاندارد سایزبندی مانتو و پوشاک نیلوفر گالری:</p>
                  <div className="overflow-x-auto rounded-xl border border-[#EAE3DA] bg-white">
                    <table className="w-full text-center border-collapse">
                      <thead>
                        <tr className="bg-[#701A23] text-white">
                          <th className="p-2.5">سایز</th>
                          <th className="p-2.5">دور سینه (cm)</th>
                          <th className="p-2.5">دور کمر (cm)</th>
                          <th className="p-2.5">دور باسن (cm)</th>
                          <th className="p-2.5">قد آستین (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE3DA] text-[#1F1A1C]">
                        <tr>
                          <td className="p-2.5 font-bold">۳۶ (Small)</td>
                          <td className="p-2.5">۸۴ - ۸۸</td>
                          <td className="p-2.5">۶۸ - ۷۲</td>
                          <td className="p-2.5">۹۲ - ۹۶</td>
                          <td className="p-2.5">۵۸</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold">۳۸ (Medium)</td>
                          <td className="p-2.5">۸۸ - ۹۲</td>
                          <td className="p-2.5">۷۲ - ۷۶</td>
                          <td className="p-2.5">۹۶ - ۱۰۰</td>
                          <td className="p-2.5">۵۹</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold">۴۰ (Large)</td>
                          <td className="p-2.5">۹۲ - ۹۶</td>
                          <td className="p-2.5">۷۶ - ۸۰</td>
                          <td className="p-2.5">۱۰۰ - ۱۰۴</td>
                          <td className="p-2.5">۶۰</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 font-bold">فری سایز</td>
                          <td className="p-2.5">تا ۱۱۰</td>
                          <td className="p-2.5">آزاد</td>
                          <td className="p-2.5">آزاد</td>
                          <td className="p-2.5">۶۰</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {localReviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-white rounded-2xl border border-[#EAE3DA] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1F1A1C]">{rev.author}</span>
                            {rev.verifiedPurchase && (
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                خریدار ثبت‌شده
                              </span>
                            )}
                          </div>
                          <span className="text-[#574E52]">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? 'fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-[#574E52] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <div className="p-5 bg-[#F3EEE7] rounded-2xl border border-[#EAE3DA] space-y-4">
                    <h4 className="font-bold text-xs text-[#701A23] flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>ثبت دیدگاه خریدار</span>
                    </h4>

                    {reviewSuccess && (
                      <div className="bg-emerald-600 text-white p-3 rounded-xl text-xs font-semibold animate-in fade-in">
                        دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود!
                      </div>
                    )}

                    <form onSubmit={handleAddReview} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-[#574E52] block mb-1">نام و نام خانوادگی:</label>
                          <input
                            type="text"
                            required
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            placeholder="مثلا: سارا رضایی"
                            className="w-full bg-white border border-[#EAE3DA] rounded-xl p-2.5 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-[#574E52] block mb-1">امتیاز شما:</label>
                          <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                            className="w-full bg-white border border-[#EAE3DA] rounded-xl p-2.5 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                          >
                            <option value={5}>۵ ستاره - عالی</option>
                            <option value={4}>۴ ستاره - بسیار خوب</option>
                            <option value={3}>۳ ستاره - معمولی</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-[#574E52] block mb-1">متن دیدگاه شما:</label>
                        <textarea
                          required
                          rows={3}
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="تجربه خود از جنس پارچه، تنخور و کیفیت دوخت را بنویسید..."
                          className="w-full bg-white border border-[#EAE3DA] rounded-xl p-2.5 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-[#701A23] hover:bg-[#58141B] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow"
                      >
                        ارسال نظر
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
