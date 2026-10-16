'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  PhoneCall, 
  ArrowRight, 
  Copy, 
  Check, 
  MessageCircle 
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'UE-2026-1004';
  const [copied, setCopied] = useState(false);

  const handleCopyOrderId = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-10 sm:py-16 text-center flex flex-col items-center">
      {/* Success Badge */}
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6"
        style={{ backgroundColor: 'var(--success-subtle)' }}
      >
        <CheckCircle2 size={38} color="var(--success)" />
      </div>

      <span
        className="text-[11px] sm:text-xs font-black uppercase px-3 py-1 rounded-full mb-3"
        style={{ backgroundColor: 'var(--primary-subtle)', color: 'var(--primary)' }}
      >
        Order Confirmed & In Verification
      </span>

      <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
        Thank You for Your Order!
      </h1>
      <p className="text-xs sm:text-sm mb-6 max-w-lg" style={{ color: 'var(--foreground-muted)' }}>
        Your electronics order has been placed into our warehouse queue. We’ll call or SMS you shortly for dispatch verification.
      </p>

      {/* Order Tracking Card */}
      <div
        className="w-full p-4 sm:p-6 rounded-2xl border text-left flex flex-col gap-4 mb-6 sm:mb-8"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'var(--border)' }}>
          <span className="text-xs font-bold" style={{ color: 'var(--foreground-muted)' }}>Order Reference Number:</span>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black text-blue-600 font-mono">{orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 cursor-pointer"
              title="Copy Order ID"
            >
              {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="flex flex-col gap-3 py-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>Order Placed & Logged</div>
              <div className="text-[10px] sm:text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Order items reserved in warehouse</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Package size={16} />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>Quality Check & Serial Scan</div>
              <div className="text-[10px] sm:text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Device sealed and warranty card stamped</div>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0">
              <Truck size={16} />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>Courier Dispatch</div>
              <div className="text-[10px] sm:text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Tracking code sent via SMS to your phone</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
        <Link
          href="/products"
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span>Continue Shopping</span>
          <ArrowRight size={15} />
        </Link>

        <a
          href={`https://wa.me/923001234567?text=Hello%20Umer%20Electronics%2C%20I%20placed%20order%20${orderId}.%20Please%20verify%20status.`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle size={15} />
          <span>Track via WhatsApp</span>
        </a>

        <Link
          href="/contact"
          className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm border flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        >
          <PhoneCall size={15} />
          <span>Contact Us</span>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs font-semibold text-slate-400">Loading receipt...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
