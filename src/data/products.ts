import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'مانتو کتی شاین بورگوندی کالکشن پاییز',
    category: 'manto-coat',
    categoryName: 'مانتو و پالتو',
    price: 1890000,
    originalPrice: 2200000,
    isNew: true,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'مانتو کتی با تنخور بسیار شیک و آسترکشی کامل از کالکشن اختصاصی نیلوفر. طراحی شده با یقه آرشال کشیده و پارچه کرپ بریتانیایی با گرماژ بالا مناسب پاییز و زمستان.',
    fabric: 'کرپ والنتینو وارداتی با آستر ابریشمی',
    sizes: ['36', '38', '40', '42', 'فری سایز'],
    colors: [
      { name: 'زرشکی عنابی', hex: '#701A23' },
      { name: 'مشکی زغالی', hex: '#1F1A1C' },
      { name: 'کرم نسکافه‌ای', hex: '#D2C4B5' }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 38,
    features: ['آسترکشی کامل ابریشمی', 'دارای اپل نرم ارگونومیک', 'جیب‌های کاربردی جلوی کار', 'دوخت تمیز دو سوزنه']
  },
  {
    id: 'prod-2',
    title: 'شال ابریشم مامی طرح اسلیمی اختصاصی نیلوفر',
    category: 'scarf-shawl',
    categoryName: 'شال و روسری',
    price: 680000,
    originalPrice: 790000,
    isNew: true,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'شال ابریشم مامی درجه یک با دور دست‌دوز و چاپ دیجتال باکیفیت. با الگوی نقوش سنتی اسلیمی بازآفرینی شده توسط نیلوفر، بدون سور خوردن روی سر.',
    fabric: '۱۰۰٪ ابریشم طبیعی مامی دست‌دوز',
    sizes: ['۲۰۰×۷۰ سانتی‌متر'],
    colors: [
      { name: 'ترکیب بورگوندی و کرم', hex: '#701A23' },
      { name: 'ترکیب زغالی و طلایی', hex: '#1F1A1C' }
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 52,
    features: ['حاشیه دست‌دوز فرانسوی', 'چاپ راکتیوم ثابت و قابل شستشو', 'عدم ایجاد الکتریسیته ساکن', 'مقاوم در برابر چروک']
  },
  {
    id: 'prod-3',
    title: 'پالتو فوتر کشمیر اورسایز کرم گرم',
    category: 'manto-coat',
    categoryName: 'مانتو و پالتو',
    price: 3450000,
    originalPrice: 3800000,
    isNew: false,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'پالتوی فوق‌العاده گرم و سبک با تراکم بالای فوتر کشمیر. برادکست شده با دکمه‌های چوبی اختصاصی و قواره آزاد که قابلیت ست شدن با انواع هودی و بافت را فراهم می‌سازد.',
    fabric: 'فوتر کوبیده کشمیر درجه یک (۸۰٪ پشم)',
    sizes: ['مدیوم (۳۶ تا ۴۰)', 'لارج (۴۲ تا ۴۶)'],
    colors: [
      { name: 'کرم نخودی', hex: '#EAE0D5' },
      { name: 'شتری کلاسیک', hex: '#C68B59' },
      { name: 'زغالی سیر', hex: '#2B2528' }
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 29,
    features: ['گرمای عالی برای زمستان سخت', 'جیب‌های بزرگ فیلتو', 'کمربند پهن همرنگ', 'دوخت لبه‌ها مرغوب']
  },
  {
    id: 'prod-4',
    title: 'هودی گلدوزی شده اختصاصی برند نیلوفر (NILOOFAR MERCH)',
    category: 'hoodie-sweatshirt',
    categoryName: 'هودی و دورس',
    price: 1250000,
    isNew: true,
    isBestSeller: false,
    isOnSale: false,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'هودی دورس سه نخ داخل کرک با گلدوزی برجسته لوگوتایپ اختصاصی نیلوفر روی سینه. قواره آزاد و کلاه دو لایه ضخیم با بندهای کتان بافته شده.',
    fabric: 'دورس ۳ نخ ۱۰۰٪ پنبه داخل خارخورده گرم',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'زرشکی عمیق', hex: '#58141B' },
      { name: 'کرم استخوانی', hex: '#F3EEE7' },
      { name: 'مشکی مات', hex: '#191516' }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 41,
    features: ['گلدوزی تراکم بالا بدون نخ کشی', 'جیب کانگورویی دوبل', 'کش‌باف مچ و پایین سنگین', 'عدم پرزدهی بعد از شستشو']
  },
  {
    id: 'prod-5',
    title: 'کیف دوشی چرم طبیعی طرح مینیمال الوند',
    category: 'accessory-bag',
    categoryName: 'اکسسوری و کیف',
    price: 1650000,
    originalPrice: 1950000,
    isNew: false,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'کیف دستی و دوشی چرم گاوی درجه یک با یراق‌آلات رنگ ثابت طلایی مات. بند قابل تنظیم و زیپ روان YKK با دوخت دست‌ساز استودیو.',
    fabric: '۱۰۰٪ چرم طبیعی گاوی با پرداخت گیاهی',
    sizes: ['۲۵×۱۸×۸ سانتی‌متر'],
    colors: [
      { name: 'قهوه‌ای عسلی', hex: '#A06138' },
      { name: 'زرشکی کهن', hex: '#701A23' },
      { name: 'مشکی آبنوس', hex: '#111011' }
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 19,
    features: ['بند چرمی قابل تنظیم و جداسازی', 'آستر اشبالت داخلی مقاوم', 'جیب زیپ‌دار داخلی برای کارت و موبایل']
  },
  {
    id: 'prod-6',
    title: 'ست ۳ تکه پاییزی شال، بافت و کیف (کالکشن ویژه)',
    category: 'special-sets',
    categoryName: 'ست‌های اختصاصی',
    price: 2950000,
    originalPrice: 3400000,
    isNew: true,
    isBestSeller: true,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'ست بی‌نظیر و هماهنگ شامل بلوز بافت یقه‌اسکی نرم، شال موهر پاییزی با رنگ‌بندی اختصاصی و کیف کوچک دوشی همرنگ. انتخابی ایده‌آل برای هدیه و استایل سریع روزمره.',
    fabric: 'بافت کاموا موهر ارگانیک + چرم مصنوعی و شال موهر',
    sizes: ['فری سایز (مناسب ۳۶ تا ۴۴)'],
    colors: [
      { name: 'ترکیب موکا و کرم', hex: '#A68A78' },
      { name: 'ترکیب زرشکی و کرم', hex: '#701A23' }
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 64,
    features: ['بسته‌بندی کادویی لوکس اختصاصی نیلوفر', 'هماهنگی کامل پالت رنگی', 'صرفه‌جویی ۲۰ درصدی نسبت به خرید جداگانه']
  },
  {
    id: 'prod-7',
    title: 'شال موهر موکا پاییزی سنگین با ریشه دستی',
    category: 'scarf-shawl',
    categoryName: 'شال و روسری',
    price: 520000,
    isNew: false,
    isBestSeller: false,
    isOnSale: false,
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'شال موهر ضخیم مناسب فصل سرد سال. با تراکم بافت بالا بدون پرزدهی و ریشه‌های پیچ‌خورده دستی در دو انتهای شال.',
    fabric: 'موهر درجه یک ترک ۷۰٪ صوف',
    sizes: ['۲۱۰×۸۰ سانتی‌متر'],
    colors: [
      { name: 'موکا گرم', hex: '#8C6D58' },
      { name: 'زرشکی تیره', hex: '#58141B' },
      { name: 'طوسی ملانژ', hex: '#808080' }
    ],
    inStock: true,
    rating: 4.7,
    reviewCount: 15,
    features: ['ابعاد بزرگ برای پوشش کامل', 'ایستایی عالی روی سر', 'بسیار نرم و لطیف برای پوست حساس']
  },
  {
    id: 'prod-8',
    title: 'دورس اورسایز طرح مینیمال «زن، وقار، زیبایی»',
    category: 'hoodie-sweatshirt',
    categoryName: 'هودی و دورس',
    price: 1100000,
    originalPrice: 1280000,
    isNew: true,
    isBestSeller: false,
    isOnSale: true,
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'دورس بدون کلاه با خطاطی مدرن تایپوگرافی خوشنویسی نستعلیق روی آستین‌ها. طراحی شده توسط استودیو هنری نیلوفر با رنگ‌های گرم پاییزی.',
    fabric: 'دورس دو نخ خارخورده با کش باف فرانسوی',
    sizes: ['S/M', 'L/XL'],
    colors: [
      { name: 'کرم نسکافه‌ای', hex: '#D2C4B5' },
      { name: 'سبز صدری تیره', hex: '#4A5340' }
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 22,
    features: ['تایپوگرافی اختصاصی برجسته', 'تنخور اورسایز ترند روز', 'دوخت مقاوم شانه و سرآستین']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'مریم سهرابی',
    date: '۱۴ مرداد ۱۴۰۵',
    rating: 5,
    comment: 'کیفیت پارچه مانتو کتی فوق‌العاده بود. آسترش انقدر تمیز دوخته شده که آدم کیف میکنه. بسته‌بندی برند نیلوفر هم خیلی محترمانه و شیک بود.',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'سارینا داوودی',
    date: '۲۸ تیر ۱۴۰۵',
    rating: 5,
    comment: 'شال ابریشمی واقعا روی سر سر نمیخوره. رنگ زرشکی و کرمش دقیقا مطابق عکس‌های یوتیوب نیلوفر جانه. مرسی از ارسال سریع!',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'الناز قربانی',
    date: '۱۰ تیر ۱۴۰۵',
    rating: 4,
    comment: 'پالتوی فوتر گرمای عالی داره. من برای سفر شمال گرفتم و کاملا راضی بودم. سایزبندیش هم دقیقا استاندارده.',
    verifiedPurchase: true
  }
];
