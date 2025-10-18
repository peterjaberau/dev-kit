import React, { ReactElement } from 'react';
import { useSchemaBuilderCurrentApp } from "../machines/schema-builder.selectors"
import CardGallery from './CardGallery';
import {
  parse,
  stringify,
  propagateDefinitionChanges,
  generateCategoryHash,
  excludeKeys,
} from './utils';
import { arrows as arrowsStyle } from './styles';
import DEFAULT_FORM_INPUTS from './defaults/defaultFormInputs';
import type { Mods } from './types';


export default function PredefinedGallery({
  schema,
  uischema,
  onChange,
  mods,
}: {
  schema: string;
  uischema: string;
  onChange: (schema: string, uischema: string) => any;
  mods?: Mods;
}): ReactElement {
  const schemaData = React.useMemo(() => parse(schema) || {}, [schema]);
  const uiSchemaData = React.useMemo(() => parse(uischema) || {}, [uischema]);
  const allFormInputs = excludeKeys(
    Object.assign(
      {},
      DEFAULT_FORM_INPUTS,
      (mods && mods.customFormInputs) || {},
    ),
    mods && mods.deactivatedFormInputs,
  );
  const categoryHash = generateCategoryHash(allFormInputs);

  React.useEffect(() => {
    if (!uiSchemaData.definitions) {
      console.log('Parsing UI schema to assign UI for definitions');
      // need to create definitions from scratch
      const references: string[] = [];
      // recursively search for all $refs in the schemaData
      const findRefs = (name: string, schemaObject: { [key: string]: any }) => {
        if (!schemaObject) return;
        if (typeof schemaObject === 'object')
          Object.keys(schemaObject).forEach((key) => {
            if (typeof key === 'string') {
              if (key === '$ref') references.push(name);
              findRefs(key, schemaObject[key]);
            }
          });
        if (Array.isArray(schemaObject))
          schemaObject.forEach((innerObj) => {
            findRefs(name, innerObj);
          });
      };

      findRefs('root', schemaData);

      uiSchemaData.definitions = {};
      const referenceSet = new Set(references);
      Object.keys(uiSchemaData).forEach((uiProp) => {
        if (referenceSet.has(uiProp))
          uiSchemaData.definitions[uiProp] = uiSchemaData[uiProp];
      });
      if (!Object.keys(uiSchemaData.definitions).length) {
        uiSchemaData.definitions = undefined;
      }
      onChange(stringify(schemaData), stringify(uiSchemaData));
    }
  }, [uiSchemaData, schemaData, onChange]);
  return (
    // className={classes.preDefinedGallery}
    <div >
      <CardGallery
        definitionSchema={schemaData.definitions || {}}
        definitionUiSchema={uiSchemaData.definitions || {}}
        onChange={(
          newDefinitions: { [key: string]: any },
          newDefinitionsUi: { [key: string]: any },
        ) => {
          // propagate changes in ui definitions to all relavant parties in main schema

          propagateDefinitionChanges(
            { ...schemaData, definitions: newDefinitions },
            { ...uiSchemaData, definitions: newDefinitionsUi },
            (newSchema, newUiSchema) =>
              onChange(stringify(newSchema), stringify(newUiSchema)),
            categoryHash,
          );
        }}
        mods={mods}
        categoryHash={categoryHash}
      />
    </div>
  );
}
