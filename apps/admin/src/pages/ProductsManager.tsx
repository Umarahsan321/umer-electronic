import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Check, 
  AlertCircle,
  Filter,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { Product } from '../../../../packages/shared/src/types/index';
import { SEED_PRODUCTS } from '../../../../packages/shared/src/data/seed-products';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { ProductViewModal } from '../components/ProductViewModal';

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Modal State for View & Delete
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState('Laptops & Computers');
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formStock, setFormStock] = useState('10');
  const [formSku, setFormSku] = useState('');
  const [formWarranty, setFormWarranty] = useState('1 Year Official Local Warranty');
  const [formImage, setFormImage] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/products?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.items) {
          setProducts(data.data.items);
        } else {
          setProducts(SEED_PRODUCTS);
        }
      })
      .catch(() => {
        setProducts(SEED_PRODUCTS);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormBrand('');
    setFormCategory('Laptops & Computers');
    setFormPrice('');
    setFormOriginalPrice('');
    setFormStock('10');
    setFormSku(`UE-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormWarranty('1 Year Official Local Warranty');
    setFormImage('https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80');
    setFormShortDesc('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormPrice(p.price.toString());
    setFormOriginalPrice(p.originalPrice ? p.originalPrice.toString() : '');
    setFormStock(p.stock.toString());
    setFormSku(p.sku);
    setFormWarranty(p.warranty || '1 Year Official Local Warranty');
    setFormImage(p.imageUrl);
    setFormShortDesc(p.shortDescription || '');
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formBrand || !formPrice) return;

    const payload = {
      name: formName,
      brand: formBrand,
      category: formCategory,
      categorySlug: formCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: Number(formPrice),
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
      stock: Number(formStock),
      sku: formSku,
      warranty: formWarranty,
      imageUrl: formImage,
      shortDescription: formShortDesc,
      fullDescription: formShortDesc,
      features: ['High-performance electronic engineering', 'Solid build quality', 'Original warranty included'],
      specs: { 'Brand': formBrand, 'Category': formCategory, 'Warranty': formWarranty }
    };

    try {
      if (editingProduct) {
        // Update
        const res = await fetch(`http://localhost:5000/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          fetchProducts();
          setIsModalOpen(false);
        }
      } else {
        // Create
        const res = await fetch('http://localhost:5000/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          fetchProducts();
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error('Error saving product:', err);
      // Local fallback for offline mode
      if (editingProduct) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...payload, id: p.id, inStock: Number(formStock) > 0, rating: p.rating, reviewCount: p.reviewCount, slug: p.slug, createdAt: p.createdAt } as any : p));
      } else {
        const dummyNew: any = {
          ...payload,
          id: `prod-${Date.now()}`,
          slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          rating: 5.0,
          reviewCount: 1,
          inStock: Number(formStock) > 0,
          featured: false,
          createdAt: new Date().toISOString()
        };
        setProducts(prev => [dummyNew, ...prev]);
      }
      setIsModalOpen(false);
    }
  };

  const confirmDeleteProduct = async () => {
    if (!productToDelete) return;
    setIsDeletingProduct(true);
    try {
      await fetch(`http://localhost:5000/api/products/${productToDelete.id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend delete failed, removing locally:', err);
    }
    setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
    setIsDeletingProduct(false);
    setProductToDelete(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.brand.toLowerCase().includes(search.toLowerCase()) ||
                          p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
        {/* Search & Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', flex: 1, minWidth: '220px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '8px 14px',
            flex: 1
          }}>
            <Search size={16} color="var(--text-secondary)" />
            <input
              type="text"
              placeholder="Search by title, brand, or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                width: '100%'
              }}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem'
            }}
          >
            <option value="all">All Categories</option>
            <option value="Laptops & Computers">Laptops & Computers</option>
            <option value="Smartphones & Tablets">Smartphones & Tablets</option>
            <option value="Audio & Sound">Audio & Sound</option>
            <option value="Smart TVs & Displays">Smart TVs & Displays</option>
            <option value="Gaming & Consoles">Gaming & Consoles</option>
            <option value="Smart Home & Security">Smart Home & Security</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Wearables & Power">Wearables & Power</option>
          </select>
        </div>

        {/* Add Product Button */}
        <button
          onClick={openAddModal}
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
            fontSize: '0.85rem'
          }}
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Inventory Table (Desktop View >= 769px) */}
      <div className="admin-desktop-table" style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Product</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>Stock</th>
                <th style={{ padding: '14px 16px', fontWeight: 600 }}>SKU</th>
                <th style={{ padding: '14px 16px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '6px',
                          objectFit: 'contain',
                          backgroundColor: '#ffffff',
                          border: '1px solid var(--border-color)',
                          padding: '2px'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{product.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Brand: {product.brand}</div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                      {product.category}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ${product.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: product.stock > 10 ? 'var(--success-light)' :
                                         product.stock > 0 ? 'var(--warning-light)' : 'var(--danger-light)',
                        color: product.stock > 10 ? 'var(--success)' :
                               product.stock > 0 ? 'var(--warning)' : 'var(--danger)'
                      }}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      {product.sku}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => setViewingProduct(product)}
                          title="View Product Details"
                          style={{
                            padding: '6px',
                            backgroundColor: 'var(--bg-elevated)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--text-primary)'
                          }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => openEditModal(product)}
                          title="Edit Product"
                          style={{
                            padding: '6px',
                            backgroundColor: 'var(--bg-elevated)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--primary)'
                          }}
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => setProductToDelete(product)}
                          title="Delete Product"
                          style={{
                            padding: '6px',
                            backgroundColor: 'var(--danger-light)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '6px',
                            color: 'var(--danger)'
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No products found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card Stack View (< 768px) */}
      <div className="admin-mobile-cards">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '8px',
                    objectFit: 'contain',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-color)',
                    padding: '2px',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
                    {product.brand}
                  </div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {product.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>{product.sku}</span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{product.category}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                    ${product.price.toLocaleString()}
                  </div>
                  <span style={{
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    backgroundColor: product.stock > 10 ? 'var(--success-light)' : product.stock > 0 ? 'var(--warning-light)' : 'var(--danger-light)',
                    color: product.stock > 10 ? 'var(--success)' : product.stock > 0 ? 'var(--warning)' : 'var(--danger)'
                  }}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setViewingProduct(product)}
                    title="View Product"
                    style={{
                      padding: '8px 10px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => openEditModal(product)}
                    title="Edit Product"
                    style={{
                      padding: '8px 10px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => setProductToDelete(product)}
                    title="Delete Product"
                    style={{
                      padding: '8px 10px',
                      backgroundColor: 'var(--danger-light)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--danger)',
                      cursor: 'pointer'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            No products found matching filters.
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            width: '100%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {editingProduct ? 'Edit Product' : 'Add New Electronics Product'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Sony WH-1000XM5 Wireless Headphones"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="e.g. Sony, Apple, Samsung"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <option value="Laptops & Computers">Laptops & Computers</option>
                    <option value="Smartphones & Tablets">Smartphones & Tablets</option>
                    <option value="Audio & Sound">Audio & Sound</option>
                    <option value="Smart TVs & Displays">Smart TVs & Displays</option>
                    <option value="Gaming & Consoles">Gaming & Consoles</option>
                    <option value="Smart Home & Security">Smart Home & Security</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Wearables & Power">Wearables & Power</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Selling Price ($) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="299"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    placeholder="349"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Inventory Stock *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    placeholder="15"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Image URL
                </label>
                <input
                  type="url"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Key selling points, specifications, and device highlight..."
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-elevated)',
                    color: 'var(--text-primary)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontWeight: 600
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    backgroundColor: 'var(--primary)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    fontWeight: 700
                  }}
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product View Details Modal */}
      <ProductViewModal
        product={viewingProduct}
        isOpen={Boolean(viewingProduct)}
        onClose={() => setViewingProduct(null)}
        onEdit={(prod) => {
          setViewingProduct(null);
          openEditModal(prod);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={Boolean(productToDelete)}
        title="Delete Electronic Product"
        message={`Are you sure you want to delete "${productToDelete?.name}" from store inventory? This will permanently erase this product catalog entry.`}
        itemDetails={
          productToDelete
            ? {
                name: productToDelete.name,
                sku: productToDelete.sku,
                price: productToDelete.price,
                imageUrl: productToDelete.imageUrl,
                type: productToDelete.category
              }
            : undefined
        }
        confirmButtonText="Delete Permanently"
        isLoading={isDeletingProduct}
        onConfirm={confirmDeleteProduct}
        onClose={() => setProductToDelete(null)}
      />
    </div>
  );
};
