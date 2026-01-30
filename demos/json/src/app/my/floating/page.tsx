"use client"


import dynamic from "next/dynamic"

// 🚫 this file stays SERVER by default
// ✅ the moving-DOM logic is isolated behind a client-only boundary

const FloatingClientPage = dynamic(() => import("./page.client"), { ssr: false })

export default FloatingClientPage
