
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ExpandableMenuItem } from "#adaptive-menu/expandable-menu-item"
import { ExpandableMenuItemTrigger } from "#adaptive-menu/expandable-menu-item-trigger"
import { ExpandableMenuItemContent } from "#adaptive-menu/expandable-menu-item-content"
import invariant from 'tiny-invariant';

import { IconButton, Icon } from '@chakra-ui/react';
import { AddIcon } from "../icons"

import { ProjectIcon } from "../icons"

import { useMenuItemDragAndDrop } from "#adaptive-menu/drag-and-drop/use-menu-item-drag-and-drop"
// import {
// 	ExpandableMenuItem,
// 	ExpandableMenuItemContent,
// 	ExpandableMenuItemTrigger,
// } from '@atlaskit/navigation-system/side-nav-items/expandable-menu-item';

import { getTopLevelItemData, isTopLevelItemData, type TProject } from '../data';
import { RegistryContext } from '../registry';

import { ProjectGroup } from './project';

export function ProjectsMenuItem({
	projects,
	index,
	amountOfMenuItems,
}: {
	projects: { starred: TProject[]; recent: TProject[] };
	index: number;
	amountOfMenuItems: number;
}) {
	const [isExpanded, setIsExpanded] = useState<boolean>(true);
	const wasExpandedWhenDragStartedRef = useRef<boolean | null>(null);
	const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } =
		useMenuItemDragAndDrop({
			draggable: {
				getInitialData: () => getTopLevelItemData('projects'),
				getDragPreviewPieces: () => ({
					elemBefore: <Icon size={'xs'}><ProjectIcon/></Icon>,
					content: 'Projects',
				}),
			},
			dropTarget: {
				getData: () => getTopLevelItemData('projects'),
				getOperations: () => ({
					'reorder-after': 'available',
					'reorder-before': 'available',
				}),
				canDrop: ({ source }: any) => isTopLevelItemData(source.data),
			},
		});

	useEffect(() => {
		if (state.type === 'dragging') {
			setIsExpanded((current) => {
				// capture current state
				wasExpandedWhenDragStartedRef.current = current;
				// close when drag is starting
				return false;
			});
		}

		if (state.type === 'idle' && typeof wasExpandedWhenDragStartedRef.current === 'boolean') {
			setIsExpanded(wasExpandedWhenDragStartedRef.current);
			wasExpandedWhenDragStartedRef.current = null;
		}
	}, [state.type]);

	// register element
	const registry = useContext(RegistryContext);
	useEffect(() => {
		const element = draggableButtonRef.current;
		invariant(element);
		registry?.registerTopLevelItem({ item: 'projects', element });
	}, [registry, draggableButtonRef]);

	return (
    <>
      <ExpandableMenuItem
        isExpanded={isExpanded}
        onExpansionToggle={() => setIsExpanded((value) => !value)}
        ref={dropTargetRef}
        dropIndicator={dropIndicator}
      >
        <ExpandableMenuItemTrigger
          ref={draggableButtonRef}
          isDragging={state.type === "dragging"}
          hasDragIndicator
          elemBefore={<Icon size={'xs'}><ProjectIcon  /></Icon>}
          actionsOnHover={
            <>
              <IconButton size="xs" variant="plain">
                <AddIcon />
              </IconButton>
            </>
          }
        >
          Projects
        </ExpandableMenuItemTrigger>
        <ExpandableMenuItemContent>
          <ProjectGroup name="starred" projects={projects.starred} />
          <ProjectGroup name="recent" projects={projects.recent} />
        </ExpandableMenuItemContent>
      </ExpandableMenuItem>
      {dragPreview}
    </>
  )
}
