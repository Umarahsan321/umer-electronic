'use client';

import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ProductImageLightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  altText: string;
  productName?: string;
  onClose: () => void;
}

export const ProductImageLightboxModal: React.FC<ProductImageLightboxModalProps> = ({
  isOpen,
  imageUrl,
  altText,
  productName,
  onClose
}) => {
  const [zoomScale, setZoomScale] = useState(1);

  useEffect(() => {
    setZoomScale(1);
  }, [isOpen, imageUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoomScale(z => Math.min(2.5, z + 0.25));
      if (e.key === '-') setZoomScale(z => Math.max(0.75, z - 0.25));
      if (e.key === '0') setZoomScale(1);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 text-white bg-linear-to-b from-black/80 to-transparent">
        <div className="min-w-0 pr-4">
          {productName && (
            <h3 className="text-sm sm:text-base font-bold truncate text-slate-100">
              {productName}
            </h3>
          )}
          <span className="text-[11px] text-slate-400">High-Resolution Image Showcase</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Out */}
          <button
            type="button"
            onClick={() => setZoomScale(z => Math.max(0.75, z - 0.25))}
            disabled={zoomScale <= 0.75}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-40 cursor-pointer"
            title="Zoom Out (-)"
            aria-label="Zoom Out"
          >
            <ZoomOut size={18} />
          </button>

          {/* Scale Display / Reset */}
          <button
            type="button"
            onClick={() => setZoomScale(1)}
            className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-colors cursor-pointer"
            title="Reset Zoom (0)"
          >
            {Math.round(zoomScale * 100)}%
          </button>

          {/* Zoom In */}
          <button
            type="button"
            onClick={() => setZoomScale(z => Math.min(2.5, z + 0.25))}
            disabled={zoomScale >= 2.5}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-40 cursor-pointer"
            title="Zoom In (+)"
            aria-label="Zoom In"
          >
            <ZoomIn size={18} />
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-red-600 text-white transition-colors ml-2 cursor-pointer"
            title="Close (Esc)"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Image Container */}
      <div
        className="w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-hidden cursor-zoom-out"
        onClick={onClose}
      >
        <div
          className="relative max-w-full max-h-full flex items-center justify-center transition-transform duration-200 ease-out"
          style={{ transform: `scale(${zoomScale})` }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={altText}
            className="max-h-[80vh] max-w-[90vw] object-contain drop-shadow-2xl rounded-xl select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] text-slate-400 bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs pointer-events-none">
        Click anywhere outside or press ESC to close
      </div>
    </div>
  );
};
