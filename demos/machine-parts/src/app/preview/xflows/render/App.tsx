import React from 'react';
import { Container, Card } from '@chakra-ui/react'
import FlowDemo from './components/FlowDemo';
import './App.css';

export function App() {
  return (
    <Container css={{ mx: "auto", w: "full", maxW: "5xl", h: "100dvh", py: 4, overflow: "hidden" }}>
      <Card.Root size={"sm"} css={{ h: "full", minH: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <FlowDemo />
      </Card.Root>
    </Container>
  )
}
