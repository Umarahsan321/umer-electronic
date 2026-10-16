'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../../../../packages/shared/src/types/index';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items } = useCart();
  const isInCart = items.some(i => i.product.id === product.id);

  return (
    <div
      className="group rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-500"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full overflow-hidden p-2 sm:p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40">
        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 ? (
          <span
            className="absolute top-2 left-2 z-10 text-[10px] sm:text-xs font-black px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-white shadow-xs"
            style={{ backgroundColor: 'var(--danger)' }}
          >
            -{product.discountPercentage}%
          </span>
        ) : null}

        {/* Featured Badge */}
        {product.featured && (
          <span
            className="absolute top-2 right-2 z-10 text-[9px] sm:text-xs font-black px-1.5 sm:px-2 py-0.5 rounded text-white shadow-xs"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            HOT
          </span>
        )}

        <Link
          href={`/products/${product.id}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content Body */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2.5 sm:gap-3">
        <div>
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1 font-bold">
            <span
              className="uppercase tracking-wider px-1.5 py-0.5 rounded truncate max-w-[65%]"
              style={{
                backgroundColor: 'var(--surface-elevated)',
                color: 'var(--primary)'
              }}
            >
              {product.brand}
            </span>
            <span
              className="font-semibold text-[10px] sm:text-xs shrink-0"
              style={{
                color: product.stock > 0 ? 'var(--success)' : 'var(--danger)'
              }}
            >
              {product.stock > 0 ? 'In Stock' : 'Out'}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`}>
            <h3
              className="font-bold text-xs sm:text-sm line-clamp-2 leading-snug hover:text-blue-600 transition-colors"
              style={{ color: 'var(--foreground)' }}
              title={product.name}
            >
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <div className="flex items-center text-amber-500">
              <Star size={12} fill="#F59E0B" color="#F59E0B" className="shrink-0" />
              <span className="text-[11px] sm:text-xs font-extrabold ml-1" style={{ color: 'var(--foreground)' }}>
                {product.rating}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs truncate" style={{ color: 'var(--foreground-muted)' }}>
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div
          className="pt-2 sm:pt-3 border-t flex items-center justify-between gap-1.5"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-black truncate" style={{ color: 'var(--foreground)' }}>
              ${product.price.toLocaleString()}
            </div>
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="text-[10px] sm:text-xs line-through truncate" style={{ color: 'var(--foreground-muted)' }}>
                ${product.originalPrice.toLocaleString()}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock || product.stock <= 0}
            className="shrink-0 flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              backgroundColor: isInCart ? 'var(--success)' : 'var(--primary)'
            }}
            title={isInCart ? 'Item in cart' : 'Add to cart'}
          >
            {isInCart ? (
              <>
                <Check size={13} />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
