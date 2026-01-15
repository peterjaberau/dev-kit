import { chakra } from '@chakra-ui/react';
import { type ReactNode } from 'react';



export function ProjectTile({
	backgroundColor,
	children,
}: {
	backgroundColor: string;
	children: ReactNode;
}) {
	return (
    <chakra.div
      css={{
        width: "20px",
        height: "20px",
        borderRadius: 'sm',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: 'fg.inverted',
      }}
      style={{ backgroundColor }}
      role="presentation"
    >
      {children}
    </chakra.div>
  )
}
