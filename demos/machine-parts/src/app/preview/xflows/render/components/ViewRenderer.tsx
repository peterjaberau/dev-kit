import React, { useState } from "react"
import type { ViewAction, ViewConfig } from "@xflows/core"
import {
  Card,
  chakra,
  Input,
  Separator,
  Checkbox,
  Textarea,
  NativeSelect,
  Badge,
  HStack,
  VStack,
  Stack,
  Button,
  Fieldset,
  Field,
} from "@chakra-ui/react"

interface ViewRendererProps {
  view: ViewConfig | undefined
  context: any
  onNext: (data?: any) => void
  onBack: () => void
  onEvent: (event: string, data?: any) => void
}

const ViewRenderer: React.FC<ViewRendererProps> = ({ view, context, onNext, onBack, onEvent }) => {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!view) {
    return <div className="xflows-loading">Loading...</div>
  }

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (view.fields) {
      view.fields.forEach((field) => {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = `${field.label} is required`
        }

        if (field.validation) {
          const value = formData[field.name]
          if (value && field.validation.minLength && value.length < field.validation.minLength) {
            newErrors[field.name] = `${field.label} must be at least ${field.validation.minLength} characters`
          }
          if (value && field.validation.maxLength && value.length > field.validation.maxLength) {
            newErrors[field.name] = `${field.label} must be no more than ${field.validation.maxLength} characters`
          }
          if (value && field.validation.pattern && !new RegExp(field.validation.pattern).test(value)) {
            newErrors[field.name] = `${field.label} format is invalid`
          }
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitFormAction = (action?: ViewAction) => {
    if (validateForm()) {
      if (action?.event) {
        onEvent(action.event, formData)
      } else {
        onNext(formData)
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLElement | null
    const submitEvent = submitter?.dataset.event
    const submitAction =
      view.actions?.find((action) => action.type === "submit" && action.event === submitEvent) ??
      view.actions?.find((action) => action.type === "submit")

    submitFormAction(submitAction)
  }

  const handleActionClick = (action: any) => {
    if (action.event === "GO_BACK") {
      onBack()
    } else if (action.event === "START_DEMO" || action.event === "RESTART_DEMO") {
      onNext()
    } else if (action.event === "CALL_API") {
      onEvent(action.event)
    } else if (action.type === "submit") {
      submitFormAction(action)
    } else {
      onEvent(action.event, formData)
    }
  }

  const renderField = (field: any) => (
    <Field.Root key={field.name}>
      <Field.Label>{field.label}</Field.Label>
      {field.required && <Field.RequiredIndicator />}
      {field.type === "text" || field.type === "email" ? (
        <Input
          size={"sm"}
          id={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={formData[field.name] || ""}
          colorPalette={errors[field.name] ? "red" : "gray"}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        />
      ) : field.type === "select" ? (
        <NativeSelect.Root invalid={!!errors[field.name]} size={"sm"}>
          <NativeSelect.Field
            id={field.name}
            value={formData[field.name] || ""}
            colorPalette={errors[field.name] ? "red" : "gray"}
            onChange={(e) => handleInputChange(field.name, e.currentTarget.value)}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      ) : field.type === "checkbox" ? (
        <Checkbox.Root
          checked={formData[field.name] || false}
          onCheckedChange={(e) => handleInputChange(field.name, e.checked)}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label> {field.label}</Checkbox.Label>
        </Checkbox.Root>
      ) : field.type === "textarea" ? (
        <Textarea
          size={"sm"}
          id={field.name}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          value={formData[field.name] || ""}
          colorPalette={errors[field.name] ? "red" : "gray"}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        />
      ) : null}

      {errors[field.name] && <div className="field-error">{errors[field.name]}</div>}
    </Field.Root>
  )

  return (
    <Card.Root variant={"elevated"} size={"sm"} css={{ flex: 1 }}>
      <Card.Header css={{ py: 2, borderBottom: "1px solid", borderBottomColor: "border" }}>
        {view.title && (
          <HStack>
            <Card.Title flex={1}>{view.title}</Card.Title>
            {view.subtitle && <Badge>{view.subtitle}</Badge>}
          </HStack>
        )}
        {view.message && <Card.Description>{view.message}</Card.Description>}
      </Card.Header>
      {view.type === "form" ? (
        <chakra.form onSubmit={handleSubmit} css={{ display: "contents" }}>
          <Card.Body>
            <Stack css={{ gap: 2, textAlign: "left" }}>{view.fields?.map(renderField)}</Stack>
          </Card.Body>
          <Card.Footer
            css={{
              justifyContent: "flex-end",
              py: 2,
              borderTop: "1px solid",
              borderTopColor: "border",
            }}
          >
            {view.actions?.map((action, index) => (
              <Button
                size={"sm"}
                key={index}
                type={action.type === "submit" ? "submit" : "button"}
                data-event={action.event}
                variant={action.type === "button" ? "subtle" : "solid"}
                onClick={action.type === "button" ? () => handleActionClick(action) : undefined}
              >
                {action.label}
              </Button>
            ))}
          </Card.Footer>
        </chakra.form>
      ) : (
        <>
          <Card.Footer
            css={{
              justifyContent: "flex-end",
              py: 2,
              borderTop: "1px solid",
              borderTopColor: "border",
            }}
          >
            {view.actions?.map((action, index) => (
              <Button
                key={index}
                type="button"
                variant={action.label.includes("Back") ? "subtle" : "solid"}
                onClick={() => handleActionClick(action)}
              >
                {action.label}
              </Button>
            ))}
          </Card.Footer>
        </>
      )}
    </Card.Root>
  )
}

export default ViewRenderer
