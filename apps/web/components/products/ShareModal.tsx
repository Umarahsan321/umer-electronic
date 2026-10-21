'use client';

import React, { useEffect, useState } from 'react';
import { X, Copy, Check, MessageSquare, Mail, Share2 } from 'lucide-react';

const XIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShareModalProps {
  isOpen: boolean;
  title: string;
  url: string;
  imageUrl?: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  title,
  url,
  imageUrl,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`Check out ${title} at Umer Electronics!`);

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: MessageSquare,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      label: 'Share via WhatsApp'
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: XIcon,
      color: 'bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700',
      label: 'Share on X'
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: Mail,
      color: 'bg-blue-600 hover:bg-blue-700',
      label: 'Share via Email'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        className="relative z-10 w-full max-w-md rounded-2xl border p-5 sm:p-6 shadow-2xl transition-all"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          color: 'var(--foreground)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Share2 size={20} />
          </div>
          <div className="pr-6">
            <h3 id="share-modal-title" className="text-base sm:text-lg font-black leading-snug">
              Share Product
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[260px]">
              {title}
            </p>
          </div>
        </div>

        {/* Copy Link Input Bar */}
        <div className="mb-5">
          <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
            Product Link
          </label>
          <div
            className="flex items-center gap-2 p-1.5 rounded-xl border"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-transparent text-xs px-2.5 outline-none font-mono truncate"
              style={{ color: 'var(--foreground)' }}
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${
                copied ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex flex-col gap-2">
          {shareLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all ${item.color}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
