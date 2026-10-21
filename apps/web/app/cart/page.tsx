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
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { Product } from '../../../../packages/shared/src/types/index';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, itemCount } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Delete Confirmation Modals State
  const [itemToRemove, setItemToRemove] = useState<Product | null>(null);
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

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
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center flex flex-col items-center">
        <div
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-5"
          style={{ backgroundColor: 'var(--surface-elevated)' }}
        >
          <ShoppingBag size={36} color="var(--primary)" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: 'var(--foreground)' }}>
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs sm:text-base max-w-md mb-6" style={{ color: 'var(--foreground-muted)' }}>
          You haven&apos;t added any electronics to your cart yet. Explore our genuine gadgets with official local warranty.
        </p>
        <Link
          href="/products"
          className="px-6 sm:px-8 py-3 rounded-xl text-white font-extrabold text-xs sm:text-sm transition-all"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Explore Electronics Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 pb-28 md:pb-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
            Shopping Cart ({itemCount})
          </h1>
          <p className="text-xs sm:text-sm mt-0.5 sm:mt-1" style={{ color: 'var(--foreground-muted)' }}>
            Review your selected electronics before proceeding to secure checkout
          </p>
        </div>
        <button
          onClick={() => setIsClearCartModalOpen(true)}
          className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-2 flex flex-col gap-3 sm:gap-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-3.5 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-contain border shrink-0 bg-slate-50 dark:bg-slate-900"
                  style={{ borderColor: 'var(--border)' }}
                />
                <div className="min-w-0 flex-1">
                  <span
                    className="text-[9px] sm:text-[10px] font-black uppercase px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--primary)' }}
                  >
                    {product.brand}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <h3
                      className="font-bold text-xs sm:text-base mt-1 line-clamp-1 hover:text-blue-600 transition-colors"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  <div className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--foreground-subtle)' }}>
                    {product.sku}
                  </div>
                  <div className="text-xs sm:text-sm font-black mt-1" style={{ color: 'var(--primary)' }}>
                    ${product.price.toLocaleString()} each
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Line Total */}
              <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4 pt-2.5 sm:pt-0 border-t sm:border-t-0" style={{ borderColor: 'var(--border)' }}>
                <div
                  className="flex items-center border rounded-xl"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
                >
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-3 py-2 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-3 text-xs font-bold" style={{ color: 'var(--foreground)' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-3 py-2 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm sm:text-base font-black" style={{ color: 'var(--foreground)' }}>
                    ${(product.price * quantity).toLocaleString()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setItemToRemove(product)}
                  className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Continue Shopping Link */}
          <div className="pt-2">
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5"
            >
              <span>← Continue Shopping for Tech</span>
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Box */}
        <div
          className="p-4 sm:p-6 rounded-2xl border flex flex-col gap-4 sm:gap-5 sticky top-24"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <h2 className="text-base sm:text-lg font-black" style={{ color: 'var(--foreground)' }}>
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
                placeholder="Promo Code (UMER10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-transparent text-xs font-mono uppercase focus:outline-none"
                style={{ color: 'var(--foreground)' }}
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Apply
            </button>
          </form>

          {promoMessage && (
            <p className={`text-xs font-semibold ${discountPercent > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {promoMessage}
            </p>
          )}

          {/* Price Breakdown */}
          <div className="flex flex-col gap-2.5 text-xs sm:text-sm border-t pt-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex justify-between" style={{ color: 'var(--foreground-muted)' }}>
              <span>Subtotal ({itemCount} items)</span>
              <span className="font-bold" style={{ color: 'var(--foreground)' }}>${subtotal.toLocaleString()}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount (10%)</span>
                <span>-${discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between" style={{ color: 'var(--foreground-muted)' }}>
              <span>Express Delivery (Pakistan)</span>
              <span>
                {shippingFee === 0 ? (
                  <span className="text-green-600 font-bold uppercase text-[11px]">FREE</span>
                ) : (
                  `$${shippingFee}`
                )}
              </span>
            </div>

            <div className="flex justify-between" style={{ color: 'var(--foreground-muted)' }}>
              <span>Estimated Tax (5%)</span>
              <span>${tax.toLocaleString()}</span>
            </div>

            <div
              className="flex justify-between text-base sm:text-lg font-black pt-3 border-t"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>${grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-95 shadow-md cursor-pointer"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-500 pt-1">
            <ShieldCheck size={14} color="#16a34a" />
            <span>Bank-Grade SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Checkout Bar */}
      <div
        className="md:hidden fixed bottom-16 left-0 right-0 z-30 border-t p-3 backdrop-blur-md flex items-center justify-between gap-3 shadow-lg"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div>
          <span className="text-[10px] font-semibold" style={{ color: 'var(--foreground-muted)' }}>Total:</span>
          <div className="text-base font-black" style={{ color: 'var(--primary)' }}>
            ${grandTotal.toLocaleString()}
          </div>
        </div>
        <button
          type="button"
          onClick={() => router.push('/checkout')}
          className="flex-1 max-w-[200px] py-2.5 px-4 rounded-xl text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span>Checkout</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Remove Item Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(itemToRemove)}
        title="Remove Item from Cart?"
        message={`Are you sure you want to remove "${itemToRemove?.name}" from your shopping cart?`}
        itemPreview={
          itemToRemove
            ? {
                title: itemToRemove.name,
                subtitle: `SKU: ${itemToRemove.sku} • $${itemToRemove.price.toLocaleString()}`,
                imageUrl: itemToRemove.imageUrl,
                badge: itemToRemove.brand
              }
            : undefined
        }
        confirmText="Remove Item"
        variant="danger"
        onConfirm={() => {
          if (itemToRemove) {
            removeFromCart(itemToRemove.id);
            setItemToRemove(null);
          }
        }}
        onClose={() => setItemToRemove(null)}
      />

      {/* Clear Cart Confirmation Modal */}
      <ConfirmModal
        isOpen={isClearCartModalOpen}
        title="Clear Entire Shopping Cart?"
        message="Are you sure you want to remove all electronics from your shopping cart? This action cannot be reversed."
        confirmText="Clear Entire Cart"
        variant="danger"
        onConfirm={() => {
          clearCart();
          setIsClearCartModalOpen(false);
        }}
        onClose={() => setIsClearCartModalOpen(false)}
      />
    </div>
  );
}
