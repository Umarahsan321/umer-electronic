'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  PhoneCall
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useCart } from '../../context/CartContext';

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
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full" style={{ backgroundColor: 'var(--surface)' }}>
      {/* Top Banner with Solid Background */}
      <div
        className="w-full text-xs font-semibold py-2 px-4 flex items-center justify-between"
        style={{
          backgroundColor: '#0F172A',
          color: '#F8FAFC'
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} color="#3B82F6" />
              <span>Official Warranty & 100% Authentic Electronics</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <PhoneCall size={13} />
              <span>Call / WhatsApp: +92 300 1234567</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/shipping-returns"
              className="text-slate-300 hover:text-white transition-colors"
            >
              7-Day Returns
            </Link>
            <span className="text-slate-500">|</span>
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold"
            >
              <span>Admin Portal</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className="border-b"
        style={{
          backgroundColor: 'var(--background)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo size="md" />

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-xl mx-4"
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
                className="w-full bg-transparent px-3 text-sm focus:outline-none"
                style={{ color: 'var(--foreground)' }}
              />
              <button
                type="submit"
                className="text-xs font-bold px-3 py-1.5 rounded-lg text-white"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors"
              style={{
                backgroundColor: 'var(--surface-elevated)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)'
              }}
              title="View Cart"
            >
              <ShoppingCart size={20} color="var(--primary)" />
              <span className="hidden sm:inline text-xs font-bold">Cart</span>
              {itemCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--surface-elevated)',
                borderColor: 'var(--border)',
                color: 'var(--foreground)'
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
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
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 text-sm focus:outline-none"
                style={{ color: 'var(--foreground)' }}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Sub-bar with Active Indicator */}
      <nav
        className="hidden md:block border-b"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto py-2">
          <Suspense fallback={<div className="text-xs text-slate-400 py-1">Loading navigation...</div>}>
            <CategoryNavLinks />
          </Suspense>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b p-4 flex flex-col gap-2"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <Suspense fallback={null}>
            <CategoryNavLinks onSelect={() => setMobileMenuOpen(false)} />
          </Suspense>
          <div className="pt-2 border-t mt-2" style={{ borderColor: 'var(--border)' }}>
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-500 flex items-center gap-2 py-1 px-3"
            >
              <span>Open Admin Dashboard</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
