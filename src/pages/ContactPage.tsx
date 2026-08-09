import React, { useState } from 'react';
import { InteractiveMapCard } from '../components/InteractiveMapCard';
import { Phone, Mail, MapPin, Send, MessageCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    setSubmitted(true);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      question: 'روش‌های ارسال سفارشات به چه صورت است و چقدر طول می‌کشد؟',
      answer: 'سفارشات سراسر کشور با پست پیشتاز ارسال شده و ظرف ۲ الی ۴ روز کاری تحویل می‌گردند. برای مشتریان عزیز استان تهران و کرج، امکان ارسال با پیک اختصاصی همان‌روز نیز فعال است.'
    },
    {
      question: 'شرایط و نحوه تعویض سایز یا کالا به چه شکل است؟',
      answer: 'تا ۷ روز پس از تحویل کالا، در صورت عدم استفاده و حفظ اتیکت اولیه، می‌توانید از طریق پشتیبانی واتس‌اپ درخواست تعویض سایز یا مدل ثبت کنید. هزینه ارسال ناشی از تعویض سایز اول بر عهده گالری می‌باشد.'
    },
    {
      question: 'چگونه کد پیگیری مرسوله پستی خود را دریافت کنم؟',
      answer: 'کد ۲۴ رقمی مرسوله پستی ظرف ۲۴ ساعت پس از تحویل به پست، از طریق پیامک به شماره همراه ثبت‌شده شما ارسال می‌گردد. همچنین در بخش پیگیری سفارشات سایت قابل مشاهده است.'
    },
    {
      question: 'آیا امکان مراجعه حضوری به شو روم فرشته تهران وجود دارد؟',
      answer: 'بله، شو روم نیلوفر گالری در خیابان فرشته تهران جهت پرو و سفارش حضوری پذیرای شماست. به دلیل حفظ آرامش و کیفیت خدمات، مراجعه حضوری نیازمند هماهنگی قبلی از طریق تلفن یا واتس‌اپ می‌باشد.'
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#F3EEE7] rounded-3xl p-8 border border-[#EAE3DA] text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1A1C]">ارتباط با استودیو نیلوفر و پشتیبانی</h1>
        <p className="text-xs text-[#574E52]">
          ما همیشه مشتاق شنیدن نظرات، پیشنهادات و پاسخگویی به سوالات شما همراهان نازنین هستیم.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#701A23] font-bold text-sm">
            <Send className="w-4 h-4" />
            <h2>فرم تماس مستقیم با تیم نیلوفر</h2>
          </div>

          {submitted && (
            <div className="bg-emerald-600 text-white p-4 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>پیام شما با موفقیت دریافت شد! کارشناسان ما ظرف چند ساعت آینده پاسخ خواهند داد.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#1F1A1C] block mb-1">نام و نام خانوادگی:</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="مثال: زهرا کاظمی"
                  className="w-full bg-[#FCFAF7] border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1F1A1C] block mb-1">شماره همراه یا ایمیل:</label>
                <input
                  type="text"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="۰۹۱۲۰۰۰۰۰۰۰ / email@example.com"
                  className="w-full bg-[#FCFAF7] border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1F1A1C] block mb-1">موضوع پیام:</label>
              <input
                type="text"
                required
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                placeholder="مثلا: سوال درباره سایز مانتو کتی / پیگیری سفارش"
                className="w-full bg-[#FCFAF7] border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#1F1A1C] block mb-1">متن پیام:</label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="پیام یا درخواست خود را بنویسید..."
                className="w-full bg-[#FCFAF7] border border-[#EAE3DA] rounded-xl p-3 text-xs text-[#1F1A1C] focus:outline-none focus:border-[#701A23]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#701A23] hover:bg-[#58141B] text-white font-extrabold px-8 py-3.5 rounded-2xl transition-all shadow text-xs"
            >
              ارسال پیام به استودیو
            </button>
          </form>
        </div>

        {/* Contact Info & Direct WhatsApp Box Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#701A23]">اطلاعات پشتیبانی و دفتر مرکزی</h3>
            
            <div className="space-y-3 text-xs text-[#574E52]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#701A23] shrink-0 mt-0.5" />
                <span>تهران، خیابان فرشته (شهید بیدار)، پلاک ۴۲، طبقه ۳، استودیو نیلوفر</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#701A23] shrink-0" />
                <span dir="ltr">۰۲۱ - ۸۸۹۹ ۰۰۰۰</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#701A23] shrink-0" />
                <span>support@niloofar-boutique.com</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#EAE3DA]">
              <a
                href="https://wa.me/989120000000"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-2xl transition-all shadow text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>پشتیبانی آنلاین در واتس‌اپ (پاسخگویی فوری)</span>
              </a>
            </div>
          </div>

          {/* Map Card */}
          <InteractiveMapCard />
        </div>

      </div>

      {/* FAQ ACCORDION SECTION */}
      <section className="bg-white rounded-3xl p-8 border border-[#EAE3DA] shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#701A23] uppercase">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-2xl font-extrabold text-[#1F1A1C]">سوالات متداول مشتریان و قوانین فروشگاه</h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-[#EAE3DA] rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 bg-[#FCFAF7] hover:bg-[#F3EEE7] text-right font-bold text-xs text-[#1F1A1C] flex items-center justify-between transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-[#701A23] transition-transform duration-200 ${
                  openFaqIndex === idx ? 'rotate-180' : ''
                }`} />
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 bg-white text-xs text-[#574E52] leading-relaxed border-t border-[#EAE3DA]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
