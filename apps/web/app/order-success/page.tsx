'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, Truck, PhoneCall, ArrowRight } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'UE-2026-1004';

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center flex flex-col items-center">
      {/* Success Badge */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: 'var(--success-subtle)' }}
      >
        <CheckCircle2 size={44} color="var(--success)" />
      </div>

      <span
        className="text-xs font-black uppercase px-3 py-1 rounded-full mb-3"
        style={{ backgroundColor: 'var(--primary-subtle)', color: 'var(--primary)' }}
      >
        Order Confirmed & Payment Verified
      </span>

      <h1 className="text-3xl font-black tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
        Thank You for Your Order!
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
        Your electronics order has been placed into our warehouse queue. We’ll call you shortly for dispatch verification.
      </p>

      {/* Order Tracking Card */}
      <div
        className="w-full p-6 rounded-2xl border text-left flex flex-col gap-4 mb-8"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: 'var(--border)' }}>
          <span className="text-xs font-bold" style={{ color: 'var(--foreground-muted)' }}>Order Reference Number:</span>
          <span className="text-sm font-black text-blue-600 font-mono">{orderId}</span>
        </div>

        {/* Tracking Timeline */}
        <div className="flex flex-col gap-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>Order Placed</div>
              <div className="text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Your order details are confirmed</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Package size={16} />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>Processing & Quality Inspection</div>
              <div className="text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Serial numbers verified and packaged securely</div>
            </div>
          </div>

          <div className="flex items-center gap-3 opacity-50">
            <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center shrink-0">
              <Truck size={16} />
            </div>
            <div>
              <div className="text-xs font-bold" style={{ color: 'var(--foreground)' }}>Dispatched with Courier</div>
              <div className="text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Tracking number will be SMSed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/products"
          className="px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-xl font-bold text-sm border flex items-center gap-2"
          style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
        >
          <PhoneCall size={16} />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading receipt...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
