import type { IndicatorPropsType } from '../../../components/custom/types';
import type { DataType, IdType } from '../../data/custom/sample';

import { chakra, Separator } from '@chakra-ui/react';
export const SampleDropLineIndicator = ({
	indentLevel,
	indentSize,
}: IndicatorPropsType<IdType, DataType>) => (
	<chakra.li
		css={{
			'--indent-level': `${indentLevel * indentSize}px`,
			'--indicator-color': 'colors.blue.500',
			'--line-thickness': '2px',
			'--terminal-size': '8px',
			position: 'relative',
			// We don't want to cause any additional 'dragenter' events
			pointerEvents: 'none',
			lineStyle: 'none',
			//circle
			_before: {
				position: 'absolute',
				top: 'calc(((var(--terminal-size) / 2) - 1px) * -1)',
				left: 'var(--indent-level)',
				boxSizing: 'border-box',
				display: 'block',
				width: 'var(--terminal-size)',
				height: 'var(--terminal-size)',
				content: '""',
				background: 'transparent',
				border: 'var(--line-thickness) solid var(--indicator-color)',
				borderRadius: 'full',
			},
			_after: {
				position: 'absolute',
				right: 0,
				//putting the line to the right of the terminal
				left: 'calc(var(--indent-level) + var(--terminal-size))',
				display: 'block',
				height: 'var(--line-thickness)',
				content: '""',
				background: 'var(--indicator-color)',
			}
		}}
	/>
);

