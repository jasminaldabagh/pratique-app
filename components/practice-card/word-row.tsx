"use client"

import { Lock, Unlock } from 'lucide-react'

interface WordRowProps {
  word: string
  type: "verb" | "pronoun"
  isLocked: boolean
  onToggleLock: () => void
  onWordClick: () => void
  muted?: boolean
}

export function WordRow({ word, type, isLocked, onToggleLock, onWordClick, muted }: WordRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        onClick={onWordClick}
        className={`word-dashed text-left transition-colors ${
          muted 
            ? 'text-[var(--muted)] italic' 
            : 'text-[var(--ink)]'
        } ${type === 'verb' ? 'text-2xl font-medium' : 'text-lg'}`}
        style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
      >
        {word}
      </button>
      <button
        onClick={onToggleLock}
        className={`lock-btn flex-shrink-0 ${isLocked ? 'locked' : ''}`}
        aria-label={isLocked ? `Unlock ${type}` : `Lock ${type}`}
      >
        {isLocked ? (
          <Lock className="w-3 h-3" />
        ) : (
          <Unlock className="w-3 h-3 text-[var(--muted)]" />
        )}
      </button>
    </div>
  )
}
