import type { ComponentType, ReactNode } from 'react';
import { token } from '#atlas-ui/primitives/css';
import { chakra } from '@chakra-ui/react';
const styles = {
  root: {
    position: 'relative',
    display: 'flex',
  },
  badgeContainer: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    insetBlockStart: token('space.negative.050'),
    insetInlineStart: token('space.150'),
    pointerEvents: 'none',
  },
};

type BadgeContainerProps = {
	id: string;
	badge: ComponentType;
	children: ReactNode;
	isListItem?: boolean;
};

export const BadgeContainer = ({
	children,
	id: badgeId,
	badge: Badge,
	isListItem = true,
}: BadgeContainerProps) => (
	<chakra.div css={styles.root} role={isListItem ? 'listitem' : undefined}>
		{children}
		<chakra.div css={styles.badgeContainer} id={badgeId} aria-hidden>
			<Badge />
		</chakra.div>
	</chakra.div>
);
