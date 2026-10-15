import { Router, Request, Response } from 'express';
import { db } from '../db/store';

const router = Router();

// GET /api/categories
router.get('/', (_req: Request, res: Response) => {
  try {
    const categories = db.getCategories();
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve categories', error });
  }
});

export default router;
