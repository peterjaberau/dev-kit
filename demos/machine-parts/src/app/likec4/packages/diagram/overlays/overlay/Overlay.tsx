import { classNames } from '../../utils/classNames'
import { overlay } from '#likec4/style-preset/recipes'
import { chakra, type SystemStyleObject, useSlotRecipe } from '@chakra-ui/react'
import {
  RemoveScroll,
} from '@mantine/core'
import { useFocusTrap, useMergedRef } from '@mantine/hooks'
import { useTimeoutEffect } from '@react-hookz/web'
import { type TargetAndTransition, m, useIsPresent, useReducedMotionConfig } from 'motion/react'
import {
  type PropsWithChildren,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { stopPropagation } from '../../utils'

const backdropBlur = '--_blur'
const backdropOpacity = '--_opacity'
const cssVarLevel = '--_level'
const MotionDialog = chakra(m.dialog)
const Body = chakra('div')

export type OverlayProps = PropsWithChildren<{
  fullscreen?: boolean | undefined
  withBackdrop?: boolean | undefined
  overlayLevel?: number
  className?: string
  classes?: {
    dialog?: string
    body?: string
  }
  styles?: {
    dialog?: SystemStyleObject
    body?: SystemStyleObject
  }
  backdrop?: {
    opacity?: number
  }
  /**
   * Delay before showing the overlay content (in milliseconds) - helps to avoid flickering
   * Default: `130ms`
   * If set to `0`, the content will be shown immediately
   */
  openDelay?: number
  /**
   * Called when the overlay is closed by outside click or escape key
   */
  onClose: () => void
  onClick?: never
}>

export const Overlay = forwardRef<HTMLDialogElement, OverlayProps>(({
  onClose,
  className,
  classes,
  styles: styleOverrides,
  overlayLevel = 0,
  children,
  fullscreen = false,
  withBackdrop = true,
  backdrop,
  openDelay = 130,
  ...rest
}, ref) => {
  // Initial state is false, will be set to true in useLayoutEffect if openDelay is 0
  const [opened, setOpened] = useState(false)
  const focusTrapRef = useFocusTrap(opened)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const onCloseRef = useRef<OverlayProps['onClose']>(null)

  const motionNotReduced = useReducedMotionConfig() !== true

  /**
   * Close the overlay and call the onClose callback
   */
  const cancelMe = () => {
    onCloseRef.current = onClose
    dialogRef.current?.close()
  }

  const isPresent = useIsPresent()

  useEffect(() => {
    if (isPresent) {
      return
    }
    if (dialogRef.current?.open) {
      // Clear the onClose callback to prevent it from being called
      // when the dialog is closed by the presence animation
      onCloseRef.current = null
      dialogRef.current.close()
    }
  }, [isPresent])

  useLayoutEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) {
      dialog.showModal()
    }
    // If openDelay is 0, open immediately
    if (openDelay === 0) {
      setOpened(true)
    }
  }, [])

  useTimeoutEffect(() => {
    setOpened(true)
  }, openDelay > 0 ? openDelay : undefined)

  const overlayRecipe = useSlotRecipe({ recipe: overlay })
  const overlayStyles = overlayRecipe({
    fullscreen,
    withBackdrop,
  })

  let targetBackdropOpacity = overlayLevel > 0 ? '50%' : '60%'
  if (backdrop?.opacity !== undefined) {
    targetBackdropOpacity = `${backdrop.opacity * 100}%`
  }

  const motionProps = useMemo(() => ({
    initial: {
      [backdropBlur]: '1px',
      [backdropOpacity]: '10%',
      scale: 0.95,
      opacity: 0,
    },
    animate: {
      [backdropBlur]: overlayLevel > 0 ? '4px' : '8px',
      [backdropOpacity]: targetBackdropOpacity,
      scale: 1,
      opacity: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      [backdropBlur]: '0px',
      [backdropOpacity]: '0%',
    },
  } satisfies Record<string, TargetAndTransition>), [overlayLevel, targetBackdropOpacity])

  return (
    <MotionDialog
      ref={useMergedRef(
        dialogRef,
        focusTrapRef,
        ref,
      )}
      className={classNames(
        classes?.dialog,
        className,
        fullscreen && RemoveScroll.classNames.fullWidth,
      )}
      css={[overlayStyles.dialog, styleOverrides?.dialog]}
      layout
      style={{
        // @ts-ignore
        [cssVarLevel]: overlayLevel,
      }}
      {...motionNotReduced ? motionProps : {
        initial: {
          [backdropBlur]: '8px',
          [backdropOpacity]: targetBackdropOpacity,
        },
      }}
      onDoubleClick={stopPropagation}
      onPointerDown={stopPropagation}
      {...rest}
      onClick={e => {
        e.stopPropagation()
        // Click on dialog backdrop (not the content) should close the overlay
        if (e.target === e.currentTarget) {
          cancelMe()
        }
      }}
      onCancel={e => {
        // ESC key press - close the overlay
        e.preventDefault()
        e.stopPropagation()
        cancelMe()
      }}
      onClose={() => {
        onCloseRef.current?.()
      }}
    >
      <RemoveScroll forwardProps>
        <Body
          className={classNames(
            classes?.body,
            'likec4-overlay-body',
          )}
          css={[overlayStyles.body, styleOverrides?.body]}>
          {opened && <>{children}</>}
        </Body>
      </RemoveScroll>
    </MotionDialog>
  )
})
Overlay.displayName = 'Overlay'
