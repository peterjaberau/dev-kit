import WithContainerScroll from './variants/with-container-scroll';
import WithDragHandles from './variants/with-drag-handles';
import WithGhostIndicator from './variants/with-ghost-indicator';
import { Box, HStack } from '@chakra-ui/react';

const App = () => {
	return (
		<HStack justifyContent={'space-between'} alignItems="center" w={'full'}>
			<Box flex={1}>
				<h2>With Container Scroll</h2>
				<WithContainerScroll />
			</Box>
			<Box flex={1}>
				<h2>With Drag Handles</h2>
				<WithDragHandles />
			</Box>
			<Box flex={1}>
				<h2>With Ghost Indicator</h2>
				<WithGhostIndicator />
			</Box>
		</HStack>
	);
};

export default App;
