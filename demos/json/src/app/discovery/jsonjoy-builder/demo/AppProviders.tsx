"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TooltipProvider } from "../src/components/ui/tooltip"
import { Toaster as Sonner } from "./components/ui/sonner"
import { Toaster } from "./components/ui/toaster"
import { ReactNode, useState } from "react"

const AppProviders = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
