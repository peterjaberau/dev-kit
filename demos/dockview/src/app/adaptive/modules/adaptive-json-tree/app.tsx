import { AppProvider, ThemeProvider } from "./providers"

const App = (props: any) => {
  const {children, ...rest} = props
  return (
    <>
      <AppProvider {...rest}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AppProvider>
    </>
  )
}

export default App
