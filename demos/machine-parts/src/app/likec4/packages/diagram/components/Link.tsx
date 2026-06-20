import type { Link as LinkData } from '#likec4/core'
import { classNames } from '../utils/classNames'
import { chakra } from '@chakra-ui/react'
import { type BadgeProps, ActionIcon, Badge, CopyButton } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { forwardRef, type MouseEvent } from 'react'
import { GithubIcon } from './GithubIcon'

const GITHUB_PREFIX = 'https://github.com/'
const ChakraActionIcon = chakra(ActionIcon) as any
const ChakraBadge = chakra(Badge) as any

export const Link = forwardRef<HTMLDivElement, Omit<BadgeProps, 'children' | 'classNames'> & { value: LinkData }>(
  ({ value, className, ...props }, ref) => {
    // If the url is already a full url, use it as is.
    // Otherwise, it's a relative url and we need to make it absolute.
    const url = value.url.includes('://') ? value.url : new window.URL(value.url, window.location.href).toString()
    let isGithub = url.startsWith(GITHUB_PREFIX)

    return (
      <ChakraBadge
        ref={ref}
        variant="default"
        radius="sm"
        size="sm"
        tt="none"
        leftSection={value.title ? <>{value.title}</> : null}
        rightSection={
          <CopyButton value={url} timeout={1500}>
            {({ copy, copied }) => (
              <ChakraActionIcon
                css={{
                  opacity: copied ? 1 : 0.45,
                  transition: "fast",
                  _hover: {
                    opacity: 1,
                  },
                }}
                tabIndex={-1}
                size={"20"}
                variant={copied ? "light" : "transparent"}
                color={copied ? "teal" : "gray"}
                data-active={copied}
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  e.preventDefault()
                  copy()
                }}
              >
                {copied ? <IconCheck /> : <IconCopy stroke={2.5} />}
              </ChakraActionIcon>
            )}
          </CopyButton>
        }
        {...props}
        className={classNames(className, "group")}
        css={{
          flexWrap: "nowrap",
          minHeight: 24,
          maxWidth: 500,
          userSelect: "all",
          pr: "0",
          backgroundColor: {
            base: "transparent",
            _hover: {
              base: "mantine.colors.gray[1]",
              _dark: "mantine.colors.dark[5]",
            },
          },
          '& [data-position="left"]': {
            color: "text.dimmed",
            userSelect: "none",
            pointerEvents: "none",
          },
          '&:hover [data-position="left"]': {
            color: "[var(--badge-color)]",
            opacity: 0.7,
          },
        }}
      >
        <chakra.a
          href={url}
          target="_blank"
          style={{
            color: "var(--badge-color)",
            cursor: "pointer",
          }}
          css={{
            transition: "fast",
            opacity: {
              base: 0.7,
              _hover: 1,
            },
            textDecoration: {
              base: "none",
              _hover: "underline",
            },
          }}
        >
          {isGithub && <GithubIcon height="12" width="12" style={{ verticalAlign: "middle", marginRight: "4px" }} />}
          {isGithub ? url.replace(GITHUB_PREFIX, "") : url}
        </chakra.a>
      </ChakraBadge>
    )
  },
)
