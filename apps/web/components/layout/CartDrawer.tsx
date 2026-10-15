'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div
        className="relative z-10 w-full max-w-md h-full flex flex-col shadow-2xl"
        style={{
          backgroundColor: 'var(--surface)',
          borderLeft: '1px solid var(--border)'
        }}
      >
        {/* Drawer Header */}
        <div
          className="p-5 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={20} color="var(--primary)" />
            <h2 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
              Your Cart ({itemCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800"
            style={{ color: 'var(--foreground-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag size={48} color="var(--foreground-subtle)" className="mb-4" />
              <p className="text-base font-semibold" style={{ color: 'var(--foreground)' }}>
                Your cart is empty
              </p>
              <p className="text-sm mt-1 mb-6" style={{ color: 'var(--foreground-muted)' }}>
                Browse our premium electronics catalog to find top gear.
              </p>
              <Link
                href="/products"
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 rounded-lg text-white font-bold text-sm transition-colors"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Browse Electronics
              </Link>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3.5 rounded-xl border"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  borderColor: 'var(--border)'
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover border"
                  style={{ borderColor: 'var(--border)' }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold truncate" style={{ color: 'var(--foreground)' }}>
                    {product.name}
                  </h4>
                  <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--foreground-muted)' }}>
                    {product.brand}
                  </div>
                  <div className="text-sm font-extrabold mt-1" style={{ color: 'var(--primary)' }}>
                    ${product.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div
                    className="flex items-center border rounded-md"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-2 text-xs font-bold" style={{ color: 'var(--foreground)' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="px-2 py-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div
            className="p-5 border-t flex flex-col gap-3"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
          >
            <div className="flex justify-between items-center text-sm">
              <span style={{ color: 'var(--foreground-muted)' }}>Subtotal</span>
              <span className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--foreground-subtle)' }}>
              Shipping and taxes calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="py-2.5 px-4 rounded-lg text-center font-bold text-sm border"
                style={{
                  backgroundColor: 'var(--surface-elevated)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)'
                }}
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="py-2.5 px-4 rounded-lg text-center font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <span>Checkout</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
