"use client"

import { Menu } from 'lucide-react'

interface NavProps {
  onMenuOpen: () => void
}

export function Nav({ onMenuOpen }: NavProps) {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-[var(--bg)]">
      <h1 className="font-[var(--font-playfair)] text-xl font-medium tracking-tight" style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}>
        Pratique
      </h1>
      <button 
        onClick={onMenuOpen}
        className="p-2 -mr-2 text-[var(--ink)] hover:text-[var(--muted)] transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  )
}
