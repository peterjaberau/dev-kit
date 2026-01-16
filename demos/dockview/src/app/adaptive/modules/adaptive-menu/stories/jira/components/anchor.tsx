
import {
	type ComponentPropsWithoutRef,
	forwardRef,
	type ReactNode,
	type Ref,
	useCallback,
	useContext,
} from 'react';

import invariant from 'tiny-invariant';

import { type UIAnalyticsEvent, usePlatformLeafEventHandler } from '@atlaskit/analytics-next';
import { type RouterLinkComponentProps, useRouterLink } from '@atlaskit/app-provider';
import noop from '@atlaskit/ds-lib/noop';
import { useId } from '@atlaskit/ds-lib/use-id';
import InteractionContext, { type InteractionContextType } from '@atlaskit/interaction-context';
import VisuallyHidden from '@atlaskit/visually-hidden';

import {
	type BackgroundColor,
	backgroundColorStylesMap,
	borderColorMap,
	borderWidthMap,
	paddingStylesMap,
	positiveSpaceMap,
	type Space,
} from '../xcss/style-maps.partial';
import { parseXcss } from '../xcss/xcss';

import type { BasePrimitiveProps, StyleProp } from './types';

type BaseAnchorProps = {
	children?: ReactNode;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
	interactionName?: string;
	componentName?: string;
	backgroundColor?: BackgroundColor;
	newWindowLabel?: string;
	padding?: Space;
	paddingBlock?: Space;
	paddingBlockStart?: Space;
	paddingBlockEnd?: Space;
	paddingInline?: Space;
	paddingInlineStart?: Space;
	paddingInlineEnd?: Space;
	ref?: Ref<HTMLAnchorElement>;
};

const focusRingStyles = css({
	'&:focus, &:focus-visible': {
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
		outlineColor: borderColorMap['color.border.focused'],
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
		outlineOffset: positiveSpaceMap['space.025'],
		outlineStyle: 'solid',
		// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
		outlineWidth: borderWidthMap['border.width.focused'],
	},
	// eslint-disable-next-line @atlaskit/ui-styling-standard/no-unsafe-selectors
	'&:focus:not(:focus-visible)': {
		outline: 'none',
	},
	'@media screen and (forced-colors: active), screen and (-ms-high-contrast: active)': {
		'&:focus-visible': {
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values, @atlaskit/ui-styling-standard/no-unsafe-values
			outline: `${borderWidthMap['border.width']} solid`,
		},
	},
});

const baseStyles = css({
	boxSizing: 'border-box',
	textDecoration: 'underline',
});

const positionStyles = css({
	position: 'relative',
});

const IS_EXTERNAL_LINK_REGEX = /^(?:(http|https):\/\/)/;
const IS_NON_HTTP_BASED = /^(((mailto|tel|sms|blob):)|(#))/;
// Comma is added here to add a slight pause between announcing the anchor label and "opens in new window"
const OPENS_NEW_WINDOW_LABEL = '(opens new window)';

/**
 * __Anchor__
 *
 * A primitive for building custom anchor links.
 *
 * - [Examples](https://atlassian.design/components/primitives/anchor/examples)
 * - [Code](https://atlassian.design/components/primitives/anchor/code)
 * - [Usage](https://atlassian.design/components/primitives/anchor/usage)
 */
const AnchorNoRef = <RouterLinkConfig extends Record<string, any> = never>(
	{
		href,
		children,
		backgroundColor,
		newWindowLabel,
		padding,
		paddingBlock,
		paddingBlockStart,
		paddingBlockEnd,
		paddingInline,
		paddingInlineStart,
		paddingInlineEnd,
		onClick: providedOnClick = noop,
		interactionName,
		componentName,
		analyticsContext,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledBy,
		style,
		target,
		testId,
		xcss,
		...htmlAttributes
	}: AnchorProps<RouterLinkConfig>,
	ref?: Ref<HTMLAnchorElement>,
) => {
	const interactionContext = useContext<InteractionContextType | null>(InteractionContext);
	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, analyticsEvent: UIAnalyticsEvent) => {
			interactionContext && interactionContext.tracePress(interactionName, e.timeStamp);
			providedOnClick(e, analyticsEvent);
		},
		[providedOnClick, interactionContext, interactionName],
	);

	const opensNewWindowLabelId = useId();

	const onClick = usePlatformLeafEventHandler({
		fn: handleClick,
		action: 'clicked',
		componentName: componentName || 'Anchor',
		packageName: process.env._PACKAGE_NAME_ as string,
		packageVersion: process.env._PACKAGE_VERSION_ as string,
		analyticsData: analyticsContext,
		actionSubject: 'link',
	});

	// This is to remove className from safeHtmlAttributes
	// @ts-expect-error className doesn't exist in the prop definition but we want to ensure it cannot be applied even if types are bypassed
	const { className: _spreadClass, ...safeHtmlAttributes } = htmlAttributes;
	const resolvedStyles = parseXcss(xcss);

	const RouterLink = useRouterLink();

	const isExternal = typeof href === 'string' && IS_EXTERNAL_LINK_REGEX.test(href);
	const isNonHttpBased = typeof href === 'string' && IS_NON_HTTP_BASED.test(href);

	/**
	 * Renders a router link if:
	 *
	 * - a link component is set in the app provider
	 * - it's not an external link (starting with `http://` or `https://`)
	 * - it's not a non-HTTP-based link (e.g. emails, phone numbers, hash links etc.).
	 */
	const isRouterLink = RouterLink && !isExternal && !isNonHttpBased;

	const hrefObjectUsedWithoutRouterLink = RouterLink === undefined && typeof href === 'object';

	invariant(
		!hrefObjectUsedWithoutRouterLink,
		`@atlaskit/primitives: Anchor primitive cannot pass an object to 'href' unless a router link is configured in the AppProvider`,
	);

	const Component = isRouterLink ? RouterLink : 'a';

	return (
		<Component
			// eslint-disable-next-line @atlaskit/ui-styling-standard/enforce-style-prop -- Ignored via go/DSP-18766
			style={style}
			ref={ref}
			// eslint-disable-next-line @atlaskit/ui-styling-standard/no-classname-prop -- Ignored via go/DSP-18766
			className={resolvedStyles.static}
			// eslint-disable-next-line @repo/internal/react/no-unsafe-spread-props
			{...safeHtmlAttributes}
			// @ts-expect-error
			href={!isRouterLink && typeof href !== 'string' ? undefined : href}
			target={target}
			onClick={onClick}
			aria-label={
				ariaLabel && target === '_blank' && !ariaLabelledBy
					? //`${ariaLabel} ${OPENS_NEW_WINDOW_LABEL}`
						`${ariaLabel} , ${newWindowLabel ? newWindowLabel : OPENS_NEW_WINDOW_LABEL}`
					: ariaLabel
			}
			aria-labelledby={
				ariaLabelledBy && target === '_blank'
					? `${ariaLabelledBy} ${opensNewWindowLabelId}`
					: ariaLabelledBy
			}
			css={[
				baseStyles,
				positionStyles,
				focusRingStyles,
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				backgroundColor && backgroundColorStylesMap[backgroundColor],
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				padding && paddingStylesMap.padding[padding],
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				paddingBlock && paddingStylesMap.paddingBlock[paddingBlock],
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				paddingBlockStart && paddingStylesMap.paddingBlockStart[paddingBlockStart],
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				paddingBlockEnd && paddingStylesMap.paddingBlockEnd[paddingBlockEnd],
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				paddingInline && paddingStylesMap.paddingInline[paddingInline],
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				paddingInlineStart && paddingStylesMap.paddingInlineStart[paddingInlineStart],
				// eslint-disable-next-line @atlaskit/ui-styling-standard/no-imported-style-values -- Ignored via go/DSP-18766
				paddingInlineEnd && paddingStylesMap.paddingInlineEnd[paddingInlineEnd],
				...(resolvedStyles.emotion || []),
			]}
			data-testid={testId}
			data-is-router-link={testId ? (isRouterLink ? 'true' : 'false') : undefined}
		>
			{children}
			{target === '_blank' && ((children && !ariaLabel && !ariaLabelledBy) || ariaLabelledBy) && (
				<VisuallyHidden
					id={opensNewWindowLabelId}
				>{`, ${newWindowLabel ? newWindowLabel : OPENS_NEW_WINDOW_LABEL}`}</VisuallyHidden>
			)}
		</Component>
	);
};

// Workarounds to support generic types with forwardRef
/**
 * __Anchor__
 *
 * Anchor is a primitive for building custom anchor links. It's a wrapper around the HTML `<a>` element that provides a consistent API for handling client-side routing and Atlassian Design System styling.
 *
 * - [Examples](https://atlassian.design/components/primitives/anchor/examples)
 * - [Code](https://atlassian.design/components/primitives/anchor/code)
 * - [Usage](https://atlassian.design/components/primitives/anchor/usage)
 */
const Anchor = forwardRef(AnchorNoRef) as <RouterLinkConfig extends Record<string, any> = never>(
	props: AnchorProps<RouterLinkConfig> & {
		ref?: Ref<HTMLAnchorElement>;
	},
) => ReturnType<typeof AnchorNoRef>;

export default Anchor;
