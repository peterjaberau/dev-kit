import type { RowPropsType } from '../../../components/custom/types';
import type { DataType, IdType } from '../../data/custom/sample';
import { chakra } from '@chakra-ui/react';

export const SampleRow = <ID extends IdType, D extends DataType>({
	'aria-controls': ariaControls,
	'aria-expanded': ariaExpanded,
	draggedItem,
	dragHandleRef,
	indentLevel,
	indentSize,
	indicatorType,
	instruction,
	item,
	itemRef,
	onExpandToggle,
	state,
	withDragHandle = false,
}: Omit<RowPropsType<ID, D>, 'item'> & {
	item?: RowPropsType<ID, D>['item'] | null;
	withDragHandle?: boolean;
}) => {
	const handleExpandToggleClick = (event: React.MouseEvent) => {
		if (!item) return;
		onExpandToggle?.({ event, isOpen: !item.isOpen, item });
	};

	// Don't render the dragged item when using ghost indicators
	const isHidden = draggedItem?.id === item?.id && indicatorType === 'ghost';

	return (
		// biome-ignore lint/a11y/useAriaPropsSupportedByRole: Deliberate
		<chakra.li
			aria-controls={ariaControls}
			aria-expanded={ariaExpanded}
			css={{
				'--indent-level': `${indentLevel * indentSize}px`,
				display: 'flex',
				gap: '2px',
				alignItems: 'center',
				height: '30px',
				padding: '2px',
				margin: 0,
				cursor: 'pointer',
				listStyle: 'none',
				border: 0,
				borderRadius: '3px',
				_hover: {
					boxShadow: 'sm'
				},
				...(state === 'idle' && {
					_hover: {
						backgroundColor: 'bg.muted'
					},
				}),
				...(state === 'dragging' && {
					opacity: 0.4,
				}),
				...(state === 'parent-of-instruction' && {
					backgroundColor: 'bg.muted'
				}),
				...(state === 'indicator' && {
					opacity: 0.5,
				}),
				...(instruction?.type === 'make-child' && {
					outline: '2px solid',
					outlineColor: 'border.info'
				}),
				...(isHidden && {
					display: 'none',
				}),
			}}
			ref={itemRef}
		>
			{withDragHandle ? (
				<chakra.span
					css={{
						p: '2px 4px',
						_focusVisible: {
							backgroundColor: 'bg.emphasized'
						},
						_hover: {
							backgroundColor: 'bg.emphasized'
						}
					}}
					ref={dragHandleRef as React.RefObject<HTMLDivElement>}
				>
					<svg height='10' role='presentation' viewBox='0 0 6 10' width='6'>
						<title>Drag Handle</title>
						<g fill='currentcolor'>
							<circle cx='1' cy='1' r='1' />
							<circle cx='5' cy='1' r='1' />
							<circle cx='1' cy='5' r='1' />
							<circle cx='5' cy='5' r='1' />
							<circle cx='1' cy='9' r='1' />
							<circle cx='5' cy='9' r='1' />
						</g>
					</svg>
				</chakra.span>
			) : null}
			<chakra.div
				css={{
					display: 'flex',
					alignItems: 'center',
					marginLeft: 'var(--indent-level)'
				}}>
				{item?.isExpandable ? (
					<chakra.button
						css={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '24px',
							height: '24px',
							backgroundColor: 'transparent',
							border: 'none',
						}}
						onClick={handleExpandToggleClick}
						type='button'
					>
						{item.isOpen ? '▼' : '►'}
					</chakra.button>
				) : (
					<chakra.div
						css={{
							display: 'inline-flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '24px',
							height: '24px',
							backgroundColor: 'transparent',
							border: 'none',
						}}
						 />
				)}
				{item?.data?.name}
			</chakra.div>
		</chakra.li>
	);
};

