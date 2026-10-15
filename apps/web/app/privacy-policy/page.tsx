import React from 'react';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest mb-1">
          <ShieldCheck size={16} />
          <span>Customer Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
          Privacy Policy
        </h1>
        <p className="text-sm mt-2" style={{ color: 'var(--foreground-muted)' }}>
          Last Updated: February 2026 | Umer Electronics Data Governance Policy
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
            1. Information We Collect
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            When you visit Umer Electronics or place an order, we collect essential information required to fulfill your purchase:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1" style={{ color: 'var(--foreground-muted)' }}>
            <li><strong>Contact Details:</strong> Full name, verified mobile/WhatsApp telephone number, and email address.</li>
            <li><strong>Delivery Information:</strong> Physical delivery address, city, and postal code for secure courier dispatch.</li>
            <li><strong>Order History:</strong> Electronics purchased, serial numbers, warranty activation records, and payment method choice.</li>
            <li><strong>Device & Browsing Metadata:</strong> IP address, browser type, and operating system collected anonymously for security and anti-fraud detection.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            2. How We Use Your Information
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            Your personal data is used solely for the following legitimate business purposes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1" style={{ color: 'var(--foreground-muted)' }}>
            <li>Processing, packing, and dispatching your physical electronic orders.</li>
            <li>Communicating tracking updates and SMS delivery notifications.</li>
            <li>Registering official manufacturer warranties with brands like Apple, Sony, and Samsung.</li>
            <li>Responding to customer service inquiries and technical support requests.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            3. Strict Data Security & No-Selling Guarantee
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            <strong>We do not sell, rent, or trade your personal data to third parties.</strong> All sensitive transactions are encrypted via 256-bit SSL protocols. We only share minimal contact details with vetted, insured courier partners solely for physical delivery execution.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            4. Cookies & Local Storage
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            Umer Electronics uses browser LocalStorage strictly for maintaining your shopping cart items across visits and preserving your Dark/Light theme preference. We do not use intrusive cross-site tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-black mb-2" style={{ color: 'var(--primary)' }}>
            5. Contacting Our Data Protection Officer
          </h2>
          <p style={{ color: 'var(--foreground-muted)' }}>
            If you wish to review, update, or request deletion of your account records, please contact our data team at <strong>privacy@umerelectronics.com</strong> or call our official hotline at <strong>+92 300 1234567</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
