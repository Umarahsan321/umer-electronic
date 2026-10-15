import fs from 'fs';
import path from 'path';
import { Product, Category, Order, OrderStatus, ProductFilterParams, PaginatedResponse, DashboardStats } from '../../../../packages/shared/src/types/index';
import { SEED_PRODUCTS } from '../../../../packages/shared/src/data/seed-products';
import { SEED_CATEGORIES } from '../../../../packages/shared/src/data/seed-categories';

const DB_FILE = path.resolve(__dirname, 'data.json');

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: Order[];
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'UE-2026-1001',
    customer: {
      fullName: 'Kamran Tariq',
      email: 'kamran.tariq@gmail.com',
      phone: '+92 300 1234567',
      address: 'House 42, Street 10, Sector F-7/2',
      city: 'Islamabad',
      postalCode: '44000',
      notes: 'Call before delivery please'
    },
    items: [
      {
        productId: 'prod-lap-01',
        name: 'Apple MacBook Pro 16" (M3 Max, 36GB Unified Memory, 1TB SSD)',
        brand: 'Apple',
        price: 3499,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
        sku: 'APL-MBP16-M3M-36G'
      }
    ],
    subtotal: 3499,
    shippingFee: 0,
    tax: 175,
    discount: 0,
    total: 3674,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'processing',
    createdAt: '2026-02-14T09:30:00Z',
    updatedAt: '2026-02-14T09:35:00Z'
  },
  {
    id: 'ord-1002',
    orderNumber: 'UE-2026-1002',
    customer: {
      fullName: 'Ayesha Malik',
      email: 'ayesha.malik@outlook.com',
      phone: '+92 321 9876543',
      address: 'Flat 304, Al-Madina Heights, Gulberg III',
      city: 'Lahore',
      postalCode: '54000'
    },
    items: [
      {
        productId: 'prod-aud-01',
        name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Silver)',
        brand: 'Sony',
        price: 398,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        sku: 'SNY-WH1000XM5-SLV'
      },
      {
        productId: 'prod-wer-02',
        name: 'Anker Prime 20,000mAh Power Bank (200W Output, Smart Digital Display)',
        brand: 'Anker',
        price: 129,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1609592426507-28565a95610d?auto=format&fit=crop&w=800&q=80',
        sku: 'ANK-PRM-20K-200W'
      }
    ],
    subtotal: 527,
    shippingFee: 0,
    tax: 26,
    discount: 20,
    total: 533,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'shipped',
    createdAt: '2026-02-13T14:15:00Z',
    updatedAt: '2026-02-14T11:00:00Z'
  },
  {
    id: 'ord-1003',
    orderNumber: 'UE-2026-1003',
    customer: {
      fullName: 'Bilal Farooq',
      email: 'bilal.farooq@yahoo.com',
      phone: '+92 333 4567890',
      address: 'B-12 Clifton Block 5',
      city: 'Karachi',
      postalCode: '75600'
    },
    items: [
      {
        productId: 'prod-gam-01',
        name: 'Sony PlayStation 5 Slim Console (1TB SSD, DualSense Controller)',
        brand: 'Sony',
        price: 499,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
        sku: 'SNY-PS5-SLM-1TB'
      }
    ],
    subtotal: 499,
    shippingFee: 0,
    tax: 25,
    discount: 0,
    total: 524,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: '2026-02-11T16:45:00Z',
    updatedAt: '2026-02-13T10:00:00Z'
  }
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      }
    } catch (error) {
      console.error('Error reading db/data.json, creating new database:', error);
    }

    const initialData: DatabaseSchema = {
      products: SEED_PRODUCTS,
      categories: SEED_CATEGORIES,
      orders: INITIAL_ORDERS
    };
    this.saveData(initialData);
    return initialData;
  }

  private saveData(dataToSave: DatabaseSchema = this.data): void {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (error) {
      console.error('Failed to save to db/data.json:', error);
    }
  }

  // --- Products ---
  public getProducts(params: ProductFilterParams): PaginatedResponse<Product> {
    let result = [...this.data.products];

    // Search query
    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q)) ||
        Object.entries(p.specs).some(([k, v]) => k.toLowerCase().includes(q) || v.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (params.category && params.category !== 'all') {
      const cat = params.category.toLowerCase();
      result = result.filter(p => 
        p.categorySlug.toLowerCase() === cat || 
        p.category.toLowerCase() === cat ||
        p.categorySlug.toLowerCase().includes(cat) ||
        cat.includes(p.categorySlug.toLowerCase())
      );
    }

    // Brand filter (supports comma-separated multiple brands)
    if (params.brand && params.brand !== 'all') {
      const brands = params.brand.toLowerCase().split(',').map(b => b.trim());
      result = result.filter(p => brands.includes(p.brand.toLowerCase()));
    }

    // Price range
    if (params.minPrice !== undefined && !isNaN(params.minPrice)) {
      result = result.filter(p => p.price >= params.minPrice!);
    }
    if (params.maxPrice !== undefined && !isNaN(params.maxPrice)) {
      result = result.filter(p => p.price <= params.maxPrice!);
    }

    // In Stock
    if (params.inStock === true) {
      result = result.filter(p => p.inStock && p.stock > 0);
    }

    // Min Rating
    if (params.minRating !== undefined && !isNaN(params.minRating)) {
      result = result.filter(p => p.rating >= params.minRating!);
    }

    // Sorting
    switch (params.sort) {
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
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    // Pagination
    const page = Math.max(1, Number(params.page) || 1);
    const limit = Math.max(1, Number(params.limit) || 8);
    const total = result.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const items = result.slice(startIndex, startIndex + limit);

    return {
      items,
      total,
      page,
      totalPages,
      limit,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id || p.slug === id);
  }

  public createProduct(item: Omit<Product, 'id' | 'createdAt'>): Product {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...item,
      id,
      slug: item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      createdAt: new Date().toISOString()
    };
    this.data.products.unshift(newProduct);
    this.saveData();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | undefined {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    this.data.products[index] = {
      ...this.data.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.products[index];
  }

  public deleteProduct(id: string): boolean {
    const initialLength = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    if (this.data.products.length !== initialLength) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Categories ---
  public getCategories(): Category[] {
    // dynamically sync product counts
    return this.data.categories.map(cat => ({
      ...cat,
      productCount: this.data.products.filter(p => p.categorySlug === cat.slug).length
    }));
  }

  public getBrands(): string[] {
    const brandsSet = new Set<string>();
    this.data.products.forEach(p => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }

  // --- Orders ---
  public getOrders(): Order[] {
    return [...this.data.orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id === id || o.orderNumber === id);
  }

  public createOrder(orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Order {
    const count = this.data.orders.length + 1001;
    const orderNumber = `UE-2026-${count}`;
    const id = `ord-${Date.now()}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderInput,
      id,
      orderNumber,
      createdAt: now,
      updatedAt: now
    };

    // Deduct stock for ordered items
    for (const item of newOrder.items) {
      const prod = this.data.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
        prod.inStock = prod.stock > 0;
      }
    }

    this.data.orders.unshift(newOrder);
    this.saveData();
    return newOrder;
  }

  public updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
    const order = this.data.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return undefined;

    order.orderStatus = status;
    order.updatedAt = new Date().toISOString();
    this.saveData();
    return order;
  }

  // --- Dashboard Analytics ---
  public getStats(): DashboardStats {
    const totalRevenue = this.data.orders
      .filter(o => o.orderStatus !== 'cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const totalOrders = this.data.orders.length;
    const totalProducts = this.data.products.length;
    const lowStockCount = this.data.products.filter(p => p.stock < 10).length;

    const recentOrders = this.getOrders().slice(0, 5);

    const categoryBreakdown = this.getCategories().map(c => ({
      name: c.name,
      count: c.productCount
    }));

    const statusCounts: Record<string, number> = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    this.data.orders.forEach(o => {
      if (statusCounts[o.orderStatus] !== undefined) {
        statusCounts[o.orderStatus]++;
      }
    });

    const orderStatusCounts = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));

    return {
      totalRevenue,
      totalOrders,
      totalProducts,
      lowStockCount,
      recentOrders,
      categoryBreakdown,
      orderStatusCounts
    };
  }
}

export const db = new Database();
