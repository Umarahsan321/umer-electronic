import React, { useState, useEffect } from 'react';
import { Layers, Plus, ExternalLink } from 'lucide-react';
import { Category } from '../../../../packages/shared/src/types/index';
import { SEED_CATEGORIES } from '../../../../packages/shared/src/data/seed-categories';

export const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCategories(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface)',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Electronics Categories ({categories.length})
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Manage catalog classifications and product counts
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary)'
              }}>
                <Layers size={20} />
              </div>
              <span style={{
                padding: '4px 10px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-elevated)',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: '1px solid var(--border-color)'
              }}>
                {cat.productCount} Products
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {cat.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {cat.description}
              </p>
            </div>

            <div style={{
              paddingTop: '10px',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              Slug: <code>{cat.slug}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
