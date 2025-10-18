import { CardComponentPropsType, CardType, FormInput, Mods, SectionType } from "#schemaBuilder/app/types"
import React, { ReactNode } from "react"
import { addCardObj, addSectionObj, generateElementPropsFromSchemas, getCardParameterInputComponentForType, parse, stringify, updateSchemas } from "#schemaBuilder/app/utils"

import { useSchemaBuilderCurrentApp } from "./schema-builder.selectors"

export function generateElementComponentsFromSchemas(parameters: {
  // schemaData: { [key: string]: any };
  // uiSchemaData: { [key: string]: any };
  // onChange: (
  //   schema: { [key: string]: any },
  //   uischema: { [key: string]: any },
  // ) => any;
  // definitionData?: { [key: string]: any };
  // definitionUi?: { [key: string]: any };
  hideKey?: boolean
  path: string
  cardOpenArray: Array<boolean>
  setCardOpenArray: (newArr: Array<boolean>) => void
  allFormInputs: { [key: string]: FormInput }
  mods?: Mods
  // categoryHash: { [key: string]: string };
  Card: CardType
  Section: SectionType
}): ReactNode[] {
  const { schemaData, uiSchemaData, onChange, definitionData, definitionUi, hideKey, path, cardOpenArray, setCardOpenArray, allFormInputs, mods, categoryHash, Card, Section } =
    parameters

  const schema = parse(stringify(schemaData))
  const uischema = parse(stringify(uiSchemaData))

  if (!schema.properties) return []
  const elementPropArr = generateElementPropsFromSchemas({
    schema,
    uischema,
    definitionData,
    definitionUi,
    categoryHash,
  })

  const elementList = elementPropArr.map((elementProp, index) => {
    const MIN_CARD_OPEN_ARRAY_LENGTH = index + 1
    const currentLength = cardOpenArray.length
    const addProperties = {
      schema,
      uischema,
      mods,
      onChange,
      definitionData: definitionData || {},
      definitionUi: definitionUi || {},
      index,
      categoryHash,
    }

    if (currentLength < MIN_CARD_OPEN_ARRAY_LENGTH) {
      cardOpenArray.push(...new Array(MIN_CARD_OPEN_ARRAY_LENGTH - currentLength).fill(false))
    }
    const expanded = (cardOpenArray && index < cardOpenArray.length && cardOpenArray[index]) || false
    if (elementProp.propType === "card") {
      // choose the appropriate type specific parameters
      const TypeSpecificParameters = getCardParameterInputComponentForType(elementProp.dataOptions.category || "string", allFormInputs)

      // add a fully defined card component to the list of components
      return (
        <Card
          componentProps={
            Object.assign(
              {
                name: elementPropArr[index].name,
                required: elementPropArr[index].required,
                hideKey,
                path: `${path}_${elementPropArr[index].name}`,
                definitionData,
                definitionUi,
                neighborNames: elementPropArr[index].neighborNames,
                dependents: elementPropArr[index].dependents,
                dependent: elementPropArr[index].dependent,
                parent: elementPropArr[index].parent,
              },
              elementPropArr[index].uiOptions,
              elementPropArr[index].dataOptions,
            ) as CardComponentPropsType
          }
          key={`${path}_${elementPropArr[index].name}`}
          TypeSpecificParameters={TypeSpecificParameters}
          onChange={(newCardObj: { [key: string]: any }) => {
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })

            // extract uiOptions and other properties
            const newDataProps: { [key: string]: any } = {}
            const newUiProps: { [key: string]: any } = {}
            Object.keys(newCardObj).forEach((propName) => {
              if (propName.startsWith("ui:")) {
                if (propName.startsWith("ui:*")) {
                  newUiProps[propName.substring(4)] = newCardObj[propName]
                } else {
                  newUiProps[propName] = newCardObj[propName]
                }
              } else if (!["name", "required", "neighborNames", "dependents", "dependent", "parent"].includes(propName)) {
                newDataProps[propName] = newCardObj[propName]
              }
            })

            if (newElementObjArr[index].propType === "card") {
              const oldElement = newElementObjArr[index]
              newElementObjArr[index] = {
                ...oldElement,
                dataOptions: newDataProps,
                uiOptions: newUiProps,
                required: newCardObj.required,
                dependents: newCardObj.dependents,
                dependent: newCardObj.dependent,
                parent: newCardObj.parent,
                name: newCardObj.name,
                $ref: newCardObj.$ref,
                propType: "card",
              }
            } else {
              throw new Error("Card editing non card element")
            }
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onDelete={() => {
            // splice out this index from the card array
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            newElementObjArr.splice(index, 1)
            setCardOpenArray([...cardOpenArray.slice(0, index), ...cardOpenArray.slice(index + 1)])
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onMoveUp={() => {
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            if (index === 0) return

            const tempBlock = newElementObjArr[index - 1]
            newElementObjArr[index - 1] = newElementObjArr[index]
            newElementObjArr[index] = tempBlock
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onMoveDown={() => {
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            if (index === elementPropArr.length - 1) return

            const tempBlock = newElementObjArr[index + 1]
            newElementObjArr[index + 1] = newElementObjArr[index]
            newElementObjArr[index] = tempBlock
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          addElem={(choice: string) => {
            if (choice === "card") {
              addCardObj(addProperties)
            } else if (choice === "section") {
              addSectionObj(addProperties)
            }
            setCardOpenArray([...cardOpenArray, false])
          }}
          cardOpen={expanded}
          setCardOpen={(newState: boolean) => setCardOpenArray([...cardOpenArray.slice(0, index), newState, ...cardOpenArray.slice(index + 1)])}
          allFormInputs={allFormInputs}
          mods={mods}
          addProperties={addProperties}
        />
      )
    } else if (elementProp.propType === "section") {
      // create a section with the appropriate schemas here
      const addProperties = {
        schema,
        uischema,
        mods,
        onChange,
        definitionData: definitionData || {},
        definitionUi: definitionUi || {},
        index,
        categoryHash,
      }
      return (
        <Section
          schema={elementProp.schema}
          uischema={elementProp.uischema}
          onChange={(newSchema: { [key: string]: any }, newUiSchema: { [key: string]: any }, newRef?: string) => {
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })

            const oldSection = newElementObjArr[index]

            newElementObjArr[index] = {
              ...oldSection,
              schema: newSchema,
              uischema: newUiSchema,
              propType: "section",
            }

            if (newRef) newElementObjArr[index].$ref = newRef

            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onNameChange={(newName: string) => {
            const oldSection = elementProp

            // check if newName overlaps with an existing name
            if (elementPropArr.map((elem) => elem.name).includes(newName)) return

            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            newElementObjArr[index] = {
              ...oldSection,
              name: newName,
            }
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onRequireToggle={() => {
            const oldSection = elementProp

            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            newElementObjArr[index] = {
              ...oldSection,
              required: !oldSection.required,
            }
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onDependentsChange={(
            newDependents: Array<{
              children: Array<string>
              value?: any
            }>,
          ) => {
            const oldSection = elementProp

            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            newElementObjArr[index] = {
              ...oldSection,
              dependents: newDependents,
            }
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              onChange,
              definitionData,
              definitionUi,
            })
          }}
          onDelete={() => {
            // splice out this index from the card array
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            newElementObjArr.splice(index, 1)
            setCardOpenArray([...cardOpenArray.slice(0, index), ...cardOpenArray.slice(index + 1)])
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onMoveUp={() => {
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            if (index === 0) return

            const tempBlock = newElementObjArr[index - 1]
            newElementObjArr[index - 1] = newElementObjArr[index]
            newElementObjArr[index] = tempBlock
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          onMoveDown={() => {
            const newElementObjArr = generateElementPropsFromSchemas({
              schema,
              uischema,
              definitionData,
              definitionUi,
              categoryHash,
            })
            if (index === elementPropArr.length - 1) return

            const tempBlock = newElementObjArr[index + 1]
            newElementObjArr[index + 1] = newElementObjArr[index]
            newElementObjArr[index] = tempBlock
            updateSchemas(newElementObjArr, {
              schema,
              uischema,
              definitionData,
              definitionUi,
              onChange,
            })
          }}
          name={elementProp.name}
          key={`${path}_${elementPropArr[index].name}`}
          required={elementProp.required}
          path={`${path}_${elementProp.name}`}
          definitionData={definitionData || {}}
          definitionUi={definitionUi || {}}
          hideKey={hideKey}
          reference={elementProp.$ref}
          neighborNames={elementProp.neighborNames}
          dependents={elementProp.dependents!}
          dependent={elementProp.dependent}
          parent={elementProp.parent}
          parentProperties={addProperties}
          cardOpen={expanded}
          setCardOpen={(newState: boolean) => setCardOpenArray([...cardOpenArray.slice(0, index), newState, ...cardOpenArray.slice(index + 1)])}
          allFormInputs={allFormInputs}
          categoryHash={categoryHash}
          mods={mods}
        />
      )
    } else {
      return (
        <div key={`${path}_${elementPropArr[index].name}`}>
          <h2> Error parsing element </h2>
        </div>
      )
    }
  })

  return elementList
}
