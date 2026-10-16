'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="Support">
      <a
        href="https://wa.me/923001234567?text=Hi%20Umer%20Electronics%2C%20I%20have%20an%20inquiry%20about%20a%20product"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-extrabold text-xs shadow-xl transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: '#25D366',
          boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
        }}
        title="Chat with us on WhatsApp"
      >
        <MessageCircle size={20} className="fill-white" />
        <span className="hidden sm:inline">WhatsApp Help</span>
      </a>
    </aside>
  );
};
