"use client"

import { useState, useEffect, useCallback } from 'react'
import { CardImage } from './card-image'
import { WordRow } from './word-row'
import { OptionalWords } from './optional-words'
import { SentenceInput } from './sentence-input'
import { CardFooter } from './card-footer'
import { Scene, getRandomScene } from '@/data/scenes'
import { verbs } from '@/data/verbs'
import { Word, WordType } from '@/data/words'
import { weightedRandomSelect, getRandomPronoun, Pronoun } from '@/utils/shuffle'
import { getRandomStarter } from '@/utils/starters'

interface PracticeCardProps {
  activeVerbs: typeof verbs
  activeWords: Word[]
  shakyVerbIds: number[]
  shakyWordIds: (number | string)[]
  onWordPeek: (word: { word: string; english: string; type: string; id: number | string; extraInfo?: string }) => void
  onToggleShakyVerb: (verbId: number) => void
  isVerbShaky: (verbId: number) => boolean
}

export function PracticeCard({
  activeVerbs,
  activeWords,
  shakyVerbIds,
  shakyWordIds,
  onWordPeek,
  onToggleShakyVerb,
  isVerbShaky,
}: PracticeCardProps) {
  const [scene, setScene] = useState<Scene | null>(null)
  const [currentVerb, setCurrentVerb] = useState<typeof verbs[0] | null>(null)
  const [currentPronoun, setCurrentPronoun] = useState<Pronoun>("je")
  const [optionalWords, setOptionalWords] = useState<Word[]>([])
  const [sentence, setSentence] = useState("")
  const [cardCount, setCardCount] = useState(0)
  const [verbLocked, setVerbLocked] = useState(false)
  const [pronounLocked, setPronounLocked] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize card on mount
  useEffect(() => {
    if (!isInitialized && activeVerbs.length > 0) {
      const initialScene = getRandomScene()
      const initialVerb = weightedRandomSelect(activeVerbs, shakyVerbIds)
      const initialPronoun = getRandomPronoun()
      
      setScene(initialScene)
      setCurrentVerb(initialVerb)
      setCurrentPronoun(initialPronoun)
      setIsInitialized(true)
    }
  }, [activeVerbs, shakyVerbIds, isInitialized])

  // Handle next card
  const handleNext = useCallback(() => {
    // Always get new scene
    setScene(prev => getRandomScene(prev?.id))
    
    // Get new verb if not locked
    if (!verbLocked && activeVerbs.length > 0) {
      const newVerb = weightedRandomSelect(activeVerbs, shakyVerbIds, currentVerb?.id)
      setCurrentVerb(newVerb)
    }
    
    // Get new pronoun if not locked
    if (!pronounLocked) {
      setCurrentPronoun(prev => getRandomPronoun(prev))
    }
    
    // Clear optional words and sentence
    setOptionalWords([])
    setSentence("")
    setCardCount(prev => prev + 1)
  }, [verbLocked, pronounLocked, activeVerbs, shakyVerbIds, currentVerb?.id])

  // Handle adding optional word
  const handleAddWord = useCallback((type: WordType) => {
    const wordsOfType = activeWords.filter(w => w.type === type)
    const currentWordIds = optionalWords.map(w => w.id)
    const available = wordsOfType.filter(w => !currentWordIds.includes(w.id))
    
    if (available.length > 0) {
      const newWord = weightedRandomSelect(available, shakyWordIds)
      if (newWord) {
        setOptionalWords(prev => [...prev, newWord])
      }
    }
  }, [activeWords, optionalWords, shakyWordIds])

  // Handle removing optional word
  const handleRemoveWord = useCallback((wordId: number | string) => {
    setOptionalWords(prev => prev.filter(w => w.id !== wordId))
  }, [])

  // Handle locking
  const handleToggleVerbLock = useCallback(() => {
    if (!verbLocked) {
      setPronounLocked(false) // Only one can be locked
    }
    setVerbLocked(prev => !prev)
  }, [verbLocked])

  const handleTogglePronounLock = useCallback(() => {
    if (!pronounLocked) {
      setVerbLocked(false) // Only one can be locked
    }
    setPronounLocked(prev => !prev)
  }, [pronounLocked])

  // Handle word clicks for peek drawer
  const handleVerbClick = useCallback(() => {
    if (currentVerb) {
      const groupLabel = currentVerb.group === 1 ? '-er' : currentVerb.group === 2 ? '-ir' : 'irregular'
      const regularLabel = currentVerb.group === 3 ? 'irregular' : 'regular'
      onWordPeek({
        word: currentVerb.infinitive,
        english: currentVerb.english,
        type: 'verb',
        id: currentVerb.id,
        extraInfo: `verb · group ${currentVerb.group} (${groupLabel}) · ${regularLabel}`,
      })
    }
  }, [currentVerb, onWordPeek])

  const handlePronounClick = useCallback(() => {
    const pronounEnglish: Record<Pronoun, string> = {
      "je": "I",
      "tu": "you (informal)",
      "il/elle": "he/she",
      "nous": "we",
      "vous": "you (formal/plural)",
      "ils/elles": "they",
    }
    onWordPeek({
      word: currentPronoun,
      english: pronounEnglish[currentPronoun],
      type: 'pronoun',
      id: currentPronoun,
      extraInfo: 'pronoun',
    })
  }, [currentPronoun, onWordPeek])

  const handleOptionalWordClick = useCallback((word: Word) => {
    let extraInfo = word.type
    if (word.type === 'noun' && word.gender) {
      extraInfo = `noun · ${word.gender === 'm' ? 'masculine' : 'feminine'}`
    }
    onWordPeek({
      word: word.word,
      english: word.english,
      type: word.type,
      id: word.id,
      extraInfo,
    })
  }, [onWordPeek])

  const handleShaky = useCallback(() => {
    if (currentVerb) {
      onToggleShakyVerb(currentVerb.id)
    }
  }, [currentVerb, onToggleShakyVerb])

  if (!isInitialized || !scene || !currentVerb) {
    return (
      <div className="w-full max-w-lg mx-auto bg-[var(--surface)] rounded-[var(--r-xl)] border border-[var(--border)] shadow-sm animate-pulse">
        <div className="p-2.5 pb-0">
          <div className="aspect-[4/3] md:aspect-square rounded-[var(--r-img)] bg-[var(--bg)]" />
        </div>
        <div className="p-4 space-y-4">
          <div className="h-8 bg-[var(--bg)] rounded w-1/3" />
          <div className="h-6 bg-[var(--bg)] rounded w-1/4" />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-[var(--surface)] rounded-[var(--r-xl)] border border-[var(--border)] shadow-sm">
      {/* Top section: Image + Words */}
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="p-2.5 pb-0 md:pb-2.5 md:pr-0 md:w-1/2">
          <CardImage scene={scene} />
        </div>
        
        {/* Words section */}
        <div className="flex-1 p-4 space-y-4">
          {/* Scene label */}
          <p 
            className="text-sm text-[var(--muted)] italic"
            style={{ fontFamily: 'var(--font-playfair), Playfair Display, Georgia, serif' }}
          >
            {scene.label}
          </p>
          
          {/* Verb */}
          <WordRow
            word={currentVerb.infinitive}
            type="verb"
            isLocked={verbLocked}
            onToggleLock={handleToggleVerbLock}
            onWordClick={handleVerbClick}
          />
          
          {/* Pronoun */}
          <WordRow
            word={currentPronoun}
            type="pronoun"
            isLocked={pronounLocked}
            onToggleLock={handleTogglePronounLock}
            onWordClick={handlePronounClick}
            muted
          />
          
          {/* Optional words */}
          <OptionalWords
            words={optionalWords}
            onWordClick={handleOptionalWordClick}
            onRemoveWord={handleRemoveWord}
            onAddWord={handleAddWord}
          />
        </div>
      </div>
      
      {/* Sentence input */}
      <SentenceInput value={sentence} onChange={setSentence} />
      
      {/* Footer */}
      <CardFooter
        cardCount={cardCount}
        onShaky={handleShaky}
        onNext={handleNext}
        isCurrentVerbShaky={currentVerb ? isVerbShaky(currentVerb.id) : false}
      />
    </div>
  )
}
