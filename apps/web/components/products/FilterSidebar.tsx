'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Star } from 'lucide-react';
import { Category } from '../../../../packages/shared/src/types/index';

interface FilterSidebarProps {
  categories: Category[];
  availableBrands: string[];
  selectedCategory: string;
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  inStockOnly: boolean;
  minRating: number;
  onCategoryChange: (catSlug: string) => void;
  onBrandToggle: (brand: string) => void;
  onPriceChange: (min: string, max: string) => void;
  onInStockToggle: () => void;
  onRatingChange: (rating: number) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  availableBrands,
  selectedCategory,
  selectedBrands,
  minPrice,
  maxPrice,
  inStockOnly,
  minRating,
  onCategoryChange,
  onBrandToggle,
  onPriceChange,
  onInStockToggle,
  onRatingChange,
  onResetFilters
}) => {
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrands.length > 0 ||
    minPrice !== '' ||
    maxPrice !== '' ||
    inStockOnly ||
    minRating > 0;

  return (
    <div
      className="p-5 rounded-2xl border flex flex-col gap-6"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} color="var(--primary)" />
          <h3 className="font-extrabold text-base" style={{ color: 'var(--foreground)' }}>
            Filter Products
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
          Categories
        </label>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-between border ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            style={{
              color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--foreground)'
            }}
          >
            <span>All Categories</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-between border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                style={{
                  color: isSelected ? '#FFFFFF' : 'var(--foreground)'
                }}
              >
                <span className="truncate">{cat.name}</span>
                {cat.productCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-blue-800 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cat.productCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <label className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
          Price Range ($)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ($)"
            value={minPrice}
            onChange={(e) => onPriceChange(e.target.value, maxPrice)}
            className="w-full px-3 py-2 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--foreground)'
            }}
          />
          <input
            type="number"
            placeholder="Max ($)"
            value={maxPrice}
            onChange={(e) => onPriceChange(minPrice, e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--surface-elevated)',
              color: 'var(--foreground)'
            }}
          />
        </div>
      </div>

      {/* Brands Multi-Select */}
      {availableBrands.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <label className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
            Brands ({availableBrands.length})
          </label>
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const isChecked = selectedBrands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2.5 text-xs font-semibold cursor-pointer py-1 px-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  style={{ color: 'var(--foreground)' }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onBrandToggle(brand)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Availability (In-Stock Only) */}
      <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <label
          className="flex items-center gap-2.5 text-xs font-bold cursor-pointer"
          style={{ color: 'var(--foreground)' }}
        >
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={onInStockToggle}
            className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Minimum Rating */}
      <div className="flex flex-col gap-2 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <label className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
          Customer Rating
        </label>
        <div className="flex flex-col gap-1">
          {[4.5, 4.0, 3.0].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(minRating === star ? 0 : star)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                minRating === star ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600' : 'border-transparent'
              }`}
              style={{ color: 'var(--foreground)' }}
            >
              <div className="flex items-center text-amber-500">
                <Star size={13} fill="#F59E0B" color="#F59E0B" />
              </div>
              <span>{star}★ & above</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
