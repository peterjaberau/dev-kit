import { classNames } from '../utils/classNames'
import { navigationLink } from '#likec4/style-preset/recipes'
import { type NavLinkProps, NavLink } from '@mantine/core'
import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

export interface NavigationLinkProps
  extends Omit<NavLinkProps, 'classNames'>, Omit<ComponentPropsWithoutRef<'button'>, keyof NavLinkProps>
{
  truncateLabel?: boolean
}

export const NavigationLink = forwardRef<HTMLButtonElement, NavigationLinkProps>((
  { className, truncateLabel = true, ...others },
  ref,
) => (
  <NavLink
    {...others}
    component="button"
    classNames={navigationLink({
      truncateLabel,
    })}
    className={classNames(
      'group',
      'mantine-active',
      className,
    )}
    ref={ref}
  />
))

NavigationLink.displayName = 'NavigationLink'
