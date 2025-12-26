import type { PreviewPropsType } from '../../package/types';
import type { DataType, IdType } from '../../data/sample';
import './SamplePreview.css';

const SamplePreview = ({ item }: PreviewPropsType<IdType, DataType>) => {
	return <div className={'main'}>{item.id}</div>;
};

export default SamplePreview;
