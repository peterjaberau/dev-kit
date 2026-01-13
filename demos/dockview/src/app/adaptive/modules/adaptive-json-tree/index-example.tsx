"use client"
import AppExample from "./app-example"

const Index = ({ children, data }: any) => {
  return <AppExample data={data}>{children}</AppExample>
}

export default Index
