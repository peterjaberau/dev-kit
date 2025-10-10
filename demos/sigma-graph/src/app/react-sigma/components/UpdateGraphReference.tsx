"use client"
import { SigmaContainer } from '#react-sigma/core';
import '#react-sigma/core/assets/index.css';
import { CSSProperties, FC, useEffect, useState } from 'react';

import { useRandom } from './common/useRandom';

const UpdatedGraphReference: FC<{ style?: CSSProperties }> = ({ style }) => {
  const { randomGraph } = useRandom();
  const [graph, setGraph] = useState(randomGraph());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGraph(randomGraph);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [randomGraph]);

  return <SigmaContainer style={style} graph={graph} settings={{ allowInvalidContainer: true }} />;
};

export default UpdatedGraphReference
