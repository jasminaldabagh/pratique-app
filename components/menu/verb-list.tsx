"use client"

import { useState } from 'react'
import { ArrowLeft, Search, Check, Flame } from 'lucide-react'
import { verbs, getVerbGroupLabel } from '@/data/verbs'

interface VerbListProps {
  isOpen: boolean
  onClose: () => void
  activeVerbIds: number[]
  shakyVerbIds: number[]
  onToggleVerb: (verbId: number) => void
}

export function VerbList({ 
  isOpen, 
  onClose, 
  activeVerbIds, 
  shakyVerbIds,
  onToggleVerb 
}: VerbListProps) {
  const [search, setSearch] = useState('')
  const [letterFilter, setLetterFilter] = useState<string | null>(null)

  if (!isOpen) return null

  // Get unique first letters
  const letters = [...new Set(verbs.map(v => v.infinitive[0].toUpperCase()))].sort()

  // Filter verbs
  const filteredVerbs = verbs.filter(v => {
    const matchesSearch = v.infinitive.toLowerCase().includes(search.toLowerCase()) ||
                         v.english.toLowerCase().includes(search.toLowerCase())
    const matchesLetter = !letterFilter || v.infinitive[0].toUpperCase() === letterFilter
    return matchesSearch && matchesLetter
  })

  return (
    <div className="fixed inset-0 z-50 bg-[var(--surface)]">
      {/* Header */}
      <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)] z-10">
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
            Verbs
          </h2>
        </div>
        
        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search verbs..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--bg)] rounded-lg border border-[var(--border)] font-sans text-sm focus:outline-none focus:border-[var(--muted)]"
            />
          </div>
        </div>
        
        {/* Letter filter */}
        <div className="px-4 pb-3 flex gap-1 overflow-x-auto">
          <button
            onClick={() => setLetterFilter(null)}
            className={`px-2.5 py-1 rounded text-xs font-sans transition-colors flex-shrink-0 ${
              !letterFilter ? 'bg-[var(--ink)] text-[var(--surface)]' : 'bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--ink)]'
            }`}
          >
            All
          </button>
          {letters.map(letter => (
            <button
              key={letter}
              onClick={() => setLetterFilter(letter)}
              className={`px-2.5 py-1 rounded text-xs font-sans transition-colors flex-shrink-0 ${
                letterFilter === letter ? 'bg-[var(--ink)] text-[var(--surface)]' : 'bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Verb list */}
      <div className="overflow-y-auto" style={{ height: 'calc(100vh - 160px)' }}>
        {filteredVerbs.map(verb => {
          const isActive = activeVerbIds.includes(verb.id)
          const isShaky = shakyVerbIds.includes(verb.id)
          
          return (
            <button
              key={verb.id}
              onClick={() => onToggleVerb(verb.id)}
              className="w-full flex items-center justify-between px-4 py-3 border-b border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="word-dashed text-[var(--ink)]"
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                >
                  {verb.infinitive}
                </span>
                {isShaky && (
                  <Flame className="w-4 h-4 text-[var(--shaky)]" />
                )}
                <span className={`badge ${verb.group === 1 ? 'badge-er' : verb.group === 2 ? 'badge-ir' : 'badge-irreg'}`}>
                  {getVerbGroupLabel(verb.group)}
                </span>
              </div>
              
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                isActive 
                  ? 'bg-[var(--ink)] border-[var(--ink)]' 
                  : 'border-[var(--border)]'
              }`}>
                {isActive && <Check className="w-3 h-3 text-[var(--surface)]" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
