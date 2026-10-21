import React, { useEffect } from 'react';
import { X, Star, ShieldCheck, Tag, Package, Check, Layers, Edit3 } from 'lucide-react';
import { Product } from '../../../../packages/shared/src/types/index';

interface ProductViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (product: Product) => void;
}

export const ProductViewModal: React.FC<ProductViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onEdit
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

  if (!isOpen || !product) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
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
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 22px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-elevated)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 800,
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)'
              }}
            >
              {product.brand}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              {product.sku}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '22px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Showcase Top */}
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                flexShrink: 0
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '220px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                {product.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Star size={15} fill="#f59e0b" />
                  <span>{product.rating}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviewCount} reviews)</span>
                </div>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{product.category}</span>
              </div>

              {/* Price & Stock Badges */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)' }}>
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span
                  style={{
                    marginLeft: '8px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: product.stock > 0 ? 'var(--success-light)' : 'var(--danger-light)',
                    color: product.stock > 0 ? 'var(--success)' : 'var(--danger)'
                  }}
                >
                  {product.stock > 0 ? `${product.stock} Units in Stock` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {product.shortDescription}
            </div>
          )}

          {/* Warranty & Badges */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <ShieldCheck size={20} color="var(--primary)" />
            <div style={{ fontSize: '0.82rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Official Warranty: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>{product.warranty || '1 Year Official Local Warranty'}</span>
            </div>
          </div>

          {/* Specs Grid */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                Technical Specifications
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '8px',
                  backgroundColor: 'var(--bg-elevated)',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)'
                }}
              >
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} style={{ fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{key}: </span>
                    <strong style={{ color: 'var(--text-primary)' }}>{String(val)}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Key Features
              </h4>
              <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {product.features.map((feat, idx) => (
                  <li key={idx} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '14px 22px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-elevated)'
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onEdit(product);
            }}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Edit3 size={15} />
            <span>Edit Product</span>
          </button>
        </div>
      </div>
    </div>
  );
};
