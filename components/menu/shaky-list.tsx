"use client"

import { ArrowLeft, Flame, X } from 'lucide-react'
import { verbs } from '@/data/verbs'
import { words, Word } from '@/data/words'
import { CustomWord } from '@/hooks/use-user-deck'

interface ShakyListProps {
  isOpen: boolean
  onClose: () => void
  shakyVerbIds: number[]
  shakyWordIds: (number | string)[]
  customWords: CustomWord[]
  onToggleShakyVerb: (verbId: number) => void
  onToggleShakyWord: (wordId: number | string) => void
}

export function ShakyList({ 
  isOpen, 
  onClose, 
  shakyVerbIds, 
  shakyWordIds,
  customWords,
  onToggleShakyVerb,
  onToggleShakyWord,
}: ShakyListProps) {
  if (!isOpen) return null

  const shakyVerbs = verbs.filter(v => shakyVerbIds.includes(v.id))
  const shakyWords = [
    ...words.filter(w => shakyWordIds.includes(w.id)),
    ...customWords.filter(w => shakyWordIds.includes(w.id)).map(cw => ({
      ...cw,
      starter: false,
    } as Word)),
  ]

  const hasAny = shakyVerbs.length > 0 || shakyWords.length > 0

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
            Shaky words
          </h2>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {!hasAny ? (
          <div className="text-center py-12">
            <Flame className="w-12 h-12 mx-auto text-[var(--border)] mb-4" />
            <p className="text-[var(--muted)] font-sans">
              No shaky words yet
            </p>
            <p className="text-sm text-[var(--muted)] font-sans mt-1">
              Tap &quot;shaky&quot; on a card to mark words you want to practice more
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Shaky verbs */}
            {shakyVerbs.length > 0 && (
              <div>
                <h3 className="text-sm font-sans text-[var(--muted)] uppercase tracking-wide mb-2">
                  Verbs
                </h3>
                <div className="space-y-1">
                  {shakyVerbs.map(verb => (
                    <div 
                      key={verb.id}
                      className="flex items-center justify-between px-4 py-3 bg-[var(--bg)] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Flame className="w-4 h-4 text-[var(--shaky)]" />
                        <span 
                          className="text-[var(--ink)]"
                          style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                        >
                          {verb.infinitive}
                        </span>
                        <span className="text-sm text-[var(--muted)] font-sans">
                          {verb.english}
                        </span>
                      </div>
                      <button
                        onClick={() => onToggleShakyVerb(verb.id)}
                        className="p-2 -mr-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                        aria-label="Remove from shaky"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Shaky words */}
            {shakyWords.length > 0 && (
              <div>
                <h3 className="text-sm font-sans text-[var(--muted)] uppercase tracking-wide mb-2">
                  Words
                </h3>
                <div className="space-y-1">
                  {shakyWords.map(word => (
                    <div 
                      key={word.id}
                      className="flex items-center justify-between px-4 py-3 bg-[var(--bg)] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Flame className="w-4 h-4 text-[var(--shaky)]" />
                        <span 
                          className="text-[var(--ink)]"
                          style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
                        >
                          {word.word}
                        </span>
                        <span className="text-sm text-[var(--muted)] font-sans">
                          {word.english}
                        </span>
                      </div>
                      <button
                        onClick={() => onToggleShakyWord(word.id)}
                        className="p-2 -mr-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                        aria-label="Remove from shaky"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
