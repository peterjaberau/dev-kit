import React, { ReactElement, useEffect, useState } from "react"
import { useSchemaBuilderCurrentApp } from "../machines/schema-builder.selectors"
import { Alert, Container, Button, List, Field, HStack, Center, Input, Stack, SimpleGrid, Card as ChakraCard, GridItem, Box } from "@chakra-ui/react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import Card from "./Card"
import Section from "./Section"
import {
  parse,
  stringify,
  checkForUnsupportedFeatures,
  generateElementComponentsFromSchemas,
  addCardObj,
  addSectionObj,
  onDragEnd,
  countElementsFromSchema,
  generateCategoryHash,
  excludeKeys,
  DROPPABLE_TYPE,
} from "./utils"
import DEFAULT_FORM_INPUTS from "#schemaBuilder/app/defaults/defaultFormInputs"

export default function FormBuilder({ onMount, onChange, mods = {} }: any): ReactElement {
  const {
    schema,
    uiSchema: uischema,
    constants,
  } = useSchemaBuilderCurrentApp()

  const schemaData = schema
  const uiSchemaData = uischema

  const allFormInputs = excludeKeys(Object.assign({}, DEFAULT_FORM_INPUTS, (mods && mods.customFormInputs) || {}), mods && mods.deactivatedFormInputs)

  const unsupportedFeatures = checkForUnsupportedFeatures(schemaData, uiSchemaData, allFormInputs)

  const elementNum = countElementsFromSchema(schemaData)

  const defaultCollapseStates = [...Array(elementNum)].map(() => false)
  const [cardOpenArray, setCardOpenArray] = React.useState(defaultCollapseStates)

  const categoryHash = generateCategoryHash(allFormInputs)

  const [isFirstRender, setIsFirstRender] = useState(true)

  const addProperties: any = {
    schema: schemaData,
    uischema: uiSchemaData,
    mods: mods,
    onChange: (newSchema: { [key: string]: any }, newUiSchema: { [key: string]: any }) => onChange(stringify(newSchema), stringify(newUiSchema)),
    definitionData: schemaData.definitions,
    definitionUi: uiSchemaData.definitions,
    categoryHash,
  }

  const hideAddButton = schemaData.properties && Object.keys(schemaData.properties).length !== 0

  useEffect(() => {
    if (isFirstRender) {
      if (onMount)
        onMount({
          categoryHash,
        })
      setIsFirstRender(false)
    }
  }, [isFirstRender, onMount, categoryHash])


  console.log('------', {
    allFormInputs,
    categoryHash
  })

  return (
    <Container>
      <SimpleGrid columns={3} gap={3}>
        <GridItem>
          <Stack>
            {/* alerts and warnings */}
            {unsupportedFeatures.length === 0 && (
              <Alert.Root status="warning">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Unsupported Features</Alert.Title>
                  <Alert.Description>
                    <List.Root>
                      {unsupportedFeatures.map((message: any, index: any) => (
                        <List.Item key={index}>{message}</List.Item>
                      ))}
                    </List.Root>
                  </Alert.Description>
                </Alert.Content>
              </Alert.Root>
            )}

            {(!mods || mods.showFormHead !== false) && (
              <ChakraCard.Root>
                <ChakraCard.Header>
                  <ChakraCard.Title>Schema Builder Metadata</ChakraCard.Title>
                </ChakraCard.Header>
                <ChakraCard.Body>
                  <HStack gap="10" width="full">
                    <Field.Root readOnly>
                      <Field.Label>{mods && mods.labels && typeof mods.labels.formNameLabel === "string" ? mods.labels.formNameLabel : "Form Name"}</Field.Label>
                      <Input
                        placeholder={"Title"}
                        variant="subtle"
                        value={schemaData.title || ""}
                        onChange={(ev) => {
                          onChange(
                            stringify({
                              ...schemaData,
                              title: ev.target.value,
                            }),
                            uischema,
                          )
                        }}
                      />
                    </Field.Root>

                    <Field.Root readOnly>
                      <Field.Label>
                        {mods && mods.labels && typeof mods.labels.formDescriptionLabel === "string" ? mods.labels.formDescriptionLabel : "Form Description"}
                      </Field.Label>
                      <Input
                        placeholder={"Description"}
                        variant="outline"
                        value={schemaData.description || ""}
                        onChange={(ev) =>
                          onChange(
                            stringify({
                              ...schemaData,
                              description: ev.target.value,
                            }),
                            uischema,
                          )
                        }
                      />
                    </Field.Root>
                  </HStack>
                </ChakraCard.Body>
              </ChakraCard.Root>
            )}
          </Stack>
        </GridItem>
        <GridItem colSpan={2}>
          <ChakraCard.Root>
            <ChakraCard.Header>
              <ChakraCard.Title>Schema Builder Editor</ChakraCard.Title>
            </ChakraCard.Header>
            <ChakraCard.Body minH={"100px"} bg={"bg.subtle"}>
              <DragDropContext
                onDragEnd={(result) =>
                  onDragEnd(result, {
                    schema: schemaData,
                    uischema: uiSchemaData,
                    onChange: (newSchema: any, newUiSchema: any) =>
                      onChange(stringify(newSchema), stringify(newUiSchema)),
                    definitionData: schemaData.definitions,
                    definitionUi: uiSchemaData.definitions,
                    categoryHash,
                  })
                }
              >
                <Droppable droppableId='droppable' type={DROPPABLE_TYPE}>
                  {(providedDroppable) => (
                    <div
                      ref={providedDroppable.innerRef}
                      {...providedDroppable.droppableProps}
                    >
                      {generateElementComponentsFromSchemas({
                        schemaData,
                        uiSchemaData,
                        onChange: (newSchema: any, newUiSchema: any) =>
                          onChange(stringify(newSchema), stringify(newUiSchema)),
                        definitionData: schemaData.definitions,
                        definitionUi: uiSchemaData.definitions,
                        path: 'root',
                        cardOpenArray,
                        setCardOpenArray,
                        allFormInputs,
                        mods,
                        categoryHash,
                        Card,
                        Section,
                      }).map((element: any, index) => (
                        <Draggable
                          key={element.key}
                          draggableId={element.key}
                          index={index}
                        >
                          {(providedDraggable: any) => (
                            <div
                              ref={providedDraggable.innerRef}
                              {...providedDraggable.draggableProps}
                              {...providedDraggable.dragHandleProps}
                            >
                              {element}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {providedDroppable.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </ChakraCard.Body>
            <ChakraCard.Footer py={4}>
              <Center w={"full"}>
                <HStack gap={4}>
                  <Button>Add Card</Button>

                  <Button>Add Section</Button>
                </HStack>
              </Center>
            </ChakraCard.Footer>
          </ChakraCard.Root>
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

/**
 *
 * return (
 *     <div className={`${classes.formBuilder} ${className || ""}`}>
 *       <Alert
 *         style={{
 *           display: unsupportedFeatures.length === 0 ? "none" : "block",
 *         }}
 *         color="warning"
 *       >
 *         <h5>Unsupported Features:</h5>
 *         {unsupportedFeatures.map((message, index) => (
 *           <li key={index}>{message}</li>
 *         ))}
 *       </Alert>
 *       {(!mods || mods.showFormHead !== false) && (
 *         <div className={classes.formHead} data-test="form-head">
 *           <div>
 *             <h5 data-test="form-name-label">{mods && mods.labels && typeof mods.labels.formNameLabel === "string" ? mods.labels.formNameLabel : "Form Name"}</h5>
 *             <Input
 *               value={schemaData.title || ""}
 *               placeholder="Title"
 *               type="text"
 *               onChange={(ev) => {
 *                 onChange(
 *                   stringify({
 *                     ...schemaData,
 *                     title: ev.target.value,
 *                   }),
 *                   uischema,
 *                 )
 *               }}
 *               className="form-title"
 *             />
 *           </div>
 *           <div>
 *             <h5 data-test="form-description-label">
 *               {mods && mods.labels && typeof mods.labels.formDescriptionLabel === "string" ? mods.labels.formDescriptionLabel : "Form Description"}
 *             </h5>
 *             <Input
 *               value={schemaData.description || ""}
 *               placeholder="Description"
 *               type="text"
 *               onChange={(ev) =>
 *                 onChange(
 *                   stringify({
 *                     ...schemaData,
 *                     description: ev.target.value,
 *                   }),
 *                   uischema,
 *                 )
 *               }
 *               className="form-description"
 *             />
 *           </div>
 *         </div>
 *       )}
 *       <div className={`form-body ${classes.formBody}`}>
 *         <DragDropContext
 *           onDragEnd={(result) =>
 *             onDragEnd(result, {
 *               schema: schemaData,
 *               uischema: uiSchemaData,
 *               onChange: (newSchema, newUiSchema) => onChange(stringify(newSchema), stringify(newUiSchema)),
 *               definitionData: schemaData.definitions,
 *               definitionUi: uiSchemaData.definitions,
 *               categoryHash,
 *             })
 *           }
 *         >
 *           <Droppable droppableId="droppable" type={DROPPABLE_TYPE}>
 *             {(providedDroppable) => (
 *               <div ref={providedDroppable.innerRef} {...providedDroppable.droppableProps}>
 *                 {generateElementComponentsFromSchemas({
 *                   schemaData,
 *                   uiSchemaData,
 *                   onChange: (newSchema, newUiSchema) => onChange(stringify(newSchema), stringify(newUiSchema)),
 *                   definitionData: schemaData.definitions,
 *                   definitionUi: uiSchemaData.definitions,
 *                   path: "root",
 *                   cardOpenArray,
 *                   setCardOpenArray,
 *                   allFormInputs,
 *                   mods,
 *                   categoryHash,
 *                   Card,
 *                   Section,
 *                 }).map((element: any, index) => (
 *                   <Draggable key={element.key} draggableId={element.key} index={index}>
 *                     {(providedDraggable) => (
 *                       <div ref={providedDraggable.innerRef} {...providedDraggable.draggableProps} {...providedDraggable.dragHandleProps}>
 *                         {element}
 *                       </div>
 *                     )}
 *                   </Draggable>
 *                 ))}
 *                 {providedDroppable.placeholder}
 *               </div>
 *             )}
 *           </Droppable>
 *         </DragDropContext>
 *       </div>
 *       <div className={`form-footer ${classes.formFooter}`}>
 *         {!hideAddButton && mods?.components?.add && mods.components.add(addProperties)}
 *         {!mods?.components?.add && (
 *           <Add
 *             tooltipDescription={((mods || {}).tooltipDescriptions || {}).add}
 *             labels={mods?.labels ?? {}}
 *             addElem={(choice: string) => {
 *               if (choice === "card") {
 *                 addCardObj(addProperties)
 *               } else if (choice === "section") {
 *                 addSectionObj(addProperties)
 *               }
 *             }}
 *             hidden={hideAddButton}
 *           />
 *         )}
 *       </div>
 *     </div>
 *   )
 *
 */

/**
 *
 * const useStyles = createUseStyles({
 *   formBuilder: {
 *     "text-align": "center",
 *     "& .fa": {
 *       cursor: "pointer",
 *     },
 *     "& .fa-question-circle, & .fa-circle-question": {
 *       color: "gray",
 *     },
 *     "& .fa-asterisk": {
 *       "font-size": ".9em",
 *       color: "green",
 *     },
 *     "& .fa-plus-square, & .fa-square-plus": {
 *       color: "green",
 *       "font-size": "1.5em",
 *       margin: "0 auto",
 *     },
 *     ...arrowsStyle,
 *     "& .card-container": {
 *       "&:hover": {
 *         border: "1px solid green",
 *       },
 *       display: "block",
 *       width: "70%",
 *       "min-width": "400px",
 *       margin: "2em auto",
 *       border: "1px solid gray",
 *       "border-radius": "4px",
 *       "background-color": "white",
 *       "& h4": {
 *         width: "100%",
 *         "text-align": "left",
 *         display: "inline-block",
 *         color: "#138AC2",
 *         margin: "0.25em .5em 0 .5em",
 *         "font-size": "18px",
 *       },
 *       "& .d-flex": {
 *         "border-bottom": "1px solid gray",
 *       },
 *       "& .label": {
 *         float: "left",
 *       },
 *     },
 *     "& .card-container:hover": { border: "1px solid green" },
 *     "& .card-dependent": {
 *       border: "1px dashed gray",
 *     },
 *     "& .card-requirements": {
 *       border: "1px dashed black",
 *     },
 *     "& .section-container": {
 *       "&:hover": {
 *         border: "1px solid green",
 *       },
 *       display: "block",
 *       width: "90%",
 *       "min-width": "400px",
 *       margin: "2em auto",
 *       border: "1px solid gray",
 *       "border-radius": "4px",
 *       "background-color": "white",
 *       "& h4": {
 *         width: "100%",
 *         "text-align": "left",
 *         display: "inline-block",
 *         color: "#138AC2",
 *         margin: "0.25em .5em 0 .5em",
 *         "font-size": "18px",
 *       },
 *       "& .d-flex": {
 *         "border-bottom": "1px solid gray",
 *       },
 *       "& .label": {
 *         float: "left",
 *       },
 *     },
 *     "& .section-container:hover": { border: "1px solid green" },
 *     "& .section-dependent": {
 *       border: "1px dashed gray",
 *     },
 *     "& .section-requirements": {
 *       border: "1px dashed black",
 *     },
 *     "& .alert": {
 *       textAlign: "left",
 *       width: "70%",
 *       margin: "1em auto",
 *       "& h5": {
 *         color: "black",
 *         fontSize: "16px",
 *         fontWeight: "bold",
 *         margin: "0",
 *       },
 *       "& .fa": { fontSize: "14px" },
 *     },
 *     "& .disabled-unchecked-checkbox": {
 *       color: "gray",
 *       "& div::before": { backgroundColor: "lightGray" },
 *     },
 *     "& .disabled-input": {
 *       "& input": { backgroundColor: "lightGray" },
 *       "& input:focus": {
 *         backgroundColor: "lightGray",
 *         border: "1px solid gray",
 *       },
 *     },
 *   },
 *   formHead: {
 *     display: "block",
 *     margin: "0 auto",
 *     "background-color": "#EBEBEB",
 *     border: "1px solid #858F96",
 *     "border-radius": "4px",
 *     width: "70%",
 *     padding: "10px",
 *     "& div": {
 *       width: "30%",
 *       display: "inline-block",
 *       "text-align": "left",
 *       padding: "10px",
 *     },
 *     "& .form-title": {
 *       "text-align": "left",
 *     },
 *     "& .form-description": {
 *       "text-align": "left",
 *     },
 *     "& h5": {
 *       "font-size": "14px",
 *       "line-height": "21px",
 *       "font-weight": "bold",
 *     },
 *   },
 *   formBody: {
 *     display: "flex",
 *     flexDirection: "column",
 *     "& .fa-pencil-alt, & .fa-pencil": {
 *       border: "1px solid #1d71ad",
 *       color: "#1d71ad",
 *     },
 *     "& .modal-body": {
 *       maxHeight: "500px",
 *       overflowY: "scroll",
 *     },
 *     "& .card-add": {
 *       cursor: "pointer",
 *       display: "block",
 *       color: "$green",
 *       fontSize: "1.5em",
 *     },
 *   },
 *   formFooter: {
 *     marginTop: "1em",
 *     textAlign: "center",
 *     "& .fa": { cursor: "pointer", color: "$green", fontSize: "1.5em" },
 *   },
 * })
 *
 */
