import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit3, Trash2, Tag, Box } from 'lucide-react';
import { Category } from '../../../../packages/shared/src/types/index';
import { SEED_CATEGORIES } from '../../../../packages/shared/src/data/seed-categories';
import { CategoryModal } from '../components/CategoryModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

export const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = () => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCategories(data.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (catData: Partial<Category>) => {
    if (editingCategory) {
      // Update local state
      setCategories(prev =>
        prev.map(c =>
          c.id === editingCategory.id
            ? { ...c, ...catData }
            : c
        )
      );
    } else {
      // Create new category
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name: catData.name || 'New Category',
        slug: catData.slug || 'new-category',
        icon: catData.icon || 'Layers',
        description: catData.description || '',
        productCount: 0,
        bannerImage: catData.bannerImage
      };
      setCategories(prev => [...prev, newCat]);
    }
    setIsCategoryModalOpen(false);
  };

  const confirmDeleteCategory = () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);
    // Remove locally
    setCategories(prev => prev.filter(c => c.id !== categoryToDelete.id));
    setIsDeleting(false);
    setCategoryToDelete(null);
  };

  return (
    <div style={{ padding: '16px 16px 32px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        backgroundColor: 'var(--bg-surface)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid var(--border-color)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Electronics Categories ({categories.length})
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
            Manage catalog classifications, taxonomy, and associated counts
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}>
                  <Layers size={22} />
                </div>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  border: '1px solid var(--border-color)'
                }}>
                  {cat.productCount} Products
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                {cat.name}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                {cat.description || 'Electronic equipment and gadgets classification.'}
              </p>
            </div>

            <div>
              <div style={{
                paddingTop: '10px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginBottom: '12px'
              }}>
                Slug: <code>{cat.slug}</code>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleOpenEdit(cat)}
                  title="Edit Category"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    color: 'var(--primary)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryToDelete(cat)}
                  title="Delete Category"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--danger-light)',
                    color: 'var(--danger)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        category={editingCategory}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />

      {/* Delete Category Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(categoryToDelete)}
        title="Delete Category"
        message={`Are you sure you want to delete the category "${categoryToDelete?.name}"? Items linked to this category may require re-classification.`}
        itemDetails={
          categoryToDelete
            ? {
                name: categoryToDelete.name,
                type: `${categoryToDelete.productCount} Linked Products`,
                sku: categoryToDelete.slug
              }
            : undefined
        }
        confirmButtonText="Delete Category"
        isLoading={isDeleting}
        onConfirm={confirmDeleteCategory}
        onClose={() => setCategoryToDelete(null)}
      />
    </div>
  );
};
