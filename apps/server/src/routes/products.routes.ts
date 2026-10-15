import { Router, Request, Response } from 'express';
import { db } from '../db/store';
import { ProductFilterParams, SortOption } from '../../../../packages/shared/src/types/index';

const router = Router();

// GET /api/products (filter, search, sort, pagination)
router.get('/', (req: Request, res: Response) => {
  try {
    const filters: ProductFilterParams = {
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      category: typeof req.query.category === 'string' ? req.query.category : undefined,
      brand: typeof req.query.brand === 'string' ? req.query.brand : undefined,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      inStock: req.query.inStock === 'true' ? true : undefined,
      minRating: req.query.minRating ? Number(req.query.minRating) : undefined,
      sort: typeof req.query.sort === 'string' ? (req.query.sort as SortOption) : undefined,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 8
    };

    const result = db.getProducts(filters);
    const availableBrands = db.getBrands();

    res.json({
      success: true,
      data: result,
      meta: {
        availableBrands
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve products', error });
  }
});

// GET /api/products/brands
router.get('/brands', (_req: Request, res: Response) => {
  try {
    const brands = db.getBrands();
    res.json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get brands', error });
  }
});

// GET /api/products/:id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving product', error });
  }
});

// POST /api/products (Admin)
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, brand, category, categorySlug, price, originalPrice, stock, sku, shortDescription, fullDescription, imageUrl, features, specs, warranty } = req.body;
    
    if (!name || !price || !category || !brand) {
      return res.status(400).json({ success: false, message: 'Name, price, category, and brand are required' });
    }

    const newProduct = db.createProduct({
      name,
      slug: req.body.slug,
      brand,
      category,
      categorySlug: categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercentage: originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
      stock: Number(stock) || 0,
      inStock: (Number(stock) || 0) > 0,
      rating: 5.0,
      reviewCount: 0,
      featured: Boolean(req.body.featured),
      isHotDeal: Boolean(req.body.isHotDeal),
      sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
      warranty: warranty || '1 Year Official Warranty',
      shortDescription: shortDescription || '',
      fullDescription: fullDescription || '',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
      features: Array.isArray(features) ? features : [],
      specs: specs || {}
    });

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create product', error });
  }
});

// PUT /api/products/:id (Admin)
router.put('/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update product', error });
  }
});

// DELETE /api/products/:id (Admin)
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product', error });
  }
});

export default router;
