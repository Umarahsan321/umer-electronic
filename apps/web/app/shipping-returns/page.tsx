import React from 'react';
import { Truck, RotateCcw, PackageCheck, Clock, ShieldAlert } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mb-1">
          <Truck size={16} />
          <span>Fulfillment & Guarantees</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
          Shipping & Returns Policy
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--foreground-muted)' }}>
          Transparent delivery timelines and hassle-free 7-day replacement warranty for all electronic devices
        </p>
      </div>

      <div
        className="p-8 rounded-3xl border flex flex-col gap-8 text-sm leading-relaxed"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)'
        }}
      >
        {/* Shipping Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <Truck size={20} color="var(--primary)" />
            <h2 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
              Nationwide Express Shipping
            </h2>
          </div>

          <p style={{ color: 'var(--foreground-muted)' }}>
            Umer Electronics partners with premier insured logistics providers to deliver your expensive electronics safely and reliably:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-2">
            <div
              className="p-4 rounded-xl border flex flex-col gap-1 text-center"
              style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <span className="text-xs font-black text-blue-600">ISLAMABAD / RAWALPINDI</span>
              <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Same Day / 24 Hours</span>
              <span className="text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Direct Rider Delivery</span>
            </div>

            <div
              className="p-4 rounded-xl border flex flex-col gap-1 text-center"
              style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <span className="text-xs font-black text-blue-600">LAHORE & KARACHI</span>
              <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>24 – 48 Hours</span>
              <span className="text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Air Cargo Priority</span>
            </div>

            <div
              className="p-4 rounded-xl border flex flex-col gap-1 text-center"
              style={{ backgroundColor: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <span className="text-xs font-black text-blue-600">ALL OTHER CITIES</span>
              <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>2 – 3 Business Days</span>
              <span className="text-[11px]" style={{ color: 'var(--foreground-muted)' }}>Insured Surface Transit</span>
            </div>
          </div>

          <p style={{ color: 'var(--foreground-muted)' }}>
            <strong>Free Shipping:</strong> All orders above <strong>$100</strong> qualify for 100% free delivery. Orders below this threshold incur a flat $15 logistics handling fee.
          </p>
        </section>

        {/* 7-Day Return Policy */}
        <section className="flex flex-col gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <RotateCcw size={20} color="var(--primary)" />
            <h2 className="text-lg font-black" style={{ color: 'var(--foreground)' }}>
              7-Day Hassle-Free Replacement Policy
            </h2>
          </div>

          <p style={{ color: 'var(--foreground-muted)' }}>
            We want you to be completely thrilled with your hardware. If your item arrives with any manufacturing defect or transit damage, you are eligible for an immediate replacement:
          </p>

          <ul className="list-disc pl-5 space-y-1.5" style={{ color: 'var(--foreground-muted)' }}>
            <li><strong>7 Calendar Days:</strong> Report any issue within 7 days of package delivery confirmation.</li>
            <li><strong>Condition Requirements:</strong> Item must include original box, manufacturer plastic wraps, original cables, power adapters, and warranty leaflets.</li>
            <li><strong>DOA Guarantee:</strong> If a device arrives dead on arrival (DOA), we replace it immediately without waiting for extended manufacturer service diagnostics.</li>
          </ul>
        </section>

        {/* Return Procedure Steps */}
        <section className="flex flex-col gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <h3 className="text-base font-black" style={{ color: 'var(--foreground)' }}>
            How to Initiate a Return or Replacement:
          </h3>

          <ol className="list-decimal pl-5 space-y-2" style={{ color: 'var(--foreground-muted)' }}>
            <li>Contact our support team on WhatsApp at <strong>+92 300 1234567</strong> or email <strong>support@umerelectronics.com</strong> with your Order Number and photo/video of the issue.</li>
            <li>Our tech representative will verify your serial number against our warehouse inventory database.</li>
            <li>Our courier partner will arrange reverse pickup directly from your doorstep.</li>
            <li>Once the item is inspected at our central depot, your brand-new replacement unit is dispatched within 24 hours.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
