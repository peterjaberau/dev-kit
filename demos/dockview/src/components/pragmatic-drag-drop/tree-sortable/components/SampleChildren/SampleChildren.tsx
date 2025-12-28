import type { ChildPropsType } from '#components/pragmatic-drag-drop/tree-sortable/package';
import type React from 'react';
import './SampleChildren.css';

const SampleChildren = ({ children, containerRef }: ChildPropsType) => (
	<ol
		className={'main'}
		ref={containerRef as React.RefObject<HTMLOListElement>}
	>
		{children}
	</ol>
);

export default SampleChildren;
