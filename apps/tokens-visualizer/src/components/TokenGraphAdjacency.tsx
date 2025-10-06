
'use client'
export const TokenGraphAdjacency = (props: any) => {
  const d = `M ${props.fromX},${props.fromY} C ${props.fromX + 75},${props.fromY} ${props.toX - 75},${props.toY} ${props.toX},${props.toY}`;
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
        opacity: props.isFaded ? 0.2 : 1,
        zIndex: props.isHighlighted ? 2 : 0,
      }}
    >
      <path d={d} stroke="var(--chakra-colors-gray-400)" strokeWidth="2" fill="none" />
    </svg>
  );
};
