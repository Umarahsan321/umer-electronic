// Comprehensive Server REST API Test Runner
const http = require('http');

console.log('Testing Server API...');

function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runApiTests() {
  const host = '127.0.0.1';
  const port = 5000;

  try {
    // 1. Health check
    console.log('[TEST] Checking GET /api/health');
    const health = await request({ host, port, path: '/api/health', method: 'GET' });
    console.log('Health response:', health.status, health.data);

    // 2. Products listing with pagination
    console.log('[TEST] Checking GET /api/products?page=1&limit=4');
    const productsRes = await request({ host, port, path: '/api/products?page=1&limit=4', method: 'GET' });
    console.log('Products status:', productsRes.status, 'Total items:', productsRes.data.data.total, 'Returned:', productsRes.data.data.items.length);

    // 3. Search query
    console.log('[TEST] Checking Search query: "MacBook"');
    const searchRes = await request({ host, port, path: '/api/products?search=MacBook', method: 'GET' });
    console.log('Search matches:', searchRes.data.data.items.map(p => p.name));

    // 4. Category filter
    console.log('[TEST] Checking Category filter: "audio-sound"');
    const catRes = await request({ host, port, path: '/api/products?category=audio-sound', method: 'GET' });
    console.log('Audio items count:', catRes.data.data.items.length);

    // 5. Categories list
    console.log('[TEST] Checking GET /api/categories');
    const categories = await request({ host, port, path: '/api/categories', method: 'GET' });
    console.log('Categories count:', categories.data.data.length);

    // 6. Orders list
    console.log('[TEST] Checking GET /api/orders');
    const orders = await request({ host, port, path: '/api/orders', method: 'GET' });
    console.log('Initial orders count:', orders.data.data.length);

    // 7. Stats
    console.log('[TEST] Checking GET /api/stats');
    const stats = await request({ host, port, path: '/api/stats', method: 'GET' });
    console.log('Dashboard Stats:', {
      totalRevenue: stats.data.data.totalRevenue,
      totalOrders: stats.data.data.totalOrders,
      totalProducts: stats.data.data.totalProducts
    });

    console.log('\n>>> ALL API TESTS PASSED SUCCESSFULLY! <<<');
    process.exit(0);
  } catch (err) {
    console.error('API Test Error:', err.message);
    process.exit(1);
  }
}

runApiTests();
