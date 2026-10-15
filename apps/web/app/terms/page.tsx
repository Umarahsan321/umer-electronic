import React from 'react';
import { FileCheck, ShieldCheck, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mb-1">
          <FileCheck size={16} />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
          Terms of Service
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--foreground-muted)' }}>
          Effective: February 2026 | Rules and conditions governing your purchases on Umer Electronics
        </p>
      </div>

      <div
        className="p-8 rounded-3xl border flex flex-col gap-6 text-sm leading-relaxed"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)'
        }}
      >
        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            By accessing Umer Electronics or placing an order through this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            2. Product Pricing & Inventory Accuracy
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            We endeavor to ensure that all descriptions, images, technical specifications, and prices of items appearing on Umer Electronics are accurate. However, in the rare event of a typographical pricing error, Umer Electronics reserves the right to cancel or adjust orders placed for products listed at an incorrect price after prompt customer notification.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            3. Warranty Terms & Claim Guidelines
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            All electronics sold by Umer Electronics come with official brand manufacturer warranties (typically 1 to 3 years depending on the device brand):
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1" style={{ color: 'var(--foreground-muted)' }}>
            <li><strong>Apple Devices:</strong> Backed by 1-Year Official International / Local Apple Warranty redeemable at any Apple Authorized Service Provider.</li>
            <li><strong>Laptops (Dell, Lenovo, ASUS):</strong> Backed by official onsite / service center manufacturer coverage.</li>
            <li><strong>Warranty Void Conditions:</strong> Liquid damage, physical screen cracking caused by accidental drops, unauthorized disassembly, or tampering with serial number stickers voids the manufacturer warranty.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            4. Order Fulfillment & Cancellations
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            Orders may be cancelled free of charge prior to warehouse dispatch by contacting our customer hotline. Once an order is with the courier, standard returns procedures apply.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            5. Governing Law
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            These Terms are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts of Islamabad.
          </p>
        </section>
      </div>
    </div>
  );
}
