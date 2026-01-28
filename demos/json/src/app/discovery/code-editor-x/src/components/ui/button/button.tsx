"use client"
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../../lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'rounded-md text-sm font-medium',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]',
    'disabled:pointer-events-none disabled:opacity-50',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[var(--color-primary-600)] text-white',
          'hover:bg-[var(--color-primary-700)]',
          'active:bg-[var(--color-primary-800)]',
        ],
        secondary: [
          'bg-[var(--interactive-normal)] text-[var(--text-primary)]',
          'hover:bg-[var(--interactive-hover)]',
          'active:bg-[var(--interactive-active)]',
        ],
        outline: [
          'border border-[var(--border-default)] bg-transparent text-[var(--text-secondary)]',
          'hover:bg-[var(--interactive-hover)] hover:text-[var(--text-primary)]',
          'active:bg-[var(--interactive-active)]',
        ],
        ghost: [
          'bg-transparent text-[var(--text-secondary)]',
          'hover:bg-[var(--interactive-hover)] hover:text-[var(--text-primary)]',
          'active:bg-[var(--interactive-active)]',
        ],
        accent: [
          'bg-[var(--color-accent-500)] text-white',
          'hover:bg-[var(--color-accent-600)]',
          'active:bg-[var(--color-accent-700)]',
        ],
        destructive: [
          'bg-[var(--color-error-600)] text-white',
          'hover:bg-[var(--color-error-700)]',
          'active:bg-[var(--color-error-700)]',
        ],
        link: [
          'bg-transparent text-[var(--color-primary-500)] underline-offset-4',
          'hover:underline',
        ],
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-7 px-2.5 text-xs',
        md: 'h-8 px-3 text-sm',
        lg: 'h-9 px-4 text-sm',
        xl: 'h-10 px-5 text-base',
        icon: 'h-8 w-8',
        'icon-sm': 'h-7 w-7',
        'icon-xs': 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
