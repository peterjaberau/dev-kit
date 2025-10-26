"use client"

import { Box, Link, Text } from '@chakra-ui/react';
import { Prose } from '@dev-kit/components'
import Markdown from "react-markdown"
import * as React from 'react';

export const Description: React.FunctionComponent<{ value: unknown }> = ({ value }) => {
  const [showAll, setShowAll] = React.useState(false);

  if (typeof value !== 'string' || value.trim().length === 0) return null;

  const paragraphs = value.split('\n\n');

  if (paragraphs.length <= 1 || showAll) {
    return (
        <Prose
          data-id='shared-description'
          mx="auto" size={'md'}>
          <Markdown>
            {value}
          </Markdown>
        </Prose>
    );
  }

  const firstParagraph = paragraphs[0];

  return (
    <>
      <Prose mx="auto" size={'md'}>
        <Markdown>
          {firstParagraph}
        </Markdown>
      </Prose>
      {/*<Box*/}
      {/*  as={MarkdownViewer}*/}
      {/*  data-test="property-description"*/}
      {/*  markdown={firstParagraph}*/}
      {/*  parseOptions={{*/}
      {/*    components: {*/}
      {/*      p: (props: any) => {*/}
      {/*        return (*/}
      {/*          <Box as="p">*/}
      {/*            <Text mr={1}>{props.children}</Text>*/}
      {/*            <Link cursor="pointer" onClick={() => setShowAll(true)}>*/}
      {/*              Show all...*/}
      {/*            </Link>*/}
      {/*          </Box>*/}
      {/*        );*/}
      {/*      },*/}
      {/*    },*/}
      {/*  }}*/}
      {/*  style={{*/}
      {/*    fontSize: 12,*/}
      {/*  }}*/}
      {/*/>*/}
    </>
  );
};
