import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatPersianNumber } from '../utils/persian';
import { X, Trash2, ShoppingBag, ArrowLeft, Tag, Check, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartDiscountAmount,
    cartTotal,
    discountCode,
    applyDiscountCode,
    removeDiscount,
    setIsCheckoutOpen
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState<string>('');
  const [couponError, setCouponError] = useState<boolean>(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1000000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon) return;

    const success = applyDiscountCode(inputCoupon);
    if (!success) {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 3000);
    } else {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-[#FCFAF7] border-r border-[#EAE3DA] shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-5 bg-white border-b border-[#EAE3DA] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#701A23]" />
              <h2 className="font-extrabold text-base text-[#1F1A1C]">سبد خرید شما</h2>
              <span className="bg-[#701A23]/10 text-[#701A23] text-xs font-bold px-2 py-0.5 rounded-full">
                {formatPersianNumber(cart.reduce((s, i) => s + i.quantity, 0))} کالا
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#574E52] hover:text-[#701A23] rounded-full hover:bg-[#F3EEE7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#F3EEE7] px-5 py-3 border-b border-[#EAE3DA] text-xs">
            <div className="flex items-center justify-between font-medium text-[#1F1A1C] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#701A23]" />
                {remainingForFreeShipping === 0
                  ? 'تبریک! ارسال این سفارش رایگان است 🎉'
                  : `فقط ${formatPrice(remainingForFreeShipping)} دیگر تا ارسال رایگان`}
              </span>
              <span className="font-bold text-[#701A23]">
                %{formatPersianNumber(Math.round(freeShippingProgress))}
              </span>
            </div>
            <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#EAE3DA]">
              <div
                className="h-full bg-[#701A23] transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#574E52] space-y-4">
                <div className="w-16 h-16 bg-[#F3EEE7] rounded-full flex items-center justify-center text-[#701A23]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="font-bold text-sm text-[#1F1A1C]">سبد خرید شما خالی است</h3>
                <p className="text-xs max-w-xs">محصولات مورد علاقه خود را از فروشگاه نیلوفر به سبد خرید اضافه کنید.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#701A23] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow hover:bg-[#58141B] transition-all"
                >
                  مشاهده محصولات فروشگاه
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE3DA] shadow-sm flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-24 object-cover rounded-xl bg-[#F3EEE7] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between text-right">
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1A1C] line-clamp-1">{item.product.title}</h4>
                      <div className="text-[11px] text-[#574E52] flex items-center gap-2 mt-1">
                        <span>سایز: <strong>{item.selectedSize}</strong></span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <span>رنگ:</span>
                          <span
                            className="w-3 h-3 rounded-full border shadow-sm inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-[#EAE3DA] rounded-lg bg-[#FCFAF7]">
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-[#F3EEE7] rounded-r-lg"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#701A23]">
                          {formatPersianNumber(item.quantity)}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-[#F3EEE7] rounded-l-lg"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total Price */}
                      <span className="text-xs font-extrabold text-[#701A23]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors self-start"
                    title="حذف آیتم"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#EAE3DA] space-y-4">
              
              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute right-3 top-3 text-[#574E52]" />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="کد تخفیف (مثلا: YOUTUBE10)"
                      className="w-full bg-[#FCFAF7] border border-[#EAE3DA] rounded-xl pr-9 pl-3 py-2 text-xs text-[#1F1A1C] uppercase focus:outline-none focus:border-[#701A23]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1F1A1C] hover:bg-[#701A23] text-white text-xs font-bold px-4 rounded-xl transition-all"
                  >
                    اعمال
                  </button>
                </div>

                {discountCode && (
                  <div className="flex items-center justify-between text-[11px] bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-200">
                    <span className="flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      کد {discountCode} فعال شد (%۱۰ تخفیف)
                    </span>
                    <button
                      type="button"
                      onClick={removeDiscount}
                      className="text-red-600 hover:underline text-[10px]"
                    >
                      حذف
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-[11px] text-red-600 font-medium">کد تخفیف نامعتبر است! کد YOUTUBE10 را امتحان کنید.</p>
                )}
              </form>

              {/* Price Calculation Lines */}
              <div className="space-y-2 text-xs border-t border-[#F3EEE7] pt-3 text-[#574E52]">
                <div className="flex justify-between">
                  <span>جمع کل کالاها:</span>
                  <span className="font-bold text-[#1F1A1C]">{formatPrice(cartSubtotal)}</span>
                </div>

                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>مبلغ تخفیف:</span>
                    <span>- {formatPrice(cartDiscountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>هزینه ارسال:</span>
                  <span className="font-bold text-[#1F1A1C]">
                    {remainingForFreeShipping === 0 ? 'رایگان (هدیه نیلوفر)' : formatPrice(50000)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-[#701A23] border-t border-[#EAE3DA] pt-2">
                  <span>مبلغ قابل پرداخت:</span>
                  <span>
                    {formatPrice(cartTotal + (remainingForFreeShipping === 0 ? 0 : 50000))}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#701A23] hover:bg-[#58141B] text-white font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>ادامه روند خرید و ثبت آدرس</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
