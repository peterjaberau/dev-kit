"use client"
import App from "./app"

const Index = ({ children, data }: any) => {
  return <App data={data}>{children}</App>
}

export default Index
