"use client"

import { Flame, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface PeekDrawerProps {
  isOpen: boolean
  onClose: () => void
  word: {
    word: string
    english: string
    type: string
    id: number | string
    extraInfo?: string
  } | null
  isShaky: boolean
  onToggleShaky: () => void
  onRemove: () => void
  canRemove?: boolean
}

export function PeekDrawer({ 
  isOpen, 
  onClose, 
  word, 
  isShaky, 
  onToggleShaky, 
  onRemove,
  canRemove = true 
}: PeekDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

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

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!word) return null

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
      />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`absolute bottom-0 left-0 right-0 bg-[var(--surface)] rounded-t-2xl shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '60vh' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="drawer-handle" />
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Content */}
        <div className="px-6 pb-6 pt-2">
          {/* Word and translation */}
          <div className="flex items-baseline gap-3 mb-1">
            <span 
              className="text-2xl font-medium text-[var(--ink)]"
              style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            >
              {word.word}
            </span>
            <span className="text-lg text-[var(--muted)] font-sans">
              {word.english}
            </span>
          </div>
          
          {/* Grammar info */}
          {word.extraInfo && (
            <p className="text-sm text-[var(--muted)] font-sans mb-6">
              {word.extraInfo}
            </p>
          )}
          
          {/* Divider */}
          <div className="border-t border-[var(--border)] my-4" />
          
          {/* Actions */}
          <div className="space-y-2">
            {/* Shaky toggle - only for verbs and words, not pronouns */}
            {word.type !== 'pronoun' && (
              <button
                onClick={onToggleShaky}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-sans transition-colors ${
                  isShaky 
                    ? 'bg-[var(--shaky)]/10 text-[var(--shaky)]' 
                    : 'hover:bg-[var(--bg)] text-[var(--ink)]'
                }`}
              >
                <Flame className="w-5 h-5" />
                <span>{isShaky ? 'Showing more often' : 'Show more often (shaky)'}</span>
              </button>
            )}
            
            {/* Remove from deck - only show if can remove */}
            {canRemove && word.type !== 'pronoun' && (
              <button
                onClick={onRemove}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-sans hover:bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Remove from deck</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Safe area for mobile */}
        <div className="h-safe-area-inset-bottom" />
      </div>
    </div>
  )
}
