import { SchemaFormProvider as Provider } from "./machines/schema-form.provider"

export const SchemaFormProvider = ({children}: any) => {
  return (
    <>
      <Provider>
        {children}
      </Provider>
    </>
  )
}
