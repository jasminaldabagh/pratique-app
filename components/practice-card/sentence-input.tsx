"use client"

import { useState, useEffect, useCallback } from 'react'
import { sentenceStarters } from '@/utils/starters'

interface SentenceInputProps {
  value: string
  onChange: (value: string) => void
}

export function SentenceInput({ value, onChange }: SentenceInputProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const cycleToNext = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      setPlaceholderIndex((prev) => (prev + 1) % sentenceStarters.length)
      setIsVisible(true)
    }, 200)
  }, [])

  useEffect(() => {
    // Only cycle when input is empty
    if (value) return
    
    const interval = setInterval(cycleToNext, 3000)
    return () => clearInterval(interval)
  }, [value, cycleToNext])

  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={sentenceStarters[placeholderIndex]}
        className={`w-full min-h-[80px] p-4 bg-transparent border-t border-[var(--border)] resize-none focus:outline-none placeholder:text-[var(--muted)] placeholder:italic placeholder:transition-opacity placeholder:duration-200 ${
          isVisible ? 'placeholder:opacity-100' : 'placeholder:opacity-0'
        }`}
        style={{ 
          fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif',
          fontSize: 'var(--text-base)',
        }}
      />
    </div>
  )
}
