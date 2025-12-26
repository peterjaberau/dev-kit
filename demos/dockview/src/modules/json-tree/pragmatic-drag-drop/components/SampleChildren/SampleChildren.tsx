import type { ChildPropsType } from '../../package/types';
import type React from 'react';
import styles from './SampleChildren.module.css';
import { chakra } from "@chakra-ui/react";

const SampleChildren = ({ children, containerRef }: ChildPropsType) => (
	<chakra.ol
    css={{
      width: '300px',
      margin: '0 auto',
      padding: 0,
      listStyle: 'none',
      border: '1px solid #aaa',
      borderRadius: '4px',
    }}
		ref={containerRef as React.RefObject<HTMLOListElement>}
	>
		{children}
	</chakra.ol>
);

export default SampleChildren;
