import React from 'react';
import { Sun, Moon, Bell, CheckCircle2 } from 'lucide-react';
import { useAdminTheme } from '../context/AdminThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const AdminHeader: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { theme, toggleTheme } = useAdminTheme();

  return (
    <header style={{
      padding: '16px 28px',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div>
        <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Backend Status Pill */}
        <div style={{
          display: 'flex',
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

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
        >
          {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="var(--primary)" />}
        </button>

        {/* User Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 12px',
          backgroundColor: 'var(--bg-elevated)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.8rem'
          }}>
            UE
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Super Admin
          </div>
        </div>
      </div>
    </header>
  );
};
