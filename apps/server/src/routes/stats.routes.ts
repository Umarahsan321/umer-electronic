import { Router, Request, Response } from 'express';
import { db } from '../db/store';

const router = Router();

// GET /api/stats (Admin analytics)
router.get('/', (_req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve stats', error });
  }
});

export default router;
