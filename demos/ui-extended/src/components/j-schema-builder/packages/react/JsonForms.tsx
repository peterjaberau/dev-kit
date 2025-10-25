'use client'
import maxBy from 'lodash/maxBy';
import React, { ComponentType, useMemo } from 'react';
import type Ajv from 'ajv';
import type { ErrorObject } from 'ajv';
import { UnknownRenderer } from './UnknownRenderer';
import {
  createId,
  Generate,
  isControl,
  JsonFormsCellRendererRegistryEntry,
  JsonFormsCore,
  JsonFormsI18nState,
  JsonFormsProps,
  JsonFormsRendererRegistryEntry,
  JsonFormsUISchemaRegistryEntry,
  JsonSchema,
  Middleware,
  OwnPropsOfJsonFormsRenderer,
  removeId,
  UISchemaElement,
  ValidationMode,
} from '#jSchemaBuilder/core';
import {
  JsonFormsStateProvider,
  withJsonFormsRendererProps,
} from './JsonFormsContext';

interface JsonFormsRendererState {
  id: string;
}

export interface JsonFormsReactProps {
  onChange?(state: Pick<JsonFormsCore, 'data' | 'errors'>): void;
  middleware?: Middleware;
}

export class JsonFormsDispatchRenderer extends React.Component<
  JsonFormsProps,
  JsonFormsRendererState
> {
  constructor(props: JsonFormsProps) {
    super(props);
    this.state = {
      id: isControl(props.uischema)
        ? createId(props.uischema.scope)
        : undefined,
    } as any;
  }

  componentWillUnmount() {
    if (isControl(this.props.uischema)) {
      removeId(this.state.id);
    }
  }

  componentDidUpdate(prevProps: JsonFormsProps) {
    if (prevProps.schema !== this.props.schema) {
      removeId(this.state.id);
      this.setState({
        id: isControl(this.props.uischema)
          ? createId(this.props.uischema.scope)
          : undefined,
      } as any);
    }
  }

  render() {
    const {
      schema,
      rootSchema,
      uischema,
      path,
      enabled,
      renderers,
      cells,
      config,
    }: any = this.props as JsonFormsProps;

    return (
      <TestAndRender
        uischema={uischema}
        schema={schema}
        rootSchema={rootSchema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
        id={this.state.id}
        config={config}
      />
    );
  }
}

const TestAndRender = React.memo(function TestAndRender(props: {
  uischema: UISchemaElement;
  schema: JsonSchema;
  rootSchema: JsonSchema;
  path: string;
  enabled: boolean;
  renderers: JsonFormsRendererRegistryEntry[];
  cells: JsonFormsCellRendererRegistryEntry[];
  id: string;
  config: any;
}) {
  const testerContext = useMemo(
    () => ({
      rootSchema: props.rootSchema,
      config: props.config,
    }),
    [props.rootSchema, props.config]
  );
  const renderer = useMemo(
    () =>
      maxBy(props.renderers, (r) =>
        r.tester(props.uischema, props.schema, testerContext)
      ),
    [props.renderers, props.uischema, props.schema, testerContext]
  );
  if (
    renderer === undefined ||
    renderer.tester(props.uischema, props.schema, testerContext) === -1
  ) {
    return <UnknownRenderer type={'renderer'} />;
  } else {
    const Render = renderer.renderer;
    return (
      <Render
        uischema={props.uischema}
        schema={props.schema}
        path={props.path}
        enabled={props.enabled}
        renderers={props.renderers}
        cells={props.cells}
        id={props.id}
      />
    );
  }
});

/**
 * @deprecated Since Version 3.0 this optimization renderer is no longer necessary.
 * Use `JsonFormsDispatch` instead.
 * We still export it for backward compatibility
 */
export class ResolvedJsonFormsDispatchRenderer extends JsonFormsDispatchRenderer {
  constructor(props: JsonFormsProps) {
    super(props);
  }
}

export const JsonFormsDispatch: ComponentType<OwnPropsOfJsonFormsRenderer> =
  withJsonFormsRendererProps(JsonFormsDispatchRenderer);

/**
 * @deprecated Since Version 3.0 this optimization component is no longer necessary.
 * Use `JsonFormsDispatch` instead.
 * We still export it for backward compatibility
 */
export const ResolvedJsonFormsDispatch: ComponentType<OwnPropsOfJsonFormsRenderer> =
  withJsonFormsRendererProps(ResolvedJsonFormsDispatchRenderer);

export interface JsonFormsInitStateProps {
  data: any;
  schema?: JsonSchema;
  uischema?: UISchemaElement;
  renderers: JsonFormsRendererRegistryEntry[];
  cells?: JsonFormsCellRendererRegistryEntry[];
  ajv?: Ajv;
  config?: any;
  uischemas?: JsonFormsUISchemaRegistryEntry[];
  readonly?: boolean;
  validationMode?: ValidationMode;
  i18n?: JsonFormsI18nState;
  additionalErrors?: ErrorObject[];
}

export const JsonForms = (
  props: JsonFormsInitStateProps & JsonFormsReactProps
) => {
  const {
    ajv,
    data,
    schema,
    uischema,
    renderers,
    cells,
    onChange,
    config,
    uischemas,
    readonly,
    validationMode,
    i18n,
    additionalErrors,
    middleware,
  } = props;
  const schemaToUse = useMemo(
    () => (schema !== undefined ? schema : Generate.jsonSchema(data)),
    [schema, data]
  );
  const uischemaToUse = useMemo(
    () =>
      typeof uischema === 'object'
        ? uischema
        : Generate.uiSchema(schemaToUse, undefined, undefined, schemaToUse),
    [uischema, schemaToUse]
  );

  return (
    <JsonFormsStateProvider
      initState={{
        core: {
          ajv,
          data,
          schema: schemaToUse,
          uischema: uischemaToUse,
          validationMode: validationMode,
          additionalErrors: additionalErrors,
        },
        config,
        uischemas,
        renderers,
        cells,
        readonly,
        i18n,
      }}
      onChange={onChange}
      middleware={middleware}
    >
      <JsonFormsDispatch />
    </JsonFormsStateProvider>
  );
};
