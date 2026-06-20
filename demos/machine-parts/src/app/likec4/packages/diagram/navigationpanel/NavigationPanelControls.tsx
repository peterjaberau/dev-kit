import { extractViewTitleFromPath } from '#likec4/core/model'
import { classNames } from '../utils/classNames'
import { chakra } from '@chakra-ui/react'
import {
  UnstyledButton,
} from '@mantine/core'
import { useSelector } from '@xstate/react'
import { deepEqual } from 'fast-equals'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { type MouseEvent, memo } from 'react'
import { useEnabledFeatures } from '../context/DiagramFeatures'
import { BreadcrumbsSeparator } from './_common'
import type { NavigationPanelActorSnapshot } from './actor'
import {
  DetailsControls,
  LayoutWarning,
  LogoButton,
  NavigationButtons,
  OpenSource,
  SearchControl,
  ToggleReadonly,
} from './controls'
import { useNavigationActor } from './hooks'
import { breadcrumbTitle } from './styles.css'
import { DynamicViewControls } from './walkthrough'

const ChakraUnstyledButton = chakra(UnstyledButton) as any
const MotionDiv = chakra(m.div) as any

const selectBreadcrumbs = ({ context }: NavigationPanelActorSnapshot) => {
  const view = context.view
  const folder = context.viewModel?.folder
  return {
    folders: !folder || folder.isRoot ? [] : folder.breadcrumbs.map(s => ({
      folderPath: s.path,
      title: s.title,
    })),
    viewId: view.id,
    viewTitle: context.viewModel?.title ?? (view.title && extractViewTitleFromPath(view.title)) ?? 'Untitled View',
    isDynamicView: (context.viewModel?._type ?? view._type) === 'dynamic',
  }
}

export const NavigationPanelControls = memo(() => {
  const actor = useNavigationActor()
  const {
    enableNavigationButtons,
    enableDynamicViewWalkthrough,
    enableCompareWithLatest,
    enableSearch,
  } = useEnabledFeatures()
  const {
    folders,
    viewTitle,
    isDynamicView,
  } = useSelector(actor.actorRef, selectBreadcrumbs, deepEqual)

  const folderBreadcrumbs = folders.flatMap(({ folderPath, title }, i) => [
    <ChakraUnstyledButton
      key={folderPath}
      component={m.button}
      className={classNames(
        'mantine-active',
      )}
      css={[
        breadcrumbTitle({ dimmed: true, truncate: true }),
        {
          userSelect: 'none',
          maxWidth: '200px',
          display: {
            base: 'none',
            '@/md': 'block',
          },
        },
      ]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      title={title}
      onMouseEnter={() => actor.send({ type: 'breadcrumbs.mouseEnter.folder', folderPath })}
      onMouseLeave={() => actor.send({ type: 'breadcrumbs.mouseLeave.folder', folderPath })}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        actor.send({ type: 'breadcrumbs.click.folder', folderPath })
      }}
    >
      {title}
    </ChakraUnstyledButton>,
    <BreadcrumbsSeparator key={`separator-${i}`} />,
  ])

  const viewBreadcrumb = (
    <ChakraUnstyledButton
      key={'view-title'}
      component={m.button}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classNames(
        'mantine-active',
      )}
      css={[
        breadcrumbTitle({ truncate: true }),
        { userSelect: 'none' },
      ]}
      title={viewTitle}
      onMouseEnter={() => actor.send({ type: 'breadcrumbs.mouseEnter.viewtitle' })}
      onMouseLeave={() => actor.send({ type: 'breadcrumbs.mouseLeave.viewtitle' })}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        actor.send({ type: 'breadcrumbs.click.viewtitle' })
      }}
    >
      {viewTitle}
    </ChakraUnstyledButton>
  )

  return (
    <AnimatePresence propagate mode="popLayout">
      <LogoButton key="logo-button" />
      {enableNavigationButtons && <NavigationButtons key="nav-buttons" />}
      <MotionDiv
        key="breadcrumbs"
        layout="position"
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1',
          flexShrink: 1,
          flexGrow: 1,
          overflow: 'hidden',
        }}>
        {folderBreadcrumbs}
        {viewBreadcrumb}
      </MotionDiv>
      <MotionDiv
        key="actions"
        layout="position"
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '0.5',
          flexGrow: 0,
          _empty: {
            display: 'none',
          },
        }}>
        <DetailsControls onOpen={() => actor.closeDropdown()} />
        <OpenSource />
        <ToggleReadonly />
      </MotionDiv>
      {enableDynamicViewWalkthrough && isDynamicView && <DynamicViewControls key="dynamic-view-controls" />}
      {enableSearch && !enableCompareWithLatest && <SearchControl key="search-control" />}
      <LayoutWarning key="outdated-manual-layout-warning" />
    </AnimatePresence>
  )
})
NavigationPanelControls.displayName = 'NavigationPanelControls'
