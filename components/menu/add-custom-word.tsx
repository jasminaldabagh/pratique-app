"use client"

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { WordType } from '@/data/words'

interface AddCustomWordProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (word: { word: string; english: string; type: WordType }) => void
}

const wordTypes: { type: WordType; label: string }[] = [
  { type: 'noun', label: 'Noun' },
  { type: 'verb', label: 'Verb' },
  { type: 'adjective', label: 'Adjective' },
  { type: 'adverb', label: 'Adverb' },
  { type: 'preposition', label: 'Preposition' },
  { type: 'other', label: 'Other' },
]

export function AddCustomWord({ isOpen, onClose, onAdd }: AddCustomWordProps) {
  const [french, setFrench] = useState('')
  const [english, setEnglish] = useState('')
  const [type, setType] = useState<WordType>('noun')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (french.trim() && english.trim()) {
      onAdd({
        word: french.trim(),
        english: english.trim(),
        type,
      })
      setFrench('')
      setEnglish('')
      setType('noun')
      onClose()
    }
  }

  const isValid = french.trim() && english.trim()

  return (
    <div className="fixed inset-0 z-50 bg-[var(--surface)]">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 
            className="text-xl font-medium"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            Add custom word
          </h2>
        </div>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* French word */}
        <div>
          <label className="block text-sm font-sans text-[var(--muted)] mb-1.5">
            French word
          </label>
          <input
            type="text"
            value={french}
            onChange={(e) => setFrench(e.target.value)}
            placeholder="e.g., boulangerie"
            className="w-full px-4 py-3 bg-[var(--bg)] rounded-lg border border-[var(--border)] font-sans focus:outline-none focus:border-[var(--muted)]"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
            autoFocus
          />
        </div>
        
        {/* English translation */}
        <div>
          <label className="block text-sm font-sans text-[var(--muted)] mb-1.5">
            English translation
          </label>
          <input
            type="text"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            placeholder="e.g., bakery"
            className="w-full px-4 py-3 bg-[var(--bg)] rounded-lg border border-[var(--border)] font-sans focus:outline-none focus:border-[var(--muted)]"
          />
        </div>
        
        {/* Type select */}
        <div>
          <label className="block text-sm font-sans text-[var(--muted)] mb-1.5">
            Word type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as WordType)}
            className="w-full px-4 py-3 bg-[var(--bg)] rounded-lg border border-[var(--border)] font-sans focus:outline-none focus:border-[var(--muted)] appearance-none"
          >
            {wordTypes.map(({ type, label }) => (
              <option key={type} value={type}>{label}</option>
            ))}
          </select>
        </div>
        
        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-lg font-sans text-center transition-colors ${
            isValid
              ? 'bg-[var(--ink)] text-[var(--surface)] hover:bg-[var(--muted)]'
              : 'bg-[var(--border)] text-[var(--muted)] cursor-not-allowed'
          }`}
        >
          Add word
        </button>
      </form>
    </div>
  )
}
