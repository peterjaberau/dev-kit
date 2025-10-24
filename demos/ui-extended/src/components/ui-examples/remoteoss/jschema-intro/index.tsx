"use client"
import { useState } from "react"
import { createHeadlessForm } from "@remoteoss/json-schema-form"
import { formValuesToJsonValues, getDefaultValuesFromFields } from "./utils"
import { Box, Stack, Text, Field, Fieldset, RadioCard, Input, chakra } from "@chakra-ui/react"

const fieldsMap: any = {
  text: FieldText,
  number: FieldNumber,
  radio: FieldRadio,
  error: FieldUnknown,
}

const initialValuesFromAPI = {
  name: "Mega team",
}

function SmartForm({ name, fields, initialValues, handleValidation, onSubmit }: any) {
  const [values, setValues] = useState(() => getDefaultValuesFromFields(fields, initialValues))
  const [errors, setErrors]: any = useState({})
  const [submited, setSubmited] = useState(false)

  function handleInternalValidation(valuesToValidate: any) {
    const valuesForJson = formValuesToJsonValues(fields, valuesToValidate)
    const { formErrors } = handleValidation(valuesForJson)

    setErrors(formErrors || {})

    return {
      errors: formErrors,
      jsonValues: valuesForJson,
    }
  }

  function handleFieldChange(fieldName: any, value: any) {
    const newValues = {
      ...values,
      [fieldName]: value,
    }
    setValues(newValues)

    handleInternalValidation(newValues)
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    setSubmited(true)

    const validation = handleInternalValidation(values)

    if (validation.errors) {
      return null
    }

    return onSubmit(validation.jsonValues, { formValues: values })
  }

  return (
    <form name={name} onSubmit={handleSubmit} noValidate>
      <Stack gap="24px">
        {fields?.map((field: any) => {
          const { name: fieldName, inputType, ...rest } = field
          const FieldComponent = fieldsMap[inputType] || fieldsMap.error

          // {...field}
          return <FieldComponent key={fieldName} value={values?.[fieldName]} error={errors[fieldName]} submited={submited} onChange={handleFieldChange} {...rest} />
        })}

        <button type="submit">Submit</button>
      </Stack>
    </form>
  )
}

function FieldText({ type, name, label, description, value, isVisible, error, submited, onChange, required, ...props }: any) {
  const [touched, setTouched] = useState(false)

  if (!isVisible) return null

  function handleChange(e: any) {
    if (!touched) setTouched(true)
    onChange(name, e.target.value)
  }

  // {...props}
  return (
    <Field.Root invalid={error} required={required}>
      <Field.Label>
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>
      <Input id={name} type="text" defaultValue={value} />
      {description && <Field.HelperText id={`${name}-description`}>{description}</Field.HelperText>}

      {(touched || submited) && error && <Field.ErrorText id={`${name}-error`}>{error}</Field.ErrorText>}
    </Field.Root>
  )
}

function FieldNumber(props: any) {
  return (
    <FieldText
      inputMode="decimal"
      // accepts numbers and dots (eg 10, 15.50)
      pattern="^[0-9.]*$"
      {...props}
    />
  )
}

function FieldRadio({ name, label, description, value, options, isVisible, error, submited, onChange }: any) {
  const [touched, setTouched] = useState(false)

  if (!isVisible) return null

  function handleChange(e: any) {
    if (!touched) setTouched(true)
    onChange(name, e.target.value)
  }

  const displayError = submited || touched ? error : null

  return (
    <Field.Root key={name} invalid={displayError}>
      <Field.Label>{label}</Field.Label>
      <RadioCard.Root name={name} key={name} defaultValue={value}>
        <RadioCard.Label>{label}</RadioCard.Label>
        <Stack>
          {options.map((opt: any) => (
            <RadioCard.Item key={opt.value} value={opt.value}>
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>
                <RadioCard.ItemText>{opt.label}</RadioCard.ItemText>
                <RadioCard.ItemIndicator />
              </RadioCard.ItemControl>
            </RadioCard.Item>
          ))}
        </Stack>
      </RadioCard.Root>
      {description && <Field.HelperText id={`${name}-description`}>{description}</Field.HelperText>}

      {displayError && <Field.ErrorText id={`${name}-error`}>{displayError}</Field.ErrorText>}
    </Field.Root>
  )
}

function FieldUnknown({ type, name, error }: any) {
  return (
    <Box css={{ border: "1px dashed", borderColor: "gray", padding: 4 }}>
      Field "{name}" unsupported: The type "{type}" has no UI component built yet.
      {error && (
        <Text color="fg.error" id={`${name}-error`}>
          {error}
        </Text>
      )}
    </Box>
  )
}

const jsonSchemaDemo = {
  additionalProperties: false,
  properties: {
    name: {
      title: "Name",
      type: "string",
      minLength: 3,
      default: "vanilla team",
    },
    plan: {
      title: "Account plan",
      description: "Pick the best plan that suits your needs.",
      oneOf: [
        { const: "personal", title: "Personal" },
        { const: "standard", title: "Standard" },
        { const: "enterprise", title: "Enterprise" },
      ],
      type: "string",
    },
    team_size: {
      title: "Team size",
      description: "Including you, how many members does your team has?",
      type: "number",
      minimum: 1,
    },
  },
  allOf: [
    {
      $comment: "If plan is enterprise, then team_size is required and must be bigger than 3.",
      if: {
        properties: {
          plan: {
            const: "enterprise",
          },
        },
        required: ["plan"],
      },
      then: {
        properties: {
          team_size: {
            minimum: 3,
          },
        },
        required: ["team_size"],
      },
    },
  ],
  required: ["name", "plan"],
}

export default function Index() {
  const { fields, handleValidation } = createHeadlessForm(jsonSchemaDemo, {
    strictInputType: false,
    initialValues: initialValuesFromAPI,
  })
  async function handleOnSubmit(jsonValues: any, { formValues }: any) {
    alert(`Submitted with succes! ${JSON.stringify({ formValues, jsonValues }, null, 3)}`)
    console.log("Submitted!", { formValues, jsonValues })
  }

  return (
    <article>
      <h1>json-schema-form + React</h1>
      <p>This demo uses React without any other Form library.</p>
      <br />

      <SmartForm
        onSubmit={handleOnSubmit}
        // From JSF
        fields={fields}
        initialValues={initialValuesFromAPI}
        handleValidation={handleValidation}
      />
    </article>
  )
}
