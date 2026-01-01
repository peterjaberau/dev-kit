import React from "react";
import { RootProvider } from "./RootProvider";
import App from "./app";



const Index = () => (
  <RootProvider>
    <App />
  </RootProvider>
);

export default Index
