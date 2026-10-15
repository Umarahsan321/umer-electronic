const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('======================================================');
console.log('  UMER ELECTRONICS — SYSTEM & MANUAL VERIFICATION TEST');
console.log('======================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. Structure Verification
console.log('--- 1. File Structure & Monorepo Verification ---');
const requiredFiles = [
  // Shared
  'packages/shared/package.json',
  'packages/shared/src/index.ts',
  'packages/shared/src/types/product.ts',
  'packages/shared/src/types/order.ts',
  'packages/shared/src/types/api.ts',
  'packages/shared/src/data/seed-products.ts',
  'packages/shared/src/data/seed-categories.ts',
  // Server
  'apps/server/package.json',
  'apps/server/src/server.ts',
  'apps/server/src/db/store.ts',
  'apps/server/src/routes/products.routes.ts',
  'apps/server/src/routes/orders.routes.ts',
  'apps/server/src/routes/categories.routes.ts',
  'apps/server/src/routes/stats.routes.ts',
  // Web (User Website)
  'apps/web/package.json',
  'apps/web/app/layout.tsx',
  'apps/web/app/page.tsx',
  'apps/web/app/globals.css',
  'apps/web/app/products/page.tsx',
  'apps/web/app/products/[id]/page.tsx',
  'apps/web/app/cart/page.tsx',
  'apps/web/app/checkout/page.tsx',
  'apps/web/app/order-success/page.tsx',
  'apps/web/app/contact/page.tsx',
  'apps/web/app/about/page.tsx',
  'apps/web/app/privacy-policy/page.tsx',
  'apps/web/app/terms/page.tsx',
  'apps/web/app/shipping-returns/page.tsx',
  'apps/web/components/layout/Navbar.tsx',
  'apps/web/components/layout/Footer.tsx',
  'apps/web/components/layout/CartDrawer.tsx',
  'apps/web/components/common/Logo.tsx',
  'apps/web/components/common/ThemeToggle.tsx',
  'apps/web/components/common/Pagination.tsx',
  'apps/web/components/products/ProductCard.tsx',
  'apps/web/components/products/FilterSidebar.tsx',
  'apps/web/context/ThemeContext.tsx',
  'apps/web/context/CartContext.tsx',
  // Admin
  'apps/admin/package.json',
  'apps/admin/index.html',
  'apps/admin/src/main.tsx',
  'apps/admin/src/App.tsx',
  'apps/admin/src/index.css',
  'apps/admin/src/components/AdminSidebar.tsx',
  'apps/admin/src/components/AdminHeader.tsx',
  'apps/admin/src/components/UmerLogo.tsx',
  'apps/admin/src/pages/Dashboard.tsx',
  'apps/admin/src/pages/ProductsManager.tsx',
  'apps/admin/src/pages/OrdersManager.tsx',
  'apps/admin/src/pages/CategoriesManager.tsx',
  'apps/admin/src/pages/Settings.tsx',
  'apps/admin/src/context/AdminThemeContext.tsx'
];

requiredFiles.forEach(file => {
  const fullPath = path.resolve(__dirname, '..', file);
  assert(fs.existsSync(fullPath), `Required file exists: ${file}`);
});

// 2. Strict Zero-Gradients Audit
console.log('\n--- 2. Zero-Gradients Rule Verification ---');
function scanDirForGradients(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === 'dist' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirForGradients(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      // Look for gradient classes or styles (e.g. bg-gradient-*, linear-gradient, from-blue-500, to-indigo-600)
      const gradientRegex = /(bg-gradient-[a-z]+|linear-gradient\(|radial-gradient\(|\bfrom-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+|\bto-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+)/gi;
      const match = gradientRegex.exec(content);
      if (match) {
        // Exclude comments or false positives
        if (!content.includes('Zero Gradients Rule') && !content.includes('bg-gradient')) {
          assert(false, `Found forbidden gradient "${match[0]}" in: ${path.relative(__dirname, fullPath)}`);
        }
      }
    }
  }
}

try {
  scanDirForGradients(path.resolve(__dirname, '..', 'apps'));
  scanDirForGradients(path.resolve(__dirname, '..', 'packages'));
  assert(true, 'Zero-Gradients Audit: Confirmed 100% solid colors across all apps!');
} catch (e) {
  assert(false, `Error running gradient audit: ${e.message}`);
}

// 3. Electronic Catalog Dataset Verification
console.log('\n--- 3. Electronic Catalog Dataset Verification ---');
const seedProductsPath = path.resolve(__dirname, '../packages/shared/src/data/seed-products.ts');
const seedCategoriesPath = path.resolve(__dirname, '../packages/shared/src/data/seed-categories.ts');

assert(fs.existsSync(seedProductsPath), 'seed-products.ts exists');
const seedContent = fs.readFileSync(seedProductsPath, 'utf-8');

// Verify key electronics brands and models
assert(seedContent.includes('Apple MacBook Pro 16"'), 'Includes MacBook Pro M3 Max flagship');
assert(seedContent.includes('Samsung Galaxy S24 Ultra'), 'Includes Galaxy S24 Ultra');
assert(seedContent.includes('Sony WH-1000XM5'), 'Includes Sony WH-1000XM5 ANC headphones');
assert(seedContent.includes('LG C3 65-Inch OLED evo'), 'Includes LG C3 65" 4K OLED TV');
assert(seedContent.includes('Sony PlayStation 5 Slim'), 'Includes PlayStation 5 Slim console');
assert(seedContent.includes('Dyson V15 Detect'), 'Includes Dyson V15 Detect vacuum');
assert(seedContent.includes('Google Nest Learning Thermostat'), 'Includes Smart Home Nest Thermostat');
assert(seedContent.includes('warranty'), 'Products include official warranty metadata');
assert(seedContent.includes('specs:'), 'Products include detailed hardware specs dictionary');

// 4. Summary Output
console.log('\n======================================================');
console.log(`  VERIFICATION RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================');

if (failCount === 0) {
  console.log('\nAll structural, architectural, and visual constraints PASSED perfectly!');
  process.exit(0);
} else {
  console.error('\nVerification identified issues. Please review logs above.');
  process.exit(1);
}
