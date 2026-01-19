import { JsonDocProvider } from "./hooks/useJsonDoc"
import { JsonProvider } from "./hooks/useJson"
import { JsonSchemaProvider } from "./hooks/useJsonSchema"
import { JsonColumnViewProvider } from "./hooks/useJsonColumnView"
import { JsonSearchProvider } from "./hooks/useJsonSearch"
import { JsonTreeViewProvider } from "./hooks/useJsonTree"
import { JsonView } from "./components/JsonView"

import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { InfoPanel } from "./components/InfoPanel"
import Resizable from "./components/Resizable"
import { SideBar } from "./components/SideBar"

import { LargeTitle } from "./components/Primitives/LargeTitle"
import { ExtraLargeTitle } from "./components/Primitives/ExtraLargeTitle"
import { Body } from "./components/Primitives/Body"
import { PageNotFoundTitle } from "./components/Primitives/PageNotFoundTitle"
import { SmallSubtitle } from "./components/Primitives/SmallSubtitle"

import { data as loaderData } from "./data"
import { useEffect } from "react"

export default function JsonPlay({ children }: any) {
  useEffect(() => {
    if (loaderData.path) {
      console.log("loaderData.path changed----", loaderData.path)
      // window.history.replaceState({}, "", location.pathname)
    }
  }, [loaderData.path])

  return (
    <JsonDocProvider doc={loaderData.doc} path={loaderData.path} key={loaderData.key} minimal={loaderData?.minimal}>
      <JsonProvider initialJson={loaderData.json}>
        <JsonSchemaProvider>
          <JsonColumnViewProvider>
            <JsonSearchProvider>
              <JsonTreeViewProvider overscan={25}>
                <div>
                  <div className="flex h-screen flex-col sm:overflow-hidden">
                    <Header />
                    <div className="flex-grow overflow-y-auto bg-slate-50 transition dark:bg-slate-900">
                      <div className="main-container flex h-full justify-items-stretch">
                        <SideBar />
                        <JsonView>{children}</JsonView>

                        <Resizable isHorizontal={true} initialSize={500} minimumSize={280} maximumSize={900}>
                          <div className="info-panel h-full flex-grow">
                            <InfoPanel />
                          </div>
                        </Resizable>
                      </div>
                    </div>

                    <Footer></Footer>
                  </div>
                </div>
              </JsonTreeViewProvider>
            </JsonSearchProvider>
          </JsonColumnViewProvider>
        </JsonSchemaProvider>
      </JsonProvider>
    </JsonDocProvider>
  )
}
