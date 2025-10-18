import React, { ReactElement } from "react"
import { Select, Alert, Field, Input, Collapsible, HStack, Text, IconButton, Box } from "@chakra-ui/react"
import { LuArrowUp, LuArrowDown, LuPencil, LuTrash } from "react-icons/lu"

import { checkForUnsupportedFeatures, countElementsFromSchema } from "./utils"
import { getRandomId } from "./utils"
import type { SectionPropsType } from "./types"
import { InfoTip } from "@dev-kit/components"
import JsonView from "react18-json-view"

export default function Section({
  name,
  required,
  schema,
  uischema,
  onChange,
  onNameChange,
  onRequireToggle,
  onDependentsChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  path,
  definitionData,
  definitionUi,
  hideKey,
  reference,
  dependents,
  dependent,
  parent,
  parentProperties,
  neighborNames,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  categoryHash,
}: SectionPropsType): ReactElement {
  const unsupportedFeatures = checkForUnsupportedFeatures(schema || {}, uischema || {}, allFormInputs)
  const schemaData = schema || {}
  const elementNum = countElementsFromSchema(schemaData)
  const defaultCollapseStates = [...Array(elementNum)].map(() => false)
  const [cardOpenArray, setCardOpenArray] = React.useState(defaultCollapseStates)
  // keep name in state to avoid losing focus
  const [keyName, setKeyName] = React.useState(name)
  const [keyError, setKeyError] = React.useState<null | string>(null)
  // keep requirements in state to avoid rapid updates
  const [modalOpen, setModalOpen] = React.useState(false)
  const [elementId] = React.useState(getRandomId())
  const addProperties = {
    schema,
    uischema,
    mods,
    onChange,
    definitionData,
    definitionUi,
    categoryHash,
  }
  const hideAddButton = schemaData.properties && Object.keys(schemaData.properties).length !== 0

  return (
    <React.Fragment>
      <Collapsible.Root open={cardOpen} onOpenChange={() => setCardOpen(!cardOpen)}>
        <Collapsible.Trigger>
          <HStack w={"full"} boxShadow={"sm"} borderRadius={"sm"} css={{ cursor: "pointer" }} justifyContent={"space-between"}>
            <HStack flex={1}>
              <Text textStyle={"lg"}>{schemaData.title || keyName}</Text>
              {parent && <InfoTip content={`Depends on ${parent}`} id={`${elementId}_parentinfo`} />}
            </HStack>
            <HStack flex={1} justifyContent={"flex-end"} gap={3}>
              <IconButton size={"md"} onClick={() => (onMoveUp ? onMoveUp() : {})}>
                <LuArrowUp />
              </IconButton>

              <IconButton size={"md"} onClick={() => (onMoveDown ? onMoveDown() : {})}>
                <LuArrowDown />
              </IconButton>

              <IconButton size={"md"}>
                <LuTrash />
              </IconButton>

              <IconButton size={"md"}>
                <LuPencil />
              </IconButton>
            </HStack>
          </HStack>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Box padding="4" borderWidth="1px" w={"full"}>
            <JsonView
              src={{
                reference: reference,
                path: path,
                hideKey: hideKey,
                dependents: dependents,
                dependent: dependent,
                parent,
                parentProperties,
                neighborNames,
              }}
            />
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </React.Fragment>
  )
}

/**
 *
 *
 * <Collapse
 *         isOpen={cardOpen}
 *         toggleCollapse={() => setCardOpen(!cardOpen)}
 *         title={
 *           <React.Fragment>
 *             <span onClick={() => setCardOpen(!cardOpen)} className='label'>
 *               {schemaData.title || keyName}{' '}
 *               {parent ? (
 *                 <Tooltip
 *                   text={`Depends on ${parent}`}
 *                   id={`${elementId}_parentinfo`}
 *                   type='alert'
 *                 />
 *               ) : (
 *                 ''
 *               )}
 *             </span>
 *             <span className='arrows'>
 *               <span id={`${elementId}_moveupbiginfo`}>
 *                 <FontAwesomeIcon
 *                   icon={faArrowUp}
 *                   onClick={() => (onMoveUp ? onMoveUp() : {})}
 *                 />
 *               </span>
 *               <UncontrolledTooltip
 *                 placement='top'
 *                 target={`${elementId}_moveupbiginfo`}
 *               >
 *                 Move form element up
 *               </UncontrolledTooltip>
 *               <span id={`${elementId}_movedownbiginfo`}>
 *                 <FontAwesomeIcon
 *                   icon={faArrowDown}
 *                   onClick={() => (onMoveDown ? onMoveDown() : {})}
 *                 />
 *               </span>
 *               <UncontrolledTooltip
 *                 placement='top'
 *                 target={`${elementId}_movedownbiginfo`}
 *               >
 *                 Move form element down
 *               </UncontrolledTooltip>
 *             </span>
 *           </React.Fragment>
 *         }
 *         className={`section-container ${classes.sectionContainer} ${
 *           dependent ? 'section-dependent' : ''
 *         } ${reference ? 'section-reference' : ''}`}
 *       >
 *         <div
 *           className={`section-entries ${reference ? 'section-reference' : ''}`}
 *         >
 *           <div className='section-head'>
 *             {reference ? (
 *               <div className='section-entry section-reference'>
 *                 <h5>Reference Section</h5>
 *                 <Select
 *                   value={{
 *                     value: reference,
 *                     label: reference,
 *                   }}
 *                   placeholder='Reference'
 *                   options={Object.keys(definitionData).map((key) => ({
 *                     value: `#/definitions/${key}`,
 *                     label: `#/definitions/${key}`,
 *                   }))}
 *                   onChange={(val: any) => {
 *                     onChange(schema, uischema, val.value);
 *                   }}
 *                   className='section-select'
 *                 />
 *               </div>
 *             ) : (
 *               ''
 *             )}
 *             <div className='section-entry' data-test='section-object-name'>
 *               <h5>
 *                 Section Object Name{' '}
 *                 <Tooltip
 *                   text={
 *                     mods &&
 *                     mods.tooltipDescriptions &&
 *                     mods.tooltipDescriptions &&
 *                     typeof mods.tooltipDescriptions.cardSectionObjectName ===
 *                       'string'
 *                       ? mods.tooltipDescriptions.cardSectionObjectName
 *                       : 'The key to the object that will represent this form section.'
 *                   }
 *                   id={`${elementId}_nameinfo`}
 *                   type='help'
 *                 />
 *               </h5>
 *               <FormGroup>
 *                 <Input
 *                   invalid={keyError !== null}
 *                   value={keyName || ''}
 *                   placeholder='Key'
 *                   type='text'
 *                   onChange={(ev) => setKeyName(ev.target.value)}
 *                   onBlur={(ev) => {
 *                     const { value } = ev.target;
 *                     if (
 *                       value === name ||
 *                       !(neighborNames && neighborNames.includes(value))
 *                     ) {
 *                       setKeyError(null);
 *                       onNameChange(value);
 *                     } else {
 *                       setKeyName(name);
 *                       setKeyError(`"${value}" is already in use.`);
 *                       onNameChange(name);
 *                     }
 *                   }}
 *                   className='card-text'
 *                   readOnly={hideKey}
 *                 />
 *                 <FormFeedback>{keyError}</FormFeedback>
 *               </FormGroup>
 *             </div>
 *             <div className='section-entry' data-test='section-display-name'>
 *               <h5>
 *                 Section Display Name{' '}
 *                 <Tooltip
 *                   text={
 *                     mods &&
 *                     mods.tooltipDescriptions &&
 *                     mods.tooltipDescriptions &&
 *                     typeof mods.tooltipDescriptions.cardSectionDisplayName ===
 *                       'string'
 *                       ? mods.tooltipDescriptions.cardSectionDisplayName
 *                       : 'The name of the form section that will be shown to users of the form.'
 *                   }
 *                   id={`${elementId}_titleinfo`}
 *                   type='help'
 *                 />
 *               </h5>
 *               <Input
 *                 value={schemaData.title || ''}
 *                 placeholder='Title'
 *                 type='text'
 *                 onChange={(ev) =>
 *                   onChange(
 *                     {
 *                       ...schema,
 *                       title: ev.target.value,
 *                     },
 *                     uischema,
 *                   )
 *                 }
 *                 className='card-text'
 *               />
 *             </div>
 *             <div className='section-entry' data-test='section-description'>
 *               <h5>
 *                 Section Description{' '}
 *                 <Tooltip
 *                   text={
 *                     mods &&
 *                     mods.tooltipDescriptions &&
 *                     mods.tooltipDescriptions &&
 *                     typeof mods.tooltipDescriptions.cardSectionDescription ===
 *                       'string'
 *                       ? mods.tooltipDescriptions.cardSectionDescription
 *                       : 'A description of the section which will be visible on the form.'
 *                   }
 *                   id={`${elementId}_descriptioninfo`}
 *                   type='help'
 *                 />
 *               </h5>
 *               <Input
 *                 value={schemaData.description || ''}
 *                 placeholder='Description'
 *                 type='text'
 *                 onChange={(ev) =>
 *                   onChange(
 *                     {
 *                       ...schema,
 *                       description: ev.target.value,
 *                     },
 *                     uischema,
 *                   )
 *                 }
 *                 className='card-text'
 *               />
 *             </div>
 *             <Alert
 *               style={{
 *                 display: unsupportedFeatures.length === 0 ? 'none' : 'block',
 *               }}
 *               color='warning'
 *             >
 *               <h5>Unsupported Features:</h5>
 *               {unsupportedFeatures.map((message) => (
 *                 <li key={`${elementId}_${message}`}>{message}</li>
 *               ))}
 *             </Alert>
 *           </div>
 *           <div className='section-body'>
 *             <DragDropContext
 *               onDragEnd={(result) =>
 *                 onDragEnd(result, {
 *                   schema,
 *                   uischema,
 *                   onChange,
 *                   definitionData,
 *                   definitionUi,
 *                   categoryHash,
 *                 })
 *               }
 *             >
 *               <Droppable droppableId='droppable' type={DROPPABLE_TYPE}>
 *                 {(providedDroppable) => (
 *                   <div
 *                     ref={providedDroppable.innerRef}
 *                     {...providedDroppable.droppableProps}
 *                   >
 *                     {generateElementComponentsFromSchemas({
 *                       schemaData: schema,
 *                       uiSchemaData: uischema,
 *                       onChange,
 *                       path,
 *                       definitionData,
 *                       definitionUi,
 *                       cardOpenArray,
 *                       setCardOpenArray,
 *                       allFormInputs,
 *                       mods,
 *                       categoryHash,
 *                       Card,
 *                       Section,
 *                     }).map((element: any, index) => (
 *                       <Draggable
 *                         key={element.key}
 *                         draggableId={element.key}
 *                         index={index}
 *                       >
 *                         {(providedDraggable) => (
 *                           <div
 *                             ref={providedDraggable.innerRef}
 *                             {...providedDraggable.draggableProps}
 *                             {...providedDraggable.dragHandleProps}
 *                           >
 *                             {element}
 *                           </div>
 *                         )}
 *                       </Draggable>
 *                     ))}
 *                     {providedDroppable.placeholder}
 *                   </div>
 *                 )}
 *               </Droppable>
 *             </DragDropContext>
 *           </div>
 *           <div className='section-footer'>
 *             {!hideAddButton &&
 *               mods?.components?.add &&
 *               mods.components.add(addProperties)}
 *             {!mods?.components?.add && (
 *               <Add
 *                 tooltipDescription={
 *                   ((mods || {}).tooltipDescriptions || {}).add
 *                 }
 *                 addElem={(choice: string) => {
 *                   if (choice === 'card') {
 *                     addCardObj(addProperties);
 *                   } else if (choice === 'section') {
 *                     addSectionObj(addProperties);
 *                   }
 *                 }}
 *                 hidden={hideAddButton}
 *               />
 *             )}
 *           </div>
 *           <div className='section-interactions'>
 *             <span id={`${elementId}_editinfo`}>
 *               <FontAwesomeIcon
 *                 icon={faPencilAlt}
 *                 onClick={() => setModalOpen(true)}
 *               />
 *             </span>
 *             <UncontrolledTooltip
 *               placement='top'
 *               target={`${elementId}_editinfo`}
 *             >
 *               Additional configurations for this form element
 *             </UncontrolledTooltip>
 *             <span id={`${elementId}_trashinfo`}>
 *               <FontAwesomeIcon
 *                 icon={faTrash}
 *                 onClick={() => (onDelete ? onDelete() : {})}
 *               />
 *             </span>
 *             <UncontrolledTooltip
 *               placement='top'
 *               target={`${elementId}_trashinfo`}
 *             >
 *               Delete form element
 *             </UncontrolledTooltip>
 *             <FBCheckbox
 *               onChangeValue={() => onRequireToggle()}
 *               isChecked={required}
 *               label='Required'
 *               id={`${elementId}_required`}
 *             />
 *           </div>
 *         </div>
 *         <CardModal
 *           componentProps={{
 *             dependents,
 *             neighborNames,
 *             name: keyName,
 *             schema,
 *             type: 'object',
 *             'ui:column': uischema['ui:column'] ?? '',
 *             'ui:options': uischema['ui:options'] ?? '',
 *           }}
 *           isOpen={modalOpen}
 *           onClose={() => setModalOpen(false)}
 *           onChange={(newComponentProps: { [key: string]: any }) => {
 *             onDependentsChange(newComponentProps.dependents);
 *             onChange(schema, {
 *               ...uischema,
 *               'ui:column': newComponentProps['ui:column'],
 *             });
 *           }}
 *           TypeSpecificParameters={CardDefaultParameterInputs}
 *         />
 *       </Collapse>
 *       {mods?.components?.add && mods.components.add(parentProperties)}
 *       {!mods?.components?.add && (
 *         <Add
 *           tooltipDescription={((mods || {}).tooltipDescriptions || {}).add}
 *           addElem={(choice: string) => {
 *             if (choice === 'card') {
 *               addCardObj(parentProperties);
 *             } else if (choice === 'section') {
 *               addSectionObj(parentProperties);
 *             }
 *             setCardOpen(false);
 *           }}
 *         />
 *       )}
 *
 *
 *
 *
 *
 */
