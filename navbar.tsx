"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Car, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  name: string
}

export function Navbar({ name }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg border-b-2 border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-blue-600 rounded-lg shadow-inner transform -rotate-3"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-lg shadow-inner transform rotate-3"></div>
              <div className="relative flex items-center justify-center w-full h-full bg-blue-400 rounded-lg shadow-inner">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-white">{name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/user/parking">Find Parking</NavLink>
            <NavLink href="/owner/add-parking">Add Parking</NavLink>
            <NavLink href="/owner/login">Owner Login</NavLink>
            <NavLink href="/user/login">User Login</NavLink>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg border-t border-gray-700">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <MobileNavLink href="/user/parking" onClick={() => setIsOpen(false)}>
              Find Parking
            </MobileNavLink>
            <MobileNavLink href="/owner/add-parking" onClick={() => setIsOpen(false)}>
              Add Parking
            </MobileNavLink>
            <MobileNavLink href="/owner/login" onClick={() => setIsOpen(false)}>
              Owner Login
            </MobileNavLink>
            <MobileNavLink href="/user/login" onClick={() => setIsOpen(false)}>
              User Login
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
    >
      {children}
    </Link>
  )
}

