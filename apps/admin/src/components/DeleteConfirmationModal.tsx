import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  itemDetails?: {
    name: string;
    type?: string;
    sku?: string;
    imageUrl?: string;
    price?: number;
  };
  confirmButtonText?: string;
  cancelButtonText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  itemDetails,
  confirmButtonText = 'Delete Permanently',
  cancelButtonText = 'Cancel',
  isLoading = false,
  onConfirm,
  onClose
}) => {
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '6px'
          }}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header Icon + Title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--danger-light)',
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Trash2 size={24} />
          </div>
          <div style={{ paddingRight: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
              {message}
            </p>
          </div>
        </div>

        {/* Optional Item Details Card */}
        {itemDetails && (
          <div
            style={{
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '12px',
              margin: '16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {itemDetails.imageUrl && (
              <img
                src={itemDetails.imageUrl}
                alt={itemDetails.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  objectFit: 'contain',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  flexShrink: 0,
                  padding: '2px'
                }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {itemDetails.name}
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {itemDetails.sku && <span>SKU: <strong>{itemDetails.sku}</strong></span>}
                {itemDetails.price !== undefined && <span>Price: <strong>${itemDetails.price.toLocaleString()}</strong></span>}
                {itemDetails.type && <span>Type: <strong>{itemDetails.type}</strong></span>}
              </div>
            </div>
          </div>
        )}

        {/* Warning Callout */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.76rem',
            color: 'var(--danger)',
            backgroundColor: 'var(--danger-light)',
            padding: '8px 12px',
            borderRadius: '8px',
            marginTop: '8px',
            marginBottom: '20px'
          }}
        >
          <AlertTriangle size={15} style={{ flexShrink: 0 }} />
          <span>Warning: This action is permanent and cannot be undone.</span>
        </div>

        {/* Footer Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {cancelButtonText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--danger)',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            <Trash2 size={16} />
            <span>{isLoading ? 'Deleting...' : confirmButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
