import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ParkSpot - Real-Time Parking Management",
  description: "Find and manage parking spots in real-time",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar name="ParkSpot" />
        <main>{children}</main>
      </body>
    </html>
  )
}



import './globals.css'