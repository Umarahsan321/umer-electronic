'use client';

import React, { useEffect } from 'react';
import { X, ShieldCheck, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { PaymentMethod } from '../../../../packages/shared/src/types/index';
import { CartItem } from '../../context/CartContext';

interface OrderReviewModalProps {
  isOpen: boolean;
  customer: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: CartItem[];
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  isSubmitting: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const OrderReviewModal: React.FC<OrderReviewModalProps> = ({
  isOpen,
  customer,
  items,
  paymentMethod,
  subtotal,
  shippingFee,
  tax,
  total,
  isSubmitting,
  onConfirm,
  onClose
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => {
          if (!isSubmitting) onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-review-title"
        className="relative z-10 w-full max-w-lg rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-4 sm:p-5 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 id="order-review-title" className="text-base font-black">
                Confirm Your Order
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Please review your details before final dispatch
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer disabled:opacity-50"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 text-xs">
          {/* Shipping Summary */}
          <div
            className="p-3.5 rounded-xl border flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
          >
            <span className="font-extrabold uppercase tracking-wider text-[10px]" style={{ color: 'var(--primary)' }}>
              Shipping Destination
            </span>
            <div className="font-bold text-sm">{customer.fullName}</div>
            <div className="text-slate-500 dark:text-slate-400">{customer.phone} • {customer.email}</div>
            <div className="text-slate-600 dark:text-slate-300 mt-1">
              {customer.address}, {customer.city} ({customer.postalCode})
            </div>
          </div>

          {/* Payment Method */}
          <div
            className="p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
          >
            <span className="font-bold text-slate-600 dark:text-slate-300">Payment Option:</span>
            <span className="font-extrabold uppercase text-blue-600 dark:text-blue-400">
              {paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Wire Transfer'}
            </span>
          </div>

          {/* Order Items Preview */}
          <div>
            <h4 className="font-bold mb-2">Order Items ({items.reduce((s, i) => s + i.quantity, 0)})</h4>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-9 h-9 rounded-md object-contain bg-white p-1 border shrink-0"
                      style={{ borderColor: 'var(--border)' }}
                    />
                    <div className="min-w-0">
                      <div className="font-bold truncate max-w-[200px]">{product.name}</div>
                      <div className="text-[10px] text-slate-400">Qty: {quantity} × ${product.price.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="font-black shrink-0 ml-2">
                    ${(product.price * quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Breakdown */}
          <div
            className="p-3.5 rounded-xl border flex flex-col gap-1.5"
            style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
          >
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Fee</span>
              <span className="font-bold">{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Sales Tax</span>
              <span className="font-bold">${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-black text-sm" style={{ borderColor: 'var(--border)' }}>
              <span>Grand Total</span>
              <span style={{ color: 'var(--primary)' }}>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 sm:p-5 border-t flex items-center justify-end gap-3"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
            style={{ borderColor: 'var(--border)' }}
          >
            Edit Information
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white transition-all shadow-md flex items-center gap-2 cursor-pointer"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {isSubmitting && (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            <span>{isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
