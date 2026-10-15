'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Award, Zap, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">
      {/* Hero Brand Story */}
      <div className="text-center max-w-3xl mx-auto flex flex-col gap-4">
        <span
          className="text-xs font-black uppercase px-3.5 py-1.5 rounded-full w-fit mx-auto"
          style={{ backgroundColor: 'var(--primary-subtle)', color: 'var(--primary)' }}
        >
          AUTHENTICITY & PERFORMANCE FIRST
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
          About Umer Electronics
        </h1>
        <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
          Established to redefine electronics retailing in Pakistan, Umer Electronics provides developers, gamers, creatives, and families with 100% genuine sealed electronics backed by official brand warranties.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          className="p-6 rounded-2xl border text-center"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="text-3xl sm:text-4xl font-black text-blue-600">15,000+</div>
          <div className="text-xs font-bold mt-1" style={{ color: 'var(--foreground-muted)' }}>
            Satisfied Consumers Nationwide
          </div>
        </div>

        <div
          className="p-6 rounded-2xl border text-center"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="text-3xl sm:text-4xl font-black text-green-600">100%</div>
          <div className="text-xs font-bold mt-1" style={{ color: 'var(--foreground-muted)' }}>
            Official Sealed Retail Units
          </div>
        </div>

        <div
          className="p-6 rounded-2xl border text-center"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="text-3xl sm:text-4xl font-black text-amber-500">24 Hours</div>
          <div className="text-xs font-bold mt-1" style={{ color: 'var(--foreground-muted)' }}>
            Priority Dispatch Window
          </div>
        </div>

        <div
          className="p-6 rounded-2xl border text-center"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="text-3xl sm:text-4xl font-black text-purple-600">8 Categories</div>
          <div className="text-xs font-bold mt-1" style={{ color: 'var(--foreground-muted)' }}>
            Laptops to Smart Home Tech
          </div>
        </div>
      </div>

      {/* Core Principles Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          className="p-8 rounded-3xl border flex flex-col gap-4"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-black" style={{ color: 'var(--foreground)' }}>
            Zero Compromise on Authenticity
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            We only stock products sourced directly through authorized distributors for Apple, Sony, Samsung, Dell, Lenovo, and ASUS. No refurbished or counterfeit units—ever.
          </p>
        </div>

        <div
          className="p-8 rounded-3xl border flex flex-col gap-4"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Award size={24} />
          </div>
          <h3 className="text-xl font-black" style={{ color: 'var(--foreground)' }}>
            Transparent & Fair Pricing
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            All prices displayed on Umer Electronics include local taxes and clear import declarations. No hidden markups or surprise charges at checkout.
          </p>
        </div>

        <div
          className="p-8 rounded-3xl border flex flex-col gap-4"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-black" style={{ color: 'var(--foreground)' }}>
            Engineered for Tech Enthusiasts
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
            Our staff consists of tech enthusiasts who understand TDPs, OLED panels, low-latency audio codecs, and NVMe speeds. We provide real consultation before every purchase.
          </p>
        </div>
      </div>

      {/* Founder's Note Banner */}
      <div
        className="p-8 sm:p-12 rounded-3xl border text-white flex flex-col md:flex-row items-center justify-between gap-8"
        style={{ backgroundColor: '#0F172A', borderColor: '#1E293B' }}
      >
        <div className="flex flex-col gap-3 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-black">
            &ldquo;Your Trust is Our Hardest Earned Currency&rdquo;
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            When buying electronics online, you deserve 100% peace of mind that what arrives at your doorstep is pristine, authentic, and backed by a company that stands firmly behind its products.
          </p>
          <div className="mt-2 text-xs font-bold text-blue-400">
            — Umer Ahsan, Founder & CEO
          </div>
        </div>

        <Link
          href="/products"
          className="px-6 py-3.5 rounded-xl font-black text-sm text-white bg-blue-600 hover:bg-blue-500 inline-flex items-center gap-2 shrink-0 transition-colors"
        >
          <span>Shop Our Electronics</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
