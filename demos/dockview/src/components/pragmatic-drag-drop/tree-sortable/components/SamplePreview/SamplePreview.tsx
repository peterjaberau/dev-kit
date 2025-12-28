import type { PreviewPropsType } from '#components/pragmatic-drag-drop/tree-sortable/package';
import type { DataType, IdType } from '../../data/sample';
import './SamplePreview.css';

const SamplePreview = ({ item }: PreviewPropsType<IdType, DataType>) => {
  return <div className={'main'}>{item.id}</div>;
};

export default SamplePreview;
