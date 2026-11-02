'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'var(--surface-elevated)' }}
        >
          <Heart size={32} className="text-slate-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--foreground)' }}>
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--foreground-muted)' }}>
          Save your favorite laptops, smartphones, TVs, and tech accessories here to monitor deals or purchase later.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-extrabold text-xs sm:text-sm transition-transform active:scale-95"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span>Explore Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
            <Heart size={13} fill="currentColor" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
            My Wishlist ({items.length})
          </h1>
        </div>

        <button
          type="button"
          onClick={clearWishlist}
          className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border p-4 flex flex-col justify-between transition-all hover:shadow-md"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)'
            }}
          >
            <div>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 p-3 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40">
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 dark:bg-slate-800/90 text-red-500 hover:bg-red-50 transition-colors shadow-xs"
                  title="Remove from wishlist"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={15} />
                </button>

                <Link href={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </Link>
              </div>

              <span
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  color: 'var(--primary)'
                }}
              >
                {product.brand}
              </span>

              <Link href={`/products/${product.id}`}>
                <h3
                  className="font-bold text-xs sm:text-sm line-clamp-2 mt-1.5 hover:text-blue-600 transition-colors"
                  style={{ color: 'var(--foreground)' }}
                >
                  {product.name}
                </h3>
              </Link>
            </div>

            <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--border)' }}>
              <div>
                <span className="text-sm sm:text-base font-black text-foreground" style={{ color: 'var(--foreground)' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-[10px] line-through text-slate-400">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingCart size={13} />
                <span>Add</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
