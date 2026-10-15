'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 30,
    md: 40,
    lg: 52
  };

  const textSizes = {
    sm: { title: '1.15rem', sub: '0.65rem' },
    md: { title: '1.45rem', sub: '0.75rem' },
    lg: { title: '1.9rem', sub: '0.85rem' }
  };

  const dim = iconSizes[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 select-none no-underline ${className}`}
      style={{ textDecoration: 'none' }}
    >
      {/* SVG Solid Emblem: Stylized Electric U Shield */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Solid Outer Shield */}
        <polygon
          points="50,4 92,26 92,74 50,96 8,74 8,26"
          fill="var(--primary)"
        />
        {/* Inner Solid Cutout */}
        <polygon
          points="50,16 80,32 80,68 50,84 20,68 20,32"
          fill="var(--background)"
        />
        {/* Letter 'U' Silhouette */}
        <path
          d="M32 36 V62 C32 70 40 74 50 74 C60 74 68 70 68 62 V36 H58 V60 C58 63 54 65 50 65 C46 65 42 63 42 60 V36 H32 Z"
          fill="var(--foreground)"
        />
        {/* Central Electric Power Bolt (Solid Amber) */}
        <polygon
          points="50,28 56,42 49,42 53,56 42,44 48,44"
          fill="#F59E0B"
        />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div
          style={{
            fontSize: textSizes[size].title,
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--foreground)'
          }}
          className="flex items-center gap-1"
        >
          <span>UMER</span>
          <span style={{ color: 'var(--primary)', fontWeight: 800 }}>ELECTRONICS</span>
        </div>
        {showSubtitle && (
          <span
            style={{
              fontSize: textSizes[size].sub,
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--foreground-muted)',
              lineHeight: 1,
              marginTop: '2px'
            }}
          >
            Smart Tech & Home
          </span>
        )}
      </div>
    </Link>
  );
};
