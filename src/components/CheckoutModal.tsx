import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, formatPersianNumber } from '../utils/persian';
import { X, Check, MapPin, Truck, CreditCard, FileText, Printer, ArrowRight, Sparkles } from 'lucide-react';
import { ShippingDetails, OrderReceipt } from '../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartSubtotal, cartDiscountAmount, cartTotal, placeOrder } = useShop();

  const [step, setStep] = useState<number>(1); // 1: Address, 2: Shipping, 3: Payment, 4: Receipt
  const [completedReceipt, setCompletedReceipt] = useState<OrderReceipt | null>(null);

  // Address Form State
  const [shippingData, setShippingData] = useState<ShippingDetails>({
    fullName: '',
    phone: '',
    province: 'تهران',
    city: 'تهران',
    postalCode: '',
    address: '',
    note: '',
    shippingMethod: 'post',
    paymentMethod: 'online'
  });

  if (!isCheckoutOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      // Complete Order
      const receipt = placeOrder(shippingData);
      setCompletedReceipt(receipt);
      setStep(4);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setCompletedReceipt(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FCFAF7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EAE3DA] relative max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 bg-white border-b border-[#EAE3DA] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#701A23] text-white flex items-center justify-center font-bold text-xs">
              {formatPersianNumber(step)}
            </span>
            <h2 className="font-extrabold text-base text-[#1F1A1C]">
              {step === 1 && '۱. اطلاعات تحویل و آدرس گیرنده'}
              {step === 2 && '۲. انتخاب روش ارسال'}
              {step === 3 && '۳. روش پرداخت و ثبت نهایی'}
              {step === 4 && '۴. فاکتور و کد پیگیری سفارش'}
            </h2>
          </div>

          <button
            onClick={closeCheckout}
            className="p-2 text-[#574E52] hover:text-[#701A23] rounded-full hover:bg-[#F3EEE7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        {step < 4 && (
          <div className="bg-[#F3EEE7] px-6 py-2.5 border-b border-[#EAE3DA] flex justify-between text-xs font-semibold text-[#574E52]">
            <span className={step >= 1 ? 'text-[#701A23] font-bold' : ''}>۱. آدرس</span>
            <span>←</span>
            <span className={step >= 2 ? 'text-[#701A23] font-bold' : ''}>۲. ارسال</span>
            <span>←</span>
            <span className={step >= 3 ? 'text-[#701A23] font-bold' : ''}>۳. پرداخت</span>
          </div>
        )}

        {/* Form Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1F1A1C] block mb-1">نام و نام خانوادگی تحویل‌گیرنده:</label>
                  <input
                    type="text"
                    required
                    value={shippingData.fullName}
                    onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                    placeholder="مثال: مریم محمدی"
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1F1A1C] block mb-1">شماره تلفن همراه (جهت پیامک پستی):</label>
                  <input
                    type="tel"
                    required
                    value={shippingData.phone}
                    onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1F1A1C] block mb-1">استان:</label>
                  <select
                    value={shippingData.province}
                    onChange={(e) => setShippingData({ ...shippingData, province: e.target.value })}
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                  >
                    <option value="تهران">تهران</option>
                    <option value="اصفهان">اصفهان</option>
                    <option value="فارس">فارس (شیراز)</option>
                    <option value="خراسان رضوی">خراسان رضوی (مشهد)</option>
                    <option value="آذربایجان شرقی">آذربایجان شرقی (تبریز)</option>
                    <option value="گیلان">گیلان (رشت)</option>
                    <option value="مازندران">مازندران (ساری)</option>
                    <option value="سایر استان‌ها">سایر استان‌ها</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1F1A1C] block mb-1">شهر:</label>
                  <input
                    type="text"
                    required
                    value={shippingData.city}
                    onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                    placeholder="مثال: تهران"
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#1F1A1C] block mb-1">کد پستی (۱۰ رقمی):</label>
                  <input
                    type="text"
                    required
                    value={shippingData.postalCode}
                    onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                    placeholder="۱۹۸۳۹۱۲۳۴۵"
                    className="w-full bg-white border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1F1A1C] block mb-1">آدرس دقیق پستی:</label>
                <textarea
                  required
                  rows={3}
                  value={shippingData.address}
                  onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                  placeholder="خیابان اصلی، خیابان فرعی، کوچه، پلاک، واحد..."
                  className="w-full bg-white border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#574E52] block mb-1">یادداشت برای سفارشی‌سازی یا ارسال (اختیاری):</label>
                <input
                  type="text"
                  value={shippingData.note}
                  onChange={(e) => setShippingData({ ...shippingData, note: e.target.value })}
                  placeholder="مثلا: بسته‌بندی کادویی با کارت تبریک نیلوفر"
                  className="w-full bg-white border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#701A23] hover:bg-[#58141B] text-white font-bold py-3 px-8 rounded-xl shadow transition-all text-xs flex items-center gap-2"
                >
                  <span>مرحله بعد (انتخاب روش ارسال)</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <label className="text-xs font-bold text-[#1F1A1C] block">روش ارسال مورد نظر خود را انتخاب کنید:</label>
              
              <div className="space-y-3">
                <label
                  onClick={() => setShippingData({ ...shippingData, shippingMethod: 'post' })}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    shippingData.shippingMethod === 'post'
                      ? 'border-[#701A23] bg-[#701A23]/5'
                      : 'border-[#EAE3DA] bg-white hover:border-[#701A23]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#701A23]" />
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1A1C]">پست پیشتاز جمهوری اسلامی</h4>
                      <p className="text-[11px] text-[#574E52]">تحویل ۲ تا ۴ روز کاری با کد پیگیری پستی</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#701A23]">
                    {cartSubtotal >= 1000000 ? 'رایگان' : formatPrice(50000)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingData({ ...shippingData, shippingMethod: 'tipax' })}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    shippingData.shippingMethod === 'tipax'
                      ? 'border-[#701A23] bg-[#701A23]/5'
                      : 'border-[#EAE3DA] bg-white hover:border-[#701A23]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#701A23]" />
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1A1C]">ارسال با تیپاکس (سریع)</h4>
                      <p className="text-[11px] text-[#574E52]">تحویل ۲۴ تا ۴۸ ساعته درب منزل</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#701A23]">{formatPrice(75000)}</span>
                </label>

                <label
                  onClick={() => setShippingData({ ...shippingData, shippingMethod: 'peyk' })}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    shippingData.shippingMethod === 'peyk'
                      ? 'border-[#701A23] bg-[#701A23]/5'
                      : 'border-[#EAE3DA] bg-white hover:border-[#701A23]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#701A23]" />
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1A1C]">پیک اختصاصی تهران (همان روز)</h4>
                      <p className="text-[11px] text-[#574E52]">ویژه استان تهران و کرج - تحویل ۲ ساعته</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#701A23]">{formatPrice(95000)}</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-white border border-[#EAE3DA] text-[#1F1A1C] font-bold py-3 px-6 rounded-xl text-xs hover:bg-[#F3EEE7]"
                >
                  بازگشت به آدرس
                </button>

                <button
                  type="submit"
                  className="bg-[#701A23] hover:bg-[#58141B] text-white font-bold py-3 px-8 rounded-xl shadow transition-all text-xs flex items-center gap-2"
                >
                  <span>مرحله بعد (پرداخت)</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <label className="text-xs font-bold text-[#1F1A1C] block">روش پرداخت را انتخاب کنید:</label>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingData({ ...shippingData, paymentMethod: 'online' })}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    shippingData.paymentMethod === 'online'
                      ? 'border-[#701A23] bg-[#701A23]/5'
                      : 'border-[#EAE3DA] bg-white hover:border-[#701A23]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#701A23]" />
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1A1C]">درگاه آنلاین شتاب (بانک سامان / پارسیان)</h4>
                      <p className="text-[11px] text-[#574E52]">پرداخت امن آنلاین با کلیه کارت‌های عضو شتاب</p>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </label>

                <label
                  onClick={() => setShippingData({ ...shippingData, paymentMethod: 'card_to_card' })}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                    shippingData.paymentMethod === 'card_to_card'
                      ? 'border-[#701A23] bg-[#701A23]/5'
                      : 'border-[#EAE3DA] bg-white hover:border-[#701A23]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#701A23]" />
                    <div>
                      <h4 className="font-bold text-xs text-[#1F1A1C]">کارت به کارت مستقیم</h4>
                      <p className="text-[11px] text-[#574E52]">واریز به شماره کارت استودیو نیلوفر و ارسال فیش</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Order Summary Recap */}
              <div className="p-4 bg-[#F3EEE7] rounded-2xl border border-[#EAE3DA] space-y-2 text-xs text-[#574E52] mt-4">
                <div className="flex justify-between">
                  <span>نام گیرنده:</span>
                  <span className="font-bold text-[#1F1A1C]">{shippingData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>آدرس:</span>
                  <span className="font-bold text-[#1F1A1C]">{shippingData.province}، {shippingData.city}، {shippingData.address}</span>
                </div>
                <div className="flex justify-between text-[#701A23] font-bold text-sm pt-2 border-t border-[#EAE3DA]">
                  <span>مبلغ کل قابل پرداخت:</span>
                  <span>{formatPrice(cartTotal + (cartSubtotal >= 1000000 ? 0 : 50000))}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-white border border-[#EAE3DA] text-[#1F1A1C] font-bold py-3 px-6 rounded-xl text-xs hover:bg-[#F3EEE7]"
                >
                  بازگشت
                </button>

                <button
                  type="submit"
                  className="bg-[#701A23] hover:bg-[#58141B] text-white font-extrabold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>ثبت نهایی و پرداخت {formatPrice(cartTotal + (cartSubtotal >= 1000000 ? 0 : 50000))}</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && completedReceipt && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-[#1F1A1C]">سفارش شما با موفقیت ثبت شد! 🎉</h3>
                <p className="text-xs text-[#574E52] mt-1">کد پیگیری اختصاصی نیلوفر گالری:</p>
                <div className="bg-[#701A23] text-amber-300 font-mono font-bold text-lg px-6 py-2 rounded-xl inline-block mt-2 tracking-widest shadow">
                  {completedReceipt.orderId}
                </div>
              </div>

              {/* Printable Receipt Card */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE3DA] text-right space-y-3 text-xs text-[#1F1A1C] shadow-sm">
                <div className="flex justify-between border-b pb-2 border-[#EAE3DA] font-bold text-[#701A23]">
                  <span>فاکتور خرید برند نیلوفر</span>
                  <span>تاریخ: {completedReceipt.date}</span>
                </div>

                <div className="space-y-1 text-[#574E52]">
                  <p><strong>تحویل‌گیرنده:</strong> {completedReceipt.shippingDetails.fullName}</p>
                  <p><strong>شماره تماس:</strong> {completedReceipt.shippingDetails.phone}</p>
                  <p><strong>آدرس ارسال:</strong> {completedReceipt.shippingDetails.province}، {completedReceipt.shippingDetails.city}، {completedReceipt.shippingDetails.address}</p>
                </div>

                <div className="pt-2 border-t border-[#EAE3DA]">
                  <span className="font-bold block mb-1">اقلام سفارش ({formatPersianNumber(completedReceipt.items.length)} عدد):</span>
                  <ul className="space-y-1 text-[#574E52] pr-2">
                    {completedReceipt.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>• {it.product.title} (سایز {it.selectedSize}) × {formatPersianNumber(it.quantity)}</span>
                        <span className="font-bold">{formatPrice(it.product.price * it.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-[#EAE3DA] flex justify-between font-extrabold text-sm text-[#701A23]">
                  <span>جمع نهایی پرداخت شده:</span>
                  <span>{formatPrice(completedReceipt.total)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="bg-white border border-[#EAE3DA] text-[#1F1A1C] font-bold py-2.5 px-5 rounded-xl text-xs hover:bg-[#F3EEE7] flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4 text-[#701A23]" />
                  <span>چاپ فاکتور رسمی</span>
                </button>

                <button
                  onClick={closeCheckout}
                  className="bg-[#701A23] text-white font-bold py-2.5 px-6 rounded-xl text-xs hover:bg-[#58141B] shadow"
                >
                  بازگشت به صفحه اصلی
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
