import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, Sparkles, Youtube, Instagram, ShieldCheck, Heart, Send, Check } from 'lucide-react';
import { formatPersianNumber } from '../utils/persian';

export const HomePage: React.FC = () => {
  const { setCurrentView, setSelectedCategory, setSelectedProduct } = useShop();

  const [newsletterPhone, setNewsletterPhone] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const heroFeaturedProduct = PRODUCTS[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterPhone) return;
    setNewsletterSuccess(true);
    setNewsletterPhone('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-[#F3EEE7] rounded-3xl overflow-hidden border border-[#EAE3DA] shadow-sm my-4">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Content Column */}
          <div className="space-y-6 text-right z-10">
            <div className="inline-flex items-center gap-2 bg-[#701A23]/10 text-[#701A23] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#701A23]/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>کالکشن جدید پاییزی برند نیلوفر</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1A1C] leading-[1.2] font-vazirmatn">
              وقار اصیل ایرانی در قاب طراحی <span className="text-[#701A23]">مدرن و مینیمال</span>
            </h1>

            <p className="text-sm sm:text-base text-[#574E52] leading-relaxed max-w-xl">
              مجموعه‌ای نفیس از مانتوهای کتی، شال‌های ابریشمی دست‌دوز و هودی‌های اختصاصی. طراحی شده با بالاترین تراکم پارچه و دوخت تمیز صنعتی برای بانوی بااصالت ایرانی.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentView('shop');
                }}
                className="bg-[#701A23] hover:bg-[#58141B] text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
              >
                <span>مشاهده کالکشن جدید</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  if (heroFeaturedProduct) setSelectedProduct(heroFeaturedProduct);
                }}
                className="bg-white hover:bg-[#FCFAF7] text-[#1F1A1C] border border-[#EAE3DA] font-bold px-6 py-4 rounded-2xl transition-all text-xs"
              >
                مشاهده محصول ویژه روز
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-[#EAE3DA] flex items-center gap-6 text-xs text-[#574E52]">
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                <span>+۲۵۰ هزار دنبال‌کننده یوتیوب</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>+۴۰۰ هزار همراه اینستاگرام</span>
              </div>
            </div>
          </div>

          {/* Hero Image Column */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#EAE0D5] border-2 border-white shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
              alt="مانتو کتی پاییزی نیلوفر"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Subtle Brand Watermark Tag */}
            <div className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-white tracking-widest font-light">
              نیلوفر • NILOOFAR AUTUMN COLLECTION
            </div>

            {/* Price Badge Overlay */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-[#EAE3DA] shadow-lg text-right">
              <span className="text-[10px] text-[#574E52] block font-bold">مانتو کتی شاین بورگوندی:</span>
              <span className="text-sm font-extrabold text-[#701A23]">۱,۸۹۰,۰۰۰ تومان</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. BEST SELLERS GRID */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#EAE3DA] pb-4">
          <div>
            <span className="text-xs font-bold text-[#701A23] tracking-widest uppercase">BEST SELLERS</span>
            <h2 className="text-2xl font-extrabold text-[#1F1A1C] mt-1">پرفروش‌ترین‌های نیلوفر گالری</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
            }}
            className="text-xs font-bold text-[#701A23] hover:underline flex items-center gap-1"
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED COLLECTION BANNER */}
      <section className="bg-[#701A23] text-white rounded-3xl overflow-hidden shadow-xl my-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          
          <div className="p-8 sm:p-12 space-y-6 text-right">
            <span className="bg-amber-400 text-[#701A23] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              LIMITED EDITION • تولید محدود
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              کالکشن ویژه ست‌های پاییزی: بافت، شال و کیف
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              ترکیب ۳ تکه فوق‌العاده شامل بلوز بافت نرم، شال موهر گرم و کیف کوچک دوشی چرم. طراحی هماهنگ برای بانوانی که به دنبال تنپوشی یکدست و لوکس هستند.
            </p>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/20 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-amber-300 block font-bold mb-0.5">جنس پارچه:</span>
                <span>بافت کاموا موهر ارگانیک</span>
              </div>
              <div>
                <span className="text-amber-300 block font-bold mb-0.5">سایزبندی:</span>
                <span>فری سایز (۳۶ تا ۴۴)</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('special-sets');
                setCurrentView('shop');
              }}
              className="bg-amber-300 hover:bg-amber-400 text-[#701A23] font-black px-8 py-3.5 rounded-2xl transition-all shadow text-xs flex items-center gap-2"
            >
              <span>خرید ست کامل با ۲۰٪ تخفیف</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="h-full min-h-[320px] bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80')` }}>
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#701A23] via-transparent to-transparent opacity-80" />
          </div>

        </div>
      </section>

      {/* 4. NEW ARRIVALS GRID */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#EAE3DA] pb-4">
          <div>
            <span className="text-xs font-bold text-[#701A23] tracking-widest uppercase">NEW ARRIVALS</span>
            <h2 className="text-2xl font-extrabold text-[#1F1A1C] mt-1">جدیدترین‌های این هفته</h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
            }}
            className="text-xs font-bold text-[#701A23] hover:underline flex items-center gap-1"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. ABOUT FOUNDER BLURB (Intentional 1-time appearance on Homepage) */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3DA] shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Creator Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#F3EEE7] border-4 border-[#FCFAF7] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                alt="نیلوفر - بنیان‌گذار برند نیلوفر گالری"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#701A23] text-white p-4 rounded-2xl shadow-lg text-center font-bold text-xs">
              <span>نیلوفر</span>
              <span className="block text-[10px] text-amber-300 font-light mt-0.5">طراح و سازنده محتوا</span>
            </div>
          </div>

          {/* Founder Story Text */}
          <div className="lg:col-span-7 space-y-4 text-right">
            <span className="text-xs font-bold text-[#701A23] uppercase tracking-wider">ABOUT NILOOFAR</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1A1C]">
              از اشتیاق ساخت ویدیو تا طراحی پوشاک اصیل
            </h2>
            <p className="text-xs sm:text-sm text-[#574E52] leading-relaxed">
              سلام! من نیلوفر هستم. سال‌هاست که در کانال یوتیوب و صفحه اینستاگرامم درباره استایل، زیبایی و هنر پوشش زن ایرانی صحبت می‌کنم. پس از درخواست‌های بی‌شمار شما همراهان نازنین، بر آن شدم تا برندی خلق کنم که بازتاب‌دهنده همین نگاه کیفیت‌محور و وقار زنانه باشد.
            </p>
            <p className="text-xs sm:text-sm text-[#574E52] leading-relaxed">
              در نیلوفر گالری، تمام مراحل انتخاب پارچه، آسترکشی و الگوسازی تحت نظارت مستقیم خودم انجام می‌شود تا کالایی که به دست شما می‌رسد لایق شأن و زیبایی شما باشد.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('about')}
                className="bg-[#1F1A1C] hover:bg-[#701A23] text-white font-bold py-3 px-6 rounded-xl transition-all text-xs flex items-center gap-2"
              >
                <span>خواندن داستان کامل برند</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. WHATSAPP & NEWSLETTER SIGNUP SECTION */}
      <section className="bg-[#F3EEE7] rounded-3xl p-8 sm:p-10 border border-[#EAE3DA] text-center max-w-3xl mx-auto space-y-4">
        <div className="w-12 h-12 bg-[#701A23] text-amber-300 rounded-full flex items-center justify-center mx-auto shadow">
          <Send className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-extrabold text-[#1F1A1C]">
          عضویت در باشگاه VIP و کانال اطلاع‌رسانی واتس‌اپ
        </h2>
        <p className="text-xs text-[#574E52] max-w-md mx-auto">
          با ثبت شماره همراه خود، از تخفیف‌های رونمایی، کالکشن‌های محدود و کدهای تخفیف اختصاصی یوتیوب زودتر از دیگران مطلع شوید.
        </p>

        {newsletterSuccess ? (
          <div className="bg-emerald-600 text-white p-3.5 rounded-2xl text-xs font-bold animate-in fade-in flex items-center justify-center gap-2 max-w-md mx-auto">
            <Check className="w-4 h-4" />
            <span>شماره شما با موفقیت در باشگاه VIP نیلوفر ثبت شد!</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="tel"
              required
              value={newsletterPhone}
              onChange={(e) => setNewsletterPhone(e.target.value)}
              placeholder="شماره همراه (مثلا: ۰۹۱۲۳۴۵۶۷۸۹)"
              className="flex-1 bg-white border border-[#EAE3DA] rounded-2xl px-4 py-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
            />
            <button
              type="submit"
              className="bg-[#701A23] hover:bg-[#58141B] text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all shadow"
            >
              عضویت VIP
            </button>
          </form>
        )}
      </section>

    </div>
  );
};
