
import { Fragment } from 'react';
import { chakra } from '@chakra-ui/react';

import { contentHeightWhenFixed, contentInsetBlockStart } from '../constants';
import { useLayoutId } from '../id-utils';
import type { CommonSlotProps } from '../types';

const mainElementStyles = {
  root: {
    gridArea: "main",
    isolation: "isolate",
    // This sets the sticky point to be just below top bar + banner. It's needed to ensure the stick
    // point is exactly where this element is rendered to with no wiggle room. Unfortunately the CSS
    // spec for sticky doesn't support "stick to where I'm initially rendered" so we need to tell it.
    insetBlockStart: contentInsetBlockStart,
    overflow: "auto",
    "@media (min-width: 64rem)": {
      isolation: "auto",
      // Height is set so it takes up all of the available viewport space minus top bar + banner.
      // This is only set on larger viewports meaning stickiness only occurs on them.
      // On small viewports it is not sticky.
      height: contentHeightWhenFixed,
      position: "sticky",
    },
  },
}

/**
 * Use the Main area for the main page content. It has a fluid width and will expand to fill available space.
 */
export function Main({
	children,
	testId,
  css,
	id: providedId,
}: CommonSlotProps & {
	/**
	 * The content of the layout area.
	 * This is where you should put the main content of your page.
	 */
	children: React.ReactNode;
	/**
	 * Bounded style overrides.
	 */
  css?: any;
}) {
	const id = useLayoutId({ providedId });


	return (
    <Fragment>
      <chakra.div
        id={id}
        data-layout-slot
        role="main"
        css={{
          ...mainElementStyles.root,
          ...css
        }}
        data-testid={testId}
      >
        {children}
      </chakra.div>
    </Fragment>
  )
}
