import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRoutes from './routes/products.routes';
import categoriesRoutes from './routes/categories.routes';
import ordersRoutes from './routes/orders.routes';
import statsRoutes from './routes/stats.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for web and admin
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Umer Electronics REST API',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/stats', statsRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`[Umer Electronics Server] REST API running at http://localhost:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[Umer Electronics Server] Port ${PORT} is already in use.`);
    } else {
      console.error('[Umer Electronics Server] Server startup error:', err);
    }
  });
}

export default app;
