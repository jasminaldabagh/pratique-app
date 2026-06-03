"use client"

import { useState, useCallback, useEffect } from 'react'
import { Nav } from '@/components/nav'
import { PracticeCard } from '@/components/practice-card/practice-card'
import { PeekDrawer } from '@/components/peek-drawer/peek-drawer'
import { MenuSheet } from '@/components/menu/menu-sheet'
import { VerbList } from '@/components/menu/verb-list'
import { WordList } from '@/components/menu/word-list'
import { ShakyList } from '@/components/menu/shaky-list'
import { useUserDeck } from '@/hooks/use-user-deck'

type PeekWord = {
  word: string
  english: string
  type: string
  id: number | string
  extraInfo?: string
} | null

export default function Home() {
  // 1. Create a safe client-only gate
  const [isMounted, setIsMounted] = useState(false)

  const {
    isLoaded,
    activeVerbs,
    activeWords,
    shakyVerbIds,
    shakyWordIds,
    customWords,
    toggleVerb,
    toggleWord,
    toggleShakyVerb,
    toggleShakyWord,
    addCustomWord,
    isVerbShaky,
    isWordShaky,
    state,
  } = useUserDeck()

  // UI state
  const [menuOpen, setMenuOpen] = useState(false)
  const [verbListOpen, setVerbListOpen] = useState(false)
  const [wordListOpen, setWordListOpen] = useState(false)
  const [shakyListOpen, setShakyListOpen] = useState(false)
  
  // Peek drawer state
  const [peekWord, setPeekWord] = useState<PeekWord>(null)
  const [peekOpen, setPeekOpen] = useState(false)

  // 2. Turn on the app ONLY when it safely lands on your phone screen
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle word peek
  const handleWordPeek = useCallback((word: NonNullable<PeekWord>) => {
    setPeekWord(word)
    setPeekOpen(true)
  }, [])

  // Handle peek drawer actions
  const handlePeekToggleShaky = useCallback(() => {
    if (!peekWord) return
    
    if (peekWord.type === 'verb') {
      toggleShakyVerb(peekWord.id as number)
    } else if (peekWord.type !== 'pronoun') {
      toggleShakyWord(peekWord.id)
    }
  }, [peekWord, toggleShakyVerb, toggleShakyWord])

  const handlePeekRemove = useCallback(() => {
    if (!peekWord) return
    
    if (peekWord.type === 'verb') {
      toggleVerb(peekWord.id as number)
    } else if (peekWord.type !== 'pronoun') {
      toggleWord(peekWord.id)
    }
    setPeekOpen(false)
  }, [peekWord, toggleVerb, toggleWord])

  // Menu handlers
  const handleOpenVerbs = useCallback(() => {
    setMenuOpen(false)
    setVerbListOpen(true)
  }, [])

  const handleOpenWords = useCallback(() => {
    setMenuOpen(false)
    setWordListOpen(true)
  }, [])


  const handleOpenShakyList = useCallback(() => {
    setMenuOpen(false)
    setShakyListOpen(true)
  }, [])

  // 3. While the Mac is packing the files, render a completely safe, static empty layout
  // This guarantees the Mac and Phone see the exact same simple structure at first split-second
  if (!isMounted || !isLoaded) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="h-14 w-full bg-[var(--surface)] border-b border-[var(--border)]" />
        <main className="px-4 py-6">
          <div className="w-full max-w-lg mx-auto bg-[var(--surface)] rounded-[var(--r-xl)] border border-[var(--border)] h-96 opacity-40 animate-pulse" />
        </main>
      </div>
    )
  }

  // Check if we have verbs to practice
  if (activeVerbs.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Nav onMenuOpen={() => setMenuOpen(true)} />
        <main className="px-4 py-12 text-center">
          <p className="text-[var(--muted)] font-sans mb-4">
            No verbs in your deck yet
          </p>
          <button
            onClick={() => {
              setMenuOpen(false)
              setVerbListOpen(true)
            }}
            className="px-6 py-2 bg-[var(--ink)] text-[var(--surface)] rounded-lg font-sans hover:bg-[var(--muted)] transition-colors"
          >
            Add verbs
          </button>
        </main>
        
        {/* Menu and lists */}
        <MenuSheet 
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onOpenVerbs={handleOpenVerbs}
          onOpenWords={handleOpenWords}
          onOpenShakyList={handleOpenShakyList}
        />
        <VerbList
          isOpen={verbListOpen}
          onClose={() => setVerbListOpen(false)}
          activeVerbIds={state.activeVerbIds}
          shakyVerbIds={shakyVerbIds}
          onToggleVerb={toggleVerb}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Nav onMenuOpen={() => setMenuOpen(true)} />
      
      <main className="px-4 py-6">
        <PracticeCard
          activeVerbs={activeVerbs}
          activeWords={activeWords}
          shakyVerbIds={shakyVerbIds}
          shakyWordIds={shakyWordIds}
          onWordPeek={handleWordPeek}
          onToggleShakyVerb={toggleShakyVerb}
          isVerbShaky={isVerbShaky}
        />
      </main>

      {/* Peek Drawer */}
      <PeekDrawer
        isOpen={peekOpen}
        onClose={() => setPeekOpen(false)}
        word={peekWord}
        isShaky={
          peekWord?.type === 'verb' 
            ? isVerbShaky(peekWord.id as number)
            : peekWord?.type !== 'pronoun' 
              ? isWordShaky(peekWord?.id ?? '')
              : false
        }
        onToggleShaky={handlePeekToggleShaky}
        onRemove={handlePeekRemove}
        canRemove={peekWord?.type !== 'pronoun'}
      />

      {/* Menu Sheet */}
      <MenuSheet 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenVerbs={handleOpenVerbs}
        onOpenWords={handleOpenWords}
        onOpenShakyList={handleOpenShakyList}
      />

      {/* Verb List */}
      <VerbList
        isOpen={verbListOpen}
        onClose={() => setVerbListOpen(false)}
        activeVerbIds={state.activeVerbIds}
        shakyVerbIds={shakyVerbIds}
        onToggleVerb={toggleVerb}
      />

      {/* Word List */}
      <WordList
        isOpen={wordListOpen}
        onClose={() => setWordListOpen(false)}
        activeWordIds={state.activeWordIds}
        shakyWordIds={shakyWordIds}
        customWords={customWords}
        onToggleWord={toggleWord}
      />


      {/* Shaky List */}
      <ShakyList
        isOpen={shakyListOpen}
        onClose={() => setShakyListOpen(false)}
        shakyVerbIds={shakyVerbIds}
        shakyWordIds={shakyWordIds}
        customWords={customWords}
        onToggleShakyVerb={toggleShakyVerb}
        onToggleShakyWord={toggleShakyWord}
      />
    </div>
  )
}
