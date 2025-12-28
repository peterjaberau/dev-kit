import WithContainerScroll from './variants/with-container-scroll';
import WithDragHandles from './variants/with-drag-handles';
import WithGhostIndicator from './variants/with-ghost-indicator';
import { Container, Box, Stack, Card } from '@chakra-ui/react';

const App = () => {
  return (
    <Container w={'full'} px={40}>
      <Card.Root w={'full'}>
        <Card.Header><Card.Title>With Container Scroll</Card.Title></Card.Header>
        <Card.Body minH={'250px'} alignItems={'center'}><Box><WithContainerScroll /></Box></Card.Body>
      </Card.Root>
      <Card.Root w={'full'}>
        <Card.Header><Card.Title>With Drag Handles</Card.Title></Card.Header>
        <Card.Body minH={'250px'} alignItems={'center'}><Box><WithDragHandles /></Box></Card.Body>
      </Card.Root>
      <Card.Root w={'full'}>
        <Card.Header><Card.Title>With Ghost Indicator</Card.Title></Card.Header>
        <Card.Body minH={'250px'} alignItems={'center'}><Box><WithGhostIndicator /></Box></Card.Body>
      </Card.Root>

    </Container>
  );
};

export default App;
