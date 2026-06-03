"use client"

import { X, BookOpen, Type, Plus, Flame } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface MenuSheetProps {
  isOpen: boolean
  onClose: () => void
  onOpenVerbs: () => void
  onOpenWords: () => void
  onOpenCustomWord: () => void
  onOpenShakyList: () => void
}

export function MenuSheet({ 
  isOpen, 
  onClose, 
  onOpenVerbs, 
  onOpenWords, 
  onOpenCustomWord,
  onOpenShakyList,
}: MenuSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const menuItems = [
    { icon: BookOpen, label: 'Verbs', onClick: onOpenVerbs },
    { icon: Type, label: 'Words', onClick: onOpenWords },
    { icon: Plus, label: 'Add custom word', onClick: onOpenCustomWord },
    { icon: Flame, label: 'Shaky words', onClick: onOpenShakyList },
  ]

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sheet - slides from right */}
      <div 
        ref={sheetRef}
        className={`absolute top-0 right-0 bottom-0 w-72 bg-[var(--surface)] shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h2 
            className="text-xl font-medium"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            Manage words
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Menu items */}
        <div className="p-4 space-y-1">
          {menuItems.map(({ icon: Icon, label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left font-sans hover:bg-[var(--bg)] text-[var(--ink)] transition-colors"
            >
              <Icon className="w-5 h-5 text-[var(--muted)]" />
              <span>{label}</span>
            </button>
          ))}
        </div>
        
        {/* Safe area for mobile */}
        <div className="h-8" />
      </div>
    </div>
  )
}
