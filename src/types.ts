export type CategoryId = 'all' | 'manto-coat' | 'scarf-shawl' | 'hoodie-sweatshirt' | 'accessory-bag' | 'special-sets';

export interface Product {
  id: string;
  title: string;
  category: CategoryId;
  categoryName: string;
  price: number; // In Toman (numeric for math)
  originalPrice?: number; // In Toman if discounted
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  images: string[];
  description: string;
  fabric: string; // e.g., 'کشمیر بریتانیایی ۱۰۰٪ پنبه'
  sizes: string[]; // e.g., ['S', 'M', 'L', 'فری سایز']
  colors: { name: string; hex: string }[];
  inStock: boolean;
  rating: number; // 1 to 5
  reviewCount: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
  verifiedPurchase: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface ShippingDetails {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  note?: string;
  shippingMethod: 'post' | 'peyk' | 'tipax';
  paymentMethod: 'online' | 'card_to_card';
}

export interface OrderReceipt {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingDetails: ShippingDetails;
}

export type PageView = 'home' | 'shop' | 'about' | 'contact' | 'blog' | 'cart';
