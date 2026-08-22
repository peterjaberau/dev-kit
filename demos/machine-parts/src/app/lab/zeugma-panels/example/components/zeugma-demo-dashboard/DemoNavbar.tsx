'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const LOGO_URL = '/logo.png'

export function DemoNavbar() {
  return (
    <nav className="grafana-demo-navbar">
      <div className="flex items-center gap-3">



        <Link href="/" className="flex items-center gap-2 group">
          <img src={LOGO_URL} alt="react-zeugma logo" className="w-5 h-5 object-contain" />
        </Link>


      </div>

    </nav>
  )
}
