'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q: 'Are all products 100% genuine and original?',
      a: 'Yes, 100%. Every single laptop, smartphone, TV, and audio accessory sold by Umer Electronics is brand new in sealed original retail boxes with official manufacturer warranty.'
    },
    {
      q: 'What is your delivery timeframe across Pakistan?',
      a: 'Same-day or next-day delivery in Islamabad & Rawalpindi. 2 to 3 business days for Lahore, Karachi, Peshawar, and all other cities with fully insured priority courier.'
    },
    {
      q: 'What is the 7-day return policy?',
      a: 'If any device arrives with manufacturing defects or physical transit damage, notify us within 7 days for a hassle-free instant replacement or refund.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes, we provide Cash on Delivery for all eligible orders. You can inspect the package upon courier arrival.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
          Contact Umer Electronics
        </h1>
        <p className="text-sm sm:text-base mt-2" style={{ color: 'var(--foreground-muted)' }}>
          Have questions about device specifications, bulk pricing, or delivery? Reach our expert hardware team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Column */}
        <div className="flex flex-col gap-6">
          <div
            className="p-6 rounded-2xl border flex flex-col gap-6"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <h3 className="text-base font-black" style={{ color: 'var(--foreground)' }}>
              Showroom & Support
            </h3>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--foreground-muted)' }}>
                  Flagship Store
                </h4>
                <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--foreground)' }}>
                  Shop #14-B, Main Commercial Plaza, Blue Area, Islamabad, Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--foreground-muted)' }}>
                  Hotline / WhatsApp
                </h4>
                <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--foreground)' }}>
                  +92 300 1234567<br />+92 51 9876543
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--foreground-muted)' }}>
                  Email Support
                </h4>
                <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--foreground)' }}>
                  support@umerelectronics.com<br />sales@umerelectronics.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--foreground-muted)' }}>
                  Business Hours
                </h4>
                <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--foreground)' }}>
                  Monday – Saturday: 10:00 AM – 9:00 PM<br />Sunday: 2:00 PM – 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-2">
          <div
            className="p-8 rounded-3xl border flex flex-col gap-6"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div>
              <h2 className="text-xl font-black" style={{ color: 'var(--foreground)' }}>
                Send Us a Message
              </h2>
              <p className="text-xs mt-1" style={{ color: 'var(--foreground-muted)' }}>
                We typically respond to tech inquiries within 30 minutes during store hours.
              </p>
            </div>

            {submitted && (
              <div
                className="p-4 rounded-xl border flex items-center gap-3 text-xs font-bold"
                style={{
                  backgroundColor: 'var(--success-subtle)',
                  borderColor: 'var(--success)',
                  color: 'var(--success)'
                }}
              >
                <CheckCircle2 size={18} />
                <span>Thank you! Your message has been received. Our sales engineer will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--foreground)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm bg-transparent"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--foreground)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--foreground)' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="asad@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm bg-transparent"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--foreground)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--foreground)' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm bg-transparent"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--foreground)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--foreground)' }}>
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm bg-transparent"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--foreground)' }}
                  >
                    <option value="Product Inquiry">Product Inquiry / Specs</option>
                    <option value="Order Tracking">Order Status / Delivery</option>
                    <option value="Warranty Claim">Warranty / Return Claim</option>
                    <option value="Corporate Order">Corporate Bulk Purchase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--foreground)' }}>
                  Your Message / Device Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you need help with..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-sm bg-transparent resize-y"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-elevated)', color: 'var(--foreground)' }}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white flex items-center gap-2 cursor-pointer transition-all hover:opacity-95"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <Send size={16} />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="mt-8 flex flex-col gap-6">
        <h2 className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border flex flex-col gap-2"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h3 className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>
                {faq.q}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
