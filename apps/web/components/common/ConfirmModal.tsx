'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  itemPreview?: {
    title: string;
    subtitle?: string;
    imageUrl?: string;
    badge?: string;
  };
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  variant = 'danger',
  itemPreview,
  isLoading = false,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="relative z-10 w-full max-w-md rounded-2xl border p-5 sm:p-6 shadow-2xl transition-all transform animate-scale-in"
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
          disabled={isLoading}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header Icon + Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              isDanger
                ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400'
                : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
            }`}
          >
            {isDanger ? <Trash2 size={22} /> : <AlertTriangle size={22} />}
          </div>
          <div className="pr-6">
            <h3 id="confirm-modal-title" className="text-base sm:text-lg font-black leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm mt-1 text-slate-500 dark:text-slate-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Optional Item Preview */}
        {itemPreview && (
          <div
            className="my-3.5 p-3 rounded-xl border flex items-center gap-3"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)'
            }}
          >
            {itemPreview.imageUrl && (
              <img
                src={itemPreview.imageUrl}
                alt={itemPreview.title}
                className="w-12 h-12 rounded-lg object-contain bg-white p-1 border shrink-0"
                style={{ borderColor: 'var(--border)' }}
              />
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-bold truncate">
                {itemPreview.title}
              </div>
              {itemPreview.subtitle && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                  {itemPreview.subtitle}
                </div>
              )}
            </div>
            {itemPreview.badge && (
              <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 shrink-0">
                {itemPreview.badge}
              </span>
            )}
          </div>
        )}

        {/* Actions Footer */}
        <div className="mt-5 flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white transition-all shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {isLoading && (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
