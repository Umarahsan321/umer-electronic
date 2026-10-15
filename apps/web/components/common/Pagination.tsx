'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onPageChange,
  onLimitChange,
  className = ''
}) => {
  if (totalPages <= 1 && totalItems <= limit) return null;

  const startItem = Math.min((currentPage - 1) * limit + 1, totalItems);
  const endItem = Math.min(currentPage * limit, totalItems);

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border mt-8 ${className}`}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
    >
      {/* Items Count and Limit Selector */}
      <div className="flex items-center gap-3 text-xs sm:text-sm" style={{ color: 'var(--foreground-muted)' }}>
        <span>
          Showing <strong style={{ color: 'var(--foreground)' }}>{startItem}–{endItem}</strong> of{' '}
          <strong style={{ color: 'var(--foreground)' }}>{totalItems}</strong> products
        </span>

        {onLimitChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-xs">Per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="px-2 py-1 rounded-md text-xs border bg-transparent"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--foreground)'
              }}
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
              <option value={24}>24</option>
            </select>
          </div>
        )}
      </div>

      {/* Page Navigation Buttons */}
      <div className="flex items-center gap-1.5">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)'
          }}
          title="First Page"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)'
          }}
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Number Buttons */}
        {getPageNumbers().map((item, idx) => {
          if (item === '...') {
            return (
              <span
                key={`dots-${idx}`}
                className="px-2 py-1 text-sm font-semibold"
                style={{ color: 'var(--foreground-muted)' }}
              >
                ...
              </span>
            );
          }

          const pageNum = Number(item);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className="w-9 h-9 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-colors border"
              style={{
                backgroundColor: isActive ? 'var(--primary)' : 'var(--surface-elevated)',
                borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                color: isActive ? '#FFFFFF' : 'var(--foreground)'
              }}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)'
          }}
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            borderColor: 'var(--border)',
            color: 'var(--foreground)'
          }}
          title="Last Page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
};
