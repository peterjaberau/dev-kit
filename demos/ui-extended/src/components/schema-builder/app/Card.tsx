import React, { ReactElement } from "react"
import { LuArrowUp, LuArrowDown, LuPencil, LuTrash } from "react-icons/lu"
import { Collapsible, HStack, Box, Text, IconButton } from "@chakra-ui/react"
import { InfoTip } from "@dev-kit/components"
import JsonView from "react18-json-view"
import { getRandomId } from "./utils"
import type { CardPropsType, CardComponentPropsType } from "./types"

export default function Card({
  componentProps,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  TypeSpecificParameters,
  addElem,
  cardOpen,
  setCardOpen,
  allFormInputs,
  mods,
  showObjectNameInput = true,
  addProperties,
}: any) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const [elementId] = React.useState(getRandomId())

  return (
    <React.Fragment>
      <Collapsible.Root open={cardOpen} onOpenChange={() => setCardOpen(!cardOpen)}>
        <Collapsible.Trigger>
          <HStack w={"full"} boxShadow={"sm"} borderRadius={"sm"} css={{ cursor: "pointer" }} justifyContent={"space-between"}>
            <HStack flex={1}>
              <Text textStyle={"lg"}>{componentProps.title || componentProps.name}</Text>
              {componentProps.parent && <InfoTip content={`Depends on ${componentProps.parent}`} id={`${elementId}_parentinfo`} />}
              {componentProps.$ref !== undefined && <InfoTip content={`Is an instance of pre-configured component ${componentProps.$ref}`} id={`${elementId}_refinfo`} />}
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
                componentProps: componentProps,
                TypeSpecificParameters: TypeSpecificParameters,
                showObjectNameInput: true,
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
 *             <span onClick={() => setCardOpen(!cardOpen)} className="label">
 *               {componentProps.title || componentProps.name}{" "}
 *               {componentProps.parent ? <Tooltip text={`Depends on ${componentProps.parent}`} id={`${elementId}_parentinfo`} type="alert" /> : ""}
 *               {componentProps.$ref !== undefined ? (
 *                 <Tooltip text={`Is an instance of pre-configured component ${componentProps.$ref}`} id={`${elementId}_refinfo`} type="alert" />
 *               ) : (
 *                 ""
 *               )}
 *             </span>
 *             <span className="arrows">
 *               <span id={`${elementId}_moveupbiginfo`}>
 *                 <FontAwesomeIcon icon={faArrowUp} onClick={() => (onMoveUp ? onMoveUp() : {})} />
 *               </span>
 *               <UncontrolledTooltip placement="top" target={`${elementId}_moveupbiginfo`}>
 *                 Move form element up
 *               </UncontrolledTooltip>
 *               <span id={`${elementId}_movedownbiginfo`}>
 *                 <FontAwesomeIcon icon={faArrowDown} onClick={() => (onMoveDown ? onMoveDown() : {})} />
 *               </span>
 *               <UncontrolledTooltip placement="top" target={`${elementId}_movedownbiginfo`}>
 *                 Move form element down
 *               </UncontrolledTooltip>
 *             </span>
 *           </React.Fragment>
 *         }
 *         className={`card-container ${componentProps.dependent ? "card-dependent" : ""} ${componentProps.$ref === undefined ? "" : "card-reference"}`}
 *       >
 *         <div className={classes.cardEntries}>
 *           <CardGeneralParameterInputs parameters={componentProps} onChange={onChange} allFormInputs={allFormInputs} mods={mods} showObjectNameInput={showObjectNameInput} />
 *         </div>
 *         <div className={classes.cardInteractions}>
 *           <span id={`${elementId}_editinfo`}>
 *             <FontAwesomeIcon icon={faPencilAlt} onClick={() => setModalOpen(true)} />
 *           </span>
 *           <UncontrolledTooltip placement="top" target={`${elementId}_editinfo`}>
 *             Additional configurations for this form element
 *           </UncontrolledTooltip>
 *           <span id={`${elementId}_trashinfo`}>
 *             <FontAwesomeIcon icon={faTrash} onClick={() => onDelete && onDelete()} />
 *           </span>
 *           <UncontrolledTooltip placement="top" target={`${elementId}_trashinfo`}>
 *             Delete form element
 *           </UncontrolledTooltip>
 *           <FBCheckbox
 *             onChangeValue={() =>
 *               onChange({
 *                 ...componentProps,
 *                 required: !componentProps.required,
 *               })
 *             }
 *             isChecked={!!componentProps.required}
 *             label="Required"
 *             id={`${elementId}_required`}
 *           />
 *         </div>
 *         <CardModal
 *           componentProps={componentProps as CardComponentPropsType}
 *           isOpen={modalOpen}
 *           onClose={() => setModalOpen(false)}
 *           onChange={(newComponentProps: CardComponentPropsType) => {
 *             onChange(newComponentProps)
 *           }}
 *           TypeSpecificParameters={TypeSpecificParameters}
 *         />
 *       </Collapse>
 *       {mods?.components?.add && mods?.components?.add(addProperties)}
 *       {!mods?.components?.add && addElem && <Add tooltipDescription={((mods || {}).tooltipDescriptions || {}).add} addElem={(choice: string) => addElem(choice)} />}
 *
 *
 */
