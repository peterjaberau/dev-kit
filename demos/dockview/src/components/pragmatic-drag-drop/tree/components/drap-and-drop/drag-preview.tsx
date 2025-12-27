import { type ReactNode } from 'react';
import { css } from '@emotion/css';
import { chakra } from '@chakra-ui/react';

import { ExpandableMenuItemLevelContext } from '../expandable-menu-item/expandable-menu-item-level-context';
import { MenuItemBase } from '../menu-item';
import { COLLAPSE_ELEM_BEFORE } from '../menu-item-signals';

const dragPreviewStyles = css({
	root: {
		borderWidth: '1px',
		borderColor: '#0B120E24',
		borderStyle: 'solid',
		backgroundColor: '#FFFFFF',
		borderRadius: '4px',
		paddingInlineEnd: '4px',
		// maxWidth: 260,
	},
	rootT26Shape: {
		borderRadius: '6px',
	},

	safariFix: {
		// minWidth: 200,
	},
});

export function DragPreview({
	elemBefore,
	children,
}: {
	elemBefore?: ReactNode;
	children: ReactNode;
}) {
	return (
		<ExpandableMenuItemLevelContext.Provider value={0}>
			<div
				css={[
					dragPreviewStyles.root,
					fg('platform-dst-shape-theme-default') && dragPreviewStyles.rootT26Shape,
					isSafari() && dragPreviewStyles.safariFix,
				]}
			>
				{/* For drag previews, we can collapse if there is no elemBefore as we don't
			need to worry about vertical alignment with other elements */}
				<MenuItemBase elemBefore={elemBefore ?? COLLAPSE_ELEM_BEFORE}>{children}</MenuItemBase>
			</div>
		</ExpandableMenuItemLevelContext.Provider>
	);
}
