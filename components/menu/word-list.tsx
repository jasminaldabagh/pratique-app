"use client"

import { useState } from 'react'
import { ArrowLeft, Search, Check, Flame } from 'lucide-react'
import { words, WordType } from '@/data/words'
import { CustomWord } from '@/hooks/use-user-deck'

interface WordListProps {
  isOpen: boolean
  onClose: () => void
  activeWordIds: (number | string)[]
  shakyWordIds: (number | string)[]
  customWords: CustomWord[]
  onToggleWord: (wordId: number | string) => void
}

const typeFilters: { type: WordType | 'all'; label: string }[] = [
  { type: 'all', label: 'All' },
  { type: 'noun', label: 'Nouns' },
  { type: 'adjective', label: 'Adjectives' },
  { type: 'adverb', label: 'Adverbs' },
]

export function WordList({ 
  isOpen, 
  onClose, 
  activeWordIds, 
  shakyWordIds,
  customWords,
  onToggleWord 
}: WordListProps) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<WordType | 'all'>('all')

  if (!isOpen) return null

  // Combine standard words with custom words
  const allWords = [
    ...words,
    ...customWords.map(cw => ({ ...cw, starter: false })),
  ]

  // Filter words
  const filteredWords = allWords.filter(w => {
    const matchesSearch = w.word.toLowerCase().includes(search.toLowerCase()) ||
                         w.english.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || w.type === typeFilter
    return matchesSearch && matchesType
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
            Words
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
              placeholder="Search words..."
              className="w-full pl-10 pr-4 py-2 bg-[var(--bg)] rounded-lg border border-[var(--border)] font-sans text-sm focus:outline-none focus:border-[var(--muted)]"
            />
          </div>
        </div>
        
        {/* Type filter */}
        <div className="px-4 pb-3 flex gap-1 overflow-x-auto">
          {typeFilters.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1 rounded text-xs font-sans transition-colors flex-shrink-0 ${
                typeFilter === type ? 'bg-[var(--ink)] text-[var(--surface)]' : 'bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--ink)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Word list */}
      <div className="overflow-y-auto" style={{ height: 'calc(100vh - 160px)' }}>
        {filteredWords.map(word => {
          const isActive = activeWordIds.includes(word.id)
          const isShaky = shakyWordIds.includes(word.id)
          const isCustom = typeof word.id === 'string' && word.id.startsWith('custom_')
          
          return (
            <button
              key={word.id}
              onClick={() => onToggleWord(word.id)}
              className="w-full flex items-center justify-between px-4 py-3 border-b border-[var(--border)] hover:bg-[var(--bg)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="word-dashed text-[var(--ink)]"
                  style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                >
                  {word.word}
                </span>
                {isShaky && (
                  <Flame className="w-4 h-4 text-[var(--shaky)]" />
                )}
                <span className="badge bg-[var(--bg)]">
                  {word.type}
                </span>
                {isCustom && (
                  <span className="badge border border-dashed border-[var(--dashed)]">
                    custom
                  </span>
                )}
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
