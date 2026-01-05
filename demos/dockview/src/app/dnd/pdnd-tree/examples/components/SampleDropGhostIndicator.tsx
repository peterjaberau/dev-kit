import type { IndicatorPropsType } from '../../components/types';
import type { DataType, IdType } from '../data/sample';
import {SampleRow} from '.';

export const SampleDropGhostIndicator = ({
	indentLevel,
	indentSize,
	instruction,
	item,
}: IndicatorPropsType<IdType, DataType>) => (
	<SampleRow
		draggedItem={null}
		indentLevel={indentLevel}
		indentSize={indentSize}
		indicatorType='ghost'
		instruction={instruction}
		item={item}
		state='indicator'
	/>
);

