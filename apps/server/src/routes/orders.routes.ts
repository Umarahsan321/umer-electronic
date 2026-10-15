import { Router, Request, Response } from 'express';
import { db } from '../db/store';
import { OrderStatus } from '../../../../packages/shared/src/types/index';

const router = Router();

// GET /api/orders (Admin: view all orders)
router.get('/', (_req: Request, res: Response) => {
  try {
    const orders = db.getOrders();
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve orders', error });
  }
});

// GET /api/orders/:id
router.get('/:id', (req: Request, res: Response) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve order', error });
  }
});

// POST /api/orders (Customer checkout)
router.post('/', (req: Request, res: Response) => {
  try {
    const { customer, items, subtotal, shippingFee, tax, discount, total, paymentMethod } = req.body;

    if (!customer || !items || !items.length || !total) {
      return res.status(400).json({ success: false, message: 'Customer, items, and total are required' });
    }

    const order = db.createOrder({
      customer,
      items,
      subtotal: Number(subtotal),
      shippingFee: Number(shippingFee) || 0,
      tax: Number(tax) || 0,
      discount: Number(discount) || 0,
      total: Number(total),
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'pending'
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create order', error });
  }
});

// PUT /api/orders/:id/status (Admin: update status)
router.put('/:id/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const validStatuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const updated = db.updateOrderStatus(req.params.id, status as OrderStatus);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update order status', error });
  }
});

export default router;
