'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, itemCount } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const shippingFee = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const tax = Math.round((subtotal - discountAmount) * 0.05); // 5% tax
  const grandTotal = Math.max(0, subtotal - discountAmount + tax + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'UMER10' || promoCode.trim().toUpperCase() === 'TECH10') {
      setDiscountPercent(10);
      setPromoMessage('Promo code applied: 10% discount activated!');
    } else {
      setPromoMessage('Invalid promo code. Try "UMER10".');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: 'var(--surface-elevated)' }}
        >
          <ShoppingBag size={40} color="var(--primary)" />
        </div>
        <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--foreground)' }}>
          Your Shopping Cart is Empty
        </h1>
        <p className="text-base max-w-md mb-8" style={{ color: 'var(--foreground-muted)' }}>
          You haven't added any electronics to your cart yet. Explore our genuine gadgets with official local warranty.
        </p>
        <Link
          href="/products"
          className="px-8 py-3.5 rounded-xl text-white font-extrabold text-sm transition-all"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Explore Electronics Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
            Shopping Cart ({itemCount} items)
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--foreground-muted)' }}>
            Review your selected electronics before proceeding to secure checkout
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover border shrink-0"
                  style={{ borderColor: 'var(--border)' }}
                />
                <div>
                  <span
                    className="text-[10px] font-black uppercase px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--primary)' }}
                  >
                    {product.brand}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <h3
                      className="font-bold text-base mt-1 line-clamp-1 hover:text-blue-600 transition-colors"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--foreground-subtle)' }}>
                    {product.sku}
                  </div>
                  <div className="text-sm font-black mt-1" style={{ color: 'var(--primary)' }}>
                    ${product.price.toLocaleString()} each
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                <div
                  className="flex items-center border rounded-lg"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
                >
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-2.5 py-1.5 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-3 text-xs font-bold" style={{ color: 'var(--foreground)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-2.5 py-1.5 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-base font-black" style={{ color: 'var(--foreground)' }}>
                    ${(product.price * quantity).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                  title="Remove product"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-4">
            <Link
              href="/products"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
            >
              <span>← Continue Shopping for Tech</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Box */}
        <div
          className="p-6 rounded-2xl border flex flex-col gap-5 sticky top-28"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <h2 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
            Order Summary
          </h2>

          {/* Promo Code Form */}
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl border flex-1"
              style={{
                backgroundColor: 'var(--surface-elevated)',
                borderColor: 'var(--border)'
              }}
            >
              <Tag size={15} style={{ color: 'var(--foreground-muted)' }} />
              <input
                type="text"
                placeholder="Promo code (e.g. UMER10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-transparent text-xs focus:outline-none uppercase font-bold"
                style={{ color: 'var(--foreground)' }}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white cursor-pointer"
              style={{ backgroundColor: '#0F172A' }}
            >
              Apply
            </button>
          </form>

          {promoMessage && (
            <div
              className="text-xs font-bold p-2.5 rounded-lg border"
              style={{
                backgroundColor: discountPercent > 0 ? 'var(--success-subtle)' : 'var(--danger-subtle)',
                borderColor: discountPercent > 0 ? 'var(--success)' : 'var(--danger)',
                color: discountPercent > 0 ? 'var(--success)' : 'var(--danger)'
              }}
            >
              {promoMessage}
            </div>
          )}

          {/* Price Breakdown */}
          <div className="flex flex-col gap-3 text-sm pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between">
              <span style={{ color: 'var(--foreground-muted)' }}>Items Subtotal</span>
              <span className="font-bold" style={{ color: 'var(--foreground)' }}>${subtotal.toLocaleString()}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600 font-bold">
                <span>Promotional Discount (10%)</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span style={{ color: 'var(--foreground-muted)' }}>Estimated Sales Tax (5%)</span>
              <span className="font-bold" style={{ color: 'var(--foreground)' }}>${tax.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span style={{ color: 'var(--foreground-muted)' }}>Standard Shipping</span>
              <span className="font-bold" style={{ color: 'var(--foreground)' }}>
                {shippingFee === 0 ? <span className="text-green-600 font-bold">FREE</span> : `$${shippingFee}`}
              </span>
            </div>

            <div
              className="flex justify-between items-baseline pt-4 border-t text-xl font-black"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <span>Estimated Total</span>
              <span style={{ color: 'var(--primary)' }}>${grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-3.5 px-6 rounded-xl font-black text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:opacity-95"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs" style={{ color: 'var(--foreground-subtle)' }}>
            <ShieldCheck size={14} color="var(--success)" />
            <span>256-Bit SSL Encrypted & Genuine Guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}
