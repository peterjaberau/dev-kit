import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function for merging class names
 * Combines clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
