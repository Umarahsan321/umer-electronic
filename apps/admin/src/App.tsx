import React, { useState } from 'react';
import { AdminThemeProvider } from './context/AdminThemeContext';
import { AdminSidebar, AdminTab } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { Dashboard } from './pages/Dashboard';
import { ProductsManager } from './pages/ProductsManager';
import { OrdersManager } from './pages/OrdersManager';
import { CategoriesManager } from './pages/CategoriesManager';
import { Settings } from './pages/Settings';

export const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Store Executive Overview',
      subtitle: 'Real-time performance, gross revenue, and order velocity'
    },
    products: {
      title: 'Products Inventory Catalog',
      subtitle: 'Add, update pricing, manage stock, and edit electronics specifications'
    },
    orders: {
      title: 'Orders Fulfillment & Dispatch',
      subtitle: 'Track incoming customer purchases, review delivery addresses, and change fulfillment status'
    },
    categories: {
      title: 'Electronics Product Categories',
      subtitle: 'Manage taxonomy, icons, and product counts'
    },
    settings: {
      title: 'Umer Electronics Store Settings',
      subtitle: 'Store configuration, contact information, tax, and currency settings'
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentTab} />;
      case 'products':
        return <ProductsManager />;
      case 'orders':
        return <OrdersManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader
          title={tabTitles[currentTab].title}
          subtitle={tabTitles[currentTab].subtitle}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        />
        <main style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AdminThemeProvider>
      <AppContent />
    </AdminThemeProvider>
  );
};

export default App;
