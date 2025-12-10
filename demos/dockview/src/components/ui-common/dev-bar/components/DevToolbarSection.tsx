"use client"

import { typography } from "../constants"
import { ReactNode } from "react"
export const DevToolbarSection: React.FC<{
  title?: string;
  children: ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}> = ({ title, children, className = '', theme = 'dark' }) => {
  const effectiveTheme = theme; // Direct use since these are simple utility components
  return (
    <div style={{ marginBottom: '8px' }} className={className}>
      {title && (
        <div style={{
          ...typography.sectionTitle,
          marginBottom: '4px',
          color: effectiveTheme === 'light' ? '#6b7280' : '#9ca3af'
        }}>
          {title}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {children}
      </div>
    </div>
  );
};
