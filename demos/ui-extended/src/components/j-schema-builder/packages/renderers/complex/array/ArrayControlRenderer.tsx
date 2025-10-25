"use client"
import range from "lodash/range"
import { Button, IconButton, HStack, Stack, Text, Card, Flex, SimpleGrid, GridItem } from "@chakra-ui/react"
import React, { useMemo } from "react"
import { ArrayControlProps, composePaths, createDefaultValue, findUISchema, Helpers, ControlElement, ArrayTranslations } from "#jSchemaBuilder/core"
import { JsonFormsDispatch, withArrayTranslationProps, withJsonFormsArrayControlProps, withTranslateProps } from "#jSchemaBuilder/react"
import type { VanillaRendererProps } from "../../index"
import { withVanillaControlProps } from "../../util"

const { convertToValidClassName } = Helpers

export const ArrayControl = ({
  classNames,
  data,
  label,
  path,
  schema,
  errors,
  addItem,
  removeItems,
  moveUp,
  moveDown,
  uischema,
  uischemas,
  getStyleAsClassName,
  renderers,
  rootSchema,
  translations,
  enabled,
}: any | (ArrayControlProps & VanillaRendererProps & { translations: ArrayTranslations })) => {
  const controlElement = uischema as ControlElement
  const childUiSchema = useMemo(
    () => findUISchema(uischemas, schema, uischema.scope, path, undefined, uischema, rootSchema),
    [uischemas, schema, uischema.scope, path, uischema, rootSchema],
  )
  const isValid = errors.length === 0
  const validationClass = getStyleAsClassName("array.control.validation")
  const divClassNames = [validationClass].concat(isValid ? "" : getStyleAsClassName("array.control.validation.error")).join(" ")
  const buttonClassAdd = getStyleAsClassName("array.control.add")
  const labelClass = getStyleAsClassName("array.control.label")
  const childControlsClass = getStyleAsClassName("array.child.controls")
  const buttonClassUp = getStyleAsClassName("array.child.controls.up")
  const buttonClassDown = getStyleAsClassName("array.child.controls.down")
  const buttonClassDelete = getStyleAsClassName("array.child.controls.delete")
  const controlClass = [getStyleAsClassName("array.control"), convertToValidClassName(controlElement.scope)].join(" ")

  return (
    <Card.Root size={"sm"} className={controlClass}>
      <Card.Header>
        <HStack gap={4} w={"full"} alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <Card.Title flex={1}>{label}</Card.Title>
          </HStack>
          <HStack justifyContent={"flex-end"} gap={4}>
            <Button size={"xs"} variant={"outline"} disabled={!enabled} onClick={addItem(path, createDefaultValue(schema, rootSchema))}>
              Add to {label}
            </Button>
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body gap={4}>
        <div className={divClassNames}>{errors}</div>

        {data ? (
          range(0, data.length).map((index) => {
            const childPath = composePaths(path, `${index}`)
            return (
              <Card.Root w={"full"} flex={1} key={index}>
                <Card.Body>
                  <JsonFormsDispatch schema={schema} uischema={childUiSchema || uischema} path={childPath} key={childPath} renderers={renderers} />
                </Card.Body>
                <Card.Footer>
                  <Flex gap={2} className={childControlsClass}>
                    <Button
                      size="xs"
                      variant={"outline"}
                      className={buttonClassUp}
                      disabled={!enabled}
                      aria-label={translations.upAriaLabel}
                      onClick={() => {
                        moveUp(path, index)()
                      }}
                    >
                      {translations.up}
                    </Button>
                    <Button
                      size="xs"
                      variant={"outline"}
                      className={buttonClassDown}
                      disabled={!enabled}
                      aria-label={translations.downAriaLabel}
                      onClick={() => {
                        moveDown(path, index)()
                      }}
                    >
                      {translations.down}
                    </Button>
                    <Button
                      size="xs"
                      variant={"outline"}
                      className={buttonClassDelete}
                      disabled={!enabled}
                      aria-label={translations.removeAriaLabel}
                      onClick={() => {
                        if (window.confirm("Are you sure you wish to delete this item?")) {
                          removeItems(path, [index])()
                        }
                      }}
                    >
                      {translations.removeTooltip}
                    </Button>
                  </Flex>
                </Card.Footer>
              </Card.Root>
            )
          })
        ) : (
          <p>{translations.noDataMessage}</p>
        )}
      </Card.Body>
    </Card.Root>
  )
}

export const ArrayControlRenderer = ({
  schema,
  uischema,
  data,
  path,
  rootSchema,
  uischemas,
  addItem,
  getStyle,
  getStyleAsClassName,
  removeItems,
  moveUp,
  moveDown,
  id,
  visible,
  enabled,
  errors,
  translations,
  arraySchema,
}: any | (ArrayControlProps & VanillaRendererProps & { translations: ArrayTranslations })) => {
  const controlElement = uischema as ControlElement
  const labelDescription = Helpers.createLabelDescriptionFrom(controlElement, schema)
  const label = labelDescription.show ? labelDescription.text : ""
  const controlClassName = `control ${Helpers.convertToValidClassName(controlElement.scope)}`
  const fieldSetClassName = getStyleAsClassName("array.layout")
  const buttonClassName = getStyleAsClassName("array.button")
  const childrenClassName = getStyleAsClassName("array.children")
  const classNames: { [className: string]: string } = {
    wrapper: controlClassName,
    fieldSet: fieldSetClassName,
    button: buttonClassName,
    children: childrenClassName,
  }

  return (
    <ArrayControl
      classNames={classNames}
      data={data}
      label={label}
      path={path}
      schema={schema}
      arraySchema={arraySchema}
      errors={errors}
      addItem={addItem}
      removeItems={removeItems}
      moveUp={moveUp}
      moveDown={moveDown}
      uischema={uischema}
      uischemas={uischemas}
      getStyleAsClassName={getStyleAsClassName}
      rootSchema={rootSchema}
      id={id}
      visible={visible}
      enabled={enabled}
      getStyle={getStyle}
      translations={translations}
    />
  )
}

export default withVanillaControlProps(withJsonFormsArrayControlProps(withTranslateProps(withArrayTranslationProps(ArrayControlRenderer))))
