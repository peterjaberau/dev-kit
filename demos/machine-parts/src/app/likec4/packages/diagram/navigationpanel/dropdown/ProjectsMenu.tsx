import { Box, chakra, HStack } from "@chakra-ui/react"
import { Button, Menu, MenuDropdown, MenuItem, MenuTarget } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { memo } from 'react'
import type { LikeC4ProjectsContext } from '../../context/LikeC4ProjectsContext'
import { useLikeC4ProjectId, useLikeC4ProjectsContext } from '../../hooks/useLikeC4Project'

const ChakraButton = chakra(Button) as any

export const ProjectsMenu = memo(_ => {
  const { projects, onProjectChange } = useLikeC4ProjectsContext()
  if (projects.length <= 1) {
    return null
  }

  return <WithProjectsMenu projects={projects} onProjectChange={onProjectChange} />
})

function WithProjectsMenu({
  projects,
  onProjectChange,
}: LikeC4ProjectsContext) {
  const projectId = useLikeC4ProjectId()
  return (
    <HStack gap="0.5" alignItems="baseline">
      <Box
        css={{
          fontWeight: 'normal',
          fontSize: 'xxs',
          color: 'likec4.panel.text.dimmed',
          userSelect: 'none',
        }}>
        Project
      </Box>
      <Menu
        withinPortal={false} // if we render menu in portal, NavigationPanelDropdown receives onMouseLeave event
        shadow="md"
        position="bottom-start"
        offset={{ mainAxis: 2 }}>
        <MenuTarget>
          <ChakraButton
            tabIndex={-1}
            autoFocus={false}
            variant="subtle"
            size="compact-xs"
            color="gray"
            css={{
              fontWeight: 'normal',
              fontSize: 'xxs',
              height: 'auto',
              lineHeight: 1.1,
              color: {
                _light: 'mantine.colors.gray[9]',
              },
            }}
            styles={{
              section: {
                '&:is([data-position="right"])': {
                  marginInlineStart: 'var(--spacing-1)',
                },
              },
            }}
            rightSection={<IconChevronDown opacity={0.5} size={12} stroke={1.5} />}>
            {projectId}
          </ChakraButton>
        </MenuTarget>

        <MenuDropdown>
          {projects.map(({ id, title }) => (
            <MenuItem
              key={id}
              onClick={(e) => {
                if (projectId === id) {
                  e.stopPropagation()
                  return
                }
                onProjectChange(id)
              }}>
              {title ?? id}
            </MenuItem>
          ))}
        </MenuDropdown>
      </Menu>
    </HStack>
  )
}
