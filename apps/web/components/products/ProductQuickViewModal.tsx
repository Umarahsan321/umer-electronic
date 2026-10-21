'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react';
import { Product } from '../../../../packages/shared/src/types/index';
import { useCart } from '../../context/CartContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addToCart, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
  }, [product, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isInCart = items.some(i => i.product.id === product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quickview-title"
        className="relative z-10 w-full max-w-3xl rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left: Product Image */}
            <div
              className="relative aspect-square w-full rounded-2xl border p-4 sm:p-6 flex items-center justify-center bg-slate-50 dark:bg-slate-900/50"
              style={{ borderColor: 'var(--border)' }}
            >
              {product.discountPercentage && product.discountPercentage > 0 ? (
                <span
                  className="absolute top-3 left-3 z-10 text-[11px] font-black px-2 py-0.5 rounded-md text-white shadow-xs"
                  style={{ backgroundColor: 'var(--danger)' }}
                >
                  -{product.discountPercentage}%
                </span>
              ) : null}

              {product.featured && (
                <span
                  className="absolute top-3 right-3 z-10 text-[10px] font-black px-2 py-0.5 rounded text-white shadow-xs"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  HOT
                </span>
              )}

              <img
                src={product.imageUrl}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Right: Product Details & Purchase Actions */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[10px] sm:text-xs font-black uppercase px-2 py-0.5 rounded tracking-wider"
                    style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--primary)' }}
                  >
                    {product.brand}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {product.sku}
                  </span>
                </div>

                <h2 id="quickview-title" className="text-lg sm:text-xl font-black leading-snug">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500 text-xs font-extrabold gap-1">
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({product.reviewCount} customer reviews)</span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span
                    className="text-xs font-bold"
                    style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--danger)' }}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-2.5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                <span className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--primary)' }}>
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price ? (
                  <span className="text-sm sm:text-base line-through text-slate-400 font-medium">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                ) : null}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {product.shortDescription || 'High-performance electronics engineered for peak reliability, backed by official local manufacturer warranty.'}
              </p>

              {/* Warranty badge */}
              <div
                className="p-2.5 rounded-xl border flex items-center gap-2.5 text-xs"
                style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
              >
                <ShieldCheck size={16} color="var(--primary)" className="shrink-0" />
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {product.warranty || '1 Year Official Local Warranty'}
                </span>
              </div>

              {/* Quantity Counter + Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <div
                  className="flex items-center justify-between border rounded-xl px-2 py-1 shrink-0"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-xs sm:text-sm font-extrabold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.min(product.stock || 99, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!product.inStock || product.stock <= 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-extrabold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs active:scale-98"
                  style={{
                    backgroundColor: justAdded ? 'var(--success)' : 'var(--primary)'
                  }}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      <span>{isInCart ? 'Add More to Cart' : 'Add to Cart'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Full Details Link */}
              <div className="pt-2 flex justify-end">
                <Link
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 inline-flex items-center gap-1"
                >
                  <span>View Full Product Specifications & Reviews</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
