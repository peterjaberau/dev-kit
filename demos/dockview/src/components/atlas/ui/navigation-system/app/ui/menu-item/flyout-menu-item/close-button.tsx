import React from 'react';
import { CloseButton as ChakraCloseButton } from '@chakra-ui/react';



export const CloseButton: (props: any) => React.JSX.Element = ({
	onClick,
}) => (
	<ChakraCloseButton
		variant="ghost"
		onClick={onClick}
    size="sm"
	/>
);
