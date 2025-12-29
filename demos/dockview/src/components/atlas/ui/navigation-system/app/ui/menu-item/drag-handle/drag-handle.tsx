import { token } from '#atlas-ui/primitives/css';
import { chakra, Icon } from '@chakra-ui/react';
import { LuGripVertical as DragHandleVerticalIcon } from 'react-icons/lu'

const styles = {
  root: {
    color: token('color.text.subtle'),
    // `--drag-handle-display` is set in `menu-item`.
    // We _could_ pull the variable out into a seperate file
    // (doing so does seem to work with react)
    // But doing so a styling standard violation 🤷‍♂️
    display: `var(--drag-handle-display, none)`,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    insetBlockStart: 0,
    insetBlockEnd: 0,
    insetInlineStart: 0,
    // pull backwards outside of the bounds of the element
    marginInlineStart: token('space.negative.150'),

    // Note: we are not using `pointer-events:none` as it's important that the
    // drag handle be a draggable target, even if it's outside the bounds
    // of the full width element
  },
};

// Using default export to play well with React.lazy
export default function DragHandle() {
	return (
		<chakra.div css={styles.root} aria-hidden="true">
      <Icon size={'xs'}>
        <DragHandleVerticalIcon />
      </Icon>

		</chakra.div>
	);
}
