'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors ${className}`}
      style={{
        backgroundColor: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        color: 'var(--foreground)'
      }}
    >
      {theme === 'dark' ? (
        <Sun size={19} color="#F59E0B" />
      ) : (
        <Moon size={19} color="var(--primary)" />
      )}
    </button>
  );
};
