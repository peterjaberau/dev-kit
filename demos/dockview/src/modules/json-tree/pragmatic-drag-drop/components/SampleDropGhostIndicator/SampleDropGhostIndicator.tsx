import type { IndicatorPropsType } from '../../package/types';
import type { DataType, IdType } from '../../data/sample';
import SampleRow from '../SampleRow/SampleRow';

const SampleDropGhostIndicator = ({
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

export default SampleDropGhostIndicator;
