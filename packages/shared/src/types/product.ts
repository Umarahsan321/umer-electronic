export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  featured: boolean;
  isHotDeal?: boolean;
  sku: string;
  warranty: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  features: string[];
  specs: ProductSpecs;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  productCount: number;
  bannerImage?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}
