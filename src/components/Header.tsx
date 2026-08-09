import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Youtube, Instagram, Sparkles, ChevronLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PageView } from '../types';
import { formatPersianNumber } from '../utils/persian';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cart,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setSelectedCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems: { label: string; view: PageView }[] = [
    { label: 'صفحه اصلی', view: 'home' },
    { label: 'فروشگاه و محصولات', view: 'shop' },
    { label: 'درباره نیلوفر', view: 'about' },
    { label: 'مجله استایل', view: 'blog' },
    { label: 'تماس با ما', view: 'contact' }
  ];

  const handleNavClick = (view: PageView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#EAE3DA]">
      {/* Top Announcement Bar */}
      <div className="bg-[#701A23] text-[#FCFAF7] text-xs py-2 px-4 text-center font-medium overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-white/90 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>کد تخفیف ۱۰٪ یوتیوبرها: <strong className="bg-white/20 px-1.5 py-0.5 rounded tracking-wider">YOUTUBE10</strong></span>
          </div>

          <div className="w-full md:w-auto text-center">
            <span>ارسال رایگان برای خریدهای بالای ۱,۰۰۰,۰۰۰ تومان به سراسر ایران 🚚</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-white/90">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
              title="کانال یوتیوب نیلوفر"
            >
              <Youtube className="w-3.5 h-3.5" />
              <span>کانال یوتیوب</span>
            </a>
            <span>|</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
              title="اینستاگرام نیلوفر"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>اینستاگرام</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1F1A1C] hover:text-[#701A23] rounded-lg focus:outline-none"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo & Creator Title */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex flex-col text-right group"
            >
              <span className="text-2xl font-extrabold tracking-tight text-[#1F1A1C] group-hover:text-[#701A23] transition-colors font-vazirmatn">
                نیلوفر <span className="text-[#701A23] font-light text-xl">گالری</span>
              </span>
              <span className="text-[10px] text-[#574E52] tracking-wider uppercase font-sans">
                NILOOFAR BOUTIQUE & MERCH
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                  currentView === item.view
                    ? 'text-[#701A23]'
                    : 'text-[#1F1A1C] hover:text-[#701A23]'
                }`}
              >
                {item.label}
                {currentView === item.view && (
                  <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#701A23] rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-[#1F1A1C] hover:text-[#701A23] hover:bg-[#F3EEE7] rounded-full transition-all flex items-center gap-1.5"
              title="جستجوی محصول"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-medium text-[#574E52]">جستجو...</span>
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentView('shop');
              }}
              className="p-2.5 text-[#1F1A1C] hover:text-[#701A23] hover:bg-[#F3EEE7] rounded-full transition-all relative"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#701A23] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {formatPersianNumber(wishlist.length)}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#701A23] hover:bg-[#58141B] text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow flex items-center gap-2 text-xs font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">سبد خرید</span>
              {totalCartItems > 0 && (
                <span className="bg-amber-300 text-[#701A23] text-[11px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {formatPersianNumber(totalCartItems)}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFAF7] border-b border-[#EAE3DA] px-4 py-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  currentView === item.view
                    ? 'bg-[#701A23] text-white'
                    : 'text-[#1F1A1C] hover:bg-[#F3EEE7]'
                }`}
              >
                <span>{item.label}</span>
                <ChevronLeft className="w-4 h-4 opacity-70" />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#EAE3DA] flex justify-around text-xs text-[#574E52]">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#701A23]"
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>کانال یوتیوب</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#701A23]"
            >
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>صفحه اینستاگرام</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
