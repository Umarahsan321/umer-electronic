'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ArrowLeft, 
  Cpu, 
  Zap,
  PhoneCall,
  Share2
} from 'lucide-react';
import { Product } from '../../../../../packages/shared/src/types/index';
import { SEED_PRODUCTS } from '../../../../../packages/shared/src/data/seed-products';
import { useCart } from '../../../context/CartContext';
import { ProductCard } from '../../../components/products/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, items } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const productId = params.id as string;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          const fallback = SEED_PRODUCTS.find(p => p.id === productId || p.slug === productId);
          setProduct(fallback || null);
        }
      })
      .catch(() => {
        const fallback = SEED_PRODUCTS.find(p => p.id === productId || p.slug === productId);
        setProduct(fallback || null);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground-muted)' }}>
          Loading electronic specifications...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--foreground)' }}>
          Product Not Found
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
          The item you are looking for does not exist in our catalog or may have been discontinued.
        </p>
        <Link
          href="/products"
          className="px-6 py-2.5 rounded-xl text-white font-bold text-sm"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const relatedProducts = SEED_PRODUCTS
    .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-8 sm:gap-12 pb-24 md:pb-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold overflow-x-auto whitespace-nowrap" style={{ color: 'var(--foreground-muted)' }}>
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.categorySlug}`} className="hover:text-blue-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="truncate max-w-[180px] sm:max-w-xs" style={{ color: 'var(--foreground)' }}>{product.name}</span>
      </div>

      {/* Main Two-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Product Image Showcase */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div
            className="rounded-2xl sm:rounded-3xl border p-4 sm:p-8 flex items-center justify-center aspect-square overflow-hidden relative"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)'
            }}
          >
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <span
                className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-md text-white shadow-xs"
                style={{ backgroundColor: 'var(--danger)' }}
              >
                SAVE {product.discountPercentage}%
              </span>
            ) : null}

            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Value Badges Strip under Image */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div
              className="p-2.5 sm:p-3 rounded-xl border text-center flex flex-col items-center gap-1"
              style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <ShieldCheck size={16} color="var(--primary)" />
              <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>100% Genuine</span>
            </div>
            <div
              className="p-2.5 sm:p-3 rounded-xl border text-center flex flex-col items-center gap-1"
              style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <Truck size={16} color="var(--primary)" />
              <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>Express Delivery</span>
            </div>
            <div
              className="p-2.5 sm:p-3 rounded-xl border text-center flex flex-col items-center gap-1"
              style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <RotateCcw size={16} color="var(--primary)" />
              <span className="text-[10px] sm:text-[11px] font-bold" style={{ color: 'var(--foreground)' }}>7-Day Returns</span>
            </div>
          </div>
        </div>

        {/* Right: Product Buy Info & Specs */}
        <div className="flex flex-col gap-5 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[11px] sm:text-xs font-black uppercase px-2 py-0.5 rounded"
                style={{ backgroundColor: 'var(--surface-elevated)', color: 'var(--primary)' }}
              >
                {product.brand}
              </span>
              <span className="text-[11px] sm:text-xs font-mono" style={{ color: 'var(--foreground-subtle)' }}>
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black tracking-tight leading-snug" style={{ color: 'var(--foreground)' }}>
              {product.name}
            </h1>

            {/* Rating Stars & Reviews */}
            <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < Math.floor(product.rating) ? '#F59E0B' : 'none'}
                    color="#F59E0B"
                  />
                ))}
                <span className="text-xs sm:text-sm font-extrabold ml-1.5" style={{ color: 'var(--foreground)' }}>
                  {product.rating}
                </span>
              </div>
              <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                ({product.reviewCount} verified ratings)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div
            className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border flex items-center justify-between"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)'
            }}
          >
            <div>
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--foreground)' }}>
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs sm:text-base line-through" style={{ color: 'var(--foreground-muted)' }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold mt-0.5 sm:mt-1" style={{ color: 'var(--success)' }}>
                Official import warranty included
              </div>
            </div>

            <div className="text-right">
              <span
                className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold"
                style={{
                  backgroundColor: product.stock > 0 ? 'var(--success-subtle)' : 'var(--danger-subtle)',
                  color: product.stock > 0 ? 'var(--success)' : 'var(--danger)'
                }}
              >
                {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
              </span>
              <div className="text-[10px] sm:text-[11px] mt-0.5 sm:mt-1 font-semibold" style={{ color: 'var(--foreground-muted)' }}>
                {product.warranty}
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-base leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            {product.fullDescription || product.shortDescription}
          </p>

          {/* Key Features Bullets */}
          {product.features && product.features.length > 0 && (
            <div
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border flex flex-col gap-2.5"
              style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
                Key Technical Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold" style={{ color: 'var(--foreground)' }}>
                {(product.features || []).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={14} color="var(--primary)" className="shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity Selector & Action CTAs */}
          <div className="flex flex-col gap-3 pt-2">
            {addedNotice && (
              <div
                className="p-3 rounded-xl border text-xs font-bold text-center flex items-center justify-center gap-2 animate-bounce"
                style={{
                  backgroundColor: 'var(--success-subtle)',
                  borderColor: 'var(--success)',
                  color: 'var(--success)'
                }}
              >
                <Check size={16} />
                <span>Added {quantity} unit(s) to your cart!</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity Counter */}
              <div
                className="flex items-center justify-between border rounded-xl w-full sm:w-auto self-center"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl text-base cursor-pointer"
                  style={{ color: 'var(--foreground)' }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-6 text-sm font-black" style={{ color: 'var(--foreground)' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="px-4 py-3 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl text-base cursor-pointer"
                  style={{ color: 'var(--foreground)' }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 flex-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || product.stock <= 0}
                  className="flex-1 py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm hover:opacity-95 active:scale-95"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={!product.inStock || product.stock <= 0}
                  className="flex-1 py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer hover:opacity-95 active:scale-95"
                  style={{ backgroundColor: '#0F172A' }}
                >
                  <Zap size={16} color="#F59E0B" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Table */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <section
          className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl border flex flex-col gap-4 sm:gap-6"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
          }}
        >
          <div className="flex items-center gap-2 border-b pb-3 sm:pb-4" style={{ borderColor: 'var(--border)' }}>
            <Cpu size={20} color="var(--primary)" />
            <h3 className="text-base sm:text-xl font-black" style={{ color: 'var(--foreground)' }}>
              Hardware & Technical Specifications
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <tbody>
                {Object.entries(product.specs || {}).map(([key, val], idx: number) => (
                  <tr
                    key={idx}
                    className="border-b"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: idx % 2 === 0 ? 'var(--surface-elevated)' : 'transparent'
                    }}
                  >
                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-bold w-1/3 text-xs sm:text-sm" style={{ color: 'var(--foreground)' }}>
                      {key}
                    </td>
                    <td className="py-2.5 sm:py-3.5 px-3 sm:px-4 font-medium text-xs sm:text-sm" style={{ color: 'var(--foreground-muted)' }}>
                      {String(val)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related Products Strip (2-cols on mobile, 4-cols on desktop) */}
      {relatedProducts.length > 0 && (
        <section className="flex flex-col gap-4 sm:gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-xl font-black" style={{ color: 'var(--foreground)' }}>
              Related {product.category} Devices
            </h3>
            <Link
              href={`/products?category=${product.categorySlug}`}
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              View Category
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Action Bar (Appears only on mobile devices) */}
      <div
        className="md:hidden fixed bottom-16 left-0 right-0 z-30 border-t p-3 backdrop-blur-md flex items-center justify-between gap-3 shadow-lg"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold" style={{ color: 'var(--foreground-muted)' }}>Price:</span>
          <span className="text-base font-black" style={{ color: 'var(--foreground)' }}>
            ${product.price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-[240px]">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock || product.stock <= 0}
            className="flex-1 py-2.5 px-2 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <ShoppingCart size={14} />
            <span>Add</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!product.inStock || product.stock <= 0}
            className="flex-1 py-2.5 px-2 rounded-xl font-black text-xs text-white flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            style={{ backgroundColor: '#0F172A' }}
          >
            <Zap size={14} color="#F59E0B" />
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}
