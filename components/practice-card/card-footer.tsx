"use client"

import { Flame, ArrowRight } from 'lucide-react'

interface CardFooterProps {
  cardCount: number
  onShaky: () => void
  onNext: () => void
  isCurrentVerbShaky: boolean
}

export function CardFooter({ cardCount, onShaky, onNext, isCurrentVerbShaky }: CardFooterProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
      <span className="text-sm text-[var(--muted)] font-sans">
        {cardCount} {cardCount === 1 ? 'card' : 'cards'}
      </span>
      
      <div className="flex items-center gap-2">
        <button
          onClick={onShaky}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-sans transition-colors ${
            isCurrentVerbShaky 
              ? 'bg-[var(--shaky)] text-white' 
              : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--bg)]'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>shaky</span>
        </button>
        
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-lg text-sm font-sans hover:bg-[var(--muted)] transition-colors"
        >
          <span>next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
