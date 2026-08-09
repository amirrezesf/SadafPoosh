import React from 'react';
import { useShop } from '../context/ShopContext';
import { Youtube, Instagram, Sparkles, Award, Heart, ShieldCheck, ArrowLeft } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Hero */}
      <section className="bg-[#F3EEE7] rounded-3xl p-8 sm:p-12 border border-[#EAE3DA] text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#701A23] bg-[#701A23]/10 px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-[#701A23]/20">
          ABOUT NILOOFAR BOUTIQUE
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F1A1C] leading-snug">
          داستان نیلوفر: پیوند هنر ویدیو و طراحی پوشاک اصیل
        </h1>
        <p className="text-xs sm:text-sm text-[#574E52] leading-relaxed max-w-2xl mx-auto">
          روایتی از عشق به زیبایی، فرهنگ ایرانی و اشتیاق خلق برندی که نه فقط لباس، بلکه حس وقار و اعتماد به نفس به بانوی ایرانی می‌بخشد.
        </p>
      </section>

      {/* Story Grid Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#EAE0D5] border-4 border-white shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
            alt="نیلوفر - بنیان‌گذار برند"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl text-xs text-white">
            <strong>نیلوفر</strong> • طراح اصلی و بنیان‌گذار
          </div>
        </div>

        <div className="space-y-6 text-right leading-relaxed text-sm text-[#574E52]">
          <div className="flex items-center gap-2 text-[#701A23] font-bold">
            <Sparkles className="w-5 h-5" />
            <span>چگونه همه‌چیز شروع شد؟</span>
          </div>

          <h2 className="text-2xl font-extrabold text-[#1F1A1C]">
            «کیفیت؛ تنها زبانی است که تمام مخاطبان درک می‌کنند»
          </h2>

          <p>
            از سال‌ها پیش که شروع به تولید محتوای تخصصی در زمینه مد و استایل در یوتیوب کردم، همیشه دغدغه‌ام معرفی ست‌های باکیفیتی بود که علاوه بر تطابق با پوشش آراسته ایرانی، با آخرین ترندهای جهانی هماهنگی داشته باشند.
          </p>

          <p>
            با افزایش همراهان نازنین در یوتیوب و اینستاگرام، تصمیم گرفتم استودیوی طراحی اختصاصی نیلوفر را تاسیس کنم. جایی که خودمان صفر تا صد انتخاب پارچه، الگوسازی ارگونومیک و دوخت تمیز را تحت نظارت مستقیم انجام دهیم.
          </p>

          <p>
            ما در نیلوفر گالری باور داریم که هر زن ایرانی شایسته بهترین پارچه‌ها، آسترکشی‌های ابریشمی نرم و الگوهایی است که تنخور بی‌نقصی ایجاد کنند.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs font-bold text-[#1F1A1C]">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[#701A23]"
            >
              <Youtube className="w-5 h-5 text-red-600" />
              <span>۲۵۰K+ مشترک یوتیوب</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-[#701A23]"
            >
              <Instagram className="w-5 h-5 text-pink-600" />
              <span>۴۰۰K+ دنبال‌کننده اینستاگرام</span>
            </a>
          </div>
        </div>

      </section>

      {/* Brand Values Grid */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3DA] shadow-sm space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#701A23] uppercase">OUR VALUES</span>
          <h2 className="text-2xl font-extrabold text-[#1F1A1C]">ارزش‌ها و تعهدات برند نیلوفر</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#F3EEE7] rounded-2xl border border-[#EAE3DA] space-y-3 text-right">
            <Award className="w-8 h-8 text-[#701A23]" />
            <h3 className="font-extrabold text-base text-[#1F1A1C]">پارچه‌های اصیل وارداتی</h3>
            <p className="text-xs text-[#574E52]">
              استفاده اختصاصی از کرپ‌های والنتینو بریتانیایی، ابریشم طبیعی مامی و فوترهای کوبیده پشمی برای تضمین دوام چندین ساله.
            </p>
          </div>

          <div className="p-6 bg-[#F3EEE7] rounded-2xl border border-[#EAE3DA] space-y-3 text-right">
            <ShieldCheck className="w-8 h-8 text-[#701A23]" />
            <h3 className="font-extrabold text-base text-[#1F1A1C]">دوخت صنعتی با کیفیت خیاطی سفارشی</h3>
            <p className="text-xs text-[#574E52]">
              آسترکشی کامل، نوار دوزی‌های داخلی مرغوب و کنترل کیفیت تک‌تک محصولات قبل از بسته‌بندی پستی.
            </p>
          </div>

          <div className="p-6 bg-[#F3EEE7] rounded-2xl border border-[#EAE3DA] space-y-3 text-right">
            <Heart className="w-8 h-8 text-[#701A23]" />
            <h3 className="font-extrabold text-base text-[#1F1A1C]">ارتباط مستقیم و صمیمی با همراهان</h3>
            <p className="text-xs text-[#574E52]">
              تضمین تعویض بی‌قید و شرط ۷ روزه سایز و پاسخگویی سریع پشتیبانی در واتس‌اپ و اینستاگرام.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={() => setCurrentView('shop')}
            className="bg-[#701A23] hover:bg-[#58141B] text-white font-bold py-3.5 px-8 rounded-2xl transition-all shadow text-xs inline-flex items-center gap-2"
          >
            <span>مشاهده و خرید محصولات نیلوفر</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
