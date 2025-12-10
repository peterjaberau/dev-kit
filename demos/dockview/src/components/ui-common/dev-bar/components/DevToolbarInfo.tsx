"use client"
import { typography } from "../constants"
export const DevToolbarInfo: React.FC<{
  label: string;
  value: string | number | boolean;
  className?: string;
  theme?: 'light' | 'dark';
}> = ({ label, value, className = '', theme = 'dark' }) => {
  const effectiveTheme = theme;
  return (
    <div style={{
      ...typography.info,
      color: effectiveTheme === 'light' ? '#374151' : '#e5e7eb'
    }} className={className}>
      <span style={{ color: effectiveTheme === 'light' ? '#6b7280' : '#9ca3af' }}>{label}:</span> {String(value)}
    </div>
  );
};
