'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Tv, 
  Gamepad2, 
  Home, 
  Cpu, 
  Watch, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Star
} from 'lucide-react';
import { Product, Category } from '../../../packages/shared/src/types/index';
import { SEED_PRODUCTS } from '../../../packages/shared/src/data/seed-products';
import { SEED_CATEGORIES } from '../../../packages/shared/src/data/seed-categories';
import { ProductCard } from '../components/products/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);

  useEffect(() => {
    fetch('http://localhost:5000/api/products?limit=24')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.items) {
          setProducts(data.data.items);
        }
      })
      .catch(() => {});

    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCategories(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const hotDeals = products.filter(p => p.isHotDeal || (p.discountPercentage && p.discountPercentage >= 10)).slice(0, 4);

  const categoryIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
    'laptops-computers': Laptop,
    'smartphones-tablets': Smartphone,
    'audio-sound': Headphones,
    'smart-tvs-displays': Tv,
    'gaming-consoles': Gamepad2,
    'smart-home-security': Home,
    'home-appliances': Cpu,
    'wearables-power': Watch,
  };

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* 1. Hero Showcase Section (Solid Navy & Cobalt Blue, Zero Gradients) */}
      <section
        className="w-full py-16 sm:py-24 border-b"
        style={{
          backgroundColor: '#0F172A',
          borderColor: '#1E293B',
          color: '#FFFFFF'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide w-fit border border-blue-500 bg-blue-900/50 text-blue-300">
              <Zap size={14} color="#F59E0B" />
              <span>OFFICIAL FLAGSHIP TECH STORE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              Power Your Digital Life with <span style={{ color: '#3B82F6' }}>Umer Electronics</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Discover Pakistan’s most authentic collection of M3 MacBooks, iPhone 15 Pro, 4K OLED Displays, Sony ANC Audio, and Next-Gen Consoles with genuine warranty.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-white flex items-center gap-2 transition-all shadow-md hover:bg-blue-600"
                style={{ backgroundColor: '#2563EB' }}
              >
                <span>Browse All Products</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products?category=laptops-computers"
                className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-white border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all"
              >
                Explore Laptops
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div>
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-xs text-slate-400 font-semibold">Authentic Gear</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">24h</div>
                <div className="text-xs text-slate-400 font-semibold">Express Dispatch</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">7-Day</div>
                <div className="text-xs text-slate-400 font-semibold">Replacement Guarantee</div>
              </div>
            </div>
          </div>

          {/* Hero Featured Image Showcase */}
          <div className="relative flex items-center justify-center">
            <div
              className="relative p-8 rounded-3xl border border-slate-800 w-full max-w-lg aspect-square flex flex-col items-center justify-center"
              style={{ backgroundColor: '#1E293B' }}
            >
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
                alt="MacBook Pro M3 Max"
                className="max-h-72 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-xl border border-slate-700 text-xs font-black text-white flex items-center gap-3 whitespace-nowrap shadow-xl"
                style={{ backgroundColor: '#0F172A' }}
              >
                <Sparkles size={16} color="#3B82F6" />
                <span>Apple MacBook Pro 16&quot; M3 Max In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
              Explore Electronics Categories
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--foreground-muted)' }}>
              Curated hardware designed for gamers, engineers, creators, and modern homes
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <span>View Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] || Laptop;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="p-4 rounded-2xl border flex flex-col items-center text-center gap-3 transition-all hover:border-blue-600 hover:-translate-y-1 group"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--primary)'
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="text-xs font-bold line-clamp-1" style={{ color: 'var(--foreground)' }}>
                    {cat.name.split('&')[0]}
                  </h4>
                  <span className="text-[10px] font-semibold" style={{ color: 'var(--foreground-muted)' }}>
                    {cat.productCount} Items
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Flagship Devices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mb-1">
              <Sparkles size={14} />
              <span>Flagship Selections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
              Featured Electronics
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <span>See All Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Solid Promotional Banner: Hot Electronics Deals (Zero Gradients!) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="rounded-3xl p-8 sm:p-12 border flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            backgroundColor: '#1E40AF',
            borderColor: '#1D4ED8',
            color: '#FFFFFF'
          }}
        >
          <div className="flex flex-col gap-4 max-w-xl">
            <span
              className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider w-fit text-white"
              style={{ backgroundColor: '#DC2626' }}
            >
              LIMITED TIME FLASH DISCOUNTS
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Save Up to 17% on Premium Laptops & Sound
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Special stock discounts on Lenovo ThinkPad X1 Carbon, LG OLED 4K evo, and Dyson V15 Detect. Genuine box with official local warranty.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-900 bg-white hover:bg-slate-100 inline-flex items-center gap-2 transition-colors"
              >
                <span>Shop Hot Deals Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div
              className="p-4 rounded-2xl border border-blue-400 text-center"
              style={{ backgroundColor: '#1E3A8A' }}
            >
              <div className="text-3xl font-black text-amber-400">17%</div>
              <div className="text-xs text-blue-200 font-semibold mt-1">ThinkPad X1</div>
            </div>
            <div
              className="p-4 rounded-2xl border border-blue-400 text-center"
              style={{ backgroundColor: '#1E3A8A' }}
            >
              <div className="text-3xl font-black text-amber-400">16%</div>
              <div className="text-xs text-blue-200 font-semibold mt-1">LG OLED C3</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hot Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
              Discounted Electronics Specials
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--foreground-muted)' }}>
              Top price drops across all 8 tech categories
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <span>View All Deals</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotDeals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Customer Trust & Brand Testimonials */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 rounded-3xl border"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--foreground)' }}>
            Trusted by Over 15,000 Tech Enthusiasts
          </h2>
          <p className="text-sm mt-2" style={{ color: 'var(--foreground-muted)' }}>
            Read verified customer experiences from buyers across Islamabad, Lahore, Karachi, and nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-2xl border flex flex-col justify-between gap-4"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="text-sm italic leading-relaxed" style={{ color: 'var(--foreground)' }}>
              &ldquo;Ordered the Apple MacBook Pro 16&quot; M3 Max. Box came sealed with genuine international warranty. Express delivery arrived in Islamabad in under 24 hours. Flawless service!&rdquo;
            </p>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="text-xs font-black" style={{ color: 'var(--foreground)' }}>Hamza Qureshi</div>
              <div className="text-[10px]" style={{ color: 'var(--foreground-muted)' }}>Software Architect, Islamabad</div>
            </div>
          </div>

          <div
            className="p-6 rounded-2xl border flex flex-col justify-between gap-4"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="text-sm italic leading-relaxed" style={{ color: 'var(--foreground)' }}>
              &ldquo;Sony WH-1000XM5 headphones are authentic original units. Sound and noise cancellation are astounding. Umer Electronics customer support was very helpful on WhatsApp.&rdquo;
            </p>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="text-xs font-black" style={{ color: 'var(--foreground)' }}>Dr. Zainab Akhtar</div>
              <div className="text-[10px]" style={{ color: 'var(--foreground-muted)' }}>Verified Buyer, Lahore</div>
            </div>
          </div>

          <div
            className="p-6 rounded-2xl border flex flex-col justify-between gap-4"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="text-sm italic leading-relaxed" style={{ color: 'var(--foreground)' }}>
              &ldquo;Bought the LG C3 65-inch OLED evo TV for my gaming room. Best price in the market, 2 years official warranty, and perfect wooden crate delivery to Karachi with zero damage.&rdquo;
            </p>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="text-xs font-black" style={{ color: 'var(--foreground)' }}>Shehryar Khan</div>
              <div className="text-[10px]" style={{ color: 'var(--foreground-muted)' }}>Content Creator, Karachi</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
