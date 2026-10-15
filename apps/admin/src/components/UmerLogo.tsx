import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const UmerLogo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 44
  };

  const textSizes = {
    sm: { title: '1.1rem', sub: '0.65rem' },
    md: { title: '1.35rem', sub: '0.75rem' },
    lg: { title: '1.75rem', sub: '0.85rem' }
  };

  const dim = iconSizes[size];

  return (
    <div className={`logo-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', userSelect: 'none' }}>
      {/* SVG Emblem: Stylized Solid 'U' with Power Spark */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Solid Outer Shield / Hexagon */}
        <polygon
          points="50,4 92,26 92,74 50,96 8,74 8,26"
          fill="#2563EB"
        />
        {/* Inner Solid Cutout creating the 'U' Channel */}
        <polygon
          points="50,16 80,32 80,68 50,84 20,68 20,32"
          fill="#0F172A"
        />
        {/* Letter 'U' & Power Circuit Trace in Crisp White */}
        <path
          d="M32 36 V62 C32 70 40 74 50 74 C60 74 68 70 68 62 V36 H58 V60 C58 63 54 65 50 65 C46 65 42 63 42 60 V36 H32 Z"
          fill="#FFFFFF"
        />
        {/* Central Power Node Bolt */}
        <polygon
          points="50,28 56,42 49,42 53,56 42,44 48,44"
          fill="#F59E0B"
        />
      </svg>

      {/* Brand Typography */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontWeight: 900,
          fontSize: textSizes[size].title,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--text-primary)'
        }}>
          <span>UMER</span>
          <span style={{ color: 'var(--primary)', fontWeight: 800 }}>TECH</span>
        </div>
        {showSubtitle && (
          <span style={{
            fontSize: textSizes[size].sub,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginTop: '2px',
            lineHeight: 1
          }}>
            Electronics
          </span>
        )}
      </div>
    </div>
  );
};
