'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  Grid3X3, 
  PackageSearch 
} from 'lucide-react';
import { Product, Category, SortOption } from '../../../../packages/shared/src/types/index';
import { SEED_PRODUCTS } from '../../../../packages/shared/src/data/seed-products';
import { SEED_CATEGORIES } from '../../../../packages/shared/src/data/seed-categories';
import { ProductCard } from '../../components/products/ProductCard';
import { FilterSidebar } from '../../components/products/FilterSidebar';
import { Pagination } from '../../components/common/Pagination';

function ProductsCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filters State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    searchParams.get('brand') ? searchParams.get('brand')!.split(',') : []
  );
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('inStock') === 'true');
  const [minRating, setMinRating] = useState(searchParams.get('minRating') ? Number(searchParams.get('minRating')) : 0);
  const [sort, setSort] = useState<SortOption>((searchParams.get('sort') as SortOption) || 'featured');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 8);

  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Fetch Categories & Brands
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) setCategories(data.data);
      })
      .catch(() => {});

    fetch('http://localhost:5000/api/products/brands')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAvailableBrands(data.data);
        } else {
          const brands = Array.from(new Set(SEED_PRODUCTS.map(p => p.brand))).sort();
          setAvailableBrands(brands);
        }
      })
      .catch(() => {
        const brands = Array.from(new Set(SEED_PRODUCTS.map(p => p.brand))).sort();
        setAvailableBrands(brands);
      });
  }, []);

  // Fetch Products with filters & pagination
  const fetchFilteredProducts = () => {
    setLoading(true);

    const query = new URLSearchParams();
    if (search.trim()) query.set('search', search.trim());
    if (selectedCategory && selectedCategory !== 'all') query.set('category', selectedCategory);
    if (selectedBrands.length > 0) query.set('brand', selectedBrands.join(','));
    if (minPrice) query.set('minPrice', minPrice);
    if (maxPrice) query.set('maxPrice', maxPrice);
    if (inStockOnly) query.set('inStock', 'true');
    if (minRating > 0) query.set('minRating', minRating.toString());
    if (sort) query.set('sort', sort);
    query.set('page', currentPage.toString());
    query.set('limit', limit.toString());

    fetch(`http://localhost:5000/api/products?${query.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProducts(data.data.items);
          setTotalItems(data.data.total);
          setTotalPages(data.data.totalPages);
        } else {
          fallbackLocalFilter();
        }
      })
      .catch(() => {
        fallbackLocalFilter();
      })
      .finally(() => setLoading(false));
  };

  // Sync URL searchParams to local state whenever searchParams changes
  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'all';
    const urlSearch = searchParams.get('search') || '';
    const urlBrand = searchParams.get('brand') ? searchParams.get('brand')!.split(',') : [];
    const urlMinPrice = searchParams.get('minPrice') || '';
    const urlMaxPrice = searchParams.get('maxPrice') || '';
    const urlInStock = searchParams.get('inStock') === 'true';
    const urlRating = searchParams.get('minRating') ? Number(searchParams.get('minRating')) : 0;
    const urlSort = (searchParams.get('sort') as SortOption) || 'featured';
    const urlPage = Number(searchParams.get('page')) || 1;

    setSelectedCategory(urlCategory);
    setSearch(urlSearch);
    setSelectedBrands(urlBrand);
    setMinPrice(urlMinPrice);
    setMaxPrice(urlMaxPrice);
    setInStockOnly(urlInStock);
    setMinRating(urlRating);
    setSort(urlSort);
    setCurrentPage(urlPage);
  }, [searchParams]);

  // Local fallback filter if server is unreachable
  const fallbackLocalFilter = () => {
    let result = [...SEED_PRODUCTS];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      const catLower = selectedCategory.toLowerCase();
      result = result.filter(p =>
        p.categorySlug.toLowerCase() === catLower ||
        p.category.toLowerCase() === catLower ||
        p.categorySlug.toLowerCase().includes(catLower) ||
        catLower.includes(p.categorySlug.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
    if (inStockOnly) result = result.filter(p => p.inStock && p.stock > 0);
    if (minRating > 0) result = result.filter(p => p.rating >= minRating);

    // Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    const total = result.length;
    const pages = Math.ceil(total / limit) || 1;
    const start = (currentPage - 1) * limit;
    const items = result.slice(start, start + limit);

    setProducts(items);
    setTotalItems(total);
    setTotalPages(pages);
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [search, selectedCategory, selectedBrands, minPrice, maxPrice, inStockOnly, minRating, sort, currentPage, limit]);

  const handleBrandToggle = (brand: string) => {
    setCurrentPage(1);
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (slug: string) => {
    setCurrentPage(1);
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('category');
    } else {
      params.set('category', slug);
    }
    params.set('page', '1');
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (min: string, max: string) => {
    setCurrentPage(1);
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleInStockToggle = () => {
    setCurrentPage(1);
    setInStockOnly(prev => !prev);
  };

  const handleRatingChange = (rating: number) => {
    setCurrentPage(1);
    setMinRating(rating);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMinPrice('');
    setMaxPrice('');
    setInStockOnly(false);
    setMinRating(0);
    setSort('featured');
    setCurrentPage(1);
    router.push('/products');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title & Breadcrumb */}
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
          Electronics Products Catalog
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--foreground-muted)' }}>
          Browse premium laptops, smartphones, 4K displays, audio gear, and gaming hardware
        </p>
      </div>

      {/* Top Filter & Sort Bar */}
      <div
        className="p-4 rounded-2xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border w-full md:max-w-md"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            borderColor: 'var(--border)'
          }}
        >
          <Search size={16} style={{ color: 'var(--foreground-muted)' }} />
          <input
            type="text"
            placeholder="Filter by keyword (e.g. OLED, M3, 240Hz, Sony)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-transparent text-sm focus:outline-none"
            style={{ color: 'var(--foreground)' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Controls: Mobile Filter Button & Sort Dropdown */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold"
            style={{
              backgroundColor: 'var(--surface-elevated)',
              borderColor: 'var(--border)',
              color: 'var(--foreground)'
            }}
          >
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} style={{ color: 'var(--foreground-muted)' }} />
            <span className="text-xs font-bold hidden sm:inline" style={{ color: 'var(--foreground-muted)' }}>
              Sort:
            </span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortOption);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold border bg-transparent"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--surface-elevated)',
                color: 'var(--foreground)'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <FilterSidebar
            categories={categories}
            availableBrands={availableBrands}
            selectedCategory={selectedCategory}
            selectedBrands={selectedBrands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            inStockOnly={inStockOnly}
            minRating={minRating}
            onCategoryChange={handleCategoryChange}
            onBrandToggle={handleBrandToggle}
            onPriceChange={handlePriceChange}
            onInStockToggle={handleInStockToggle}
            onRatingChange={handleRatingChange}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Mobile Filter Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <div className="fixed inset-0 bg-black/60" onClick={() => setMobileFilterOpen(false)} />
            <div
              className="relative z-10 w-full max-w-sm h-full overflow-y-auto p-4 flex flex-col gap-4 shadow-xl"
              style={{ backgroundColor: 'var(--surface)' }}
            >
              <div className="flex justify-between items-center pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <span className="font-extrabold text-sm" style={{ color: 'var(--foreground)' }}>Filters</span>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <FilterSidebar
                categories={categories}
                availableBrands={availableBrands}
                selectedCategory={selectedCategory}
                selectedBrands={selectedBrands}
                minPrice={minPrice}
                maxPrice={maxPrice}
                inStockOnly={inStockOnly}
                minRating={minRating}
                onCategoryChange={(cat) => { handleCategoryChange(cat); setMobileFilterOpen(false); }}
                onBrandToggle={handleBrandToggle}
                onPriceChange={handlePriceChange}
                onInStockToggle={handleInStockToggle}
                onRatingChange={(r) => { handleRatingChange(r); setMobileFilterOpen(false); }}
                onResetFilters={() => { handleResetFilters(); setMobileFilterOpen(false); }}
              />
            </div>
          </div>
        )}

        {/* Product Grid & Pagination Section */}
        <div className="lg:col-span-3 flex flex-col justify-between min-h-[500px]">
          {/* Active Filter Pills Row */}
          {(selectedCategory !== 'all' || selectedBrands.length > 0 || search || inStockOnly || minRating > 0) && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold" style={{ color: 'var(--foreground-muted)' }}>Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200">
                  Category: {selectedCategory}
                  <button onClick={() => handleCategoryChange('all')}><X size={12} /></button>
                </span>
              )}
              {selectedBrands.map(b => (
                <span key={b} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                  {b}
                  <button onClick={() => handleBrandToggle(b)}><X size={12} /></button>
                </span>
              ))}
              {search && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                  "{search}"
                  <button onClick={() => setSearch('')}><X size={12} /></button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/60 dark:text-green-200">
                  In Stock Only
                  <button onClick={handleInStockToggle}><X size={12} /></button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              className="p-12 text-center rounded-2xl border flex flex-col items-center justify-center my-8"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <PackageSearch size={48} color="var(--foreground-subtle)" className="mb-4" />
              <h3 className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                No matching electronics found
              </h3>
              <p className="text-sm mt-1 mb-6 max-w-sm" style={{ color: 'var(--foreground-muted)' }}>
                Try adjusting your search query, clearing price boundaries, or selecting all categories.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            limit={limit}
            onPageChange={(p) => {
              setCurrentPage(p);
              if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLimitChange={(l) => { setLimit(l); setCurrentPage(1); }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading electronics catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
