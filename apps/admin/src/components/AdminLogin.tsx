import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { UmerLogo } from './UmerLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Accept standard default admin credentials
    if (
      (username.trim().toLowerCase() === 'admin' && (password === 'admin123' || password === 'umer2026')) ||
      (username.trim().toLowerCase() === 'umer' && password === 'umer2026')
    ) {
      localStorage.setItem('ue_admin_auth', 'true');
      onLoginSuccess();
    } else {
      setError('Invalid admin credentials. Please check your username and password.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0F172A',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#1E293B',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Header Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
          <UmerLogo size="md" showSubtitle={true} />
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid #3B82F6',
            color: '#60A5FA',
            fontSize: '0.75rem',
            fontWeight: 800,
            marginTop: '8px'
          }}>
            <ShieldCheck size={14} />
            <span>SECURE MANAGEMENT GATEWAY</span>
          </div>
          
          <h2 style={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 800, margin: '8px 0 0 0' }}>
            Store Administrator Login
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.8rem', margin: 0 }}>
            Enter your authorized credentials to manage inventory, catalog, and orders.
          </p>
        </div>

        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #EF4444',
            color: '#FCA5A5',
            fontSize: '0.78rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
              Admin Username
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '10px',
              padding: '0 12px'
            }}>
              <User size={16} color="#64748B" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g. admin)"
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 10px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: '#CBD5E1', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
              Security Password
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '10px',
              padding: '0 12px'
            }}>
              <Lock size={16} color="#64748B" />
              <input
                type="password"
                required
                placeholder="Password (e.g. admin123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 10px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '8px',
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
          >
            <span>Authenticate & Enter</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Credentials Reminder Box */}
        <div style={{
          padding: '10px 12px',
          borderRadius: '8px',
          backgroundColor: '#0F172A',
          border: '1px solid #334155',
          fontSize: '0.72rem',
          color: '#94A3B8',
          lineHeight: '1.4'
        }}>
          <strong style={{ color: '#E2E8F0' }}>Standard Admin Credentials:</strong><br />
          Username: <code style={{ color: '#60A5FA' }}>admin</code> • Password: <code style={{ color: '#60A5FA' }}>admin123</code>
        </div>
      </div>
    </div>
  );
};
