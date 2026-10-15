import { Product } from './product';
import { Order } from './order';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'name' | 'featured';

export interface ProductFilterParams {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  minRating?: number;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  lowStockCount: number;
  recentOrders: Order[];
  categoryBreakdown: { name: string; count: number }[];
  orderStatusCounts: { status: string; count: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
