"use client"
import { ReactNode, useState } from "react"
import { typography  } from "../constants"

export const DevToolbarButton: React.FC<{
  onClick: () => void;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
  size?: 'sm' | 'xs';
  children: ReactNode;
  className?: string;
}> = ({ onClick, variant = 'default', size = 'xs', children, className = '' }) => {
  const getVariantStyles = (variant: string) => {
    const styles: Record<string, React.CSSProperties> = {
      default: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: '1px solid rgba(118, 75, 162, 0.3)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      primary: {
        background: 'linear-gradient(135deg, #667eea 0%, #4c6ef5 100%)',
        border: '1px solid rgba(76, 110, 245, 0.3)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      success: {
        background: 'linear-gradient(135deg, #56ab2f 0%, #10b981 100%)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      warning: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        border: '1px solid rgba(245, 87, 108, 0.3)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      danger: {
        background: 'linear-gradient(135deg, #fa709a 0%, #f5576c 100%)',
        border: '1px solid rgba(245, 87, 108, 0.3)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    };
    return styles[variant] || styles.default;
  };

  const baseStyles: any = getVariantStyles(variant);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        ...typography.button[size],
        ...baseStyles,
        borderRadius: '6px',
        color: 'white',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        padding: size === 'xs' ? '4px 10px' : '6px 14px',
        transition: 'all 0.1s ease',
        opacity: isPressed ? 0.9 : isHovered ? 0.95 : 1,
        filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
        boxShadow: isPressed
          ? 'inset 0 2px 4px rgba(0, 0, 0, 0.15)'
          : isHovered
            ? '0 4px 8px rgba(0, 0, 0, 0.15)'
            : baseStyles.boxShadow,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {children}
    </button>
  );
};
