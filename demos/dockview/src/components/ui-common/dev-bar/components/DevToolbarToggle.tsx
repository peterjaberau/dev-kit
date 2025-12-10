"use client"
import { typography } from "../constants"
export const DevToolbarToggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  theme?: 'light' | 'dark';
}> = ({ checked, onChange, label, className = '', theme = 'dark' }) => {
  const effectiveTheme = theme;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      ...typography.info
    }} className={className}>
      {label && (
        <span style={{ color: effectiveTheme === 'light' ? '#6b7280' : '#9ca3af', flex: 1 }}>{label}</span>
      )}
      <button
        onClick={() => onChange(!checked)}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          height: '20px',
          width: '36px',
          borderRadius: '9999px',
          backgroundColor: checked ? '#3b82f6' : '#4b5563',
          transition: 'background-color 0.2s',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            height: '14px',
            width: '14px',
            borderRadius: '50%',
            backgroundColor: 'white',
            transition: 'transform 0.2s',
            transform: checked ? 'translateX(18px)' : 'translateX(3px)',
          }}
        />
      </button>
    </div>
  );
};
