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
  Star,
  CheckCircle2,
  Clock
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
    <div className="flex flex-col gap-10 sm:gap-16 pb-12 sm:pb-16 overflow-x-hidden">
      {/* 1. Hero Showcase Section */}
      <section
        className="w-full py-10 sm:py-16 lg:py-20 border-b"
        style={{
          backgroundColor: '#0F172A',
          borderColor: '#1E293B',
          color: '#FFFFFF'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-4 sm:gap-6 text-center sm:text-left items-center sm:items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-black tracking-wide border border-blue-500 bg-blue-900/50 text-blue-300">
              <Zap size={14} color="#F59E0B" />
              <span>OFFICIAL FLAGSHIP TECH STORE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Power Your Digital Life with <span style={{ color: '#3B82F6' }}>Umer Electronics</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed">
              Discover Pakistan’s most authentic collection of M3 MacBooks, iPhone 15 Pro, 4K OLED Displays, Sony ANC Audio, and Next-Gen Consoles with genuine official warranty.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
              <Link
                href="/products"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2 transition-all shadow-md hover:bg-blue-600 active:scale-95"
                style={{ backgroundColor: '#2563EB' }}
              >
                <span>Browse All Products</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/products?category=laptops-computers"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl font-extrabold text-sm text-white border border-slate-700 bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all text-center"
              >
                Explore Laptops
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-slate-800 w-full text-center">
              <div className="p-2 sm:p-0">
                <div className="text-xl sm:text-2xl font-black text-white">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-semibold">Authentic Gear</div>
              </div>
              <div className="p-2 sm:p-0 border-x border-slate-800 sm:border-x-0">
                <div className="text-xl sm:text-2xl font-black text-white">24h</div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-semibold">Express Dispatch</div>
              </div>
              <div className="p-2 sm:p-0">
                <div className="text-xl sm:text-2xl font-black text-white">7-Day</div>
                <div className="text-[10px] sm:text-xs text-slate-400 font-semibold">Guarantee</div>
              </div>
            </div>
          </div>

          {/* Hero Featured Image Showcase */}
          <div className="relative flex items-center justify-center mt-4 lg:mt-0">
            <div
              className="relative p-6 sm:p-8 rounded-3xl border border-slate-800 w-full max-w-md lg:max-w-lg aspect-square flex flex-col items-center justify-center"
              style={{ backgroundColor: '#1E293B' }}
            >
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
                alt="MacBook Pro M3 Max"
                className="max-h-56 sm:max-h-72 object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
              />
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-2 rounded-xl border border-slate-700 text-[11px] sm:text-xs font-black text-white flex items-center gap-2 whitespace-nowrap shadow-xl"
                style={{ backgroundColor: '#0F172A' }}
              >
                <Sparkles size={14} color="#3B82F6" />
                <span>Apple MacBook Pro 16&quot; M3 Max In Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Grid (4-cols on mobile, 8-cols on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
              Explore Categories
            </h2>
            <p className="text-xs sm:text-sm mt-0.5 sm:mt-1" style={{ color: 'var(--foreground-muted)' }}>
              Curated hardware for engineers, creators, and modern homes
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 shrink-0"
          >
            <span>All Categories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.slug] || Laptop;
            return (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border flex flex-col items-center text-center gap-2 sm:gap-3 transition-all hover:border-blue-600 hover:-translate-y-0.5 group"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)'
                }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white"
                  style={{
                    backgroundColor: 'var(--surface-elevated)',
                    color: 'var(--primary)'
                  }}
                >
                  <Icon size={18} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <div className="w-full">
                  <h4 className="text-[11px] sm:text-xs font-bold truncate" style={{ color: 'var(--foreground)' }}>
                    {cat.name.split('&')[0]}
                  </h4>
                  <span className="text-[9px] sm:text-[10px] font-semibold hidden sm:inline" style={{ color: 'var(--foreground-muted)' }}>
                    {cat.productCount} Items
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Featured Flagship Devices (2-cols on mobile, 4-cols on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-blue-600 uppercase tracking-widest mb-0.5">
              <Sparkles size={13} />
              <span>Flagship Selections</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
              Featured Electronics
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 shrink-0"
          >
            <span>See All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Solid Promotional Banner: Hot Electronics Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 border flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8"
          style={{
            backgroundColor: '#1E40AF',
            borderColor: '#1D4ED8',
            color: '#FFFFFF'
          }}
        >
          <div className="flex flex-col gap-3 sm:gap-4 max-w-xl text-center md:text-left items-center md:items-start">
            <span
              className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: '#DC2626' }}
            >
              LIMITED TIME FLASH DISCOUNTS
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Save Up to 17% on Premium Laptops & Sound
            </h3>
            <p className="text-xs sm:text-base text-blue-100 leading-relaxed">
              Special stock discounts on Lenovo ThinkPad X1 Carbon, LG OLED 4K evo, and Dyson V15 Detect. Official local warranty.
            </p>
            <div className="pt-1 sm:pt-2 w-full md:w-auto">
              <Link
                href="/products"
                className="w-full md:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <span>Shop Hot Deals Now</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto">
            <div
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-400 text-center"
              style={{ backgroundColor: '#1E3A8A' }}
            >
              <div className="text-2xl sm:text-3xl font-black text-amber-400">17%</div>
              <div className="text-[11px] sm:text-xs text-blue-200 font-semibold mt-0.5">ThinkPad X1</div>
            </div>
            <div
              className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-400 text-center"
              style={{ backgroundColor: '#1E3A8A' }}
            >
              <div className="text-2xl sm:text-3xl font-black text-amber-400">16%</div>
              <div className="text-[11px] sm:text-xs text-blue-200 font-semibold mt-0.5">LG OLED C3</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hot Deals Grid (2-cols on mobile, 4-cols on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
              Discounted Specials
            </h2>
            <p className="text-xs sm:text-sm mt-0.5 sm:mt-1" style={{ color: 'var(--foreground-muted)' }}>
              Top price drops across all 8 electronics categories
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 shrink-0"
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {hotDeals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Customer Trust & Brand Testimonials */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12 rounded-2xl sm:rounded-3xl border"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-black" style={{ color: 'var(--foreground)' }}>
            Trusted by 15,000+ Tech Buyers
          </h2>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2" style={{ color: 'var(--foreground-muted)' }}>
            Verified customer experiences from Islamabad, Lahore, Karachi, and nationwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div
            className="p-4 sm:p-6 rounded-2xl border flex flex-col justify-between gap-3 sm:gap-4"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="text-xs sm:text-sm italic leading-relaxed" style={{ color: 'var(--foreground)' }}>
              &ldquo;Ordered Apple MacBook Pro 16&quot; M3 Max. Box came sealed with genuine international warranty. Express delivery arrived in Islamabad in under 24 hours. Flawless service!&rdquo;
            </p>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="text-xs font-black" style={{ color: 'var(--foreground)' }}>Hamza Qureshi</div>
              <div className="text-[10px]" style={{ color: 'var(--foreground-muted)' }}>Software Architect, Islamabad</div>
            </div>
          </div>

          <div
            className="p-4 sm:p-6 rounded-2xl border flex flex-col justify-between gap-3 sm:gap-4"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="text-xs sm:text-sm italic leading-relaxed" style={{ color: 'var(--foreground)' }}>
              &ldquo;Sony WH-1000XM5 headphones are authentic original units. Sound and noise cancellation are astounding. Umer Electronics customer support was very helpful on WhatsApp.&rdquo;
            </p>
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="text-xs font-black" style={{ color: 'var(--foreground)' }}>Dr. Zainab Akhtar</div>
              <div className="text-[10px]" style={{ color: 'var(--foreground-muted)' }}>Verified Buyer, Lahore</div>
            </div>
          </div>

          <div
            className="p-4 sm:p-6 rounded-2xl border flex flex-col justify-between gap-3 sm:gap-4"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p className="text-xs sm:text-sm italic leading-relaxed" style={{ color: 'var(--foreground)' }}>
              &ldquo;Bought LG C3 65-inch OLED evo TV for my gaming room. Best price in market, 2 years official warranty, and perfect wooden crate delivery to Karachi with zero damage.&rdquo;
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
