'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Search, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface MobileBottomNavProps {
  onOpenSearch?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenSearch }) => {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();

  const isHome = pathname === '/';
  const isProducts = pathname.startsWith('/products');

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md transition-all"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-colors ${
            isHome ? 'text-blue-600 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600'
          }`}
        >
          <Home size={20} strokeWidth={isHome ? 2.5 : 2} />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* 2. Catalog / Products */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center flex-1 py-1 gap-1 transition-colors ${
            isProducts ? 'text-blue-600 font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-blue-600'
          }`}
        >
          <LayoutGrid size={20} strokeWidth={isProducts ? 2.5 : 2} />
          <span className="text-[10px] tracking-tight">Shop</span>
        </Link>

        {/* 3. Search Trigger */}
        <button
          type="button"
          onClick={() => {
            if (onOpenSearch) {
              onOpenSearch();
            } else {
              const searchInput = document.getElementById('mobile-search-input');
              if (searchInput) {
                searchInput.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
          }}
          className="flex flex-col items-center justify-center flex-1 py-1 gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
          title="Search Products"
        >
          <Search size={20} />
          <span className="text-[10px] tracking-tight">Search</span>
        </button>

        {/* 4. Cart with badge */}
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center flex-1 py-1 gap-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors"
          title="Open Cart"
        >
          <div className="relative">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span
                className="absolute -top-1.5 -right-2 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>

        {/* 5. WhatsApp Support */}
        <a
          href="https://wa.me/923001234567?text=Hi%20Umer%20Electronics%2C%20I%20have%20an%20inquiry%20about%20a%20product"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 py-1 gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors"
          title="WhatsApp Help"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] tracking-tight">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
};
