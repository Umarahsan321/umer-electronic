'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Check, ShieldCheck } from 'lucide-react';
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
      className="group rounded-2xl border flex flex-col justify-between overflow-hidden transition-all hover:shadow-lg"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full overflow-hidden p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-900/40">
        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 ? (
          <span
            className="absolute top-3 left-3 z-10 text-xs font-black px-2.5 py-1 rounded-md text-white shadow-sm"
            style={{ backgroundColor: 'var(--danger)' }}
          >
            -{product.discountPercentage}% OFF
          </span>
        ) : null}

        {/* Featured Badge */}
        {product.featured && (
          <span
            className="absolute top-3 right-3 z-10 text-xs font-black px-2.5 py-1 rounded-md text-white shadow-sm"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            FEATURED
          </span>
        )}

        <Link href={`/products/${product.id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
            <span
              className="uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                backgroundColor: 'var(--surface-elevated)',
                color: 'var(--primary)'
              }}
            >
              {product.brand}
            </span>
            <span
              className="flex items-center gap-1 font-semibold"
              style={{
                color: product.stock > 0 ? 'var(--success)' : 'var(--danger)'
              }}
            >
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`}>
            <h3
              className="font-bold text-sm sm:text-base line-clamp-2 hover:text-blue-600 transition-colors"
              style={{ color: 'var(--foreground)' }}
              title={product.name}
            >
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-500">
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <span className="text-xs font-extrabold ml-1" style={{ color: 'var(--foreground)' }}>
                {product.rating}
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
              ${product.price.toLocaleString()}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs line-through" style={{ color: 'var(--foreground-muted)' }}>
                ${product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock || product.stock <= 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{
              backgroundColor: isInCart ? 'var(--success)' : 'var(--primary)'
            }}
          >
            {isInCart ? (
              <>
                <Check size={14} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
