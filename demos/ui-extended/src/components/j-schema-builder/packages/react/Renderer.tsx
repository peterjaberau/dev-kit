'use client'
import React from 'react';
import type { RendererProps } from '#jSchemaBuilder/core';

/**
 * Convenience wrapper around React's Component for constraining props.
 *
 * @template P type of any renderer props
 * @template S state of the Renderer
 */
export class RendererComponent<
  P extends RendererProps,
  // TODO fix @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  S = {}
> extends React.Component<P, S> {
  constructor(props: P) {
    super(props);
  }
}

/**
 * Stateless Renderer.
 *
 * @template P type of any renderer props
 */
export type StatelessRenderer<P extends RendererProps> =
  React.FunctionComponent<P>;

/**
 * Represents a Renderer, which might either be a component or a function.
 */
export type Renderer =
  // TODO fix @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/ban-types
  | RendererComponent<RendererProps & any, {}>
  | StatelessRenderer<RendererProps & any>;
