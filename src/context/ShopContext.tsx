import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CategoryId, PageView, OrderReceipt, ShippingDetails } from '../types';
import { PRODUCTS } from '../data/products';

interface ShopContextType {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, qty?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (category: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  discountCode: string;
  discountPercent: number;
  applyDiscountCode: (code: string) => boolean;
  removeDiscount: () => void;
  cartSubtotal: number;
  cartDiscountAmount: number;
  cartTotal: number;
  placeOrder: (shipping: ShippingDetails) => OrderReceipt;
  recentOrders: OrderReceipt[];
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentViewState] = useState<PageView>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('niloofar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('niloofar_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<OrderReceipt[]>(() => {
    try {
      const saved = localStorage.getItem('niloofar_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Sync state to localstorage
  useEffect(() => {
    try {
      localStorage.setItem('niloofar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('niloofar_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('niloofar_orders', JSON.stringify(recentOrders));
    } catch (e) {
      console.error(e);
    }
  }, [recentOrders]);

  const setCurrentView = (view: PageView) => {
    setCurrentViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size?: string, color?: { name: string; hex: string }, qty: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'فری سایز';
    const chosenColor = color || product.colors[0] || { name: 'اصلی', hex: '#701A23' };

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize && item.selectedColor.name === chosenColor.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        return [...prev, { product, selectedSize: chosenSize, selectedColor: chosenColor, quantity: qty }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], quantity };
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const applyDiscountCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'YOUTUBE10' || cleanCode === 'NILOOFAR10') {
      setDiscountCode('YOUTUBE10');
      setDiscountPercent(10);
      return true;
    } else if (cleanCode === 'NOROOZ' || cleanCode === 'VIP15') {
      setDiscountCode(cleanCode);
      setDiscountPercent(15);
      return true;
    } else if (cleanCode === 'CREATOR20') {
      setDiscountCode('CREATOR20');
      setDiscountPercent(20);
      return true;
    }
    return false;
  };

  const removeDiscount = () => {
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const cartTotal = Math.max(0, cartSubtotal - cartDiscountAmount);

  const placeOrder = (shipping: ShippingDetails): OrderReceipt => {
    const shippingFee = cartSubtotal > 1000000 ? 0 : 50000; // Free shipping over 1,000,000 Toman
    const finalTotal = cartTotal + shippingFee;
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NF-${randomNum}`;

    const newReceipt: OrderReceipt = {
      orderId,
      date: new Date().toLocaleDateString('fa-IR'),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscountAmount,
      shippingFee,
      total: finalTotal,
      shippingDetails: shipping
    };

    setRecentOrders((prev) => [newReceipt, ...prev]);
    clearCart();
    removeDiscount();
    return newReceipt;
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        discountCode,
        discountPercent,
        applyDiscountCode,
        removeDiscount,
        cartSubtotal,
        cartDiscountAmount,
        cartTotal,
        placeOrder,
        recentOrders,
        selectedBlogSlug,
        setSelectedBlogSlug
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
