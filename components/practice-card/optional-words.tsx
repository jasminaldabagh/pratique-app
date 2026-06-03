"use client"

import { useState, useRef, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import { Word, WordType } from '@/data/words'

interface OptionalWordsProps {
  words: Word[]
  onWordClick: (word: Word) => void
  onRemoveWord: (wordId: number | string) => void
  onAddWord: (type: WordType) => void
  maxWords?: number
}

const wordTypes: { type: WordType; label: string }[] = [
  { type: "noun", label: "noun" },
  { type: "adjective", label: "adj" },
  { type: "adverb", label: "adv" },
]

export function OptionalWords({ words, onWordClick, onRemoveWord, onAddWord, maxWords = 2 }: OptionalWordsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const canAddMore = words.length < maxWords

  // Automatically close the dropdown menu if you tap anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-2 relative z-20">
      {words.map((word) => (
        <div key={word.id} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onWordClick(word)}
            className="word-chip touch-manipulation"
          >
            {word.word}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemoveWord(word.id)
            }}
            className="w-5 h-5 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--border)] transition-colors touch-manipulation"
            aria-label={`Remove ${word.word}`}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      
      {canAddMore && (
        <div className="relative" ref={dropdownRef}>
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 rounded-full border border-dashed border-[var(--dashed)] flex items-center justify-center text-[var(--muted)] hover:border-[var(--muted)] hover:text-[var(--ink)] transition-colors touch-manipulation"
            aria-label="Add optional word"
          >
            <Plus className="w-4 h-4" />
          </button>
          
          {/* Explicit Dropdown Menu Controlled by Tap State */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-1 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-lg min-w-[100px] z-30">
              {wordTypes.map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    onAddWord(type)
                    setIsOpen(false) // Auto-closes the picker once you tap a type
                  }}
                  className="block w-full px-4 py-2 text-left text-sm font-sans text-[var(--ink)] hover:bg-[var(--bg)] first:rounded-t-lg last:rounded-b-lg transition-colors touch-manipulation"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
