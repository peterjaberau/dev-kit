import { token } from '#atlas-ui/primitives/css';
import { chakra, Icon } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { ButtonMenuItem } from '#atlas-ui/navigation-system/app/ui/menu-item/button-menu-item';
import invariant from 'tiny-invariant';
import { LuCircleUser as PersonAvatarIcon } from "react-icons/lu";
import { useMenuItemDragAndDrop } from '#atlas-ui/navigation-system/app/entry-points/side-nav-items/drag-and-drop/use-menu-item-drag-and-drop';
import { getTopLevelItemData, isTopLevelItemData } from '../data';
import { RegistryContext } from '../registry';

export function ForYouMenuItem({
	index,
	amountOfMenuItems,
}: any) {
	const { state, draggableButtonRef, dragPreview, dropTargetRef, dropIndicator } =
		useMenuItemDragAndDrop({
			draggable: {
				getInitialData: () => getTopLevelItemData('for-you'),
				getDragPreviewPieces: () => ({
					elemBefore: <PersonAvatarIcon />,
					content: 'For you',
				}),
			},
			dropTarget: {
				getData: () => getTopLevelItemData('for-you'),
				getOperations: () => ({
					'reorder-after': 'available',
					'reorder-before': 'available',
				}),
				canDrop: ({ source }) => isTopLevelItemData(source.data),
			},
		});
	const registry = useContext(RegistryContext);

	useEffect(() => {
		const element = draggableButtonRef.current;
		invariant(element);
		return registry?.registerTopLevelItem({ item: 'for-you', element });
	}, [draggableButtonRef, registry]);

	return (
		<>
			<ButtonMenuItem
				ref={draggableButtonRef}
				isDragging={state.type === 'dragging'}
				hasDragIndicator
				dropIndicator={dropIndicator}
				visualContentRef={dropTargetRef}
				elemBefore={<PersonAvatarIcon/>}
			>
				For you
			</ButtonMenuItem>
			{dragPreview}
		</>
	);
}
