'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Headphones, 
  MapPin, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      {/* 4 Feature Badges Strip */}
      <div
        className="border-b"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div
              className="p-3 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF' }}
            >
              <Truck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                Free Express Delivery
              </h4>
              <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                On all eligible orders over $100
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div
              className="p-3 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF' }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                Official Brand Warranty
              </h4>
              <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                100% genuine guaranteed products
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div
              className="p-3 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF' }}
            >
              <RotateCcw size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                7-Day Easy Return
              </h4>
              <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                Hassle-free replacement policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div
              className="p-3 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--primary)', color: '#FFFFFF' }}
            >
              <Headphones size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                24/7 Tech Support
              </h4>
              <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                Expert advice from gadget pros
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Logo size="md" />
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--foreground-muted)' }}>
            Umer Electronics is your premier destination for the latest high-performance laptops, flagship smartphones, studio-grade audio, 4K displays, and smart living appliances.
          </p>
          <div className="flex flex-col gap-2.5 text-xs mt-2" style={{ color: 'var(--foreground-muted)' }}>
            <div className="flex items-center gap-2">
              <MapPin size={16} color="var(--primary)" />
              <span>Blue Area Commercial District, Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} color="var(--primary)" />
              <span>+92 300 1234567 | +92 51 9876543</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} color="var(--primary)" />
              <span>support@umerelectronics.com</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
            Categories
          </h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
            <li><Link href="/products?category=laptops-computers" className="hover:text-blue-500">Laptops & Computers</Link></li>
            <li><Link href="/products?category=smartphones-tablets" className="hover:text-blue-500">Smartphones & Tablets</Link></li>
            <li><Link href="/products?category=audio-sound" className="hover:text-blue-500">Audio & Sound</Link></li>
            <li><Link href="/products?category=smart-tvs-displays" className="hover:text-blue-500">Smart TVs & Displays</Link></li>
            <li><Link href="/products?category=gaming-consoles" className="hover:text-blue-500">Gaming & Consoles</Link></li>
            <li><Link href="/products?category=home-appliances" className="hover:text-blue-500">Home Appliances</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
            Navigation
          </h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
            <li><Link href="/" className="hover:text-blue-500">Home</Link></li>
            <li><Link href="/products" className="hover:text-blue-500">All Products</Link></li>
            <li><Link href="/cart" className="hover:text-blue-500">Shopping Cart</Link></li>
            <li><Link href="/checkout" className="hover:text-blue-500">Checkout</Link></li>
            <li><Link href="/about" className="hover:text-blue-500">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500">Contact Us</Link></li>
          </ul>
        </div>

        {/* Policy Pages */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-extrabold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
            Customer Policies
          </h4>
          <ul className="flex flex-col gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
            <li><Link href="/privacy-policy" className="hover:text-blue-500">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-500">Terms of Service</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-blue-500">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500">Customer Support</Link></li>
            <li><a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-bold">Admin Portal</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div
        className="border-t py-6 text-center text-xs"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--foreground-muted)',
          backgroundColor: 'var(--surface-elevated)'
        }}
      >
        <p>© {new Date().getFullYear()} Umer Electronics. All rights reserved. Solid Architecture, Zero Gradients.</p>
      </div>
    </footer>
  );
};
