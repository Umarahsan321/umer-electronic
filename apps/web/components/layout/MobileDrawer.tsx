'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Tv, 
  Gamepad2, 
  Home as HomeIcon, 
  Cpu, 
  Watch, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  Truck, 
  Layers, 
  Info, 
  Mail, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  { label: 'All Products', href: '/products', icon: Layers, count: '30+ Items' },
  { label: 'Laptops & Computers', href: '/products?category=laptops-computers', icon: Laptop, count: 'MacBook, ThinkPad, Dell' },
  { label: 'Smartphones & Tablets', href: '/products?category=smartphones-tablets', icon: Smartphone, count: 'iPhone, Galaxy, iPad' },
  { label: 'Audio & Sound', href: '/products?category=audio-sound', icon: Headphones, count: 'Sony, Bose, AirPods' },
  { label: 'Smart TVs & Displays', href: '/products?category=smart-tvs-displays', icon: Tv, count: 'LG OLED, Samsung 4K' },
  { label: 'Gaming Consoles', href: '/products?category=gaming-consoles', icon: Gamepad2, count: 'PS5, Xbox, Switch' },
  { label: 'Smart Home & Security', href: '/products?category=smart-home-security', icon: HomeIcon, count: 'Cameras, Smart Locks' },
  { label: 'Home Appliances', href: '/products?category=home-appliances', icon: Cpu, count: 'Dyson, Philips, Espresso' },
  { label: 'Wearables & Power', href: '/products?category=wearables-power', icon: Watch, count: 'Apple Watch, Anker' },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Panel from Left */}
      <div
        className="relative z-10 w-[85%] max-w-sm h-full flex flex-col shadow-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border)'
        }}
      >
        {/* Drawer Header */}
        <div
          className="p-4 flex items-center justify-between border-b"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)' }}
        >
          <div onClick={onClose}>
            <Logo size="sm" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl border flex items-center justify-center transition-colors"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--foreground)'
            }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-6">
          {/* Quick Announcement Pill */}
          <div
            className="p-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold"
            style={{
              backgroundColor: 'var(--primary-subtle)',
              borderColor: 'var(--primary)',
              color: 'var(--primary)'
            }}
          >
            <ShieldCheck size={16} className="shrink-0" />
            <span>100% Authentic Electronics with Official Warranty</span>
          </div>

          {/* Categories Section */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[11px] font-black uppercase tracking-wider px-2"
              style={{ color: 'var(--foreground-muted)' }}
            >
              Shop Categories
            </span>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((item, idx) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                    style={{
                      color: isActive ? '#FFFFFF' : 'var(--foreground)'
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-blue-700 text-white' : ''
                        }`}
                        style={{
                          backgroundColor: isActive ? undefined : 'var(--surface-elevated)',
                          color: isActive ? '#FFFFFF' : 'var(--primary)'
                        }}
                      >
                        <Icon size={15} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span>{item.label}</span>
                        <span
                          className="text-[10px] font-normal"
                          style={{ color: isActive ? '#E0E7FF' : 'var(--foreground-muted)' }}
                        >
                          {item.count}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={14} className="opacity-50" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Store Quick Pages */}
          <div className="flex flex-col gap-1.5 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <span
              className="text-[11px] font-black uppercase tracking-wider px-2"
              style={{ color: 'var(--foreground-muted)' }}
            >
              Help & Information
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/about"
                onClick={onClose}
                className="p-2.5 rounded-xl border flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <Info size={14} style={{ color: 'var(--primary)' }} />
                <span>About Us</span>
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="p-2.5 rounded-xl border flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <Mail size={14} style={{ color: 'var(--primary)' }} />
                <span>Contact</span>
              </Link>
              <Link
                href="/shipping-returns"
                onClick={onClose}
                className="p-2.5 rounded-xl border flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <Truck size={14} style={{ color: 'var(--primary)' }} />
                <span>Returns</span>
              </Link>
              <Link
                href="/terms"
                onClick={onClose}
                className="p-2.5 rounded-xl border flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <Sparkles size={14} style={{ color: 'var(--primary)' }} />
                <span>Terms</span>
              </Link>
            </div>
          </div>

          {/* Admin Dashboard Link */}
          <div className="pt-2">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border font-bold text-xs transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/30"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)'
              }}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>Admin Management Portal</span>
              </span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Direct Contact Card */}
          <div
            className="p-3.5 rounded-xl border flex flex-col gap-2 text-xs"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <div className="font-bold flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
              <PhoneCall size={14} style={{ color: 'var(--primary)' }} />
              <span>Customer Helpline</span>
            </div>
            <a
              href="tel:+923001234567"
              className="font-mono font-semibold hover:underline"
              style={{ color: 'var(--foreground-muted)' }}
            >
              +92 300 1234567
            </a>
            <span className="text-[11px]" style={{ color: 'var(--foreground-subtle)' }}>
              Mon – Sat: 10:00 AM – 9:00 PM PKT
            </span>
          </div>
        </div>

        {/* Drawer Footer: Theme Toggle & Info */}
        <div
          className="p-4 border-t flex items-center justify-between"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface-elevated)'
          }}
        >
          <div className="text-[11px] font-semibold" style={{ color: 'var(--foreground-muted)' }}>
            Switch Appearance
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
