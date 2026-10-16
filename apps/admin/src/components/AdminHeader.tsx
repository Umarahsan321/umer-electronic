import React from 'react';
import { Sun, Moon, CheckCircle2, Menu } from 'lucide-react';
import { useAdminTheme } from '../context/AdminThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onToggleMobileSidebar: () => void;
}

export const AdminHeader: React.FC<HeaderProps> = ({ title, subtitle, onToggleMobileSidebar }) => {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <header style={{
      padding: '12px 18px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="admin-mobile-only"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            flexShrink: 0
          }}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
        </button>

        <div style={{ minWidth: 0 }}>
          <h1 style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {title}
          </h1>
          {subtitle && (
            <p className="admin-desktop-only" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {/* Backend Status Pill */}
        <div className="admin-desktop-only" style={{
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          <CheckCircle2 size={14} color="var(--success)" />
          <span>Server Active: Port 5000</span>
        </div>

        {/* Mobile compact server indicator */}
        <div className="admin-mobile-only" title="Server Active" style={{
          alignItems: 'center',
          padding: '6px',
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: '50%',
          border: '1px solid var(--border-color)'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? <Sun size={17} color="#F59E0B" /> : <Moon size={17} color="var(--primary)" />}
        </button>

        {/* User Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '5px 10px',
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem'
          }}>
            UE
          </div>
          <div className="admin-desktop-only" style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Super Admin
          </div>
        </div>
      </div>
    </header>
  );
};
