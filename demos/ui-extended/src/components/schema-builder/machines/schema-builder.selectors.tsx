import { useSchemaBuilderActors } from "./hooks/schema-builder.hook"
import { useSelector } from "@xstate/react"
import { generateElementPropsFromSchemas, getCardCategory } from "#schemaBuilder/app/utils"
import { CardProps, FormElement } from "#schemaBuilder/app/types"

export const useSchemaBuilderApp = () => {
  const { schemaBuilderAppRef } = useSchemaBuilderActors()

  const sendToApp = schemaBuilderAppRef.send
  const appState: any = useSelector(schemaBuilderAppRef, (state) => state)
  const appContext = appState.context

  return {
    appRef: schemaBuilderAppRef,
    sendToApp,

    appState,
    appContext,
  }
}

export const useSchemaBuilderSession = () => {
  const { schemaBuilderSessionRef } = useSchemaBuilderActors()

  const sendToSession = schemaBuilderSessionRef.send
  const sessionState: any = useSelector(schemaBuilderSessionRef, (state) => state)
  const sessionContext = sessionState.context

  return {
    sessionRef: schemaBuilderSessionRef,
    sendToSession,

    sessionState,
    sessionContext,
  }
}

export const useSchemaBuilderCurrentApp = () => {
  const { schemaBuilderCurrentAppRef } = useSchemaBuilderActors()


  const sendToCurrentApp = schemaBuilderCurrentAppRef.send
  const currentAppState: any = useSelector(schemaBuilderCurrentAppRef, (state) => state)
  const currentAppContext = currentAppState.context

  const schema = currentAppContext.schema
  const uiSchema = currentAppContext.uiSchema
  const formData = currentAppContext.formData

  const schemaDefinitions = schema?.definitions
  const uiSchemaDefinitions = uiSchema?.definitions

  const constants = currentAppContext.constants

  const allFormInputs = currentAppContext.allFormInputs
  const unsupportedFeatures = currentAppContext.unsupportedFeatures
  const schemaElementsCount = currentAppContext.schemaElementsCount
  const categoryHash = currentAppContext.categoryHash

  const schemaTitle = schema.title || ""
  const schemaDescription = schema.description || ""



  const canAdd = schema.properties && Object.keys(schema.properties).length !== 0
  const hasUnsupportedFeatures = unsupportedFeatures.length > 0


  const mods = currentAppContext.mods
  const canShowFormName = mods && mods.labels && typeof mods.labels.formNameLabel === "string"
  const canShowFormDescription = mods && mods.labels && typeof mods.labels.formDescriptionLabel === "string"
  const canShowFormMeta = canShowFormName || canShowFormDescription

  const formNameLabel = canShowFormName ? mods.labels.formNameLabel: "Form Name"
  const formDescriptionLabel = canShowFormDescription ? mods.labels.formDescriptionLabel: "Form Description"




  return {
    currentAppRef: schemaBuilderCurrentAppRef,
    sendToCurrentApp,

    currentAppState,
    currentAppContext,

    schemaTitle,
    schemaDescription,
    schema,
    uiSchema,
    formData,

    schemaDefinitions,
    uiSchemaDefinitions,

    constants,


    allFormInputs,
    unsupportedFeatures,
    schemaElementsCount,
    categoryHash,

    canAdd,
    hasUnsupportedFeatures,

    mods,
    canShowFormName,
    canShowFormDescription,
    canShowFormMeta,
    formNameLabel,
    formDescriptionLabel,
  }
}


export const useSchemaElementManager = () => {
  const {
    schema,
    uiSchema,
    schemaDefinitions,
    uiSchemaDefinitions,
    allFormInputs,
    mods,
    categoryHash
  } = useSchemaBuilderCurrentApp()


  const path = "root"

  let schemaElementList = []

  const generateElementProps = () => {
    const elementDict: { [key: string]: any } = {};

    // read regular elements from properties
    Object.entries(schema.properties).forEach(([parameter, element]) => {
      const newElement = {};
      let elementDetails = element && typeof element === 'object' ? element : {};

      // populate newElement with reference if applicable
      if (elementDetails?.$ref !== undefined && schemaDefinitions) {
        if (elementDetails.$ref && !elementDetails.$ref.startsWith('#/definitions')) {
          throw new Error(
            `Invalid definition, not at '#/definitions': ${elementDetails.$ref}`,
          );
        }
        const pathArr = elementDetails.$ref !== undefined ? elementDetails.$ref.split('/') : [];
        if (pathArr[0] === '#' && pathArr[1] === 'definitions' && schemaDefinitions[pathArr[2]]) {
          elementDetails = {
            ...schemaDefinitions[pathArr[2]],
            ...elementDetails,
          };
        }

        const definedUiProps = (uiSchemaDefinitions || {})[pathArr[2]];
        uiSchema[parameter] = {
          ...(definedUiProps || {}),
          ...uiSchema[parameter],
        };
      }
      newElement.name = parameter;
      newElement.required = requiredNames.includes(parameter);
      newElement.$ref = elementDetails.$ref;
      newElement.dataOptions = elementDetails;

      if (elementDetails.type && elementDetails.type === 'object') {
        // create a section
        newElement.schema = elementDetails;
        newElement.uischema = uiSchema[parameter] || {};
        newElement.propType = 'section';
      } else {
        // create a card
        newElement.uiOptions = uiSchema[parameter] || {};

        // ensure that uiOptions does not have duplicate keys with dataOptions
        const reservedKeys = Object.keys(newElement.dataOptions);
        Object.keys(newElement.uiOptions!).forEach((uiKey) => {
          if (reservedKeys.includes(uiKey)) {
            newElement.uiOptions![`ui:*${uiKey}`] = newElement.uiOptions![uiKey];
          }
        });

        newElement.dataOptions.category = getCardCategory(
          newElement as CardProps,
          categoryHash,
        );
        newElement.propType = 'card';
      }
      elementDict[newElement.name!] = newElement;
    });
    // read dependent elements from dependencies
    if (schema.dependencies) {
      const useDefinitionDetails = false;
      Object.keys(schema.dependencies).forEach((parent) => {
        const group = schema.dependencies[parent];
        if (group.oneOf) {
          let possibilityIndex = 0;
          group.oneOf.forEach((possibility: { [key: string]: any }) => {
            if (!(elementDict[parent] || {}).dependents) {
              elementDict[parent] = elementDict[parent] || {};
              elementDict[parent].dependents = [];
            }
            elementDict[parent].dependents.push({
              children: [],
              value: possibility.properties[parent],
            });
            const requiredValues = possibility.required || [];
            Object.entries(possibility.properties).forEach(
              ([parameter, element]) => {
                // create a new element if not present in main properties
                if (
                  !elementDict[parameter] ||
                  (parameter !== parent &&
                    Object.keys(elementDict[parameter]).length === 1 &&
                    elementDict[parameter].dependents)
                ) {
                  const newElement = generateDependencyElement(
                    parameter,
                    element,
                    uischema[parameter],
                    requiredNames,
                    categoryHash,
                    definitionData,
                    definitionUi,
                    useDefinitionDetails,
                  );
                  if (
                    elementDict[parameter] &&
                    elementDict[parameter].dependents
                  ) {
                    newElement.dependents = elementDict[parameter].dependents;
                  }
                  newElement.required = requiredValues.includes(newElement.name);
                  elementDict[newElement.name!] = newElement;
                }
                if (parameter !== parent) {
                  const newElement = elementDict[parameter];
                  newElement.dependent = true;
                  newElement.parent = parent;
                  elementDict[parent].dependents[possibilityIndex].children.push(
                    parameter,
                  );
                }
              },
            );
            possibilityIndex += 1;
          });
        } else if (group.properties) {
          const requiredValues = group.required || [];
          Object.entries(group.properties).forEach(([parameter, element]) => {
            const newElement = generateDependencyElement(
              parameter,
              element,
              uischema[parameter],
              requiredNames,
              categoryHash,
              definitionData,
              definitionUi,
              useDefinitionDetails,
            );
            newElement.required = requiredValues.includes(newElement.name);
            newElement.dependent = true;
            newElement.parent = parent;
            elementDict[newElement.name!] = newElement;
            if (elementDict[parent]) {
              if (elementDict[parent].dependents) {
                elementDict[parent].dependents[0].children.push(parameter);
              } else {
                elementDict[parent].dependents = [{ children: [parameter] }];
              }
            } else {
              elementDict[parent] = {};
              elementDict[parent].dependents = [{ children: [parameter] }];
            }
          });
        } else {
          console.error('unsupported dependency type encountered');
        }
      });
    }
  }

  const elementDict: { [key: string]: any } = {};
  const requiredNames = schema.required ? schema.required : [];
  // read regular elements from properties


  return {

  }
}
