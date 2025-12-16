'use client';
import React from 'react';
import { useAppSelector, useNodeRootSelector, useNodeItemSelector } from '../actors/selectors';
import { Container, Card, For, Stack } from '@chakra-ui/react';

export const NodeRootComponent = () => {
  const { nodeRootContext, nodeRootRef } = useNodeRootSelector();


  return (
    <Container>
      <Card.Root>
        <Card.Header>
          <Card.Title>Root Node</Card.Title>
        </Card.Header>
        <Card.Body>
          <For each={nodeRootContext?.internalRefs?.children}>
            {(item: any, index: any) => {
              return <NodeItemComponent key={index} childRef={item} />;
            }}
          </For>
        </Card.Body>
      </Card.Root>
    </Container>
  );
};

export const NodeItemComponent = ({ childRef }: any) => {
  const { nodeItemContext } = useNodeItemSelector({ childRef: childRef });

  console.log('--nodeItemContext---', nodeItemContext)

  return (
    <Container>
      <Card.Root>
        <Card.Header>
          <Card.Title>{nodeItemContext.props.id}</Card.Title>
        </Card.Header>
        <Card.Body>
          <For each={nodeItemContext?.internalRefs?.children}>
            {(item: any, index: any) => {
              return <NodeItemComponent key={index} childRef={item} />;
            }}
          </For>
        </Card.Body>
      </Card.Root>
    </Container>
  );
};
