import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Layers, 
  Settings as SettingsIcon, 
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react';
import { UmerLogo } from './UmerLogo';

export type AdminTab = 'dashboard' | 'products' | 'orders' | 'categories' | 'settings';

interface SidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as AdminTab, label: 'Products Catalog', icon: Package },
    { id: 'orders' as AdminTab, label: 'Customer Orders', icon: ShoppingBag },
    { id: 'categories' as AdminTab, label: 'Categories', icon: Layers },
    { id: 'settings' as AdminTab, label: 'Store Settings', icon: SettingsIcon },
  ];

  const handleSelect = (tab: AdminTab) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div style={{
        padding: '20px 16px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <UmerLogo size="sm" showSubtitle={true} />
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="admin-mobile-only"
            style={{
              padding: '6px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Admin Badge */}
      <div style={{
        padding: '10px 14px',
        margin: '12px 14px',
        backgroundColor: 'var(--bg-elevated)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        border: '1px solid var(--border-color)'
      }}>
        <ShieldCheck size={16} color="var(--primary)" />
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>Admin Control Panel</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Umer Electronics Core</div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.88rem',
                textAlign: 'left',
                width: '100%',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* External Link to Customer Storefront */}
      <div style={{ padding: '14px', borderTop: '1px solid var(--border-color)' }}>
        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '9px 12px',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            border: '1px solid var(--border-color)'
          }}
        >
          <ExternalLink size={15} />
          <span>View Customer Store</span>
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* 1. Desktop Static Sidebar */}
      <aside
        className="admin-sidebar-desktop"
        style={{
          width: '260px',
          backgroundColor: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          flexShrink: 0
        }}
      >
        {sidebarContent}
      </aside>

      {/* 2. Mobile Off-Canvas Drawer */}
      {isMobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex' }}>
          {/* Backdrop Overlay */}
          <div
            onClick={onCloseMobile}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(2px)'
            }}
          />

          {/* Drawer Panel */}
          <aside
            style={{
              position: 'relative',
              zIndex: 101,
              width: '270px',
              maxWidth: '85vw',
              height: '100vh',
              backgroundColor: 'var(--bg-surface)',
              borderRight: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.3)'
            }}
          >
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
