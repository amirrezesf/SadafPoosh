import React from 'react';
import { Phone, Mail, MapPin, Youtube, Instagram, Send, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  return (
    <footer className="bg-[#1F1A1C] text-[#F3EEE7] pt-16 pb-8 border-t-4 border-[#701A23]">
      {/* Guarantees / Store Value Props Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <Truck className="w-8 h-8 text-amber-300 mb-3" />
            <h4 className="font-bold text-sm text-white mb-1">ارسال پیشتاز به کل ایران</h4>
            <p className="text-xs text-white/60">تحویل سریع با قابلیت کد پیگیری پستی</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <RefreshCw className="w-8 h-8 text-amber-300 mb-3" />
            <h4 className="font-bold text-sm text-white mb-1">۷ روز ضمانت تعویض</h4>
            <p className="text-xs text-white/60">تعویض سایز و کالا بدون دردسر</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <ShieldCheck className="w-8 h-8 text-amber-300 mb-3" />
            <h4 className="font-bold text-sm text-white mb-1">تضمین اصالت پارچه و دوخت</h4>
            <p className="text-xs text-white/60">استفاده از پارچه‌های وارداتی درجه یک</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors">
            <Award className="w-8 h-8 text-amber-300 mb-3" />
            <h4 className="font-bold text-sm text-white mb-1">طراحی اختصاصی برند نیلوفر</h4>
            <p className="text-xs text-white/60">کالکشن‌های محدود و ماندگار</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand Info & Founder Signature */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-white">نیلوفر <span className="text-[#A88D92] font-light">گالری</span></span>
              <span className="text-[10px] text-amber-300/80 tracking-widest uppercase">NILOOFAR BOUTIQUE & MERCH</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              فروشگاه رسمی پوشاک و برند اختصاصی نیلوفر. بازآفرینی استایل اصیل زن ایرانی با خطوط مدرن، پارچه‌های باکیفیت و دوخت صنعتی دقیق.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors text-white"
                title="کانال یوتیوب نیلوفر"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors text-white"
                title="صفحه اینستاگرام نیلوفر"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-colors text-white"
                title="کانال تلگرام نیلوفر"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 border-r-2 border-[#701A23] pr-2">دسترسی سریع</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-amber-300 transition-colors">صفحه اصلی</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-amber-300 transition-colors">فروشگاه پوشاک</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('about')} className="hover:text-amber-300 transition-colors">درباره نیلوفر</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('blog')} className="hover:text-amber-300 transition-colors">مجله استایل و فشن</button>
              </li>
              <li>
                <button onClick={() => setCurrentView('contact')} className="hover:text-amber-300 transition-colors">تماس با ما و سوالات متداول</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 border-r-2 border-[#701A23] pr-2">دسته‌بندی‌ها</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => { setSelectedCategory('manto-coat'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">مانتو و پالتو پاییزی</button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('scarf-shawl'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">شال و روسری ابریشمی</button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('hoodie-sweatshirt'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">هودی و دورس اختصاصی</button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('accessory-bag'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">کیف چرم و اکسسوری</button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('special-sets'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">ست‌های هدیه و ویژه</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info & Enamad / Trust */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 border-r-2 border-[#701A23] pr-2">ارتباط با استودیو</h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <span>تهران، خیابان فرشته، پلاک ۴۲، استودیو و شو روم نیلوفر (مراجعه حضوری با هماهنگی)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                <span dir="ltr">۰۲۱ - ۸۸۹۹ ۰۰۰۰ / ۰۹۱۲ ۰۰۰۰ ۰۰۰</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                <span>info@niloofar-boutique.com</span>
              </div>
            </div>

            {/* Electronic Trust Badges Visual Placeholders */}
            <div className="pt-3 flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-center text-[10px] text-white/80 w-24">
                <div className="font-bold text-amber-300">اینماد</div>
                <span>نماد اعتماد ۲ ستاره</span>
              </div>
              <div className="bg-white/10 p-2 rounded-lg border border-white/10 text-center text-[10px] text-white/80 w-24">
                <div className="font-bold text-amber-300">ساماندهی</div>
                <span>مجوز رسمی وزارت ارشاد</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/50">
        <p>© ۱۴۰۵ کلیه حقوق مادی و معنوی این وب‌سایت متعلق به برند نیلوفر می‌باشد.</p>
        <p className="mt-2 md:mt-0">طراحی و اجرا شده ویژه مخاطبان کانال یوتیوب و اینستاگرام نیلوفر</p>
      </div>
    </footer>
  );
};
