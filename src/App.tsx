/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BlogPage } from './pages/BlogPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#1F1A1C] flex flex-col font-vazirmatn selection:bg-[#701A23] selection:text-white" dir="rtl">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'home' && <HomePage />}
        {currentView === 'shop' && <ShopPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'blog' && <BlogPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals and Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <SearchModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
