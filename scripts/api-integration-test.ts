process.env.NODE_ENV = 'test';

import app from '../apps/server/src/server';
import { db } from '../apps/server/src/db/store';

console.log('======================================================');
console.log('  UMER ELECTRONICS — LIVE SYSTEM & API VERIFICATION TEST');
console.log('======================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

function callApi(method: string, url: string, body?: any): Promise<{ status: number; body: any }> {
  return new Promise((resolve) => {
    const { EventEmitter } = require('events');
    const req: any = new EventEmitter();
    req.method = method;
    req.url = url;
    req.headers = { 'content-type': 'application/json' };
    req.body = body || {};
    req.query = {};
    req.params = {};

    // Parse query params if any
    if (url.includes('?')) {
      const qs = url.split('?')[1];
      const searchParams = new URLSearchParams(qs);
      searchParams.forEach((v, k) => {
        req.query[k] = v;
      });
      req.url = url.split('?')[0];
    }

    const res: any = new EventEmitter();
    let resStatus = 200;

    res.status = (code: number) => {
      resStatus = code;
      return res;
    };
    res.json = (data: any) => {
      resolve({ status: resStatus, body: data });
      return res;
    };
    res.send = (data: any) => {
      resolve({ status: resStatus, body: data });
      return res;
    };
    res.setHeader = () => res;
    res.getHeader = () => undefined;

    app.handle(req, res, (err: any) => {
      if (err) {
        resolve({ status: 500, body: err });
      } else {
        resolve({ status: 404, body: { success: false, message: 'Not found' } });
      }
    });
  });
}

async function runTests() {
  console.log('--- 1. Health Endpoint ---');
  const health = await callApi('GET', '/api/health');
  assert(health.status === 200, 'GET /api/health returns 200 OK');
  assert(health.body.status === 'ok', 'Health status is "ok"');
  assert(health.body.service.includes('Umer Electronics'), 'Service identity contains "Umer Electronics"');

  console.log('\n--- 2. Database Store Verification ---');
  const products = db.getProducts({ page: 1, limit: 10 });
  assert(products.items.length > 0, `Store contains ${products.items.length} products`);
  assert(products.total >= 20, `Catalog contains at least 20 flagship devices (Found: ${products.total})`);

  const categories = db.getCategories();
  assert(categories.length >= 8, `Store contains ${categories.length} categories`);

  console.log('\n--- 3. Categories API Endpoint ---');
  const catRes = await callApi('GET', '/api/categories');
  assert(catRes.status === 200, 'GET /api/categories returns 200 OK');
  assert(catRes.body.success === true, 'Categories API returns success: true');
  assert(Array.isArray(catRes.body.data), 'Categories data is an array');

  console.log('\n--- 4. Products API & Specification Lookups ---');
  const prodRes = await callApi('GET', '/api/products?limit=5');
  assert(prodRes.status === 200, 'GET /api/products returns 200 OK');
  assert(prodRes.body.data.items.length === 5, 'Pagination limit=5 verified');
  assert(prodRes.body.meta.availableBrands.includes('Apple'), 'Apple brand indexed in metadata');
  assert(prodRes.body.meta.availableBrands.includes('Sony'), 'Sony brand indexed in metadata');

  const singleProd = await callApi('GET', '/api/products/prod-lap-01');
  assert(singleProd.status === 200, 'GET /api/products/prod-lap-01 returns 200 OK');
  assert(singleProd.body.data.name.includes('MacBook Pro'), 'MacBook Pro retrieved by ID');
  assert(singleProd.body.data.specs['Processor'].includes('M3 Max'), 'Processor specification matches M3 Max');

  console.log('\n--- 5. Customer Reviews System ---');
  const reviewsRes = await callApi('GET', '/api/products/prod-lap-01/reviews');
  assert(reviewsRes.status === 200, 'GET /api/products/:id/reviews returns 200 OK');
  assert(Array.isArray(reviewsRes.body.data), 'Returns reviews list array');
  const initialReviewCount = reviewsRes.body.data.length;

  const postRevRes = await callApi('POST', '/api/products/prod-lap-01/reviews', {
    userName: 'Khurram Shehzad (Rawalpindi)',
    rating: 5,
    title: 'Flawless M3 Max Performance',
    comment: 'Authentic sealed packaging with official local warranty check. Arrived safely in 24 hours.'
  });
  assert(postRevRes.status === 201, 'POST /api/products/:id/reviews returns 201 Created');
  assert(postRevRes.body.data.userName === 'Khurram Shehzad (Rawalpindi)', 'New review saved with reviewer name');

  const afterRevRes = await callApi('GET', '/api/products/prod-lap-01/reviews');
  assert(afterRevRes.body.data.length === initialReviewCount + 1, 'Review count incremented dynamically');

  console.log('\n--- 6. Orders Creation & Checkout API ---');
  const orderRes = await callApi('POST', '/api/orders', {
    customer: {
      fullName: 'Ahmad Raza',
      email: 'ahmad.raza@gmail.com',
      phone: '+92 312 3456789',
      address: 'House 88, Street 15, Sector F-10/2',
      city: 'Islamabad',
      postalCode: '44000',
      notes: 'Call on arrival'
    },
    items: [
      {
        productId: 'prod-lap-01',
        name: 'Apple MacBook Pro 16"',
        brand: 'Apple',
        price: 3499,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        sku: 'APL-MBP16-M3M-36G'
      }
    ],
    subtotal: 3499,
    shippingFee: 0,
    tax: 175,
    discount: 0,
    total: 3674,
    paymentMethod: 'cod'
  });

  assert(orderRes.status === 201, 'POST /api/orders returns 201 Created');
  assert(Boolean(orderRes.body.data.orderNumber), `Order reference generated: ${orderRes.body.data.orderNumber}`);
  const createdOrderNum = orderRes.body.data.orderNumber;

  console.log('\n--- 7. Real-Time Order Tracking Pipeline ---');
  const trackRes = await callApi('GET', `/api/orders/track/${createdOrderNum}`);
  assert(trackRes.status === 200, `GET /api/orders/track/${createdOrderNum} returns 200 OK`);
  assert(trackRes.body.data.orderNumber === createdOrderNum, 'Tracked order matches order number');
  assert(trackRes.body.data.steps.length === 5, 'Visual tracking pipeline contains 5 milestone stages');
  assert(trackRes.body.data.steps[0].title === 'Order Placed', 'Milestone 1 is "Order Placed"');
  assert(trackRes.body.data.steps[0].status === 'completed', 'Milestone 1 status is completed');
  assert(trackRes.body.data.customerCity === 'Islamabad', 'Customer city verified in tracking payload');

  console.log('\n--- 8. Store Executive Analytics & Stats ---');
  const statsRes = await callApi('GET', '/api/stats');
  assert(statsRes.status === 200, 'GET /api/stats returns 200 OK');
  assert(statsRes.body.data.totalOrders > 0, `Total store orders recorded: ${statsRes.body.data.totalOrders}`);
  assert(statsRes.body.data.totalRevenue > 0, `Gross store revenue recorded: $${statsRes.body.data.totalRevenue}`);
  assert(statsRes.body.data.totalProducts >= 20, `Catalog items recorded: ${statsRes.body.data.totalProducts}`);

  console.log('\n======================================================');
  console.log(`  VERIFICATION RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log('======================================================\n');

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('All backend, API routes, tracking pipeline, and reviews PASSED perfectly!');
    process.exit(0);
  }
}

runTests();
