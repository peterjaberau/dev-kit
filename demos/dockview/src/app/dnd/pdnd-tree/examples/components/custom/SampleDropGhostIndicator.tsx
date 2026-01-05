import type { IndicatorPropsType } from '../../../components/custom/types';
import type { DataType, IdType } from '../../data/custom/sample';
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

