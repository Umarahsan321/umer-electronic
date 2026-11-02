'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  ShieldCheck, 
  PhoneCall,
  Heart,
  Truck,
  X,
  ArrowRight
} from 'lucide-react';
import { Product } from '../../../../packages/shared/src/types/index';
import { SEED_PRODUCTS } from '../../../../packages/shared/src/data/seed-products';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { MobileDrawer } from './MobileDrawer';

interface NavCategoryItem {
  label: string;
  href: string;
  matchType: 'all-products' | 'category' | 'page';
  categorySlug?: string;
  pathnameMatch?: string;
}

const NAV_ITEMS: NavCategoryItem[] = [
  { label: 'All Products', href: '/products', matchType: 'all-products' },
  { label: 'Laptops', href: '/products?category=laptops-computers', matchType: 'category', categorySlug: 'laptops-computers' },
  { label: 'Smartphones', href: '/products?category=smartphones-tablets', matchType: 'category', categorySlug: 'smartphones-tablets' },
  { label: 'Audio', href: '/products?category=audio-sound', matchType: 'category', categorySlug: 'audio-sound' },
  { label: 'Smart TVs', href: '/products?category=smart-tvs-displays', matchType: 'category', categorySlug: 'smart-tvs-displays' },
  { label: 'Gaming', href: '/products?category=gaming-consoles', matchType: 'category', categorySlug: 'gaming-consoles' },
  { label: 'Smart Home', href: '/products?category=smart-home-security', matchType: 'category', categorySlug: 'smart-home-security' },
  { label: 'Appliances', href: '/products?category=home-appliances', matchType: 'category', categorySlug: 'home-appliances' },
  { label: 'Contact', href: '/contact', matchType: 'page', pathnameMatch: '/contact' },
  { label: 'About', href: '/about', matchType: 'page', pathnameMatch: '/about' },
];

function CategoryNavLinks({ onSelect }: { onSelect?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  return (
    <>
      {NAV_ITEMS.map((item, idx) => {
        let isActive = false;

        if (item.matchType === 'all-products') {
          isActive = pathname === '/products' && (!currentCategory || currentCategory === 'all');
        } else if (item.matchType === 'category') {
          isActive = pathname === '/products' && currentCategory === item.categorySlug;
        } else if (item.matchType === 'page') {
          isActive = pathname === item.pathnameMatch;
        }

        return (
          <Link
            key={idx}
            href={item.href}
            onClick={onSelect}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isLiveSearchOpen, setIsLiveSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsLiveSearchOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const q = searchQuery.toLowerCase().trim();
      const matches = SEED_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(matches);
      setIsLiveSearchOpen(true);
    }, 180);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside to dismiss search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsLiveSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLiveSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectResult = (productId: string) => {
    setIsLiveSearchOpen(false);
    setSearchQuery('');
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full" style={{ backgroundColor: 'var(--surface)' }}>
        {/* Top Banner with Responsive Compact Layout */}
        <div
          className="w-full text-xs font-semibold py-1.5 px-3 sm:px-4"
          style={{
            backgroundColor: '#0F172A',
            color: '#F8FAFC'
          }}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 truncate">
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs truncate">
                <ShieldCheck size={14} color="#3B82F6" className="shrink-0" />
                <span className="truncate">Official Warranty & 100% Genuine Electronics</span>
              </span>
              <span className="hidden lg:inline text-slate-500">|</span>
              <span className="hidden lg:flex items-center gap-1.5 text-slate-300 text-xs">
                <PhoneCall size={13} />
                <span>Call / WhatsApp: +92 300 1234567</span>
              </span>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-[11px] sm:text-xs">
              {/* Order Tracking Quick Link */}
              <Link
                href="/track-order"
                className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                <Truck size={12} className="text-blue-400" />
                <span>Track Order</span>
              </Link>

              <span className="text-slate-600">|</span>

              <Link
                href="/shipping-returns"
                className="hidden sm:inline text-slate-300 hover:text-white transition-colors"
              >
                7-Day Returns
              </Link>

              <span className="hidden sm:inline text-slate-600">|</span>

              {/* Currency Selector Pill */}
              <div className="inline-flex items-center rounded-lg border border-slate-700 bg-slate-800 p-0.5 text-[10px] font-black">
                <button
                  type="button"
                  onClick={() => setCurrency('PKR')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    currency === 'PKR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  PKR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  USD
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div
          className="border-b"
          style={{
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)'
          }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
            {/* Left: Mobile Menu Hamburger + Logo */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="md:hidden p-2 rounded-xl border flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)'
                }}
                aria-label="Open mobile navigation menu"
              >
                <Menu size={20} />
              </button>
              
              <div className="shrink-0">
                <Logo size="md" />
              </div>
            </div>

            {/* Middle: Desktop Search Bar with Live Auto-Complete */}
            <div ref={searchContainerRef} className="hidden md:flex flex-col relative flex-1 max-w-xl mx-4">
              <form
                onSubmit={handleSearchSubmit}
                className="w-full"
              >
                <div
                  className="flex items-center w-full rounded-xl border px-3.5 py-2 transition-all focus-within:ring-2 focus-within:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <Search size={18} style={{ color: 'var(--foreground-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search MacBook, iPhone, OLED TVs, Sony headphones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) setIsLiveSearchOpen(true);
                    }}
                    className="w-full bg-transparent px-3 text-sm focus:outline-none"
                    style={{ color: 'var(--foreground)' }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setIsLiveSearchOpen(false);
                      }}
                      className="p-1 mr-1 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90 cursor-pointer"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Live Search Floating Results Dropdown */}
              {isLiveSearchOpen && searchResults.length > 0 && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl border shadow-xl z-50 overflow-hidden divide-y"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <div className="p-2.5 text-[11px] font-black uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-900/50">
                    Matching Electronics ({searchResults.length})
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleSelectResult(product.id)}
                        className="w-full p-3 flex items-center justify-between gap-3 text-left hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors cursor-pointer border-b last:border-b-0"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 object-contain rounded-lg p-1 border shrink-0"
                            style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-extrabold uppercase text-blue-600">
                              {product.brand}
                            </span>
                            <h4 className="text-xs font-bold truncate" style={{ color: 'var(--foreground)' }}>
                              {product.name}
                            </h4>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-blue-600">
                            {formatPrice(product.price)}
                          </span>
                          <div className="text-[10px] text-emerald-600 font-semibold">
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full p-2.5 text-xs font-bold text-center text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-850 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>View all matching results</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* Right Action Icons: Theme, Wishlist, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Wishlist Trigger */}
              <Link
                href="/wishlist"
                className="relative p-2 sm:p-2.5 rounded-xl border flex items-center gap-1.5 transition-colors"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)'
                }}
                title="View Wishlist"
              >
                <Heart size={19} className={wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600 dark:text-slate-300'} />
                <span className="hidden sm:inline text-xs font-bold">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center text-white bg-rose-600">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)'
                }}
                title="View Cart"
              >
                <ShoppingCart size={19} color="var(--primary)" />
                <span className="hidden sm:inline text-xs font-bold">Cart</span>
                {itemCount > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Quick Search Bar (Directly below logo on mobile) */}
          <div className="md:hidden px-3 pb-2.5">
            <form onSubmit={handleSearchSubmit}>
              <div
                className="flex items-center w-full rounded-xl border px-3 py-2"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  borderColor: 'var(--border)'
                }}
              >
                <Search size={16} style={{ color: 'var(--foreground-muted)' }} />
                <input
                  id="mobile-search-input"
                  type="text"
                  placeholder="Search laptops, phones, TVs, audio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-2.5 text-sm focus:outline-none"
                  style={{ color: 'var(--foreground)' }}
                />
                {searchQuery.trim() && (
                  <button
                    type="submit"
                    className="text-[11px] font-bold px-2 py-1 rounded text-white shrink-0"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Go
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Desktop Navigation Sub-bar with Horizontal Scroll */}
        <nav
          className="hidden md:block border-b"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
            <Suspense fallback={<div className="text-xs text-slate-400 py-1">Loading navigation...</div>}>
              <CategoryNavLinks />
            </Suspense>
          </div>
        </nav>
      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />
    </>
  );
};
